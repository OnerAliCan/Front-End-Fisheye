function priceTemplate(data, mediaData) {
	// const { price } = data;

	const { price } = data;
	// const { likes = "Aucune donnée" } = mediaData; // Ajoute une valeur par défaut pour les likes

	//demander pourquoi c'est pas utilisé ici

	function getPriceDOM() {
		const priceContainer = document.getElementById("div");

		function generateLikes() {
			const likesNumber = document.getElementById(
				"total-likes-container"
			);
			// likesNumber.textContent = getTotalLikes() + " likes";
			// priceContainer.appendChild(likesNumber);
		}

		function generatePrice() {
			const photographerPrice = document.getElementById(
				"daily-price-container"
			);
			photographerPrice.textContent = price + " € / jour";
			// priceContainer.appendChild(photographerPrice);
		}

		// function getTotalLikes() {
		// 	let likesNumber = mediaData.map((media) => media.likes);
		// 	let totalLikes = 0;
		// 	likesNumber.forEach((likeValue) => {
		// 		totalLikes += likeValue;
		// 	});
		// 	let totalLikesString = totalLikes.toString();
		// 	return totalLikesString;
		// }

		// generateLikes();
		generatePrice();
		return priceContainer;
	}
	return { getPriceDOM };
}

// function addTotalLike(likes, mediaLikesCount, mediaLikes, likesTotalNumber) {
// 	return (likesTotalNumber = 690);
// }
