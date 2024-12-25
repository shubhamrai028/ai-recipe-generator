import React, { useState } from 'react';

function App() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/generate-recipe', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: ingredients.split(',') }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setRecipe(data.recipe);
    } catch (error) {
      console.error('Error generating recipe:', error);
      setRecipe('Error generating recipe. Please try again.');
    }
  };

  return (
    <div>
      <h1>Recipe Generator</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="ingredients">Enter Ingredients:</label><br />
        <textarea
          id="ingredients"
          name="ingredients"
          rows="4"
          cols="50"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <br />
        <br />
        <button type="submit">Generate Recipe</button>
      </form>
      <div id="recipe">
        {recipe && <div dangerouslySetInnerHTML={{ __html: recipe }}></div>}
      </div>
    </div>
  );
}

export default App;