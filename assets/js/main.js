// Logica del menu movil
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (menuToggle && mobileMenu) {
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

  // Cerrar menu si hace clic fuera del navbar
  document.addEventListener("click", (e) => {
    if (
      !mobileMenu.contains(e.target) &&
      !menuToggle.contains(e.target) &&
      mobileMenu.classList.contains("open")
    ) {
      mobileMenu.classList.remove("open");
      menuToggle.querySelector(".material-symbols-outlined").textContent = "menu";
    }
  });
}

// ===== ANIMACIONES DE APARICION Y MOVIMIENTO =====

// Observer para fade-in cuando los elementos entran en el viewport
const observerOptions = {
  threshold: 0.15,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Agregar clase de animación
      entry.target.classList.add("reveal");
      
      // Remover y volver a agregar para que se repita la animación
      setTimeout(() => {
        entry.target.style.animation = "none";
        setTimeout(() => {
          entry.target.style.animation = "";
        }, 10);
      }, 50);
    }
  });
}, observerOptions);

// Observar elementos que entren en viewport
document.querySelectorAll(".reveal, .feature-card, .testimonial-card").forEach((el) => {
  observer.observe(el);
});

// ===== ANIMACIONES ESPECIFICAS PARA CARDS =====
// Observer especial para testimonios que se repita
const cardObserverOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Agregar clases de animación
      entry.target.classList.add("fade-in", "scale-in");
      
      // Forzar reflow para reiniciar animación
      void entry.target.offsetWidth;
      
      // No desobservar para permitir re-animaciones
    } else {
      // Cuando sale del viewport, remover clases para que se puedan re-animar
      entry.target.classList.remove("fade-in", "scale-in");
    }
  });
}, cardObserverOptions);

// Aplicar observer a testimonios y cards
document.querySelectorAll(".testimonial-card, .feature-card").forEach((card) => {
  cardObserver.observe(card);
  
  // Agregar evento para cuando termina la animación de entrada
  card.addEventListener("animationend", (e) => {
    // Si termina la animación de testimonial-bounce
    if (e.animationName === "testimonial-bounce") {
      // Agregar animación flotante después
      if (card.classList.contains("testimonial-card")) {
        card.style.animation = "testimonial-float 3s ease-in-out infinite";
      }
    }
  });
});

// ===== FADE-IN PARA IMÁGENES =====
const imageObserverOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -100px 0px",
};

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
      imageObserver.unobserve(entry.target);
    }
  });
}, imageObserverOptions);

// Aplicar fade-in a todas las imágenes
document.querySelectorAll("img").forEach((img) => {
  img.classList.add("fade-in");
  imageObserver.observe(img);
});

document.querySelectorAll(".glass-card img").forEach((img) => {
  img.classList.add("fade-in");
  imageObserver.observe(img);
});

// ===== ANIMACIÓN FLOTANTE PARA IMÁGENES =====
// Agregar clase float a imágenes de mockup
const mockupImages = document.querySelectorAll(
  ".device-mockup, .device-screen"
);
mockupImages.forEach((el, index) => {
  el.classList.add(index % 2 === 0 ? "float" : "float-slow");
});

// Agregar float a imágenes en cards
const cardImages = document.querySelectorAll(".glass-card img, .rounded-2xl");
cardImages.forEach((img) => {
  if (img.tagName === "IMG") {
    img.classList.add("float-fast");
  }
});

// ===== EFECTO PARALLAX EN SCROLL =====
const parallaxElements = document.querySelectorAll(".parallax-element");

window.addEventListener("scroll", () => {
  parallaxElements.forEach((element) => {
    const scrollPosition = window.scrollY;
    const elementPosition = element.getBoundingClientRect().top;
    const yOffset = (scrollPosition - elementPosition) * 0.5;

    element.style.transform = `translateY(${yOffset}px)`;
  });
});

// Alternativamente, usar Intersection Observer para controlar parallax
const parallaxObserverOptions = {
  threshold: 0.5,
};

const parallaxObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("parallax-element");
    }
  });
}, parallaxObserverOptions);

// Aplicar parallax a elementos de imagen
document.querySelectorAll(".image-panel, .image-frame").forEach((el) => {
  parallaxObserver.observe(el);
});

// ===== ANIMACIÓN DINAMICA AL CARGAR LA PÁGINA =====
document.addEventListener("DOMContentLoaded", () => {
  // Animar elementos con delay progresivo
  const animatedElements = document.querySelectorAll(
    "[data-animate], .glass-card, .feature-card, .testimonial-card"
  );

  animatedElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.animation = "fadeInUp 0.8s ease-out forwards";
    }, index * 100);
  });
});

// ===== ANIMACIÓN SMOOTH AL HACER HOVER EN IMÁGENES =====
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("mouseenter", (e) => {
    e.target.style.transform = "scale(1.02)";
    e.target.style.transition = "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
  });

  img.addEventListener("mouseleave", (e) => {
    e.target.style.transform = "scale(1)";
  });
});
