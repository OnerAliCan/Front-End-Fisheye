function photographerTemplate(data) {
    const { name, id, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;
    const idNumber = data["id"];

    function getUserCardDOM() {
        const article = document.createElement("article");
        const pageLink = document.createElement("a");

        function generateImg() {
            const imgContainer = document.createElement("div");
            const img = document.createElement("img");

            imgContainer.classList.add("img-container");
            img.setAttribute("src", picture);
            img.setAttribute("alt", name);
            imgContainer.appendChild(img);
            article.appendChild(pageLink);
            pageLink.appendChild(imgContainer);
        }

        function generateName() {
            const h2 = document.createElement("h2");
            h2.textContent = name;
            h2.setAttribute(
                "aria-label",
                "Aller à la page photographe de " + name
            );

            article.appendChild(h2);
            article.appendChild(pageLink);
            pageLink.appendChild(h2);
        }

        function generateLocation() {
            const h3 = document.createElement("h3");
            h3.textContent = city + ", " + country;
            article.appendChild(h3);
        }

        function generateTagline() {
            const p = document.createElement("p");
            p.textContent = tagline;
            p.classList.add("p-tagline");
            article.appendChild(p);
        }

        function generatePrice() {
            const pPrice = document.createElement("p");
            pPrice.textContent = price + "€ / jour";
            pPrice.classList.add("p-price");
            article.appendChild(pPrice);
        }

        generateImg();
        generateName();
        generateLocation();
        generatePrice();
        generateTagline();
        pageLink.href = "./photographer.html?id=" + data["id"];
        return article;
    }
    return { getUserCardDOM };
}
