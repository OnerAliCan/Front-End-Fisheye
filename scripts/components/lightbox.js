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

    function getLightboxDOM(lightbox, medias, media, i, lightboxContainer) {
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
        }

        lightboxContent(lightbox);
        return lightbox;
    }
    return { getLightboxDOM };
}
