
import { Session, User } from "@supabase/supabase-js";

// Mock user and session objects
export const mockUser: User = {
  id: "test-user-id",
  app_metadata: {},
  user_metadata: {},
  aud: "authenticated",
  created_at: new Date().toISOString(),
  email: "test@example.com",
  role: "authenticated"
};

export const mockSession: Session = {
  access_token: "mock-access-token",
  refresh_token: "mock-refresh-token",
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  token_type: "bearer",
  user: mockUser
};

// Create a mock Supabase client
export const mockSupabaseClient = {
  auth: {
    getSession: jest.fn().mockResolvedValue({ data: { session: mockSession } }),
    signUp: jest.fn().mockResolvedValue({ data: { user: mockUser, session: mockSession }, error: null }),
    signInWithPassword: jest.fn().mockResolvedValue({ data: { user: mockUser, session: mockSession }, error: null }),
    signOut: jest.fn().mockResolvedValue({ error: null }),
    onAuthStateChange: jest.fn().mockReturnValue({
      data: { subscription: { unsubscribe: jest.fn() } }
    })
  },
  from: jest.fn().mockReturnValue({
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({ 
      data: { 
        id: "profile-id", 
        first_name: "Test", 
        last_name: "User",
        role: "guest",
        email_verified: false
      }, 
      error: null 
    }),
    update: jest.fn().mockReturnThis()
  })
};

// Mock the Supabase module
jest.mock("@/integrations/supabase/client", () => ({
  supabase: mockSupabaseClient
}));
