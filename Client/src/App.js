import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import Messenger from './components/Messenger';
import AccountProvider from './components/context/AccountProvider';

function App() {
  const clientId="567500571014-c7adv7vai0s0fkp3j96ng5jifn110n8f.apps.googleusercontent.com";
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
        <Messenger/>
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
