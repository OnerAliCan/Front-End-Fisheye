async function getMedias() {
    const response = await fetch("./data/photographers.json");
    const media = await response.json();
    const medias = media.media;
    // console.log(typeof medias);
    return {
        medias,
    };
}

async function getPhotographers() {
    const response = await fetch("./data/photographers.json");
    const photographes = await response.json();
    const photographers = photographes.photographers;

    return {
        photographers,
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

async function displayData(photographers, urlIdNumber, medias) {
    const main = document.querySelector("main");
    const mediaSection = document.querySelector(".media-section");

    let photographerObject;
    let mediaArray = [];
    photographers.forEach((photographer) => {
        if (photographer["id"] === urlIdNumber) {
            photographerObject = photographer;
        }
    });

    // const { name, id, portrait, city, country, tagline, price } = data;

    medias.forEach((media) => {
        if (media["photographerId"] === urlIdNumber) {
            mediaArray.push(media);
        }
    });
    console.log("en dehors de generatemedia " + photographerObject);

    function generateHeader() {
        const headerModel = headerTemplate(photographerObject);
        const photographerCardDOM = headerModel.getPhotographerCardDOM();
        main.appendChild(photographerCardDOM);
    }

    function generatePrice() {
        const priceModel = priceTemplate(photographerObject, mediaArray);
        const priceDOM = priceModel.getPriceDOM();
        main.appendChild(priceDOM);
    }
    function generateMedia() {
        mediaArray.forEach((mediaData) => {
            const mediaModel = mediaTemplate(mediaData, photographerObject);
            const mediaDOM = mediaModel.getMediaDOM();
            mediaSection.appendChild(mediaDOM);
            main.appendChild(mediaSection);
        });
    }

    generateHeader();
    generatePrice();
    generateMedia();
}

async function init() {
    const { photographers } = await getPhotographers();
    const { medias } = await getMedias();
    const { urlIdNumber } = await getParams();
    displayData(photographers, urlIdNumber, medias);
}

init();
