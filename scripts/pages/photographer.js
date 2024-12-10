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
        const photographerCardDOM = headerModel.getPhotographerCardDOM();
        main.appendChild(photographerCardDOM);
    }

    function generatePrice() {
        const priceModel = priceTemplate(photographer, medias);
        const priceDOM = priceModel.getPriceDOM();
        main.appendChild(priceDOM);
    }

    function generateMedia() {
        medias.forEach((mediaData) => {
            const mediaModel = mediaTemplate(mediaData, photographer);
            const mediaDOM = mediaModel.getMediaDOM();
            mediaSection.appendChild(mediaDOM);
            main.appendChild(mediaSection);
        });
    }
    // console.log(photographer);

    generateHeader();
    generatePrice();
    generateMedia();
}

function displayModal(photographer) {
    // console.log(photographer);
    document
        .getElementById("display-modal")
        .addEventListener("click", () => generateModal(photographer));
}

function displayLightbox(medias) {
    // const mediaId = medias.filter(
    //     (element) => element.photographerId == urlIdNumber
    // );
    const lightbox = document.getElementById("lightbox");

    const mediaContainerArray =
        document.getElementsByClassName("media-container");

    for (let i = 0; i < mediaContainerArray.length; i++) {
        mediaContainerArray[i].addEventListener("click", () => {
            const lightboxResult = generateLightbox(medias[i]);
            const lightboxDOM = lightboxResult.getLightBoxDOM();

            lightbox.innerHTML = "";
            lightbox.appendChild(lightboxDOM);
            console.log(lightbox);
            lightbox.showModal();
        });
    }
}

async function init() {
    const { urlIdNumber } = getParams();
    const { photographer, medias } = await getPhotographer(urlIdNumber);
    displayData(photographer, medias);
    displayModal(photographer);
    displayLightbox(medias);
}

window.onload = async function () {
    await init();
};
