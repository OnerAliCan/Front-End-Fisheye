function mediaTemplate(mediaData, index) {
    const { id, photographerId, title, image, likes, date, price, video } =
        mediaData;

    let mediaName;

    if (typeof image !== "undefined") {
        mediaName = image;
    } else {
        mediaName = video;
    }

    const path = `assets/images/${photographerId}/${mediaName}`;

    function getMediaDOM() {
        const mediaArticle = document.createElement("article");
        const mediaContainer = document.createElement("div");

        function generateMedias() {
            if (typeof image !== "undefined") {
                const mediaImg = document.createElement("img");
                mediaContainer.classList.add("media-container");
                mediaImg.setAttribute("src", path);
                mediaContainer.appendChild(mediaImg);
            } else {
                const mediaVideo = document.createElement("video");
                const mediaVideoSource = document.createElement("source");
                mediaContainer.classList.add("media-container");
                mediaVideoSource.setAttribute("src", path);
                mediaVideo.setAttribute("controls", "");
                mediaVideo.appendChild(mediaVideoSource);
                mediaContainer.appendChild(mediaVideo);
            }
            mediaContainer.id = "media-container-lightbox";
            mediaContainer.addEventListener("click", () => {
                let currentIndex = index;
                const lightbox = document.getElementById("lightbox");
                const lightboxResult = generateLightbox(mediaData[index]);

                lightboxResult.getLightboxDOM(
                    lightbox,
                    medias,
                    medias[currentIndex],
                    currentIndex
                );
                lightbox.showModal();
            });

            mediaArticle.appendChild(mediaContainer);
        }

        generateMedias();
        return mediaArticle;
    }
    return { getMediaDOM };
}
