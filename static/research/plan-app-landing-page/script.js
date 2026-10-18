document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Close mobile menu on link click
  document.querySelectorAll("#mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
  });

  // Active Nav Link on Scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("header nav a.nav-link");
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // Roadmap Accordion
  const taskCards = document.querySelectorAll(".task-card");
  taskCards.forEach((card) => {
    card.querySelector("button").addEventListener("click", () => {
      const wasOpen = card.classList.contains("open");
      taskCards.forEach((c) => c.classList.remove("open")); // Close all
      if (!wasOpen) {
        card.classList.add("open");
      }
    });
  });

  // File Tree
  const folders = document.querySelectorAll(".file-tree .folder > span");
  folders.forEach((folder) => {
    folder.addEventListener("click", () => {
      folder.parentElement.classList.toggle("open");
    });
  });

  // Flow Diagram Animation on Scroll
  const flowDiagrams = document.querySelectorAll(".flow-diagram");
  const diagramObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          const boxes = entry.target.querySelectorAll(".flow-box");
          const arrows = entry.target.querySelectorAll(".flow-arrow");
          boxes.forEach((box, index) => {
            box.style.transitionDelay = `${index * 0.2}s`;
          });
          arrows.forEach((arrow, index) => {
            arrow.style.transitionDelay = `${0.1 + index * 0.2}s`;
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  flowDiagrams.forEach((diagram) => diagramObserver.observe(diagram));
});
