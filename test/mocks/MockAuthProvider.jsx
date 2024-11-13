import { vi } from 'vitest';
import { AuthContext } from '../../src/services/authProvider';

function MockAuthProvider({ children, value }) {
  const mockValue = { user: value || null, setUser: vi.fn() };

  return (
    <AuthContext.Provider value={mockValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default MockAuthProvider;
