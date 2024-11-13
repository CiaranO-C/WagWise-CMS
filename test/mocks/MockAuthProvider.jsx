import { AuthContext } from '../../src/services/authProvider';
import { mockSetUser } from './mocks';

function MockAuthProvider({ children, value }) {
  const mockValue = { user: value || null, setUser: mockSetUser };

  return (
    <AuthContext.Provider value={mockValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default MockAuthProvider;
