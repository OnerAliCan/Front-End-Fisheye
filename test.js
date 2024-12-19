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

// Handle option selection
options.addEventListener("click", (e) => {
	if (e.target.tagName === "LI" || e.target.tagName === "li") {
		console.log(e.target.dataset.value);
		const newValue = e.target.dataset.value; // Nouveau texte
		selected.childNodes[0].nodeValue = newValue + " "; // Mettre à jour uniquement le texte
		selected.setAttribute(
			"data-value",
			e.target.getAttribute("data-value")
		);

		options.classList.remove("show");
		selected.classList.toggle("show");
	}
});

// Close dropdown if clicked outside
document.addEventListener("click", (e) => {
	if (!dropdown.contains(e.target)) {
		options.classList.remove("show");
		selected.classList.add("show");
		console.log(selected);
		// chevronIcon.src = "assets/icons/chevron-down.svg";
	}
});
