function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("article");
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("img-container");
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        const h2 = document.createElement("h2");
        h2.textContent = name;

        h2.setAttribute("aria-label", "Aller à la page photographe de " + name);

        img.setAttribute("alt", name);

        imgContainer.appendChild(img);
        article.appendChild(imgContainer);
        article.appendChild(h2);

        const h3 = document.createElement("h3");
        h3.textContent = city + ", " + country;
        article.appendChild(h3);

        const p = document.createElement("p");
        p.textContent = tagline;
        p.classList.add("p-tagline");

        article.appendChild(p);

        const pPrice = document.createElement("p");
        pPrice.textContent = price + "€ / jour";
        pPrice.classList.add("p-price");
        article.appendChild(pPrice);

        return article;
    }
    return { getUserCardDOM };
}
