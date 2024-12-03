function headerTemplate(data) {
    const { name, id, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;

    function getPhotographerCardDOM() {
        const photographHeader = document.querySelector(".photograph-header");
        const photographerInformationContainer = document.createElement("div");

        photographerInformationContainer.classList.add(
            "photographer-information-container"
        );

        function generateProfilePicture() {
            const profilePictureContainer = document.createElement("div");
            const profilePicture = document.createElement("img");
            profilePictureContainer.classList.add("profile-picture-container");
            profilePicture.setAttribute("src", picture);
            profilePictureContainer.appendChild(profilePicture);
            photographHeader.appendChild(profilePictureContainer);
        }

        function generatePhotographerName() {
            const photographerName = document.createElement("h2");
            photographerName.textContent = name;
            photographerInformationContainer.appendChild(photographerName);
            photographHeader.appendChild(photographerInformationContainer);
        }

        function generatePhotographerLocation() {
            const photographerLocation = document.createElement("h3");
            photographerLocation.textContent = city + ", " + country;
            photographerInformationContainer.appendChild(photographerLocation);
            photographHeader.appendChild(photographerInformationContainer);
        }

        function generatePhotographerTagline() {
            const photographerTagline = document.createElement("p");
            photographerTagline.textContent = tagline;
            photographerInformationContainer.appendChild(photographerTagline);
            photographHeader.appendChild(photographerInformationContainer);
        }

        generatePhotographerName();
        generatePhotographerLocation();
        generatePhotographerTagline();
        generateProfilePicture();
        return photographHeader;
    }
    return { getPhotographerCardDOM };
}
