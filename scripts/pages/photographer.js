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

    function generateHeader() {
        const headerModel = headerTemplate(photographer);
        headerModel.getPhotographerCardDOM();
    }

    function generatePrice() {
        const priceModel = priceTemplate(photographer, medias);
        const priceDOM = priceModel.getPriceDOM();
        main.appendChild(priceDOM);
    }

    function generateMedia() {
        medias.forEach((mediaData, index) => {
            const mediaModel = mediaTemplate(mediaData, index);
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
            const lightboxContainer = document.getElementById("lightbox-img");

            lightboxContainer.innerHTML = "";

            let currentIndex = i;
            const lightbox = document.getElementById("lightbox");
            const lightboxResult = generateLightbox(medias[i]);

            lightboxResult.getLightboxDOM(
                lightbox,
                medias,
                medias[currentIndex],
                currentIndex,
                lightboxContainer
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
                lightboxContainer.innerHTML = "";

                console.log("click!");
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
                    lightboxContainer
                );
            }

            function getPreviousImg(value, mediaContainerArrayLength) {
                value--;

                if (value < 0) {
                    value = mediaContainerArrayLength - 1;
                }
                console.log(value);

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
                lightboxContainer.innerHTML = "";

                console.log("click!");
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
                    lightboxContainer
                );
            }

            function getNextImg(value, mediaContainerArrayLength) {
                value++;

                if (value > mediaContainerArrayLength - 1) {
                    value = 0;
                }
                console.log(value);

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
