const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const filterEmpty = document.querySelector(".filter-empty");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const currentYear = document.querySelector("#current-year");
const scrollProgressBar = document.querySelector("#scroll-progress-bar");
const copyEmailButton = document.querySelector("[data-copy-email]");
const copyStatus = document.querySelector(".copy-status");
const emailAddress = "koechobadia97@gmail.com";

function filterProjects(filter) {
  let visibleProjects = 0;

  projectCards.forEach((card) => {
    const categories = card.dataset.category.split(" ");
    const isVisible = filter === "all" || categories.includes(filter);
    card.hidden = !isVisible;
    visibleProjects += Number(isVisible);
  });

  filterEmpty.hidden = visibleProjects !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    filterProjects(filter);
  });
});

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  siteNav.classList.toggle("is-open", !isExpanded);
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  });
});

currentYear.textContent = new Date().getFullYear();

let progressFrame = 0;

function updateScrollProgress() {
  if (progressFrame) {
    return;
  }

  progressFrame = window.requestAnimationFrame(() => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
    scrollProgressBar.style.width = `${Math.min(progress * 100, 100)}%`;
    progressFrame = 0;
  });
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

copyEmailButton.addEventListener("click", async () => {
  copyStatus.textContent = "";
  copyStatus.classList.remove("is-error");

  try {
    await navigator.clipboard.writeText(emailAddress);
    copyStatus.textContent = "Email copied to clipboard.";
  } catch {
    copyStatus.textContent = `Copy unavailable. Email: ${emailAddress}`;
    copyStatus.classList.add("is-error");
  }
});
