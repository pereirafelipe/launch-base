const recipes = document.querySelectorAll(".recipe");

for (let i = 0; i < recipes.length; i++) {
  const recipe = recipes[i];
  recipe.addEventListener("click", () => {
    window.location.href = `/recipes/${i}`;
  });
}

const viewLink = document.querySelectorAll(".recipe__link");

for (let i = 0; i < viewLink.length; i++) {
  const link = viewLink[i];
  link.addEventListener("click", () => {
    window.location.href = `/admin/recipes/${i}`;
  });
}

const ingredients = document.querySelector(".ingredients ul");
const preparation = document.querySelector(".preparation ul");
const information = document.querySelector(".information p");

const ing_hidden = document.querySelector("#ing_hidden");
const pre_hidden = document.querySelector("#pre_hidden");
const info_hidden = document.querySelector("#info_hidden");

const AR_D = "arrow_drop_down";
const AR_U = "arrow_drop_up";

function handleArrow(element, item) {
  element.classList.toggle("hidden");

  if (item.innerHTML === AR_D) {
    item.innerHTML = AR_U;
  } else {
    item.innerHTML = AR_D;
  }
}

if (ingredients !== null && ing_hidden !== null) {
  ing_hidden.addEventListener("click", () => {
    handleArrow(ingredients, ing_hidden);
  });
}

if (preparation !== null && pre_hidden !== null) {
  pre_hidden.addEventListener("click", () => {
    handleArrow(preparation, pre_hidden);
  });
}

if (information !== null && info_hidden !== null) {
  info_hidden.addEventListener("click", () => {
    handleArrow(information, info_hidden);
  });
}
