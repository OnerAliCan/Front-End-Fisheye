const dropdown = document.querySelector("#sort-selector-container");
const selected = dropdown.querySelector("#sort-by-text");
const options = dropdown.querySelector("#sort-by-items");
const chevronIcon = selected.querySelector("#chevron-icon"); // L'icône Chevron
selected.classList.toggle("show"); // Fermer le dropdown

// Mettre à jour la valeur de départ sur 'Date'
selected.setAttribute("data-value", "date"); // Valeur par défaut

// Toggle visibility of the dropdown
selected.addEventListener("click", () => {
	selected.classList.remove("show"); // Fermer le dropdown

	options.classList.toggle("show");
});

options.addEventListener("click", (e) => {
	// Remonte dans la hiérarchie DOM pour trouver le parent <li>
	let targetLi = e.target.closest("li");

	if (targetLi) {
		// console.log(targetLi.dataset.value);
		const newValue = targetLi.dataset.value; // Nouveau texte

		// Mettre à jour le texte affiché
		selected.childNodes[0].nodeValue = newValue + " "; // Mettre à jour uniquement le texte
		selected.setAttribute("data-value", newValue);

		// Fermer la liste déroulante
		options.classList.remove("show");
		selected.classList.toggle("show");
	}
});

// Close dropdown if clicked outside
document.addEventListener("click", (e) => {
	if (!dropdown.contains(e.target)) {
		options.classList.remove("show");
		selected.classList.add("show");
		// console.log(selected);
	}
});

{
	/* <img id="chevron-icon-down" src="icon1.svg" alt="Icon" />; */
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
