function generateLightbox(mediaData) {
    const { id, photographerId, title, image, likes, date, price, video } =
        mediaData;

    let mediaName;

    if (typeof image !== "undefined") {
        mediaName = image;
    } else {
        mediaName = video;
    }

    const path = `assets/images/${photographerId}/${mediaName}`;

    function getLightboxDOM(lightbox, medias, media, i) {
        // console.log("dans la fonction de base " + medias[i]);
        // console.log("dans la fonction de base " + media);
        // console.log("dans la fonction de base " + i);

        lightbox.innerHTML = "";
        const lightboxContainer = document.createElement("div");
        lightboxContainer.classList.add("lightbox-container");

        function lightboxContent(lightbox) {
            if (typeof image !== "undefined") {
                const lightboxImg = document.createElement("img");
                lightboxImg.setAttribute("src", path);
                lightboxContainer.appendChild(lightboxImg);
            } else {
                const lightboxVideo = document.createElement("video");
                const lightboxVideoSource = document.createElement("source");
                lightboxVideoSource.setAttribute("src", path);
                lightboxVideo.setAttribute("controls", "");
                lightboxVideo.appendChild(lightboxVideoSource);
                lightboxContainer.appendChild(lightboxVideo);
            }
            // console.log(lightboxContainer);
            lightbox.appendChild(lightboxContainer);
        }

        function getLeftArrowContainer(i) {
            // console.log(i);
            const leftArrowContainerDiv = document.createElement("div");
            leftArrowContainerDiv.classList.add("left-arrow-container");

            const leftArrow = document.createElement("img");
            leftArrow.setAttribute("src", "assets/icons/chevron-left.svg");
            leftArrow.id = "left-arrow-img";
            leftArrowContainerDiv.appendChild(leftArrow);
            lightbox.appendChild(leftArrowContainerDiv);
        }

        function getRightContainer() {
            const rightContainer = document.createElement("div");
            rightContainer.classList.add("right-container");

            const closeContainer = document.createElement("div");
            closeContainer.classList.add("close-lightbox-container");

            function getClose(closeContainer) {
                const close = document.createElement("img");
                close.setAttribute("src", "assets/icons/close-lightbox.svg");
                close.setAttribute("onclick", "closeModal()");
                closeContainer.appendChild(close);
            }

            function getRightArrowContainer(closeContainer, rightContainer) {
                const rightArrowContainer = document.createElement("div");

                rightArrowContainer.classList.add("right-arrow-container");

                const rightArrow = document.createElement("img");
                rightArrow.setAttribute(
                    "src",
                    "assets/icons/chevron-right.svg"
                );
                rightArrowContainer.appendChild(rightArrow);
                rightContainer.appendChild(closeContainer);
                rightContainer.appendChild(rightArrowContainer);
            }
            getClose(closeContainer);
            getRightArrowContainer(closeContainer, rightContainer);
            lightbox.appendChild(rightContainer);
        }
        getLeftArrowContainer(i);
        lightboxContent(lightbox);
        getRightContainer(lightbox);
        return lightbox;
    }
    return { getLightboxDOM };
}
