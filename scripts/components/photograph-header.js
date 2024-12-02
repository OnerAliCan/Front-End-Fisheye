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

function headerTemplate(data) {
    const { name, id, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;

    function getPhotographerCardDOM() {
        const photographHeader = document.querySelector(".photograph-header");

        function generateProfilePicture() {
            const profilePicture = document.createElement("img");
            profilePicture.setAttribute("src", picture);
            photographHeader.appendChild(profilePicture);
        }
        generateProfilePicture();
        return photographHeader;
    }
    return { getPhotographerCardDOM };
}
