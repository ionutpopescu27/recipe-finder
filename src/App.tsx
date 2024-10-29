import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './context/Firebase';
import AuthStack from './Pages/AuthStack';
import AppStack from './Pages/AppStack';
import {User} from 'firebase/auth';
import { useNavigate} from 'react-router-dom';

const App: React.FC = () => {
 
  const [user, setUser] = useState<User|null>(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
        setUser(currentUser);
        setLoading(false);

        if(currentUser){
          nav('/home', {replace: true});
        }
    });
    return () => unsubscribe();
    }, []);


    if (loading) return <p>Loading...</p>;

    return user ? <AppStack /> : <AuthStack />;
};

export default App;
