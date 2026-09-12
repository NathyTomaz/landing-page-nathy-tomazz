const books = {
  volley: {
    category: "Romance",
    title: "Entre Flashes e Quadras",
    description: "Um livro onde o esporte encontra a moda, misturando o melhor dos dois mundos. Eric e Diana se encantam um pelo outro entre partidas, editorias e uma mistura de sentimentos.",
    buy: "https://www.amazon.com.br/dp/B0H6369T5B"
  }
};

const $ = selector => document.querySelector(selector);
const modal = $("#book-modal");
const nav = $("#nav");
const menuButton = $(".menu-toggle");
const booksGrid = $(".books-grid");

// Atualiza o ano no rodapé
const yearElement = $("#year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

// Abertura do modal sem rolar a página
if (booksGrid) {
  booksGrid.addEventListener("click", event => {
    const button = event.target.closest(".book-button");
    if (!button) return;

    event.preventDefault(); // Garante estabilidade da tela no scroll atual

    const bookKey = button.dataset.book;
    const book = books[bookKey];
    if (!book) return;

    $("#modal-category").textContent = book.category;
    $("#modal-title").textContent = book.title;
    $("#modal-description").textContent = book.description;
    $("#buy-link").href = book.buy;

    if (modal) {
      if (typeof modal.showModal === "function") {
        modal.showModal();
      } else {
        modal.setAttribute("open", "true");
      }
    }
  });
}

// Fechamento do modal
function closeModal() {
  if (!modal) return;
  if (typeof modal.close === "function" && modal.open) {
    modal.close();
  } else {
    modal.removeAttribute("open");
  }
}

$(".modal-close")?.addEventListener("click", closeModal);
$(".modal-back")?.addEventListener("click", closeModal);

modal?.addEventListener("click", event => {
  if (event.target === modal) closeModal();
});

modal?.addEventListener("cancel", event => {
  event.preventDefault();
  closeModal();
});

// Menu Mobile
menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});

nav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
  });
});

// Fechar menu mobile ao clicar fora
document.addEventListener("click", event => {
  if (nav && menuButton && !nav.contains(event.target) && !menuButton.contains(event.target) && nav.classList.contains("open")) {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
  }
});
