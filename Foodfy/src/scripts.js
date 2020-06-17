const modalOverlay = document.querySelector(".modal__overlay");
const recipes = document.querySelectorAll(".recipe");

for (let recipe of recipes) {
  recipe.addEventListener("click", () => {
    const contenId = handleId(recipe);
    const title = recipe.querySelector("h3").innerText;
    const author = recipe.querySelector("p").innerText;
    modalOverlay.classList.add("active");
    modalOverlay.querySelector("img").src = `./assets/${contenId}.png`;
    modalOverlay.querySelector("h2").innerText = title;
    modalOverlay.querySelector("p").innerText = author;
  });
}

document.querySelector(".close__modal").addEventListener("click", () => {
  modalOverlay.classList.remove("active");
  modalOverlay.querySelector("img").src = "";
  modalOverlay.querySelector("h2").innerText = "";
  modalOverlay.querySelector("p").innerText = "";
});

function handleId(recipe) {
  const contenId = recipe.getAttribute("id");
  const a = contenId.split("_");
  if (a.length === 2) {
    return a[1];
  }
  return contenId;
}
