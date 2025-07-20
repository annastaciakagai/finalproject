// Token storage keys
const TOKEN_KEY = 'vunahub_auth_token';
const USER_INFO_KEY = 'vunahub_user_info';
const USER_ROLE_KEY = 'vunahub_user_role';

// User roles
export type UserRole = 'farmer' | 'trader' | 'driver' | 'admin';

// User info interface
export interface UserInfo {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  [key: string]: unknown;
}

// Set authentication token
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Get authentication token
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

// Remove authentication token
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

// Set user info
export const setUserInfo = (userInfo: UserInfo): void => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
  localStorage.setItem(USER_ROLE_KEY, userInfo.role);
};

// Get user info
export const getUserInfo = (): UserInfo | null => {
  const userInfoStr = localStorage.getItem(USER_INFO_KEY);
  if (userInfoStr) {
    return JSON.parse(userInfoStr) as UserInfo;
  }
  return null;
};

// Get user role
export const getUserRole = (): UserRole | null => {
  const role = localStorage.getItem(USER_ROLE_KEY) as UserRole | null;
  return role;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken() && !!getUserInfo();
};

// Log out user
export const logout = (): void => {
  removeToken();
  localStorage.removeItem(USER_INFO_KEY);
  localStorage.removeItem(USER_ROLE_KEY);
};

// Redirect based on user role
export const redirectToRoleDashboard = (role: UserRole): string => {
  switch(role) {
    case 'farmer':
      return '/farmer-dashboard';
    case 'trader':
      return '/trader-dashboard';
    case 'driver':
      return '/driver-dashboard';
    case 'admin':
      return '/admin-dashboard';
    default:
      return '/';
  }
};