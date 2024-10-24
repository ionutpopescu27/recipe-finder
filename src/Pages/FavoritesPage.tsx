import React, { useState, useEffect } from 'react';
import { FIREBASE_DB } from '../context/Firebase';
import { collection, getDocs } from 'firebase/firestore';
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
            

            try {
                const querySnapshot = await getDocs(collection(FIREBASE_DB, "testingFavorites"));
                const favs: Recipe[] = querySnapshot.docs.map(doc => ({
                    name: doc.data().title,
                    prepTime: doc.data().time,
                    ingredients: doc.data().ingredients,
                    instructions: doc.data().instructions,
                }));
                setFavorites(favs);
                console.log("Favorites:", favs)    
            } catch (error) { 
                console.error("Error fetching favorites:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []); 

    const handleCardClick = (recipe: { name: string; prepTime: string; ingredients: string[]; instructions: string[] }) => {
        setSelectedRecipe(recipe);  // Open the modal with the selected recipe
    };

    const closeModal = () => {
        setSelectedRecipe(null);  // Close the modal
    }

    return (
        <div className="p-10">
            <h2 className="text-2xl font-bold mb-6">Your Favorite Recipes</h2>
            {loading ? (
                <p>Loading favorites...</p>
            ) : favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
