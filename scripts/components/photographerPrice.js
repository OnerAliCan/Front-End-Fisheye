function priceTemplate(data, mediaData) {
    // const { price } = data;

    // const { likes } = mediaData;
    // console.log("type de data : " + data);
    // console.log("type de mediaData : " + mediaData[0]);

    const { price } = data;
    // const { likes = "Aucune donnée" } = mediaData; // Ajoute une valeur par défaut pour les likes

    //demander pourquoi c'est pas utilisé ici

    // console.log(mediaData);

    function getPriceDOM() {
        const priceContainer = document.createElement("div");
        priceContainer.classList.add("price-container");

        function generateLikes() {
            const likesNumber = document.createElement("p");
            likesNumber.textContent = getTotalLikes() + " likes";
            priceContainer.appendChild(likesNumber);
        }

        function generatePrice() {
            const photographerPrice = document.createElement("p");
            photographerPrice.textContent = price + " € / jour";
            priceContainer.appendChild(photographerPrice);
        }

        function getTotalLikes() {
            let likesNumber = mediaData.map((media) => media.likes);
            let totalLikes = 0;
            likesNumber.forEach((likeValue) => {
                totalLikes += likeValue;
            });
            let totalLikesString = totalLikes.toString();
            return totalLikesString;
        }

        generateLikes();
        generatePrice();
        return priceContainer;
    }
    return { getPriceDOM };
}
