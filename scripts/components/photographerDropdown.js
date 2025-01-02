/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
function handleDropdown(medias, selected, options, generateMedia) {
  selected.addEventListener("click", initDropdown);
  selected.addEventListener("keydown", initDropdown);

  function initDropdown(event) {
    if (event.type === "click" || event.key === "Enter") {
      selected.classList.remove("show");
      options.classList.toggle("show");
    }
  }

  options.addEventListener("click", selectDropdownItem);
  options.addEventListener("keydown", selectDropdownItem);

  function selectDropdownItem(event) {
    if (event.type === "click" || event.key === "Enter") {
      let targetLi = event.target.closest("li");
      if (targetLi) {
        const newValue = targetLi.innerText;
        if (targetLi.dataset.value === "popularity") {
          sortMediabyLikes(medias);
          generateMedia(medias);
          initLightbox(medias);
        } else if (targetLi.dataset.value === "date") {
          sortMediabyDate(medias);
          generateMedia(medias);
          initLightbox(medias);
        } else if (targetLi.dataset.value === "title") {
          sortMediaByName(medias);
          generateMedia(medias);
          initLightbox(medias);
        }

        // Mettre à jour le texte affiché
        selected.childNodes[0].nodeValue = newValue + " ";
        selected.setAttribute("data-value", newValue);
        // Fermer la liste déroulante
        options.classList.remove("show");
        selected.classList.toggle("show");
      }
    }
  }

  const iconDown = document.getElementById("chevron-icon-down");
  const iconUp = document.getElementById("chevron-icon-up");
  const textSortBy = document.getElementById("sort-by-text");
  const popularityItem = document.getElementById("popularity-item");

  textSortBy.addEventListener("mouseenter", () => {
    iconDown.src = "assets/icons/chevron-down-black.svg";
  });

  textSortBy.addEventListener("mouseleave", () => {
    iconDown.src = "assets/icons/chevron-down.svg";
  });

  popularityItem.addEventListener("mouseenter", () => {
    iconUp.src = "assets/icons/chevron-up-black.svg";
  });

  popularityItem.addEventListener("mouseleave", () => {
    iconUp.src = "assets/icons/chevron-up.svg";
  });
}

function handleDropdownClose(dropdown, options, selected) {
  document.addEventListener("click", closeDropdown);
  document.addEventListener("keydown", closeDropdown);

  function closeDropdown(event) {
    if (event.type === "click" || event.key === "Enter") {
      if (!dropdown.contains(event.target)) {
        options.classList.remove("show");
        selected.classList.add("show");
      }
    }
  }
}
