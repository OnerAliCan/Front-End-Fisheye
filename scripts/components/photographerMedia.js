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

    // console.log(mediaData);
    let mediaName;

    if (typeof image !== "undefined") {
        mediaName = image;
    } else {
        mediaName = video;
    }

    const fullNameString = name;
    const fullNameArray = fullNameString.split(" ");
    const fullNameSlice = fullNameArray.slice(0, -1);
    const firstName = fullNameSlice.toString();

    //a decommenter quand on aura la fonction qui servira à afficher les media de chaque photographe
    const path = `assets/images/${firstName}/${mediaName}`;
    console.log(path);

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
                const mediaVideoContainer = document.createElement("video");
                const mediaVideoSource = document.createElement("source");
                mediaContainer.classList.add("media-container");
                mediaVideoSource.setAttribute("src", path);
                mediaVideoContainer.setAttribute("controls", "");
                mediaVideoContainer.appendChild(mediaVideoSource);
                mediaContainer.appendChild(mediaVideoContainer);
            }

            mediaArticle.appendChild(mediaContainer);
        }

        generateMedias();
        return mediaArticle;
    }
    return { getMediaDOM };
}
