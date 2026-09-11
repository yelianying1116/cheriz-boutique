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

    ingredients: [
        "Riz blanc",
        "Poulet mariné",
        "Ail",
        "Paprika",
        "Cumin",
        "Poivre noir",
        "Sel",
        "Huile d’olive",
        "Jus de citron",
        "Persil frais",
        "Sauce légèrement relevée à base de tomate, ail et épices"
    ],

    calories: "≈ 650 kcal / portion",

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
        purchaseable: true,
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
    purchaseable: true,
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
        purchaseable: true,
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
    purchaseable: true,
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
        purchaseable: true,
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
            purchaseable: true,
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
            purchaseable: true,
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
        {
        id: 8,
        name: "Curry de pois chiches et chou-fleur, riz parfumé",
        price:"",
            purchaseable: true,
        image: "images/nos plats Curry de pois chiches et chou-fleur, riz parfumé.jpg",
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
        id: 9,
        name: "Nouilles sautées au brocoli et aux piments",
        price:"",
            purchaseable: true,
        image: "images/nos plats Nouilles sautées au brocoli et aux piments.jpg",
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
        id: 10,
        name: "Nouilles sautées aux oignons et aux carottes",
        price:"",
            purchaseable: true,
        image: "images/nos plats Nouilles sautées aux oignons et aux carottes.jpg",
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
        id: 11,
        name: "Pommes de terre au bacon et aux œufs riz blanc",
        price:"",
        purchaseable: true,
        image: "images/nos plats Pommes de terre au bacon et aux œufs riz blanc.jpg",
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
        id: 12,
        name: "Pommes de terre, maïs et brocoli aux légumes, servis avec du riz blanc",
        price:"",
        purchaseable: true,
        image: "images/nos plats Pommes de terre, maïs et brocoli aux légumes, servis avec du riz blanc.jpg",
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
// AUTRES PRODUITS
// ====================================

const OTHER_PRODUCTS = [

    {
        id: 101,
        name: "Nems aux légumes",
        description: "2 pièces, rouleaux croustillants aux légumes.",
        price: 3.00,
        available: true
    },

    {
        id: 102,
        name: "Nems au bœuf",
        description: "2 pièces.",
        price: 3.50,
        available: true
    },

    {
        id: 103,
        name: "Nems au poulet",
        description: "2 pièces, rouleaux croustillants au poulet.",
        price: 3.00,
        available: true
    },

    {
        id: 104,
        name: "Nems aux crevettes",
        description: "2 pièces, rouleaux croustillants aux crevettes.",
        price: 3.80,
        available: true
    },

    {
        id: 105,
        name: "Nems au porc",
        description: "2 pièces, rouleaux croustillants au porc.",
        price: 3.00,
        available: true
    },

    {
        id: 106,
        name: "Raviolis vapeur au poulet & légumes épicé",
        description: "5 pièces, poulet, chou chinois.",
        price: 7.00,
        available: true
    },

    {
        id: 107,
        name: "Raviolis vapeur aux légumes",
        description: "5 pièces, bouchées vapeur végétariennes.",
        price: 7.50,
        available: true
    },

    {
        id: 108,
        name: "Raviolis vapeur au porc",
        description: "2 pièces, porc.",
        price: 3.00,
        available: true
    },

    {
        id: 109,
        name: "Xiao Long Bao",
        description: "2 pièces, petites brioches vapeur au porc.",
        price: 3.20,
        available: true
    },

    {
        id: 110,
        name: "Perles de Coco",
        description: "2 pièces, délicates bouchées de riz gluant à la noix de coco et œuf.",
        price: 4.50,
        available: true
    },

    {
        id: 111,
        name: "Perles de Coco vert",
        description: "2 pièces, perles de coco à la pâte de haricot mungo.",
        price: 5.00,
        available: true
    },

    // ====================================
    // BOISSONS
    // ====================================

    {
        id: 112,
        name: "Coca-Cola",
        description: "Original 33cl.",
        price: 2.80,
        available: true
    },

    {
        id: 113,
        name: "Coca-Cola",
        description: "Sans Sucres 33cl.",
        price: 2.80,
        available: true
    },

    {
        id: 114,
        name: "Eau gazeuse",
        description: "Perrier 33cl.",
        price: 2.80,
        available: true
    },

    {
        id: 115,
        name: "Bière Tsingtao",
        description: "33cl.",
        price: 4.50,
        available: true
    }

];
// ====================================
// PLAT DU JOUR DISPLAY
// ====================================

function displayDailyDish() {

    const nameElement =
        document.getElementById("daily-name");

    const descriptionElement =
        document.getElementById("daily-description");

    const imageElement =
        document.getElementById("daily-image");

    const ingredientsElement =
        document.getElementById("daily-ingredients");

    const caloriesElement =
        document.getElementById("daily-calories");


    if (nameElement) {
        nameElement.textContent = DAILY_DISH.name;
    }


    if (descriptionElement) {
        descriptionElement.textContent =
            DAILY_DISH.description;
    }


    if (imageElement) {
        imageElement.src = DAILY_DISH.image;
    }


    if (ingredientsElement) {
        ingredientsElement.textContent =
            DAILY_DISH.ingredients.join(", ");
    }


    if (caloriesElement) {
        caloriesElement.textContent =
            DAILY_DISH.calories;
    }

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

    const menuContainer =
        document.getElementById("nos-plats-list");

    if (!menuContainer) return;

    menuContainer.innerHTML = "";

    products.forEach(product => {

        if (!product.available) return;

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
// AUTRES PRODUITS DISPLAY
// ====================================

function displayOtherProducts() {

    const container =
        document.getElementById("menu-list-2");

    if (!container) return;

    container.innerHTML = "";

    OTHER_PRODUCTS.forEach(product => {

        if (!product.available) return;

        container.innerHTML += `

            <article class="menu-card">

                <div class="menu-content">

                    <h3>${product.name}</h3>

                    <p>
                        ${product.description}
                    </p>

                    <p class="product-price">
                        ${Number(product.price).toFixed(2).replace(".", ",")} €
                    </p>

                    <button
                        type="button"
                        class="other-product-order-button"
                        data-other-product-id="${product.id}">
                        Ajouter au panier
                    </button>

                </div>

            </article>

        `;

    });

    document
        .querySelectorAll(".other-product-order-button")
        .forEach(button => {

            button.addEventListener("click", () => {

                const productId =
                    Number(button.dataset.otherProductId);

                addOtherProductToCart(productId);

            });

        });

}
// ====================================
// INITIALIZATION
// ====================================

displayDailyDish();
displayProducts();
displayOtherProducts();
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

        image: DAILY_DISH.image,

        type: "daily-dish"

    });

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    window.location.href = "cart.html";

}


// ====================================
// ADD OTHER PRODUCT TO CART
// ====================================

function addOtherProductToCart(productId) {

    const product =
        OTHER_PRODUCTS.find(
            item => item.id === productId
        );

    if (!product) {

        alert("Produit introuvable.");

        return;
    }

    if (!product.available) {

        alert("Ce produit n'est pas disponible.");

        return;
    }

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    const existingItem =
        cart.find(item =>
            item.type === "other-product" &&
            Number(item.productId) === Number(productId)
        );

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({

            type: "other-product",

            productId: product.id,

            name: product.name,

            price: Number(product.price),

            quantity: 1

        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    window.location.href = "cart.html";

}


// ====================================
// ADD NOS PLATS PRODUCT TO CART
// ====================================

function addProductToCart(productId) {

    const product = getProduct(productId);

    if (!product) {

        alert("Produit introuvable.");

        return;
    }

    if (!product.available) {

        alert("Ce produit n'est pas disponible.");

        return;
    }

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    const existingItem =
        cart.find(item =>
            item.type === "product" &&
            Number(item.productId) === Number(productId)
        );

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({

            type: "product",

            productId: product.id,

            name: product.name,

            price: Number(product.price) || 0,

            quantity: 1,

            image: product.image

        });

    }

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
