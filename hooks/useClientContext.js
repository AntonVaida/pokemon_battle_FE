import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

export const useClientContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useClientContext must be used within a ClientWrapper');
  }
  return context;
};

export default useClientContext;
