function displayModal() {
	document.getElementById("modal").showModal();
}

function closeModal() {
	const modal = document.getElementById("modal");
	modal.close();

	const lightboxModal = document.getElementById("lightbox");

	lightboxModal.close();
}

// function validate

function validate() {
	var formValid = true;
	if (!verifyFirstName()) {
		formValid = false;
	}
	if (!verifyLastName()) {
		formValid = false;
	}
	if (!verifyEmail()) {
		formValid = false;
	}
	if (!verifyMessage()) {
		formValid = false;
	}

	if (formValid) {
		// document.forms["reserve"].reset();
		closeModal();
	}
	return false;
}

const formData = document.querySelectorAll(".formData");

// prénom

function verifyFirstName() {
	if (document.getElementById("first").value.length <= 2) {
		console.log("prénom pas bon");
		formData[0].setAttribute(
			"data-error",
			"Le prénom doit comporter au moins 2 caractères."
		);
		formData[0].setAttribute("data-error-visible", "true");

		return false;
	} else {
		console.log("prenom ok");
		formData[0].removeAttribute("data-error");
		formData[0].setAttribute("data-error-visible", "false");
		return true;
	}
}

//nom de famille

function verifyLastName() {
	if (document.getElementById("last").value.length <= 2) {
		console.log("nom pas bon");
		formData[1].setAttribute(
			"data-error",
			"Le nom doit comporter au moins 2 caractères."
		);
		formData[1].setAttribute("data-error-visible", "true");
		return false;
	} else {
		console.log("nom de famille ok");
		formData[1].removeAttribute("data-error");
		formData[1].setAttribute("data-error-visible", "false");
		return true;
	}
}
//Email

function verifyEmail() {
	if (
		document
			.getElementById("email")
			.value.match(
				/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,63}$/
			)
	) {
		console.log("mail ok");
		formData[2].removeAttribute("data-error");
		formData[2].setAttribute("data-error-visible", "false");
		return true;
	} else {
		console.log("mail pas bon");
		formData[2].setAttribute(
			"data-error",
			"Le format de l'adresse e-mail est incorrect."
		);
		formData[2].setAttribute("data-error-visible", "true");
		return false;
	}
}

//message

function verifyMessage() {
	if (document.getElementById("message").value.length < 1) {
		console.log("Message vide");
		formData[3].setAttribute(
			"data-error",
			"Votre message ne peut pas être vide."
		);
		formData[3].setAttribute("data-error-visible", "true");
		return false;
	} else {
		console.log("message ok");
		formData[3].removeAttribute("data-error");
		formData[3].setAttribute("data-error-visible", "false");

		return true;
	}
}
