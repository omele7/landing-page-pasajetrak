// Logica del menu movil
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  const icon = menuToggle.querySelector(".material-symbols-outlined");
  icon.textContent = mobileMenu.classList.contains("open") ? "close" : "menu";
});

// Cerrar menu al hacer clic en un enlace
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuToggle.querySelector(".material-symbols-outlined").textContent = "menu";
  });
});

// Animacion simple de aparicion al hacer scroll
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
