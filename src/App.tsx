// src/App.tsx
import Sidebar from './components/Sidebar';
import HomePage from './Pages/HomePage';
import FavoritesPage from './Pages/FavoritesPage';
import { Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
 

  return (
    <div className='flex'>
      <Sidebar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='favorites' element={<FavoritesPage />} />
      </Routes>
    </div>
  );
};

export default App;
