import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';


const recipess = [
    { name: 'Mashed potatoes', prepTime: '20 min', ingredients:['pula mea pe paine', 'pula'], instructions:['o iei si o mananci','pula'] },
    { name: 'Grilled Chicken', prepTime: '30 min', ingredients:['pula mea pe paine', 'pula'], instructions:['o iei si o mananci','pula'] },
];

const HomePage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [recipes, setRecipes] = useState<Array<{ name: string; prepTime: string; ingredients: string[]; instructions: string[] }>>([]);
    const [loading, setLoading] = useState<boolean>(false);  // New loading state
    const [error, setError] = useState<string | null>(null);  // New error state

    const searchRecipes = async () => {
        if (!searchTerm) return; // If no search term is entered, do nothing

        setLoading(true);  // Set loading to true when search begins
        setError(null);    // Clear previous errors

        try {
            console.log("Searchterm is: ", searchTerm);
            const response = await fetch(`http://localhost:5000/api/getRecipes?search=${encodeURIComponent(searchTerm)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
 
            if (!response.ok) {
                throw new Error('Error fetching recipes');
            }

            const data = await response.json();
            setRecipes(data.recipes);  // Set recipes to the fetched data
            console.log("Data after fetching: ", recipes)

            setTimeout(() => {
                console.log('Recipes after state update:', recipes);
            }, 0);

        } catch (error) {
            console.error('Error fetching recipes:', error);
            setError('Failed to fetch recipes');  // Set an error message
        } finally {
            setLoading(false);  // Set loading to false when search is complete
        }
    };

    useEffect(() => {
        console.log("Recipes are: ", recipes)
    }, [recipes]);

    return (
        <div className='bg-[#faf9fb] p-10 flex-1'>
            <div  className='max-w-screen-lg mx-auto'>
                <form className='flex justify-center items-center mx-auto my-10 w-full max-w-lg'>
                    <label className='input shadow-md flex items-center gap-2'></label>
                    <input type="text" 
                           className='text-sm md:text-md grow py-3 px-4 w-full border rounded-l-full shadow-md' 
                           placeholder='What do you want to eat today?'
                           onChange={(e)=>{
                                 setSearchTerm(e.target.value);
                           }}/>
                    <button 
                        type='button' 
                        className='bg-black text-white px-4 py-3 rounded-r-full flex items-center justify-center shadow-md'
                        onClick={searchRecipes}>
                        <Search size={20} />
                    </button>
                </form>               
                
                <div className='space-y-4 mt-6'>
                    {loading && <p>Loading recipes...</p>} {/* Show a loading message while fetching */}
                    {error && <p>{error}</p>} {/* Show error message if something goes wrong */}
                 
                {!loading && !error && recipes.length > 0 ? (
                        recipes.map((recipe, index) => (
                            <RecipeCard
                                key={index}
                                title={recipe.name}
                                time={recipe.prepTime}
                                ingredients={recipe.ingredients}
                                instructions={recipe.instructions}
                            />
                        ))
                    ) : !loading && !error && recipes.length === 0 ? (
                        <p>No recipes found.</p>
                    ) : null}
                       
                </div>
            </div>
        </div>
    );
};

export default HomePage;