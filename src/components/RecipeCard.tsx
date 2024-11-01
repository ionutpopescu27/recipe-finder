import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { FIREBASE_DB, FIREBASE_AUTH } from '../context/Firebase';
import { useLocation } from 'react-router-dom';

interface RecipeCardProps {
    title: string;
    time: string;
    ingredients: string[];
    instructions: string[];
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, time, ingredients, instructions }) => {

    const location = useLocation();
    const isFavorite = location.pathname === '/favorites';
    const [isDeleted, setIsDeleted] = useState<boolean>(false);

    const handleAddToFavorites = async (e: React.MouseEvent) => {

        e.stopPropagation();

        const user = FIREBASE_AUTH.currentUser;
        if (!user) {
            alert("You need to log in to manage your favorites!");
            return;
        }
        
        const favoriteRecipe = {
            title,
            time,
            ingredients,
            instructions
        };

        if(!isFavorite) {
            try{    
                const userRef = doc(FIREBASE_DB, 'users', user.uid);

                await updateDoc(userRef, {
                    favorites: arrayUnion(favoriteRecipe)
                });
                alert('Recipe added to favorites!');
            }catch(error){
                console.error('Error adding recipe to favorites:', error);
                alert('Failed to add recipe to favorites');
            }
        } else{
            try{    
                const userRef = doc(FIREBASE_DB, 'users', user.uid);

                await updateDoc(userRef, {
                    favorites: arrayRemove(favoriteRecipe)
                });
                alert('Recipe removed from favorites!');
                setIsDeleted(true);
            }catch(error){
                console.error('Error removing recipe from favorites:', error);
                alert('Failed to remove recipe from favorites');
            }
        }
    };

    if(isDeleted) {
        return null;
    }

    return (
        <div className='bg-white rounded-lg shadow-lg p-4 flex flex-col gap-4 hover:bg-gray-200 transition-colors duration-200s'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='text-lg font-semibold'>{title}</h3>
                    <p className='text-sm text-gray-500'>{time}</p>
                </div>
                <Heart 
                    size={24} 
                    className={`${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-500 transition-colors'} cursor-pointer`}
                    onClick={handleAddToFavorites} 
                />
            </div>
        </div>
    );
};

export default RecipeCard;
