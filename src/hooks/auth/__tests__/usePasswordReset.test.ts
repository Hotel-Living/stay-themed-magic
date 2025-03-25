
import { renderHook, act } from "@testing-library/react-hooks";
import { usePasswordReset } from "../usePasswordReset";
import { mockSupabaseClient } from "../../../__mocks__/supabaseMock";
import { useToast } from "@/hooks/use-toast";

// Mock the toast hook
jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn().mockReturnValue({
    toast: jest.fn()
  })
}));

describe("usePasswordReset hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'location', {
      value: {
        origin: 'http://localhost:3000'
      },
      writable: true
    });
  });

  it("should initialize with isLoading as false", () => {
    const { result } = renderHook(() => usePasswordReset());
    
    expect(result.current.isLoading).toBe(false);
  });

  it("should call resetPasswordForEmail and show success toast", async () => {
    // The mock is already set up in the mockSupabaseClient
    const { result } = renderHook(() => usePasswordReset());
    const mockToast = useToast().toast;
    const testEmail = "test@example.com";
    
    await act(async () => {
      await result.current.requestPasswordReset(testEmail);
    });
    
    expect(mockSupabaseClient.auth.resetPasswordForEmail).toHaveBeenCalledWith(
      testEmail,
      {
        redirectTo: 'http://localhost:3000/reset-password'
      }
    );
    
    expect(mockToast).toHaveBeenCalledWith({
      title: "Email enviado",
      description: "Se ha enviado un enlace para restablecer tu contraseña a tu correo electrónico"
    });
    
    expect(result.current.isLoading).toBe(false);
  });

  it("should call updateUser and show success toast when updating password", async () => {
    // The mock is already set up in the mockSupabaseClient
    const { result } = renderHook(() => usePasswordReset());
    const mockToast = useToast().toast;
    const newPassword = "newStrongPassword123";
    
    await act(async () => {
      const success = await result.current.updatePassword(newPassword);
      expect(success).toBe(true);
    });
    
    expect(mockSupabaseClient.auth.updateUser).toHaveBeenCalledWith({
      password: newPassword
    });
    
    expect(mockToast).toHaveBeenCalledWith({
      title: "Contraseña actualizada",
      description: "Tu contraseña ha sido actualizada con éxito"
    });
    
    expect(result.current.isLoading).toBe(false);
  });

  it("should validate email format before sending reset email", async () => {
    const { result } = renderHook(() => usePasswordReset());
    const mockToast = useToast().toast;
    
    await act(async () => {
      await result.current.requestPasswordReset("invalid-email");
    });
    
    // Should not call resetPasswordForEmail for invalid email
    expect(mockSupabaseClient.auth.resetPasswordForEmail).not.toHaveBeenCalled();
    
    expect(mockToast).toHaveBeenCalledWith({
      title: "Email inválido",
      description: "Por favor, introduce una dirección de email válida",
      variant: "destructive"
    });
  });

  it("should validate password length before updating", async () => {
    const { result } = renderHook(() => usePasswordReset());
    const mockToast = useToast().toast;
    
    await act(async () => {
      const success = await result.current.updatePassword("weak");
      expect(success).toBe(false);
    });
    
    // Should not call updateUser for weak password
    expect(mockSupabaseClient.auth.updateUser).not.toHaveBeenCalled();
    
    expect(mockToast).toHaveBeenCalledWith({
      title: "Contraseña débil",
      description: "La contraseña debe tener al menos 6 caracteres",
      variant: "destructive"
    });
  });
});
