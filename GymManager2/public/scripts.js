const currentPage = location.pathname;
const menuItems = document.querySelectorAll("header .header__links a");

for (const item of menuItems) {
  if (currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active");
  }
}

function handlePaginate(selectedPage, totalPages) {
  let oldPage,
    pages = [];

  for (let currentPage = 0; currentPage <= totalPages; currentPage++) {
    const firtAndLastPage = currentPage == 1 || currentPage == totalPages;
    const pagesAfterSelectedPage = currentPage <= selectedPage + 2;
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 2;

    if (
      firtAndLastPage ||
      (pagesBeforeSelectedPage && pagesAfterSelectedPage)
    ) {
      if (oldPage && currentPage - oldPage > 2) {
        pages.push("...");
      }

      if (oldPage && currentPage - oldPage == 2) {
        pages.push(oldPage + 1);
      }

      if (currentPage != 0) pages.push(currentPage);

      oldPage = currentPage;
    }
  }

  return pages;
}

const pagination = document.querySelector(".pagination");
const page = +pagination.dataset.page;
const total = +pagination.dataset.total;
const filter = +pagination.dataset.filter;

const pages = handlePaginate(page, total);

let elements = "";

for (let page of pages) {
  if (String(page).includes("...")) {
    elements += `<span>${page}</span>`;
  } else {
    if (filter) {
      elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`;
    } else {
      elements += `<a href="?page=${page}">${page}</a>`;
    }
  }
}

pagination.innerHTML = elements;
