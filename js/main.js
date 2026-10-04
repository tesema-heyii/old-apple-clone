/* ========================================
   RESPONSIVE GLOBAL NAVIGATION
======================================== */

const navigation = document.querySelector(".global-navigation");
const menuButton = document.querySelector(".global-navigation__toggle");

if (navigation && menuButton) {
  // Tell CSS that JavaScript is available.
  document.documentElement.classList.add("has-js");

  // Select every navigation link, not just the first one.
  const navigationLinks = navigation.querySelectorAll(
    ".global-navigation__link",
  );

  // Keep the JavaScript breakpoint aligned with the CSS breakpoint.
  const mobileBreakpoint = window.matchMedia("(max-width: 900px)");

  // One function controls every part of the menu's open/closed state.
  function setMenuState(isOpen) {
    navigation.classList.toggle("is-open", isOpen);

    menuButton.setAttribute("aria-expanded", String(isOpen));

    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
  }

  // Toggle the menu when the button is activated.
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    setMenuState(!isOpen);
  });

  // Close the menu after a navigation link is activated.
  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });

  // Close the menu with Escape and return focus to the button.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        setMenuState(false);
        menuButton.focus();
      }
    }
  });

  // Close the menu when the user clicks outside the navigation.
  document.addEventListener("click", (event) => {
    if (!navigation.contains(event.target)) {
      setMenuState(false);
    }
  });

  // Close the mobile menu when changing to the desktop layout.
  mobileBreakpoint.addEventListener("change", (event) => {
    if (!event.matches) {
      setMenuState(false);
    }
  });
}
