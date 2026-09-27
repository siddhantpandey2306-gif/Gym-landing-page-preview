/**
 * ==========================================================================
 * [GYM NAME] - MODERN PREMIUM GYM LANDING PAGE
 * Pure Vanilla JavaScript (ES6+)
 * No external libraries or frameworks. 100% Client-Side.
 * ==========================================================================
 */

// ==========================================================================
// GYM CONFIGURATION
// Easily replace these values with your actual gym business details.
// ==========================================================================
const gymConfig = {
  name: "[GYM NAME]",
  // Enter digits only (with country code, e.g. "919999999999" or "15551234567")
  whatsapp: "919999999999", // REPLACE WITH YOUR_WHATSAPP_NUMBER
  phone: "+1 (555) 123-4567",
  email: "info@gymname.com",
  address: "123 Fitness Boulevard, Suite 100, Metro City",
  // Google Maps location link (can be replaced with your actual Google Maps pin)
  mapsUrl: "https://maps.google.com/?q=Modern+Gym+Fitness+Center"
};

// ==========================================================================
// 1. REUSABLE WHATSAPP INTEGRATION
// ==========================================================================
/**
 * Opens WhatsApp in a new tab with an encoded contextual message.
 * @param {string} message - The pre-filled message text.
 */
function sendWhatsApp(message) {
  const cleanNumber = gymConfig.whatsapp.replace(/[^0-9]/g, "");
  const encodedText = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedText}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

// ==========================================================================
// 2. DOM INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initBusinessData();
  initStickyNavbar();
  initMobileMenu();
  initScrollSpy();
  initBackToTop();
  initFAQAccordion();
  initFacilityLightbox();
  initWhatsAppButtons();
  initInquiryForm();
  initScrollReveal();
});

/**
 * Sync dynamic business configuration with displayed placeholders if desired
 */
function initBusinessData() {
  const addressEl = document.getElementById("gymAddressDisplay");
  const phoneEl = document.getElementById("gymPhoneDisplay");
  const emailEl = document.getElementById("gymEmailDisplay");
  const whatsappEl = document.getElementById("gymWhatsappDisplay");
  const directionsBtn = document.getElementById("getDirectionsBtn");

  if (addressEl && gymConfig.address !== "[GYM ADDRESS]") {
    addressEl.textContent = gymConfig.address;
  }
  if (phoneEl && gymConfig.phone !== "[PHONE NUMBER]") {
    phoneEl.textContent = gymConfig.phone;
    phoneEl.setAttribute("href", `tel:${gymConfig.phone.replace(/[^0-9+]/g, "")}`);
  }
  if (emailEl && gymConfig.email !== "[EMAIL ADDRESS]") {
    emailEl.textContent = gymConfig.email;
    emailEl.setAttribute("href", `mailto:${gymConfig.email}`);
  }
  if (whatsappEl && gymConfig.whatsapp !== "YOUR_WHATSAPP_NUMBER") {
    whatsappEl.textContent = `+${gymConfig.whatsapp}`;
  }

  // Google Maps directions button
  if (directionsBtn) {
    directionsBtn.addEventListener("click", () => {
      window.open(gymConfig.mapsUrl, "_blank", "noopener,noreferrer");
    });
  }
}

// ==========================================================================
// 3. STICKY NAVBAR ON SCROLL
// ==========================================================================
function initStickyNavbar() {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // Trigger initial state
}

