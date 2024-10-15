import React from 'react';
import { Heart } from 'lucide-react';

interface RecipeCardProps {
    title: string;
    time: string;
    ingredients: string[];
    instructions: string[];
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, time, ingredients, instructions }) => {
    return (
        <div className='bg-white rounded-lg shadow-lg p-4 flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='text-lg font-semibold'>{title}</h3>
                    <p className='text-sm text-gray-500'>{time}</p>
                </div>
                <Heart size={24} className='text-gray-400 hover:text-red-500 transition-colors cursor-pointer' />
            </div>
            
            {/* <div>
                <h4 className='text-md font-bold'>Ingredients:</h4>
                <ul className='list-disc list-inside'>
                    {ingredients.map((ingredient, index) => (
                        <li key={index} className='text-sm text-gray-600'>{ingredient}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h4 className='text-md font-bold'>Instructions:</h4>
                <ol className='list-decimal list-inside'>
                    {instructions.map((instruction, index) => (
                        <li key={index} className='text-sm text-gray-600'>{instruction}</li>
                    ))}
                </ol>
            </div> */}
        </div>
    );
};

export default RecipeCard;
