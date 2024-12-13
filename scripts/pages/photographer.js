async function getPhotographer(urlIdNumber) {
	const response = await fetch("./data/photographers.json");
	const data = await response.json();

	const photographer = data.photographers.find(
		(element) => element.id == urlIdNumber
	);

	if (photographer == undefined) {
		window.location.href = "index.html";
		return;
	}

	const medias = data.media.filter(
		(element) => element.photographerId == urlIdNumber
	);

	return {
		photographer,
		medias,
	};
}

function getParams() {
	const params = new URL(document.location).searchParams;
	const urlId = params.get("id");
	const urlIdNumber = parseInt(urlId, 10);

	return {
		urlIdNumber,
	};
}

function displayData(photographer, medias) {
	const main = document.querySelector("main");
	const mediaSection = document.querySelector(".media-section");

	// Initialiser le compteur global des likes
	let likesTotalNumber = medias.reduce(
		(total, media) => total + media.likes,
		0
	);
	// Fonction pour mettre à jour le compteur global des likes et son affichage
	function updateTotalLikes(change) {
		likesTotalNumber += change;
		document.getElementById(
			"total-likes-container"
		).textContent = `${likesTotalNumber} likes`;
		console.log(`Total des likes mis à jour : ${likesTotalNumber}`);
	}

	// Générer l'en-tête du photographe
	function generateHeader() {
		const headerModel = headerTemplate(photographer);
		headerModel.getPhotographerCardDOM();
	}

	// Générer les prix du photographe
	function generatePrice() {
		const priceModel = priceTemplate(photographer, medias);
		const priceDOM = priceModel.getPriceDOM();
		// Si vous voulez ajouter le prix au DOM, décommentez cette ligne
		// main.appendChild(priceDOM);
	}

	// Générer les médias et les ajouter à l'interface
	function generateMedia() {
		medias.forEach((mediaData, index) => {
			const mediaModel = mediaTemplate(
				mediaData,
				index,
				medias.length,
				updateTotalLikes // On passe la fonction de mise à jour globale
			);

			const mediaDOM = mediaModel.getMediaDOM();
			mediaSection.appendChild(mediaDOM); // Ajouter chaque média au DOM
		});
	}

	// Appel des fonctions pour générer les différentes parties
	generateHeader();
	generatePrice();
	generateMedia(); // Génère et affiche les médias

	// Afficher le compteur global des likes au chargement
	updateTotalLikes(0); // Initialise le total des likes dans l'affichage
}

function initModal(photographer) {
	document
		.getElementById("display-modal")
		.addEventListener("click", () => displayModal());
	document.querySelector("#contact-me-name").textContent =
		photographer["name"];
}

function initMedias(medias) {
	const mediaContainerArray =
		document.getElementsByClassName("media-container");

	const mediaContainerArrayLength = mediaContainerArray.length;

	for (let i = 0; i < mediaContainerArrayLength; i++) {
		mediaContainerArray[i].addEventListener("click", () => {
			const lightboxMediaContainer =
				document.getElementById("lightbox-img");

			lightboxMediaContainer.innerHTML = "";

			let currentIndex = i;
			const lightbox = document.getElementById("lightbox");
			const lightboxResult = generateLightbox(medias[i]);

			lightboxResult.getLightboxDOM(
				lightbox,
				medias,
				medias[currentIndex],
				currentIndex,
				lightboxMediaContainer
			);
			lightbox.showModal();

			document
				.getElementById("left-arrow-img")
				.addEventListener("click", () => {
					swipeLeft();
				});

			document.addEventListener("keydown", (event) => {
				if (event.key === "ArrowLeft") {
					swipeLeft();
				}
			});

			function swipeLeft() {
				lightboxMediaContainer.innerHTML = "";

				currentIndex = getPreviousImg(
					currentIndex,
					mediaContainerArrayLength
				);

				const updatedLightboxResult = generateLightbox(
					medias[currentIndex]
				);
				updatedLightboxResult.getLightboxDOM(
					lightbox,
					medias,
					medias[currentIndex],
					currentIndex,
					lightboxMediaContainer
				);
			}

			function getPreviousImg(value, mediaContainerArrayLength) {
				value--;

				if (value < 0) {
					value = mediaContainerArrayLength - 1;
				}

				return value;
			}

			document
				.getElementById("right-arrow-img")
				.addEventListener("click", () => {
					swipeRight();
				});

			document.addEventListener("keydown", (event) => {
				if (event.key === "ArrowRight") {
					swipeRight();
				}
			});

			function swipeRight() {
				lightboxMediaContainer.innerHTML = "";

				currentIndex = getNextImg(
					currentIndex,
					mediaContainerArrayLength
				);

				const updatedLightboxResult = generateLightbox(
					medias[currentIndex]
				);
				updatedLightboxResult.getLightboxDOM(
					lightbox,
					medias,
					medias[currentIndex],
					currentIndex,
					lightboxMediaContainer
				);
			}

			function getNextImg(value, mediaContainerArrayLength) {
				value++;

				if (value > mediaContainerArrayLength - 1) {
					value = 0;
				}

				return value;
			}
		});
	}
}

async function init() {
	const { urlIdNumber } = getParams();
	const { photographer, medias } = await getPhotographer(urlIdNumber);
	displayData(photographer, medias);
	initMedias(medias);
	initModal(photographer);
}

window.onload = async function () {
	await init();
};
