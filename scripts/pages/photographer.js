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

const mediaLikesContainerDiv = document.querySelector("media-likes-container");
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

	let likesTotalNumber = medias.reduce(
		(total, media) => total + media.likes,
		0
	);

	function updateTotalLikes(change) {
		likesTotalNumber += change;
		document.getElementById(
			"total-likes-container"
		).textContent = `${likesTotalNumber} likes`;
	}

	function generateHeader() {
		const headerModel = headerTemplate(photographer);
		headerModel.getPhotographerCardDOM();
	}

	function generatePrice() {
		const priceModel = priceTemplate(photographer, medias);
		const priceDOM = priceModel.getPriceDOM();
	}

	function generateMedia() {
		mediaSection.innerHTML = "";

		medias.forEach((mediaData, index) => {
			const mediaModel = mediaTemplate(
				mediaData,
				index,
				medias.length,
				updateTotalLikes
			);

			const mediaDOM = mediaModel.getMediaDOM();

			mediaSection.appendChild(mediaDOM);

			mediaDOM
				.querySelector(".media-likes-container")
				.addEventListener("click", () => {
					release(mediaData);
				});
		});

		// return mediaData;
	}
	function release(mediaData) {
		console.log(mediaData.liked);
		return mediaData;
	}
	const dropdown = document.querySelector("#sort-selector-container");
	const selected = dropdown.querySelector("#sort-by-text");
	const options = dropdown.querySelector("#sort-by-items");
	const chevronIcon = selected.querySelector("#chevron-icon"); // L'icône Chevron
	selected.classList.toggle("show"); // Fermer le dropdown

	// Mettre à jour la valeur de départ sur 'Date'
	selected.setAttribute("data-value", "popularity"); // Valeur par défaut
	sortMediabyLikes();
	generateMedia();

	// Toggle visibility of the dropdown
	selected.addEventListener("click", () => {
		selected.classList.remove("show"); // Fermer le dropdown

		options.classList.toggle("show");
	});
	options.addEventListener("click", (e) => {
		// Remonte dans la hiérarchie DOM pour trouver le parent <li>
		let targetLi = e.target.closest("li");
		if (targetLi) {
			const newValue = targetLi.innerText; // Nouveau texte
			if (targetLi.dataset.value === "popularity") {
				initMedias(medias);
				sortMediabyLikes();
				generateMedia();
			} else if (targetLi.dataset.value === "date") {
				initMedias(medias);
				sortMediabyDate();
				generateMedia();
			} else if (targetLi.dataset.value === "title") {
				initMedias(medias);
				sortMediaByName();
				generateMedia();
			}

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

	function sortMediaByName() {
		medias.sort((a, b) => {
			const nameA = a.title.toUpperCase(); // ignore upper and lowercase
			const nameB = b.title.toUpperCase(); // ignore upper and lowercase
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}
			return 0;
		});
	}

	function sortMediabyLikes() {
		medias.sort((a, b) => {
			const likesA = a.likes;
			const likesB = b.likes;

			if (likesA < likesB) {
				return -1;
			}
			if (likesA > likesB) {
				return 1;
			}

			return 0;
		});
	}

	function sortMediabyDate() {
		medias.sort((a, b) => {
			const dateA = a.date;
			const dateB = b.date;
			if (dateA < dateB) {
				return -1;
			}
			if (dateA > dateB) {
				return 1;
			}

			return 0;
		});
	}
	generateHeader();
	generatePrice();
	updateTotalLikes(0);
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
function initMedias(medias) {
	const mediaContainerArray =
		document.getElementsByClassName("media-container");

	const mediaContainerArrayLength = mediaContainerArray.length;

	for (let i = 0; i < mediaContainerArrayLength; i++) {
		mediaContainerArray[i].addEventListener("click", handleLightbox);
		mediaContainerArray[i].addEventListener("keydown", handleLightbox);

		function handleLightbox(event) {
			if (event.type === "click" || event.key === "Enter") {
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
			}
		}
	}
}

async function init() {
	const { urlIdNumber } = getParams();
	const { photographer, medias } = await getPhotographer(urlIdNumber);
	setLiked(medias);
	displayData(photographer, medias);
	initMedias(medias);
	initModal(photographer);
}

window.onload = async function () {
	await init();
};
