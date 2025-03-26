
import { renderHook } from "@testing-library/react-hooks";
import { useAuthOperations } from "../useAuthOperations";
import { useSession } from "../auth/useSession";
import { useSignUp } from "../auth/useSignUp";
import { useSignIn } from "../auth/useSignIn";
import { useSignOut } from "../auth/useSignOut";

// Mock the individual hooks
jest.mock("../auth/useSession", () => ({
  useSession: jest.fn().mockReturnValue({
    user: null,
    setUser: jest.fn(),
    session: null,
    setSession: jest.fn(),
    isLoading: false,
    setIsLoading: jest.fn()
  })
}));

jest.mock("../auth/useSignUp", () => ({
  useSignUp: jest.fn().mockReturnValue({
    signUp: jest.fn(),
    isLoading: false
  })
}));

jest.mock("../auth/useSignIn", () => ({
  useSignIn: jest.fn().mockReturnValue({
    signIn: jest.fn(),
    isLoading: false
  })
}));

jest.mock("../auth/useSignOut", () => ({
  useSignOut: jest.fn().mockReturnValue({
    signOut: jest.fn(),
    isLoading: false
  })
}));

describe("useAuthOperations hook", () => {
  it("should combine all auth hooks correctly", () => {
    const { result } = renderHook(() => useAuthOperations());
    
    // Check if all properties from useSession are present
    expect(result.current).toHaveProperty("user");
    expect(result.current).toHaveProperty("setUser");
    expect(result.current).toHaveProperty("session");
    expect(result.current).toHaveProperty("setSession");
    expect(result.current).toHaveProperty("isLoading");
    expect(result.current).toHaveProperty("setIsLoading");
    
    // Check if signUp is present from useSignUp
    expect(result.current).toHaveProperty("signUp");
    
    // Check if signIn is present from useSignIn
    expect(result.current).toHaveProperty("signIn");
    
    // Check if signOut is present from useSignOut
    expect(result.current).toHaveProperty("signOut");
  });

  it("should correctly spread the hook values", () => {
    const mockSessionHook = {
      user: { id: "test" },
      setUser: jest.fn(),
      session: { token: "abc" },
      setSession: jest.fn(),
      isLoading: true,
      setIsLoading: jest.fn()
    };
    
    const mockSignUpHook = {
      signUp: jest.fn(),
      isLoading: false
    };
    
    const mockSignInHook = {
      signIn: jest.fn(),
      isLoading: false
    };
    
    const mockSignOutHook = {
      signOut: jest.fn(),
      isLoading: false
    };
    
    (useSession as jest.Mock).mockReturnValue(mockSessionHook);
    (useSignUp as jest.Mock).mockReturnValue(mockSignUpHook);
    (useSignIn as jest.Mock).mockReturnValue(mockSignInHook);
    (useSignOut as jest.Mock).mockReturnValue(mockSignOutHook);
    
    const { result } = renderHook(() => useAuthOperations());
    
    expect(result.current.user).toBe(mockSessionHook.user);
    expect(result.current.session).toBe(mockSessionHook.session);
    expect(result.current.signUp).toBe(mockSignUpHook.signUp);
    expect(result.current.signIn).toBe(mockSignInHook.signIn);
    expect(result.current.signOut).toBe(mockSignOutHook.signOut);
  });
});
