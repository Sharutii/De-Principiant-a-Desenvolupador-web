window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get('id');
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
        .then(response => response.json())
        .then(data => displayRecipe(data.meals[0]));
};

function displayRecipe(meal) {
    document.getElementById('recipe-title').innerText = meal.strMeal;
    document.getElementById('recipe-image').src = meal.strMealThumb;
    document.getElementById('recipe-instructions').innerText = meal.strInstructions;
    document.getElementById('recipe-video').href = meal.strYoutube;
    document.getElementById('recipe-video').innerText = meal.strYoutube;

    const ingredientsList = document.getElementById('recipe-ingredients');
    ingredientsList.innerHTML = '';

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            const li = document.createElement('li');
            li.innerText = `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`;
            ingredientsList.appendChild(li);
        }
    }
}
