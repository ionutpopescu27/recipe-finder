import  Sidebar  from '../components/Sidebar';
import { Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import FavoritesPage from './FavoritesPage';
import HomePage from './HomePage';
import SettingsPage from './SettingsPage';

const AppStack: React.FC = () => {
    
    return (
        <div className='flex min-h-screen'>
          <Sidebar />
          <main className='flex-1 flex justify-center items-start mt-10 bg-inherit'>
            <Routes>
              <Route path='*' element={<Navigate to='/home' replace />} />
              <Route path='/home' element={<HomePage />}/>
              <Route path='favorites' element={<FavoritesPage />} />
              <Route path='/settings' element={<SettingsPage />} />   
            </Routes>
          </main>
        </div>
      );
    };

export default AppStack;