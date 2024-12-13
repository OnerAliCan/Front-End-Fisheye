function mediaTemplate(mediaData, index, mediaArrayLength, updateTotalLikes) {
	const { id, photographerId, title, image, likes, date, price, video } =
		mediaData;

	let mediaName;
	let mediaLiked = false; // Pour suivre si ce média est liké ou non

	if (typeof image !== "undefined") {
		mediaName = image;
	} else {
		mediaName = video;
	}
	const path = `assets/images/${photographerId}/${mediaName}`;
	const mediaLikes = document.createElement("p");

	// Initialisation du nombre de likes pour ce média
	let mediaLikesCount = likes;
	mediaLikes.textContent = `${mediaLikesCount} likes`;

	// Ajout de l'événement de clic sur le nombre de likes
	mediaLikes.addEventListener("click", () => {
		if (mediaLiked) {
			// Si déjà liké, on décrémente
			mediaLikesCount--;
			mediaLiked = false;
			updateTotalLikes(-1); // Réduire le compteur global des likes
		} else {
			// Si pas liké, on incrémente
			mediaLikesCount++;
			mediaLiked = true;
			updateTotalLikes(1); // Augmenter le compteur global des likes
		}

		// Mise à jour du nombre de likes pour ce média
		mediaLikes.textContent = `${mediaLikesCount} likes`;
	});

	function getMediaDOM() {
		const mediaArticle = document.createElement("article");
		const mediaContainer = document.createElement("div");
		const mediaTitleContainer = document.createElement("div");
		const mediaTitle = document.createElement("p");
		mediaTitleContainer.classList.add("media-title-container");
		mediaTitle.classList.add("media-title");
		mediaLikes.classList.add("media-likes");

		// Générer l'élément média (image ou vidéo)
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

			mediaArticle.appendChild(mediaContainer);
			mediaTitle.textContent = title;
			mediaTitleContainer.appendChild(mediaTitle);
			mediaTitleContainer.appendChild(mediaLikes);
			mediaArticle.appendChild(mediaTitleContainer);
		}

		generateMedias();
		return mediaArticle;
	}

	return { getMediaDOM };
}
