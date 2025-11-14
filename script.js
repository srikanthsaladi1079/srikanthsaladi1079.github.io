// Real-time validation functions
function validateField(field, rules) {
  const value = field.value.trim();
  const errorElement = document.getElementById(field.id + "-error");

  let errorMessage = "";

  if (rules.required && !value) {
    if (field.id === "name") {
      errorMessage = "Name is required";
    } else if (field.id === "email") {
      errorMessage = "Email is required";
    } else if (field.id === "message") {
      errorMessage = "Message is required";
    }
  } else if (rules.minLength && value.length < rules.minLength) {
    if (field.id === "name") {
      errorMessage = "Name must be at least 2 characters";
    } else if (field.id === "message") {
      errorMessage = "Message must be at least 10 characters";
    }
  } else if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errorMessage = "Please enter a valid email address";
    }
  }

  errorElement.textContent = errorMessage;
  field.classList.toggle("error", !!errorMessage);
  return !errorMessage;
}

// Performance detection for particles
function shouldDisableParticles() {
  // Check hardware concurrency (number of CPU cores)
  const cores = navigator.hardwareConcurrency || 2;

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Check device memory (if available)
  const deviceMemory = navigator.deviceMemory || 4;

  // Disable particles if:
  // - User prefers reduced motion
  // - Low CPU cores (< 4)
  // - Low device memory (< 4GB)
  return prefersReducedMotion || cores < 4 || deviceMemory < 4;
}

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem("theme") || "dark";
body.classList.toggle("light-mode", currentTheme === "light");
themeToggle.innerHTML =
  currentTheme === "light"
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  const isLight = body.classList.contains("light-mode");
  themeToggle.innerHTML = isLight
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close menu when clicking on a link
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  }
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Lightbox functionality
function openLightbox(img) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.style.display = "flex";
}

document.getElementById("lightbox-close").addEventListener("click", () => {
  document.getElementById("lightbox").style.display = "none";
});

document.getElementById("lightbox").addEventListener("click", (e) => {
  if (e.target === document.getElementById("lightbox")) {
    document.getElementById("lightbox").style.display = "none";
  }
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  // Performance-based particle loading
  const particlesContainer = document.getElementById("particles-container");
  if (particlesContainer && shouldDisableParticles()) {
    particlesContainer.style.display = "none";
    console.log("Particles disabled for better performance");
  }

  // Real-time validation event listeners for contact form
  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const messageField = document.getElementById("message");

  if (nameField && emailField && messageField) {
    nameField.addEventListener("input", () =>
      validateField(nameField, { required: true, minLength: 2 })
    );
    emailField.addEventListener("input", () =>
      validateField(emailField, { required: true })
    );
    messageField.addEventListener("input", () =>
      validateField(messageField, { required: true, minLength: 10 })
    );
  }
});

// EmailJS initialization
(function () {
  emailjs.init("3bNnxtq_g5EJFb3wM"); // Your Public Key
})();

// Contact form handling with EmailJS
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Validate all fields
  const isNameValid = validateField(document.getElementById("name"), {
    required: true,
    minLength: 2,
  });
  const isEmailValid = validateField(document.getElementById("email"), {
    required: true,
  });
  const isMessageValid = validateField(document.getElementById("message"), {
    required: true,
    minLength: 10,
  });

  if (!isNameValid || !isEmailValid || !isMessageValid) {
    return;
  }

  // Show loading state
  const submitBtn = document.querySelector(".submit-btn");
  const btnText = submitBtn.querySelector(".btn-text");
  const spinner = submitBtn.querySelector(".spinner");
  const originalText = btnText.textContent;
  btnText.textContent = "Sending...";
  spinner.style.display = "inline-block";
  submitBtn.disabled = true;

  // Send email using EmailJS
  emailjs
    .send("service_1jdkxqq", "template_koa5pc1", {
      from_name: name,
      from_email: email,
      message: message,
    })
    .then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        alert("Thank you for your message! I will get back to you soon.");
        document.getElementById("contactForm").reset();
      },
      function (error) {
        console.log("FAILED...", error);
        alert(
          "Sorry, there was an error sending your message. Please try again later."
        );
      }
    )
    .finally(function () {
      // Reset button state
      btnText.textContent = originalText;
      spinner.style.display = "none";
      submitBtn.disabled = false;
    });
});

// Scroll to top functionality
const scrollTopBtn = document.querySelector(".scroll-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
