// ====================================
// PLAT DU JOUR
// 每天只需要修改这里
// ====================================

const DAILY_DISH = {

    name: "Poulet mariné grillé, riz",

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
        name: "Brocoli sauté aux légumes de saison, riz blanc",
        price:"",
        image: "images/nos plats Brocoli sauté aux légumes de saison,  riz blanc.jpg",
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
        name: "Bœuf braisé aux pommes de terre, sauce soja, riz blanc",
        price:"",
        image: "images/nos plats Bœuf braisé aux pommes de terre, sauce soja, ,  riz blanc.jpg",
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
        name: "Bœuf mijoté aux pommes de terre, riz blanc",
        price:"",
        image: "images/nos plats Bœuf mijoté aux pommes de terre,  riz blanc.jpg",
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
        name: "Bœuf sauté aux oignons et au poivre noir, riz blanc",
        price:"",
        image: "images/nos plats Bœuf sauté aux oignons et au poivre noir,  riz blanc.jpg",
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
        name: "Bœuf sauté aux oignons, œuf mariné, riz blanc",
        price:"",
        image: "images/nos plats Bœuf sauté aux oignons, œuf mariné,  riz blanc.jpg",
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
        id: 6,
        name: "Champignons de Paris sautés au porc, riz blanc",
        price:"",
        image: "images/nos plats Champignons de Paris sautés au porc,  riz blanc.jpg",
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
        id: 7,
        name: "Curry de lentilles et pommes de terre, servi avec du riz blanc",
        price:"",
        image: "images/nos plats Curry de lentilles et pommes de terre, servi avec du riz blanc.jpg",
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
    const descriptionElement = document.getElementById("daily-description");
    const imageElement = document.getElementById("daily-image");

    if (nameElement) {
        nameElement.textContent = DAILY_DISH.name;
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
// ====================================
// DAILY DISH BUTTONS
// ====================================

document.addEventListener("DOMContentLoaded", () => {

    const normalButton =
        document.querySelector(".daily-normal");

    const vipButton =
        document.querySelector(".daily-vip");

    const membershipButton =
        document.querySelector(".daily-membership");


    // 普通客户
    if (normalButton) {

        normalButton.addEventListener("click", () => {

            addDailyDishToCart(15.50);

        });

    }


    // VIP客户
    if (vipButton) {

        vipButton.addEventListener("click", () => {

            addDailyDishToCart(9.90);

        });

    }


    // 新VIP会员
    if (membershipButton) {

        membershipButton.addEventListener("click", () => {

            addMembershipToCart();

        });

    }

});


// ====================================
// ADD DAILY DISH TO CART
// ====================================

function addDailyDishToCart(price) {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    cart.push({

        name: DAILY_DISH.name,

        price: price,

        quantity: 1,

        image: DAILY_DISH.image

    });


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    window.location.href = "cart.html";

}


// ====================================
// ADD VIP MEMBERSHIP TO CART
// ====================================

function addMembershipToCart() {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    cart.push({

        name:
            "Adhésion VIP + 1er repas",

        price: 39.60,

        quantity: 1,

        image: DAILY_DISH.image,

        type: "vip-membership"

    });


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    window.location.href = "cart.html";

}