// ==========================================================================
// 4. MOBILE HAMBURGER MENU & DRAWER
// ==========================================================================
function initMobileMenu() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const drawerCloseBtn = document.getElementById("drawerCloseBtn");
  const drawerOverlay = document.getElementById("drawerOverlay");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");
  const mobileJoinBtn = document.getElementById("mobileJoinBtn");
  const mobileWhatsappBtn = document.getElementById("mobileWhatsappBtn");

  const openDrawer = () => {
    hamburgerBtn.classList.add("is-active");
    hamburgerBtn.setAttribute("aria-expanded", "true");
    hamburgerBtn.setAttribute("aria-label", "Close navigation menu");
    mobileDrawer.classList.add("open");
    mobileDrawer.setAttribute("aria-hidden", "false");
    drawerOverlay.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent page scroll
  };

  const closeDrawer = () => {
    hamburgerBtn.classList.remove("is-active");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    hamburgerBtn.setAttribute("aria-label", "Open navigation menu");
    mobileDrawer.classList.remove("open");
    mobileDrawer.setAttribute("aria-hidden", "true");
    drawerOverlay.classList.remove("active");
    document.body.style.overflow = "";
  };

  if (hamburgerBtn) {
    hamburgerBtn.setAttribute("aria-label", "Open navigation menu");
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.contains("open");
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawer);

  // Close drawer when any mobile nav link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener("click", closeDrawer);
  });

  // Close drawer on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileDrawer && mobileDrawer.classList.contains("open")) {
      closeDrawer();
    }
  });

  // Auto-close drawer on viewport resize to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024 && mobileDrawer && mobileDrawer.classList.contains("open")) {
      closeDrawer();
    }
  });

  if (mobileJoinBtn) {
    mobileJoinBtn.addEventListener("click", () => {
      closeDrawer();
      const membershipSection = document.getElementById("membership");
      if (membershipSection) {
        membershipSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  if (mobileWhatsappBtn) {
    mobileWhatsappBtn.addEventListener("click", () => {
      closeDrawer();
      sendWhatsApp(`Hi, I would like to enquire about the gym membership at ${gymConfig.name}. Please share the available plans and details.`);
    });
  }
}

// ==========================================================================
// 5. ACTIVE NAVIGATION LINK (SCROLL SPY)
// ==========================================================================
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-menu .nav-link");

  const handleScrollSpy = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", handleScrollSpy, { passive: true });
}

// ==========================================================================
// 6. BACK TO TOP BUTTON
// ==========================================================================
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  }, { passive: true });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// ==========================================================================
// 7. FAQ ACCORDION
// ==========================================================================
function initFAQAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items for a clean accordion effect
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          const otherBtn = otherItem.querySelector(".faq-question");
          const otherAnswer = otherItem.querySelector(".faq-answer");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Toggle clicked item
      if (isActive) {
        item.classList.remove("active");
        questionBtn.setAttribute("aria-expanded", "false");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("active");
        questionBtn.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + 30 + "px";
      }
    });
  });

  // Dynamically update open FAQ item heights on viewport resize
  window.addEventListener("resize", () => {
    faqItems.forEach(item => {
      if (item.classList.contains("active")) {
        const answer = item.querySelector(".faq-answer");
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + 30 + "px";
        }
      }
    });
  }, { passive: true });
}

// ==========================================================================
// 8. FACILITIES LIGHTBOX MODAL
// ==========================================================================
function initFacilityLightbox() {
  const facilityCards = document.querySelectorAll(".facility-card");
  const lightbox = document.getElementById("imageLightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");

  if (!lightbox || !lightboxImg) return;

  const openLightbox = (src, title) => {
    lightboxImg.src = src;
    lightboxImg.alt = title;
    if (lightboxCaption) lightboxCaption.textContent = title;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
    setTimeout(() => {
      lightboxImg.src = "";
    }, 300);
  };

  facilityCards.forEach(card => {
    card.addEventListener("click", () => {
      const fullSrc = card.getAttribute("data-img-src") || card.querySelector("img").src;
      const title = card.getAttribute("data-facility-title") || "Gym Facility";
      openLightbox(fullSrc, title);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);

  // Close on backdrop click
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
}

// ==========================================================================
// 9. CONTEXTUAL WHATSAPP BUTTONS
// ==========================================================================
function initWhatsAppButtons() {
  // Navbar Join Button -> scrolls to membership
  const navJoinBtn = document.getElementById("navJoinBtn");
  if (navJoinBtn) {
    navJoinBtn.addEventListener("click", () => {
      const membershipSection = document.getElementById("membership");
      if (membershipSection) {
        membershipSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Hero WhatsApp CTA
  const heroWhatsAppBtn = document.querySelector(".js-whatsapp-hero");
  if (heroWhatsAppBtn) {
    heroWhatsAppBtn.addEventListener("click", () => {
      sendWhatsApp(`Hi, I would like to enquire about joining ${gymConfig.name}. Please share the available plans and timings.`);
    });
  }

  // Floating WhatsApp Button
  const floatingBtn = document.getElementById("floatingWhatsappBtn");
  if (floatingBtn) {
    floatingBtn.addEventListener("click", (e) => {
      e.preventDefault();
      sendWhatsApp(`Hi, I would like to enquire about your gym membership at ${gymConfig.name}.`);
    });
  }

  // Programs Contextual Enquire Buttons
  const programButtons = document.querySelectorAll(".js-program-enquire");
  programButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const programName = btn.getAttribute("data-program") || "Fitness Training";
      sendWhatsApp(`Hi, I would like to enquire about the ${programName} program at ${gymConfig.name}. Please share the details.`);
    });
  });

  // Trainers Contextual Enquire Buttons
  const trainerButtons = document.querySelectorAll(".js-trainer-enquire");
  trainerButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const trainerName = btn.getAttribute("data-trainer") || "Coach";
      sendWhatsApp(`Hi, I am interested in training with ${trainerName} at ${gymConfig.name}. Please share coaching availability and fees.`);
    });
  });

  // Membership Plan Enquire Buttons
  const planButtons = document.querySelectorAll(".js-plan-btn");
  planButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const planName = btn.getAttribute("data-plan") || "Membership Plan";
      sendWhatsApp(`Hi, I would like to know the membership details and pricing for the ${planName} at ${gymConfig.name}.`);
    });
  });

  // Call to Action Banner WhatsApp
  const ctaWhatsAppBtn = document.querySelector(".js-whatsapp-cta");
  if (ctaWhatsAppBtn) {
    ctaWhatsAppBtn.addEventListener("click", () => {
      sendWhatsApp(`Hi, I am ready to start my fitness journey at ${gymConfig.name}. Please share the joining details and offer.`);
    });
  }

  // Contact Info Card WhatsApp Link
  const contactWhatsAppLink = document.querySelector(".js-whatsapp-contact");
  if (contactWhatsAppLink) {
    contactWhatsAppLink.addEventListener("click", (e) => {
      e.preventDefault();
      sendWhatsApp(`Hi, I would like to enquire about the gym membership at ${gymConfig.name}.`);
    });
  }
}

