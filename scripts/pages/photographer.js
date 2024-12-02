async function getMedias() {
    const response = await fetch("./data/photographers.json");
    const media = await response.json();
    const medias = media.media;

    return {
        medias,
    };
}

async function getPhotographer() {
    const response = await fetch("./data/photographers.json");
    const photographes = await response.json();
    const photographers = photographes.photographers;
    // console.log(photographers);
    return {
        photographers,
    };
}

function getParams() {
    const params = new URL(document.location).searchParams;
    const photographerId = params.get("id");
    const numberPhotographerId = parseInt(photographerId, 10);
    // console.log("id photographe : " + numberPhotographerId);

    return {
        numberPhotographerId,
    };
}

async function displayPicture(photographers, numberPhotographerId) {
    photographers.forEach((photographer) => {
        console.log(
            photographer["id"] === numberPhotographerId ? photographer : ""
        );

        //on récupère bien Mimi Keel
    });
}

async function displayMediaData(medias, numberPhotographerId) {
    // medias.forEach((media) => {
    //     console.log(
    //         media["photographerId"] === numberPhotographerId ? media : ""
    //     );
    // });
}

// function headerTemplate(data) {
//     const { name, id, portrait, city, country, tagline, price } = data;
//     console.log(data);

//     const picture = `assets/photographers/${portrait}`;
//     // const idNumber = data["id"];

//     function getPhotographerCardDOM() {
//         const photographerHeader = document.querySelector(".photograph-header");

//         function generateImg() {
//             const imgContainer = document.createElement("div");
//             const img = document.createElement("img");

//             imgContainer.classList.add("img-container");
//             img.setAttribute("src", picture);
//             img.setAttribute("alt", name);
//             imgContainer.appendChild(img);
//             photographerHeader.appendChild(imgContainer);
//         }

//         function generateName() {
//             const h2 = document.createElement("h2");
//             h2.textContent = name;
//             h2.setAttribute(
//                 "aria-label",
//                 "Aller à la page photographe de " + name
//             );
//         }

//         function generateLocation() {
//             const h3 = document.createElement("h3");
//             h3.textContent = city + ", " + country;
//         }

//         generateImg();
//         generateName();
//         generateLocation();
//         generatePrice();
//     }
//     return { getPhotographerCardDOM };
// }

// displayPhotographerData();

async function init() {
    const { photographers } = await getPhotographer();

    const { numberPhotographerId } = getParams();
    const { medias } = await getMedias();
    displayMediaData(medias, numberPhotographerId);
    displayPicture(photographers, numberPhotographerId);
    // headerTemplate();
}

init();
