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
function displayData(photographer, medias, likesTotalNumber) {
	const mediaSection = document.querySelector(".media-section");

	function generateBanner() {
		const bannerModel = bannerTemplate(photographer);
		bannerModel.getPhotographerCardDOM();
	}

	function generatePrice() {
		const priceModel = priceTemplate(photographer, medias);
		const priceDOM = priceModel.getPriceDOM();
	}

	function generateMedia(medias) {
		mediaSection.innerHTML = "";
		medias.forEach((mediaData, index) => {
			const mediaModel = mediaTemplate(
				medias,
				mediaData,
				index,
				medias.length,
				updateTotalLikes,
				likesTotalNumber
			);

			const mediaDOM = mediaModel.getMediaDOM();

			mediaSection.appendChild(mediaDOM);
		});
	}

	const dropdown = document.querySelector("#sort-selector-container");
	const selected = dropdown.querySelector("#sort-by-text");
	const options = dropdown.querySelector("#sort-by-items");
	selected.classList.toggle("show");

	sortMediabyLikes(medias);
	generateMedia(medias);
	handleDropdown(medias, selected, options, generateMedia);
	closeDropdown(dropdown, options, selected);

	generateBanner();
	generatePrice();
	updateTotalLikes(0, likesTotalNumber);
}

function initModal(photographer) {
	document
		.getElementById("display-modal")
		.addEventListener("click", () => displayModal());
	document.querySelector("#contact-me-name").textContent =
		photographer["name"];
}

function setLiked(medias) {
	medias.forEach((media) => {
		media.liked = false;
		return medias;
	});
	return medias;
}

async function init() {
	const { urlIdNumber } = getParams();
	const { photographer, medias } = await getPhotographer(urlIdNumber);
	let likesTotalNumber = medias.reduce(
		(total, media) => total + media.likes,
		0
	);
	setLiked(medias);
	displayData(photographer, medias, likesTotalNumber);
	initLightbox(medias);
	initModal(photographer);
}

window.onload = async function () {
	await init();
};
