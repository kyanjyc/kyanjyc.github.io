// Keep links to the earlier version of the portfolio working.
if (document.body.classList.contains("home-page")) {
  const legacyPages = {
    "#/work": "work.html",
    "#/about": "about.html",
    "#/contact": "contact.html",
    "#/project/7-sins": "projects/7-sins.html",
    "#/project/facet": "projects/facet.html",
    "#/project/fortune-stones": "projects/fortune-stones.html",
    "#/project/my-hand": "projects/my-hand.html",
    "#/project/product-studies": "projects/product-studies.html",
    "#/project/kaishu-latin": "projects/kaishu-latin.html",
  };
  const destination = legacyPages[window.location.hash];
  if (destination) window.location.replace(destination);
}

document.querySelectorAll(".work-card").forEach((card) => {
  card.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "mouse") return;
    const direction = Math.random() < 0.5 ? -1 : 1;
    const degrees = direction * (1.25 + Math.random() * 1.75);
    card.style.setProperty("--card-angle", `${degrees.toFixed(2)}deg`);
  });
});

const imageDialog = document.querySelector(".image-dialog");
if (imageDialog && typeof imageDialog.showModal === "function") {
  const dialogImage = imageDialog.querySelector("img");
  let activeLink;
  document.querySelectorAll("[data-gallery-image]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      activeLink = link;
      dialogImage.src = link.href;
      dialogImage.alt = link.querySelector("img").alt;
      imageDialog.showModal();
    });
  });
  imageDialog.addEventListener("click", (event) => {
    if (event.target === imageDialog) imageDialog.close();
  });
  imageDialog.addEventListener("close", () => {
    dialogImage.removeAttribute("src");
    activeLink?.focus();
  });
}

const specimen = document.querySelector("#specimen-input");
if (specimen) {
  specimen.addEventListener("input", () => {
    const start = specimen.selectionStart;
    const beforeCursor = specimen.value.slice(0, start);
    const filter = (text) => text.toUpperCase().replace(/[^A-Z ]/g, "");
    const filtered = filter(specimen.value);
    if (filtered !== specimen.value) {
      specimen.value = filtered;
      const cursor = filter(beforeCursor).length;
      specimen.setSelectionRange(cursor, cursor);
    }
  });
}
