function priceTemplate(data) {
	const { price } = data;

	function getPriceDOM() {
		const priceContainer = document.getElementById("div");

		function generatePrice() {
			const photographerPrice = document.getElementById(
				"daily-price-container"
			);
			photographerPrice.textContent = price + " € / jour";
		}

		generatePrice();
		return priceContainer;
	}
	return { getPriceDOM };
}

function updateTotalLikes(change, medias) {
	let likesTotalNumber = medias.reduce(
		(total, media) => total + media.likes,
		0
	);
	likesTotalNumber += change;
	document.getElementById("total-likes").textContent = `${likesTotalNumber}`;
}
