import React from 'react';

interface RecipeModalProps {
    recipe: {
        name: string;
        prepTime: string;
        ingredients: string[];
        instructions: string[];
    } | null;
    onClose: () => void;  // Callback to close the modal
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
    if (!recipe) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-3/4 md:w-1/2 max-h-screen overflow-y-auto">
                <button className="absolute top-2 right-4 text-gray-900 hover:text-gray-900" onClick={onClose}>
                    X
                </button>
                <h2 className="text-2xl font-bold mb-4">{recipe.name}</h2>
                <p className="text-sm text-gray-600 mb-4">Prep Time: {recipe.prepTime}</p>
                <div className="mb-4">
                    <h3 className="font-semibold">Ingredients</h3>
                    <ul className="list-disc pl-4">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold">Instructions</h3>
                    <ol className="list-decimal pl-4">
                        {recipe.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default RecipeModal;
