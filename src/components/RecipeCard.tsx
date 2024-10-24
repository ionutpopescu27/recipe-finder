import React from 'react';
import { Heart } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../context/Firebase';

interface RecipeCardProps {
    title: string;
    time: string;
    ingredients: string[];
    instructions: string[];
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, time, ingredients, instructions }) => {

    const handleAddToFavorites = async (e: React.MouseEvent) => {

        e.stopPropagation();
        
        const favoriteRecipe = {
            title,
            time,
            ingredients,
            instructions
        };

        try{    
            await setDoc(doc(FIREBASE_DB, 'testingFavorites', title), favoriteRecipe);
            alert('Recipe added to favorites!');
        }catch(error){
            console.error('Error adding recipe to favorites:', error);
            alert('Failed to add recipe to favorites');
        }
    };


    return (
        <div className='bg-white rounded-lg shadow-lg p-4 flex flex-col gap-4 hover:bg-gray-200 transition-colors duration-200s'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='text-lg font-semibold'>{title}</h3>
                    <p className='text-sm text-gray-500'>{time}</p>
                </div>
                <Heart 
                    size={24} 
                    className='text-gray-400 hover:text-red-500 transition-colors cursor-pointer'
                    onClick={handleAddToFavorites} 
                />
            </div>
        </div>
    );
};

export default RecipeCard;
