async function getMedias() {
    const response = await fetch("./data/photographers.json");
    const media = await response.json();
    const medias = media.media;

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
    // console.log("id photographe : " + urlIdNumber);

    return {
        urlIdNumber,
    };
}

async function displayData(photographers, urlIdNumber) {
    let photographerObject;
    photographers.forEach((photographer) => {
        if (photographer["id"] === urlIdNumber) {
            photographerObject = photographer;
        }
    });
    const main = document.querySelector("main");
    const headerModel = headerTemplate(photographerObject);
    const photographerCardDOM = headerModel.getPhotographerCardDOM();
    main.appendChild(photographerCardDOM);
}
async function init() {
    const { photographers } = await getPhotographers();
    const { urlIdNumber } = getParams();
    displayData(photographers, urlIdNumber);
}

init();
