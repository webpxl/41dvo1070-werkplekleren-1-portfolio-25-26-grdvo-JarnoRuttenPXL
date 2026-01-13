(function () {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalMeta = document.getElementById("modal-meta");
    const modalDesc = document.getElementById("modal-desc");

    const cards = document.querySelectorAll(".card");
    const closeTargets = modal.querySelectorAll("[data-close]");

    let lastFocused = null;

    function openModalFromCard(card) {
        lastFocused = document.activeElement;

        const title = card.dataset.title || "";
        const vak = card.dataset.vak || "";
        const img = card.dataset.image || "";
        const desc = card.dataset.description || "";

        modalTitle.textContent = title;
        modalMeta.textContent = vak ? `Vak: ${vak}` : "";
        modalDesc.textContent = desc;

        modalImg.src = img;
        modalImg.alt = title ? `Afbeelding van ${title}` : "Projectafbeelding";

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");

        const closeBtn = modal.querySelector(".modal__close");
        closeBtn?.focus();
    }

    function closeModal() {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");

        modalImg.src = "";
        modalImg.alt = "";

        if (lastFocused && typeof lastFocused.focus === "function") {
            lastFocused.focus();
        }
    }

    cards.forEach((card) => {
        card.addEventListener("click", () => openModalFromCard(card));

        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openModalFromCard(card);
            }
        });
    });

    closeTargets.forEach((el) => el.addEventListener("click", closeModal));

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("is-open")) {
            closeModal();
        }
    });
})();
const contactBtn = document.getElementById("contactBtn");

contactBtn.addEventListener("click", () => {
    const contactSection = document.getElementById("contact");

    if (contactSection) {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        contactSection.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start",
        });
        return;
    }

    window.location.href = "mailto:jarno.rutten@hotmail.be";
});
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

const jrForm = document.getElementById("jrContactForm");
const jrStatus = document.getElementById("jrContactStatus");
const jrSubmit = document.getElementById("jrContactSubmit");

function jrIsValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

jrForm.addEventListener("submit", (e) => {
    e.preventDefault();
    jrStatus.textContent = "";

    const name = jrForm.elements.name.value.trim();
    const email = jrForm.elements.email.value.trim();
    const message = jrForm.elements.message.value.trim();

    if (!name || !email || !message) {
        jrStatus.textContent = "Vul alle velden in aub.";
        return;
    }

    if (!jrIsValidEmail(email)) {
        jrStatus.textContent = "Vul een geldig e-mailadres in.";
        return;
    }

    jrStatus.textContent = "Verzenden...";
    jrSubmit.disabled = true;

    setTimeout(() => {
        jrStatus.textContent = "Bedankt! Ik neem zo snel mogelijk contact met je op.";
        jrForm.reset();
        jrSubmit.disabled = false;
    }, 700);
});