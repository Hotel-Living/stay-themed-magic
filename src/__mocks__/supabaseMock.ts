
import { Session, User, AuthError } from "@supabase/supabase-js";
import { Profile } from "@/integrations/supabase/types-custom";

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

export const mockProfile: Profile = {
  id: "profile-id",
  first_name: "Test",
  last_name: "User",
  role: "guest",
  email_verified: false,
  avatar_url: null,
  phone: null,
  is_hotel_owner: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

// Create a mock Supabase client
export const mockSupabaseClient = {
  auth: {
    getSession: jest.fn().mockResolvedValue({ data: { session: mockSession }, error: null }),
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
      data: mockProfile, 
      error: null 
    }),
    update: jest.fn().mockReturnThis()
  }),
  functions: {
    invoke: jest.fn().mockResolvedValue({ data: {}, error: null })
  }
};

// Mock the Supabase module
jest.mock("@/integrations/supabase/client", () => ({
  supabase: mockSupabaseClient
}));
