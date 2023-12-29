import { useState, useContext } from 'react';
import { login } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import AuthContent from '../components/Auth/AuthContent';
import ErrorOverlay from '../components/ui/ErrorOverlay';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {
  const authCtx = useContext(AuthContext);

  const [isAuthenticating, setAuthenticating] = useState(false);
  const [error, setError] = useState();

  async function loginHandler({ email, password }){
    setAuthenticating(true);
    try{
      const token = await login(email, password);
      authCtx.authenticate(token);

    }
    catch (error){
      setError(error.message);
      setAuthenticating(false);
    }

  }

  function confirmationHandler(){
    setError(null);
  }

  if(isAuthenticating){
    return <LoadingOverlay message='Logging in...' />;
  }

  if(error && !isAuthenticating){
    return <ErrorOverlay onConfirm={confirmationHandler} message={error} />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
