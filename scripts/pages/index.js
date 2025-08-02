// récupérer les données

async function getPhotographers() {
  const response = await fetch("./data/photographers.json");
  const photographes = await response.json();
  const photographers = photographes.photographers;

  return {
    photographers,
  };
}
// afficher les en récupérant les données du DOM

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer-section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
