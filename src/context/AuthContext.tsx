
// This file simply re-exports all auth components for backward compatibility
// Unified authentication context - single source of truth
import AuthContext, { useAuth } from './auth/AuthContext';
import { AuthProvider } from './auth/AuthProvider';

export { AuthProvider, useAuth };
export default AuthContext;
