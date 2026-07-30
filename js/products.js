// ====================================
// PLAT DU JOUR
// 每天只需要修改这里
// ====================================

const DAILY_DISH = {

    name: "Poulet mariné grillé, riz",

    price: "8,30",

    description: `
        Poulet mariné aux épices, délicatement grillé et servi avec du riz,
        accompagné d'une sauce légèrement relevée qui apporte une touche
        gourmande et chaleureuse.
    `,

    image: "images/plat-du-jour.jpg"

};


// ====================================
// PRODUCTS DATABASE
// 菜单、甜品、饮品等长期商品
// ====================================

const products = [

    {
        id: 1,
        name: "Vegan Mac 'N' Cheese",
        price:"",
        image: "images/mac.jpg",
        available: true,
        category: "Main",
        shortDescription:
            "Creamy vegan pasta with cashew cheese sauce.",
        description: `
            Our Vegan Mac 'N' Cheese is a delicious plant-based
            dish prepared with homemade cashew sauce,
            fresh herbs and crispy breadcrumbs.
        `,
        ingredients: [
            "Pasta",
            "Cashew",
            "Oat Milk",
            "Garlic",
            "Onion",
            "Mustard"
        ],
        allergens: [
            "Gluten",
            "Nuts"
        ],
        nutrition: {
            calories: "540 kcal",
            protein: "18g",
            fat: "21g",
            carbs: "64g"
        },
        chefNote: `
            Best enjoyed hot.
            Our chef recommends adding fresh herbs before serving.
        `
    },
{
        id: 2,
        name: "Vegan ",
        price:"",
        image: "images/cake.jpg",
        available: true,
        category: "Main",
        shortDescription:
            "Creamy vegan pasta with cashew cheese sauce.",
        description: `
            Our Vegan Mac 'N' Cheese is a delicious plant-based
            dish prepared with homemade cashew sauce,
            fresh herbs and crispy breadcrumbs.
        `,
        ingredients: [
            "Pasta",
            "Cashew",
            "Oat Milk",
            "Garlic",
            "Onion",
            "Mustard"
        ],
        allergens: [
            "Gluten",
            "Nuts"
        ],
        nutrition: {
            calories: "540 kcal",
            protein: "18g",
            fat: "21g",
            carbs: "64g"
        },
        chefNote: `
            Best enjoyed hot.
            Our chef recommends adding fresh herbs before serving.
        `
    },
    {
        id: 3,
        name: "WVegan ",
        price:"",
        image: "images/latte.jpg",
        available: true,
        category: "Main",
        shortDescription:
            "Creamy vegan pasta with cashew cheese sauce.",
        description: `
            Our Vegan Mac 'N' Cheese is a delicious plant-based
            dish prepared with homemade cashew sauce,
            fresh herbs and crispy breadcrumbs.
        `,
        ingredients: [
            "Pasta",
            "Cashew",
            "Oat Milk",
            "Garlic",
            "Onion",
            "Mustard"
        ],
        allergens: [
            "Gluten",
            "Nuts"
        ],
        nutrition: {
            calories: "540 kcal",
            protein: "18g",
            fat: "21g",
            carbs: "64g"
        },
        chefNote: `
            Best enjoyed hot.
            Our chef recommends adding fresh herbs before serving.
        `
    },
{
        id: 4,
        name: "VVegan ",
        price:"",
        image: "images/shake.jpg",
        available: true,
        category: "Main",
        shortDescription:
            "Creamy vegan pasta with cashew cheese sauce.",
        description: `
            Our Vegan Mac 'N' Cheese is a delicious plant-based
            dish prepared with homemade cashew sauce,
            fresh herbs and crispy breadcrumbs.
        `,
        ingredients: [
            "Pasta",
            "Cashew",
            "Oat Milk",
            "Garlic",
            "Onion",
            "Mustard"
        ],
        allergens: [
            "Gluten",
            "Nuts"
        ],
        nutrition: {
            calories: "540 kcal",
            protein: "18g",
            fat: "21g",
            carbs: "64g"
        },
        chefNote: `
            Best enjoyed hot.
            Our chef recommends adding fresh herbs before serving.
        `
    },
    {
        id: 5,
        name: "OVegan ",
        price:"",
        image: "images/wings.jpg",
        available: true,
        category: "Main",
        shortDescription:
            "Creamy vegan pasta with cashew cheese sauce.",
        description: `
            Our Vegan Mac 'N' Cheese is a delicious plant-based
            dish prepared with homemade cashew sauce,
            fresh herbs and crispy breadcrumbs.
        `,
        ingredients: [
            "Pasta",
            "Cashew",
            "Oat Milk",
            "Garlic",
            "Onion",
            "Mustard"
        ],
        allergens: [
            "Gluten",
            "Nuts"
        ],
        nutrition: {
            calories: "540 kcal",
            protein: "18g",
            fat: "21g",
            carbs: "64g"
        },
        chefNote: `
            Best enjoyed hot.
            Our chef recommends adding fresh herbs before serving.
        `
    },
    // 在这里继续添加其他产品......

];


// ====================================
// PRODUCTS FUNCTIONS
// ====================================

function getProduct(id) {

    return products.find(product => product.id === id);

}

function getMenuProducts() {

    return products;

}


// ====================================
// PLAT DU JOUR DISPLAY
// ====================================

function displayDailyDish() {

    const nameElement = document.getElementById("daily-name");
    const priceElement = document.getElementById("daily-price");
    const descriptionElement = document.getElementById("daily-description");
    const imageElement = document.getElementById("daily-image");

    if (nameElement) {
        nameElement.textContent = DAILY_DISH.name;
    }

    if (priceElement) {
        priceElement.textContent = DAILY_DISH.price + " €";
    }

    if (descriptionElement) {
        descriptionElement.textContent = DAILY_DISH.description.trim();
    }

    if (imageElement) {
        imageElement.src = DAILY_DISH.image;
        imageElement.alt = DAILY_DISH.name;
    }

}


// ====================================
// NOS PLATS DISPLAY
// ====================================

function displayProducts() {

    const menuContainer = document.getElementById("menu-list-2");

    if (!menuContainer) return;

    menuContainer.innerHTML = "";

    products.forEach(product => {

        menuContainer.innerHTML += `

            <article class="menu-card">

                <div class="menu-photo">
                    <img
                        src="${product.image}"
                        alt="${product.name}">
                </div>

                <div class="menu-content">

                    <h3>${product.name}</h3>

                    <p>${product.shortDescription}</p>

                    <div class="menu-price">
                        ${product.price} 
                    </div>

                </div>

            </article>

        `;

    });

}


// ====================================
// INITIALIZATION
// ====================================

displayDailyDish();
displayProducts();
