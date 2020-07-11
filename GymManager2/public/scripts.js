const currentPage = location.pathname;
const menuItems = document.querySelectorAll("header .header__links a");

for (const item of menuItems) {
  if (currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active");
  }
}

let totalPages = 20,
  selectedPage = 10,
  oldPage,
  pages = [];

for (let currentPage = 0; currentPage <= totalPages; currentPage++) {
  const firtAndLastPage = currentPage == 1 || currentPage == totalPages;
  const pagesAfterSelectedPage = currentPage <= selectedPage + 2;
  const pagesBeforeSelectedPage = currentPage >= selectedPage - 2;

  if (firtAndLastPage || (pagesBeforeSelectedPage && pagesAfterSelectedPage)) {
    if (oldPage && currentPage - oldPage > 2) {
      pages.push("...");
    }

    if (oldPage && currentPage - oldPage == 2) {
      pages.push(oldPage + 1);
    }
    pages.push(currentPage);

    oldPage = currentPage;
  }
}

console.log(pages);
