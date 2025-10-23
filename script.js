const serchInput = document.getElementById("searchInput");
const btn = document.getElementById("searchBtn");
const result = document.getElementById("result");

btn.addEventListener("click",()=>{
    const query = serchInput.value.trim();
    if(query === ""){
        result.innerHTML = "<p>Please enter a recipe name!</p>";
        return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s= ${query}`)
    .then(response => response.json())
    .then(data =>{
        if(!data.meals){
            result.innerHTML = "<p>No recipe found. Try another name!</p>";
        return;
        }

        const meal = data.meals[0];
      const ingredients = [];

      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient) {
          ingredients.push(`${ingredient} - ${measure}`);

        
        }

      }
      result.innerHTML = `
        <div class="meal">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h2>${meal.strMeal}</h2>
          <h3>Category: ${meal.strCategory}</h3>
          <div class="ingredients">
            <h4>Ingredients:</h4>
            <ul>
              ${ingredients.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
          <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
        </div>
      `;
    })
    .catch(error => {
      result.innerHTML = "<p>Something went wrong! Please try again later.</p>";
      console.error(error);
    });

})