// ==========================================================================
// 10. FRONT-END INQUIRY FORM VALIDATION & WHATSAPP SUBMISSION
// ==========================================================================
function initInquiryForm() {
  const form = document.getElementById("inquiryForm");
  if (!form) return;

  const nameInput = document.getElementById("formName");
  const phoneInput = document.getElementById("formPhone");
  const interestInput = document.getElementById("formInterest");
  const messageInput = document.getElementById("formMessage");

  const nameError = document.getElementById("nameError");
  const phoneError = document.getElementById("phoneError");
  const interestError = document.getElementById("interestError");

  // Real-time error clearing on input
  [nameInput, phoneInput, interestInput].forEach(field => {
    if (!field) return;
    field.addEventListener("input", () => {
      field.classList.remove("input-error");
      const err = field.parentElement.querySelector(".form-error");
      if (err) err.classList.remove("visible");
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    const nameVal = nameInput.value.trim();
    const phoneVal = phoneInput.value.trim();
    const interestVal = interestInput.value;
    const messageVal = messageInput.value.trim();

    // 1. Validate Name
    if (!nameVal || nameVal.length < 2) {
      nameInput.classList.add("input-error");
      if (nameError) nameError.classList.add("visible");
      isValid = false;
    } else {
      nameInput.classList.remove("input-error");
      if (nameError) nameError.classList.remove("visible");
    }

    // 2. Validate Phone (at least 7 digits)
    const phoneDigits = phoneVal.replace(/[^0-9]/g, "");
    if (!phoneVal || phoneDigits.length < 7) {
      phoneInput.classList.add("input-error");
      if (phoneError) phoneError.classList.add("visible");
      isValid = false;
    } else {
      phoneInput.classList.remove("input-error");
      if (phoneError) phoneError.classList.remove("visible");
    }

    // 3. Validate Interest
    if (!interestVal) {
      interestInput.classList.add("input-error");
      if (interestError) interestError.classList.add("visible");
      isValid = false;
    } else {
      interestInput.classList.remove("input-error");
      if (interestError) interestError.classList.remove("visible");
    }

    if (!isValid) return;

    // Construct structured WhatsApp Message
    const formattedMessage = [
      `Hi, I am interested in joining ${gymConfig.name}.`,
      `Name: ${nameVal}`,
      `Phone: ${phoneVal}`,
      `Interested In: ${interestVal}`,
      messageVal ? `Message: ${messageVal}` : `Message: I would like to know the membership fee and schedule a visit.`,
      `Please share the details.`
    ].join("\n");

    // Open WhatsApp
    sendWhatsApp(formattedMessage);

    // Optional: Reset form fields cleanly
    form.reset();
  });
}

// ==========================================================================
// 11. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
// ==========================================================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal-on-scroll");

  if (!("IntersectionObserver" in window)) {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add("revealed"));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target); // Unobserve once animated
      }
    });
  }, {
    root: null,
    threshold: 0.06,
    rootMargin: "0px 0px -15px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));
}
