
/* =================================
   1. MOBILE NAVIGATION
================================= */


const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function closeMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isExpanded =
            menuToggle.getAttribute("aria-expanded") === "true";

        if (isExpanded) {
            closeMenu();
        } else {
            navLinks.classList.add("nav-open");
            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute("aria-label", "Close navigation menu");
        }
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
            menuToggle.focus();
        }
    });

    // Close the mobile menu when returning to desktop width.
    window.addEventListener("resize", function () {
        if (window.innerWidth > 600) {
            closeMenu();
        }
    });
}


/* =================================
   2. WAITLIST FORM
================================= */

const waitlistForm = document.querySelector("#waitlist-form");
const emailInput = document.querySelector("#email");
const formMessage = document.querySelector("#form-message");

if (waitlistForm && emailInput && formMessage) {
    waitlistForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = emailInput.value.trim();

        if (!email || !emailInput.validity.valid) {
            formMessage.textContent =
                "Please enter a valid email address.";

            formMessage.classList.remove("success-message");
            formMessage.classList.add("error-message");

            emailInput.focus();
            return;
        }

        formMessage.textContent =
            "Your form looks good! Waitlist registration is not connected yet.";

        formMessage.classList.remove("error-message");
        formMessage.classList.add("success-message");

        console.log("Valid email entered:", email);
    });
}


/* =================================
   3. AUTOMATIC COPYRIGHT YEAR
================================= */

const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


const revealElements = document.querySelectorAll(
    ".feature-card, .step-card, .about-content, .waitlist-content"
);

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });
} else {
    revealElements.forEach(function (element) {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });
}