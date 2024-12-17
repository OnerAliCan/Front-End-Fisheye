function mediaTemplate(mediaData, index, mediaArrayLength, updateTotalLikes) {
	const { id, photographerId, title, image, likes, date, price, video } =
		mediaData;

	let mediaName;
	let mediaLiked = false;

	if (typeof image !== "undefined") {
		mediaName = image;
	} else {
		mediaName = video;
	}
	const path = `assets/images/${photographerId}/${mediaName}`;
	const mediaLikes = document.createElement("p");

	let mediaLikesCount = likes;
	mediaLikes.textContent = `${mediaLikesCount} likes`;

	mediaLikes.addEventListener("click", () => {
		if (mediaLiked) {
			mediaLikesCount--;
			mediaLiked = false;
			updateTotalLikes(-1);
		} else {
			mediaLikesCount++;
			mediaLiked = true;
			updateTotalLikes(1);
		}
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

		function generateMedias() {
			if (typeof image !== "undefined") {
				const mediaImg = document.createElement("img");
				mediaContainer.classList.add("media-container");
				mediaImg.setAttribute("src", path);
				mediaImg.setAttribute("alt", title);
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
