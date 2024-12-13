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
	const mediaArrayLength = medias.length;

	function generateHeader() {
		const headerModel = headerTemplate(photographer);
		headerModel.getPhotographerCardDOM();
	}

	function generatePrice() {
		const priceModel = priceTemplate(photographer, medias);
		const priceDOM = priceModel.getPriceDOM();
		// main.appendChild(priceDOM);
	}

	function getTotalLikes() {
		let likesNumber = medias.map((media) => media.likes);
		let totalLikes = 0;
		likesNumber.forEach((likeValue) => {
			totalLikes += likeValue;
		});
		return totalLikes;
	}

	function generateMedia() {
		const likesTotalNumber = getTotalLikes();
		medias.forEach((mediaData, index) => {
			const mediaModel = mediaTemplate(
				mediaData,
				index,
				mediaArrayLength,
				likesTotalNumber
			);

			const mediaDOM = mediaModel.getMediaDOM();
			mediaSection.appendChild(mediaDOM);
			//main.appendChild(mediaSection);
		});
	}

	generateHeader();
	generatePrice();
	generateMedia();
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
