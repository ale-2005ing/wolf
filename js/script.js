
function iniciarPagina() {

  // =========================
  // MENÚ DE NAVEGACIÓN
  // =========================

  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");

  if (navbar && menu) {
    let ultimaPosicion = window.scrollY;

    window.addEventListener("scroll", () => {
      const posicionActual = window.scrollY;

      if (menu.classList.contains("abierto")) {
        ultimaPosicion = posicionActual;
        return;
      }

      if (posicionActual < 80 ||
          posicionActual < ultimaPosicion) {
        navbar.classList.remove("oculto");
      } else if (posicionActual > ultimaPosicion) {
        navbar.classList.add("oculto");
      }

      ultimaPosicion = posicionActual;
    }, { passive: true });

    if (menuToggle) {
      menuToggle.addEventListener("click", () => {
        const abierto = menu.classList.toggle("abierto");
        menuToggle.setAttribute("aria-expanded", abierto);
      });
    }

    document.querySelectorAll("nav a").forEach(enlace => {
      enlace.addEventListener("click", () => {
        menu.classList.remove("abierto");
        menuToggle?.setAttribute("aria-expanded", "false");
      });
    });
  }

  // =========================
  // GALERÍA DE FOTOGRAFÍAS
  // =========================

  const slides = document.querySelectorAll(".slide");
  const puntos = document.querySelectorAll(".punto");
  const anterior = document.querySelector(".anterior");
  const siguiente = document.querySelector(".siguiente");

  console.log("Fotografías encontradas:", slides.length);

  if (slides.length === 0) {
    console.error("No se encontraron elementos .slide");
    return;
  }

  let fotoActual = 0;
  let intervalo;

  function mostrarFoto(indice) {
    fotoActual = (indice + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("activo", i === fotoActual);
    });

    puntos.forEach((punto, i) => {
      punto.classList.toggle("activo", i === fotoActual);
    });

    console.log("Mostrando fotografía:", fotoActual + 1);
  }

  function iniciarGaleria() {
    clearInterval(intervalo);

    if (slides.length > 1) {
      intervalo = setInterval(() => {
        mostrarFoto(fotoActual + 1);
      }, 3000);
    }
  }

  anterior?.addEventListener("click", () => {
    mostrarFoto(fotoActual - 1);
    iniciarGaleria();
  });

  siguiente?.addEventListener("click", () => {
    mostrarFoto(fotoActual + 1);
    iniciarGaleria();
  });

  puntos.forEach((punto, indice) => {
    punto.addEventListener("click", () => {
      mostrarFoto(indice);
      iniciarGaleria();
    });
  });

  mostrarFoto(0);
  iniciarGaleria();

  console.log("Galería de Wolf iniciada correctamente");
}

// Iniciar cuando el HTML esté disponible
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarPagina);
} else {
  iniciarPagina();
}

const palabras = [
  "PRIVADOS",
  "CORPORATIVOS",
  "INSTITUCIONALES",
  "CARROZAS",
];

const textoAnimado = document.getElementById("textoAnimado");

if (textoAnimado) {
  let palabraActual = 0;
  let letraActual = 0;
  let borrando = false;

  function escribir() {
    const palabra = palabras[palabraActual];

    if (!borrando) {
      letraActual++;
      textoAnimado.textContent =
        palabra.substring(0, letraActual);

      if (letraActual === palabra.length) {
        borrando = true;
        setTimeout(escribir, 1800);
        return;
      }
    } else {
      letraActual--;
      textoAnimado.textContent =
        palabra.substring(0, letraActual);

      if (letraActual === 0) {
        borrando = false;
        palabraActual =
          (palabraActual + 1) % palabras.length;
      }
    }

    setTimeout(escribir, borrando ? 60 : 110);
  }

  escribir();
}