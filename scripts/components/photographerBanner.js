// la fonction bannerTemplate est bien appelée dans photographer.js
// eslint-disable-next-line no-unused-vars
function bannerTemplate(data) {
	const { name, portrait, city, country, tagline } = data;
	const picture = `assets/photographers/${portrait}`;

	function getPhotographerCardDOM() {
		const photographerBanner = document.querySelector(
			".photographer-banner"
		);
		const photographerInformationContainer = document.createElement("div");

		photographerInformationContainer.classList.add(
			"photographer-information-container"
		);

		function generateProfilePicture() {
			const profilePictureContainer = document.createElement("div");
			const profilePicture = document.createElement("img");
			profilePictureContainer.classList.add("profile-picture-container");
			profilePicture.setAttribute("src", picture);
			profilePicture.setAttribute("alt", name);
			profilePictureContainer.appendChild(profilePicture);
			photographerBanner.appendChild(profilePictureContainer);
		}

		function generatePhotographerName() {
			const photographerName = document.createElement("h2");
			photographerName.textContent = name;
			photographerInformationContainer.appendChild(photographerName);
			photographerBanner.appendChild(photographerInformationContainer);
		}

		function generatePhotographerLocation() {
			const photographerLocation = document.createElement("h3");
			photographerLocation.textContent = city + ", " + country;
			photographerInformationContainer.appendChild(photographerLocation);
			photographerBanner.appendChild(photographerInformationContainer);
		}

		function generatePhotographerTagline() {
			const photographerTagline = document.createElement("p");
			photographerTagline.textContent = tagline;
			photographerInformationContainer.appendChild(photographerTagline);
			photographerBanner.appendChild(photographerInformationContainer);
		}

		generatePhotographerName();
		generatePhotographerLocation();
		generatePhotographerTagline();
		generateProfilePicture();
		return photographerBanner;
	}
	return { getPhotographerCardDOM };
}
