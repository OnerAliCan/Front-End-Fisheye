function handleDropdown(medias, selected, options, generateMedia) {
	selected.addEventListener("click", () => {
		selected.classList.remove("show");

		options.classList.toggle("show");
	});
	options.addEventListener("click", (e) => {
		let targetLi = e.target.closest("li");
		if (targetLi) {
			const newValue = targetLi.innerText;
			if (targetLi.dataset.value === "popularity") {
				console.log(initLightbox);
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
	});

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

function closeDropdown(dropdown, options, selected) {
	document.addEventListener("click", (e) => {
		if (!dropdown.contains(e.target)) {
			options.classList.remove("show");
			selected.classList.add("show");
		}
	});
}
