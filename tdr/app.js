const searchInput = document.querySelector(".input");
const searchForm = document.querySelector(".input-container");
const resultsContainer = document.querySelector(".search-results");


async function searchMeals(query) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    return data.meals;
}

function displaySearchResults(meals) {
  resultsContainer.innerHTML = "";
  meals.forEach(meal => {
      const mealElement = document.createElement("div");
      mealElement.classList.add("meal");
      mealElement.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea}</p>
          
      `;
      mealElement.addEventListener("click", () => {
          window.location.href = `recipe/recipe.html?id=${meal.idMeal}`;
      });
      resultsContainer.appendChild(mealElement);
  });
}


searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchQuery = searchInput.value;
    if (searchQuery.length > 0) {
        searchMeals(searchQuery).then(displaySearchResults);
    }
});


searchInput.addEventListener("input", (e) => {
    const searchQuery = e.target.value;
    if (searchQuery.length > 0) {
        searchMeals(searchQuery).then(displaySearchResults);
    }
});
