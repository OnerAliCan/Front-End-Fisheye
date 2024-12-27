function mediaTemplate(mediaData, index, mediaArrayLength, updateTotalLikes) {
	const {
		id,
		photographerId,
		title,
		image,
		likes,
		date,
		price,
		video,
		liked,
	} = mediaData;

	let mediaName;
	let mediaLiked = liked;

	if (typeof image !== "undefined") {
		mediaName = image;
	} else {
		mediaName = video;
	}
	const path = `assets/images/${photographerId}/${mediaName}`;
	const mediaLikesContainer = document.createElement("div");
	mediaLikesContainer.classList.add("media-likes-container");
	mediaLikesContainer.setAttribute("tabindex", "0");
	const mediaLikes = document.createElement("p");

	const regularHeart = document.createElement("img");
	regularHeart.setAttribute("src", "assets/icons/heart-regular.svg");
	const solidHeart = document.createElement("img");
	solidHeart.setAttribute("src", "../../assets/icons/heart-solid.svg");
	regularHeart.id = "heart-svg";
	solidHeart.id = "heart-svg";

	let mediaLikesCount = likes;

	mediaLikes.textContent = `${mediaLikesCount}`;
	mediaLikesContainer.appendChild(mediaLikes);
	mediaLikesContainer.appendChild(regularHeart);

	if (liked === true) {
		mediaLikesCount++;
		mediaLikes.textContent = `${mediaLikesCount}`;

		mediaLikesContainer.removeChild(regularHeart);
		mediaLikesContainer.appendChild(solidHeart);
	} else {
		if (mediaLikesContainer.contains(solidHeart)) {
			mediaLikesContainer.removeChild(solidHeart);
			mediaLikesContainer.appendChild(regularHeart);
		}
	}

	mediaLikesContainer.addEventListener("click", handleTotalLikes);
	mediaLikesContainer.addEventListener("keydown", handleTotalLikes);

	function handleTotalLikes(event) {
		if (event.type === "click" || event.key === "Enter") {
			if (mediaLiked) {
				mediaLikesCount--;
				mediaData.liked = false;
				mediaLiked = mediaData.liked;
				updateTotalLikes(-1);
				mediaLikesContainer.removeChild(solidHeart);
				mediaLikesContainer.appendChild(regularHeart);
			} else {
				mediaLikesCount++;
				mediaData.liked = true;
				mediaLiked = mediaData.liked;
				updateTotalLikes(1);
				mediaLikesContainer.removeChild(regularHeart);
				mediaLikesContainer.appendChild(solidHeart);
			}
			mediaLikes.textContent = `${mediaLikesCount}`;
			return liked;
		}
		return liked;
	}

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
			mediaContainer.setAttribute("tabindex", 0);
			mediaArticle.appendChild(mediaContainer);
			mediaTitle.textContent = title;
			mediaTitleContainer.appendChild(mediaTitle);
			mediaTitleContainer.appendChild(mediaLikesContainer);
			mediaArticle.appendChild(mediaTitleContainer);
		}

		generateMedias();
		return mediaArticle;
	}

	return { getMediaDOM };
}
