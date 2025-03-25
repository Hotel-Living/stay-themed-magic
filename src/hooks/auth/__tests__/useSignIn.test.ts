
import { renderHook, act } from "@testing-library/react-hooks";
import { useSignIn } from "../useSignIn";
import { mockSupabaseClient } from "../../../__mocks__/supabaseMock";
import { useToast } from "@/hooks/use-toast";

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

describe("useSignIn hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with isLoading as false", () => {
    const { result } = renderHook(() => useSignIn());
    
    expect(result.current.isLoading).toBe(false);
  });

  it("should call signInWithPassword and show success toast on successful sign-in", async () => {
    const { result } = renderHook(() => useSignIn());
    const mockToast = useToast().toast;
    
    await act(async () => {
      await result.current.signIn("test@example.com", "password");
    });
    
    expect(mockSupabaseClient.auth.signInWithPassword).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password"
    });
    expect(mockToast).toHaveBeenCalledWith({
      title: "¡Bienvenido de nuevo!",
      description: "Has iniciado sesión con éxito"
    });
    expect(result.current.isLoading).toBe(false);
  });

  it("should show error toast when signInWithPassword fails", async () => {
    const errorMessage = "Invalid credentials";
    mockSupabaseClient.auth.signInWithPassword.mockResolvedValueOnce({
      data: { user: null, session: null },
      error: { message: errorMessage }
    });
    
    const { result } = renderHook(() => useSignIn());
    const mockToast = useToast().toast;
    
    await act(async () => {
      await result.current.signIn("test@example.com", "wrong-password");
    });
    
    expect(mockToast).toHaveBeenCalledWith({
      title: "Error al iniciar sesión",
      description: errorMessage,
      variant: "destructive"
    });
    expect(result.current.isLoading).toBe(false);
  });
});
