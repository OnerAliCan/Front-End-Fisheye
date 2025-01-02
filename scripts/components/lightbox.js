// eslint-disable-next-line no-unused-vars
function initLightbox(medias) {
  const mediaContainerArray =
    document.getElementsByClassName("media-container");

  const mediaContainerArrayLength = mediaContainerArray.length;

  for (let i = 0; i < mediaContainerArrayLength; i++) {
    mediaContainerArray[i].addEventListener("click", handleLightbox);
    mediaContainerArray[i].addEventListener("keydown", handleLightbox);

    function handleLightbox(event) {
      if (event.type === "click" || event.key === "Enter") {
        const lightboxMediaContainer = document.getElementById("lightbox-img");

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

          const updatedLightboxResult = generateLightbox(medias[currentIndex]);
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

          currentIndex = getNextImg(currentIndex, mediaContainerArrayLength);

          const updatedLightboxResult = generateLightbox(medias[currentIndex]);
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

function generateLightbox(mediaData) {
  const { photographerId, title, image, video } = mediaData;

  let mediaName;

  if (typeof image !== "undefined") {
    mediaName = image;
  } else {
    mediaName = video;
  }

  const path = `assets/images/${photographerId}/${mediaName}`;
  const lightboxTitle = document.getElementById("lightbox-media-title");
  // let lightboxMediaTitle = title;

  function getLightboxDOM(lightbox, medias, media, i, lightboxMediaContainer) {
    function lightboxContent() {
      if (typeof image !== "undefined") {
        const lightboxImg = document.createElement("img");
        lightboxImg.setAttribute("src", path);
        lightboxImg.setAttribute("alt", title);
        lightboxMediaContainer.appendChild(lightboxImg);
      } else {
        const lightboxVideo = document.createElement("video");
        const lightboxVideoSource = document.createElement("source");
        lightboxVideoSource.setAttribute("src", path);
        lightboxVideo.setAttribute("controls", "");
        lightboxVideo.appendChild(lightboxVideoSource);
        lightboxMediaContainer.appendChild(lightboxVideo);
      }
      lightboxTitle.textContent = title;
    }

    lightboxContent();
    return lightbox;
  }
  return { getLightboxDOM };
}
