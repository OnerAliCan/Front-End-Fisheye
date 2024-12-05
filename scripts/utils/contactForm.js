function displayModal(data) {
    console.log(data["name"]);
    const modal = document.getElementById("modal");
    modal.showModal();

    const contactMeName = document.querySelector("#contact-me-name");
    contactMeName.textContent = data["name"];
    // console.log(photographerName);
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.close();
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

        return false;
    } else {
        console.log("prenom ok");
        return true;
    }
}

//nom de famille

function verifyLastName() {
    if (document.getElementById("last").value.length <= 2) {
        console.log("nom pas bon");

        return false;
    } else {
        console.log("nom de famille ok");
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
        return true;
    } else {
        console.log("mail pas bon");
        return false;
    }
}

//nom de famille

function verifyMessage() {
    if (document.getElementById("message").value.length < 1) {
        console.log("Message vide");
        return false;
    } else {
        console.log("message ok");
        return true;
    }
}
