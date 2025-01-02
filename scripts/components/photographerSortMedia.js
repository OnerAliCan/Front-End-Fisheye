/* eslint-disable no-unused-vars */
function sortMediaByName(medias) {
	medias.sort((a, b) => {
		const nameA = a.title.toUpperCase(); // ignore upper and lowercase
		const nameB = b.title.toUpperCase(); // ignore upper and lowercase
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}
		return 0;
	});
}

function sortMediabyLikes(medias) {
	medias.sort((a, b) => {
		const likesA = a.likes;
		const likesB = b.likes;

		if (likesA < likesB) {
			return -1;
		}
		if (likesA > likesB) {
			return 1;
		}

		return 0;
	});
}

function sortMediabyDate(medias) {
	medias.sort((a, b) => {
		const dateA = a.date;
		const dateB = b.date;
		if (dateA < dateB) {
			return -1;
		}
		if (dateA > dateB) {
			return 1;
		}

		return 0;
	});
}
