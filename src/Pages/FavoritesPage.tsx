import React, { useState, useEffect } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../context/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';

interface Recipe {
    name: string;
    prepTime: string;
    ingredients: string[];
    instructions: string[];
}

const FavoritesPage: React.FC = () => {
    const [selectedRecipe, setSelectedRecipe] = useState<{ name: string; prepTime: string; ingredients: string[]; instructions: string[] } | null>(null);
    const [favorites, setFavorites] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFavorites = async () => {            
        const user = FIREBASE_AUTH.currentUser
        
        if(!user){
            alert("No user found");
            return;
        }

            try {
                const userRef = doc(FIREBASE_DB, 'users', user.uid);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const favs = userData.favorites ;  

                    const normalizedFavorites = favs.map((recipe: any) => ({
                        name: recipe.title || '',
                        prepTime: recipe.time || '',
                        ingredients: recipe.ingredients || [],
                        instructions: recipe.instructions || []

                    }));
                    setFavorites(normalizedFavorites);
                } else {
                    console.error("No user document found.");
                }
            } catch (error) { 
                console.error("Error fetching favorites:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []); 

    const handleCardClick = (recipe: { name: string; prepTime: string; ingredients: string[]; instructions: string[] }) => {
        setSelectedRecipe(recipe);  
    };

    const closeModal = () => {
        setSelectedRecipe(null);  
    }

    return (
        <div className="flex-1 max-w-screen-lg mx-auto p-10">
            <h2 className="text-2xl font-bold mb-6 flex justify-center">Your Favorite Recipes</h2>
            {loading ? (
                <p>Loading favorites...</p>
            ) : favorites.length > 0 ? (
                <div className=" space-y-4 mt-6">
                    {favorites.map((recipe, index) => (
                        <div key={index} onClick={() => handleCardClick(recipe)}>
                        <RecipeCard
                            key={index}
                            title={recipe.name}
                            time={recipe.prepTime}
                            ingredients={recipe.ingredients}
                            instructions={recipe.instructions}
                        />
                        </div>
                    ))}

                </div>
            ) : (
                <p>No favorites found.</p>
            )}
                {selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={closeModal} />}

        </div>
    );
};

export default FavoritesPage;
