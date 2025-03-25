
import { renderHook, act } from "@testing-library/react-hooks";
import { useSignUp } from "../useSignUp";
import { mockSupabaseClient } from "../../../__mocks__/supabaseMock";
import { useToast } from "@/hooks/use-toast";
import { Profile } from "@/integrations/supabase/types-custom";

// Mock the react-router-dom
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn()
}));

// Mock the toast hook
jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn().mockReturnValue({
    toast: jest.fn()
  })
}));

describe("useSignUp hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with isLoading as false", () => {
    const { result } = renderHook(() => useSignUp());
    
    expect(result.current.isLoading).toBe(false);
  });

  it("should call signUp with correct metadata and show success toast", async () => {
    const { result } = renderHook(() => useSignUp());
    const mockToast = useToast().toast;
    
    const userData: Partial<Profile> = {
      first_name: "John",
      last_name: "Doe",
      is_hotel_owner: true
    };
    
    await act(async () => {
      await result.current.signUp("test@example.com", "password", userData);
    });
    
    expect(mockSupabaseClient.auth.signUp).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password",
      options: {
        data: {
          first_name: "John",
          last_name: "Doe",
          is_hotel_owner: true
        }
      }
    });
    
    expect(mockToast).toHaveBeenCalledWith({
      title: "¡Cuenta creada!",
      description: "Por favor verifica tu correo electrónico para confirmar tu cuenta"
    });
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle signUp errors properly", async () => {
    const errorMessage = "Email already in use";
    mockSupabaseClient.auth.signUp.mockResolvedValueOnce({
      data: { user: null, session: null },
      error: { message: errorMessage }
    });
    
    const { result } = renderHook(() => useSignUp());
    const mockToast = useToast().toast;
    
    await act(async () => {
      await result.current.signUp("existing@example.com", "password");
    });
    
    expect(mockToast).toHaveBeenCalledWith({
      title: "Error al registrarse",
      description: errorMessage,
      variant: "destructive"
    });
    expect(result.current.isLoading).toBe(false);
  });
});
