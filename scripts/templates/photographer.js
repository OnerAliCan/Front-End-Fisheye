function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("article");
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        const h2 = document.createElement("h2");
        h2.textContent = name;
        console.log(name);
        article.appendChild(img);
        article.appendChild(h2);

        const h3 = document.createElement("h3");
        h3.textContent = city + ", " + country;
        article.appendChild(h3);

        const p = document.createElement("p");
        // const br = document.createElement("<br>");
        p.textContent = tagline;
        article.appendChild(p);

        const p2 = document.createElement("p");
        p2.textContent = price + "€ / jour";
        article.appendChild(p2);

        return article;
    }
    return { name, picture, getUserCardDOM };
}
