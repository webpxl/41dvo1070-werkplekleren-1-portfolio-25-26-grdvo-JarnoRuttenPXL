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