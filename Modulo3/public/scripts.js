const cards = document.querySelectorAll(".card");

for (let card of cards) {
  card.addEventListener("click", () => {
    const contentId = card.getAttribute("id");
    window.location.href = `/courses/${contentId}`;
  });
}
