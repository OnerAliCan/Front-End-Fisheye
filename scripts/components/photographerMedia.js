function mediaTemplate(mediaData, data) {
    // console.log(mediaData);
    // console.log(typeof data["name"]);

    const { id, photographerId, title, image, likes, date, price, video } =
        mediaData;
    // console.log(video);
    const {
        name,
        id: userId,
        portrait,
        city,
        country,
        tagline,
        price: photographerPrice,
    } = data;

    let mediaName;

    if (typeof image !== "undefined") {
        mediaName = image;
    } else {
        mediaName = video;
    }

    const path = `assets/images/${photographerId}/${mediaName}`;
    // console.log(path);

    function getMediaDOM() {
        // console.log("function getMediaDOM");
        // function

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
            mediaArticle.appendChild(mediaContainer);
        }

        generateMedias();
        return mediaArticle;
    }
    return { getMediaDOM };
}
