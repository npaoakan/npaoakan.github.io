/* Portfolio interactions — kept minimal, no dependencies */

document.addEventListener("DOMContentLoaded", () => {

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
    });
    // Close menu on link click
    links.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }

  // Theme toggle (light / dark) with persistence
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    const root = document.documentElement;
    const syncLabel = () => {
      const isDark = root.getAttribute("data-theme") === "dark";
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
      );
    };
    syncLabel();
    themeToggle.addEventListener("click", () => {
      const isDark = root.getAttribute("data-theme") === "dark";
      if (isDark) {
        root.removeAttribute("data-theme");
      } else {
        root.setAttribute("data-theme", "dark");
      }
      try {
        localStorage.setItem("theme", isDark ? "light" : "dark");
      } catch (e) {}
      syncLabel();
    });
  }

  // Language toggle (EN / ES) — persists choice; CSS handles the actual swap
  const langToggle = document.querySelector(".lang-toggle");
  if (langToggle) {
    const root = document.documentElement;
    const syncLang = () => {
      const isEs = root.getAttribute("lang") === "es";
      langToggle.setAttribute("aria-label", isEs ? "Cambiar a inglés" : "Switch to Spanish");
    };
    syncLang();
    langToggle.addEventListener("click", () => {
      const next = root.getAttribute("lang") === "es" ? "en" : "es";
      root.setAttribute("lang", next);
      try { localStorage.setItem("lang", next); } catch (e) {}
      syncLang();
    });
  }

  // Scroll-reveal: add .fade-in to sections, observe
  const targets = document.querySelectorAll(".section, .hero-portrait, .research-item, .project-card, .personal-tile");
  targets.forEach(el => el.classList.add("fade-in"));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });

  targets.forEach(t => io.observe(t));
});
