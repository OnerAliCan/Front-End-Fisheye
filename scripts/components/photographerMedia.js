function mediaTemplate(mediaData, index, mediaArrayLength, likesTotalNumber) {
	const { id, photographerId, title, image, likes, date, price, video } =
		mediaData;

	let mediaName;

	if (typeof image !== "undefined") {
		mediaName = image;
	} else {
		mediaName = video;
	}
	const path = `assets/images/${photographerId}/${mediaName}`;
	let totalLikesMax = 0;
	const mediaLikes = document.createElement("p");

	//likes
	let mediaLikesCount = likes;
	let mediaLikes1 = likes;

	if (typeof totalLikesAddition === "undefined") {
		totalLikesAddition = 0;
		totalLikesAddition = totalLikesAddition += likes;
	} else {
		totalLikesAddition = totalLikesAddition += likes;
	}

	document.getElementById("total-likes-container").textContent =
		likesTotalNumber + " likes";

	let i;
	mediaLikes.addEventListener("click", () => {
		// document.getElementById("total-likes-container").textContent =
		// 	likesTotalNumber + " likes";

		mediaLikesCount = addLike(
			likes,
			mediaLikesCount,
			mediaLikes,
			likesTotalNumber
		);

		if (mediaLikesCount != mediaLikes1) {
			console.log("1 " + likesTotalNumber);
			console.log("2 " + mediaLikesCount);
			console.log("3 " + mediaLikes1);

			likesTotalNumber = likesTotalNumber + mediaLikesCount - mediaLikes1;
			console.log("4 " + likesTotalNumber);
		}
		console.log("5 " + likesTotalNumber);

		// likesTotalNumber = addTotalLike(
		// 	likes,
		// 	mediaLikesCount,
		// 	mediaLikes,
		// 	likesTotalNumber
		// );
	});

	function addLike(likes, mediaLikesCount, mediaLikes, likesTotalNumber) {
		if (mediaLikesCount > likes) {
			mediaLikesCount = likes;
			mediaLikes.textContent = mediaLikesCount + " likes";
			return mediaLikesCount;
		} else {
			//doit augmenter
			// let i = 1;
			// console.log("i dans addlike = " + i);
			mediaLikesCount++;
			mediaLikes.textContent = mediaLikesCount + " likes";
			return mediaLikesCount;
		}
	}

	// function addTotalLike(totalLikesMax) {
	// 	let totalLikesMaxInitial;
	// 	totalLikesMaxInitial++;
	// 	totalLikesMax = totalLikesMaxInitial;
	// 	return totalLikesMaxInitial;
	// }

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
			mediaContainer.addEventListener("click", () => {
				let currentIndex = index;
				const lightbox = document.getElementById("lightbox");
				const lightboxResult = generateLightbox(mediaData[index]);

				lightboxResult.getLightboxDOM(
					lightbox,
					medias,
					medias[currentIndex],
					currentIndex
				);
				lightbox.showModal();
			});

			mediaArticle.appendChild(mediaContainer);
			mediaTitle.textContent = title;
			// mediaLikes.textContent = mediaLikesCount;

			mediaTitleContainer.appendChild(mediaTitle);
			mediaTitleContainer.appendChild(mediaLikes);
			mediaArticle.appendChild(mediaTitleContainer);
		}
		mediaLikes.textContent = mediaLikesCount + " likes";

		generateMedias();
		return mediaArticle;
	}

	return { getMediaDOM };
}
