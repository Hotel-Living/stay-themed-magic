
import { renderHook, act } from "@testing-library/react-hooks";
import { useSession } from "../useSession";

describe("useSession hook", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useSession());
    
    expect(result.current.user).toBeNull();
    expect(result.current.session).toBeNull();
    expect(result.current.isLoading).toBe(true);
  });

  it("should update user and session values", () => {
    const { result } = renderHook(() => useSession());
    
    act(() => {
      result.current.setUser({ id: "123" } as any);
      result.current.setSession({ access_token: "token" } as any);
      result.current.setIsLoading(false);
    });
    
    expect(result.current.user).toEqual({ id: "123" });
    expect(result.current.session).toEqual({ access_token: "token" });
    expect(result.current.isLoading).toBe(false);
  });
});
