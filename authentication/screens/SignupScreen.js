import { createUser } from '../util/auth';
import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  const authCtx = useContext(AuthContext);

  const [isAuthenticating, setAuthenticating] = useState(false);
  const [error, setError] = useState();

  async function signUpHandler({ email, password }){
    setAuthenticating(true);
    try{
      const token = await createUser(email, password);
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
    return <LoadingOverlay message='Signing up...' />;
  }

  if(error && !isAuthenticating){
    return <ErrorOverlay onConfirm={confirmationHandler} message={error} />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
