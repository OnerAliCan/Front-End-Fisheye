function photographerTemplate(data) {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("article");
        console.log(article);
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        const h2 = document.createElement("h2");
        h2.textContent = name;
        console.log(name);
        article.appendChild(img);
        article.appendChild(h2);
        return article;
    }
    return { name, picture, getUserCardDOM };
}
