const recipes = document.querySelectorAll(".recipe");

for (let i = 0; i < recipes.length; i++) {
  const recipe = recipes[i];
  recipe.addEventListener("click", () => {
    window.location.href = `/recipes/${i}`;
  });
}
