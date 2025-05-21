import jwtDecode from 'jwt-decode';

interface TokenPayload {
  id: number;
  role: 'Employee' | 'Manager' | 'Admin';
}

export const getUserRole = (): string | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded.role;
  } catch {
    return null;
  }
};
