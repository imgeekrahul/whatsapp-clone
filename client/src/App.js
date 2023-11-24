import Messenger from "./components/Messenger";

// components
import { GoogleOAuthProvider } from '@react-oauth/google';

// constext API created and wrap to main Application
import AccountProvider from "./components/context/AccountProvider";

function App() {

  const clientId = '331344804958-g02rpmnjnmtutglig6kvgh17nd72bp6c.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
        <Messenger />
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
