
import { renderHook, act } from "@testing-library/react-hooks";
import { useSignOut } from "../useSignOut";
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

describe("useSignOut hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with isLoading as false", () => {
    const { result } = renderHook(() => useSignOut());
    
    expect(result.current.isLoading).toBe(false);
  });

  it("should call signOut and show success toast on successful sign-out", async () => {
    const { result } = renderHook(() => useSignOut());
    const mockToast = useToast().toast;
    
    await act(async () => {
      await result.current.signOut();
    });
    
    expect(mockSupabaseClient.auth.signOut).toHaveBeenCalled();
    expect(mockToast).toHaveBeenCalledWith({
      title: "Sesión cerrada",
      description: "Has cerrado sesión con éxito"
    });
    expect(result.current.isLoading).toBe(false);
  });

  it("should show error toast when signOut fails", async () => {
    const errorMessage = "Failed to sign out";
    mockSupabaseClient.auth.signOut.mockResolvedValueOnce({
      error: { message: errorMessage }
    });
    
    const { result } = renderHook(() => useSignOut());
    const mockToast = useToast().toast;
    
    await act(async () => {
      await result.current.signOut();
    });
    
    expect(mockToast).toHaveBeenCalledWith({
      title: "Error al cerrar sesión",
      description: errorMessage,
      variant: "destructive"
    });
    expect(result.current.isLoading).toBe(false);
  });
});
