import React from 'react';
import { FIREBASE_AUTH } from '../context/Firebase';
import { signOut } from 'firebase/auth';

const SettingsPage: React.FC = () => {
    const handleLogout = async () => {
        try {
            await signOut(FIREBASE_AUTH);  
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="text-center ">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Logout
            </button>
        </div>
    );
};

export default SettingsPage;
