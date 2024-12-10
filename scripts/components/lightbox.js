function generateLightbox(mediaData) {
    // console.log(lightbox);
    const { id, photographerId, title, image, likes, date, price, video } =
        mediaData;

    let mediaName;

    if (typeof image !== "undefined") {
        mediaName = image;
    } else {
        mediaName = video;
    }

    const path = `assets/images/${photographerId}/${mediaName}`;

    function getLightBoxDOM() {
        const lightboxContainer = document.createElement("div");

        function lightboxContent() {
            if (typeof image !== "undefined") {
                const lightboxImg = document.createElement("img");
                lightboxContainer.classList.add("lightbox-container");
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
        lightboxContent();
        return lightboxContainer;
    }
    return { getLightBoxDOM };
}
