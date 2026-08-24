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
        name: "Nouilles sautées au brocoli et aux piments",
        price:"",
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
        id: 2,
        name: "Bœuf sauté aux oignons et au poivre noir, riz blanc",
        price:"",
        image: "images/nos plats Bœuf sauté aux oignons et au poivre noir, riz blanc.jpg",
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
        name: "Nouilles sautées aux oignons et aux carottes",
        price:"",
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
        id: 4,
        name: "Pâtes de riz sautées aux crevettes",
        price:"",
        image: "images/nos plats Pâtes de riz sautées aux crevettes.jpg",
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
        name: "Poulet Kung Pao, riz blanc",
        price:"",
        image: "images/nos plats Poulet Kung Pao, riz blanc.jpg",
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
        name: "Saumon cuit à la vapeur, riz blanc",
        price:"",
        image: "images/nos plats Saumon cuit à la vapeur, riz blanc.jpg",
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
        name: "Poulet croustillant pané, sauce curry et riz parfumé",
        price:"",
        image: "images/nos plats Poulet croustillant pané, sauce curry et riz parfumé.jpg",
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
        name: "Poulet tikka masala aux noix de cajou, riz basmati",
        price:"",
        image: "images/nos plats Poulet tikka masala aux noix de cajou, riz basmati.jpg",
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
        name: "Poulet mijoté aux légumes, sauce douce au curry et riz",
        price:"",
        image: "images/nos plats Poulet mijoté aux légumes, sauce douce au curry et riz.jpg",
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
        name: "Poulet sauté aux champignons, oignons et maïs grillé, riz",
        price:"",
        image: "images/nos plats Poulet sauté aux champignons, oignons et maïs grillé, riz.jpg",
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
     {
        id: 12,
        name: "Bœuf mijoté aux pommes de terre, riz blanc",
        price:"",
        image: "images/nos plats Bœuf mijoté aux pommes de terre, riz blanc.jpg",
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
        id: 13,
        name: "Curry de pois chiches et chou-fleur, riz parfumé",
        price:"",
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
        id: 14,
        name: "Riz sauté porc et aux legumes",
        price:"",
        image: "images/nos plats Riz sauté porc et aux legumes.jpg",
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
        id: 15,
        name: "Salade de pois chiches au maïs et aux tomates",
        price:"",
        image: "images/nos plats Salade de pois chiches au maïs et aux tomates.jpg",
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
        id: 16,
        name: "Pommes de terre au bacon et aux œufs riz blanc",
        price:"",
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
        id: 17,
        name: "Bœuf braisé aux pommes de terre, sauce soja, , riz blanc",
        price:"",
        image: "images/nos plats Bœuf braisé aux pommes de terre, sauce soja, , riz blanc.jpg",
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
        id: 18,
        name: "Brocoli sauté aux légumes de saison, riz blanc",
        price:"",
        image: "images/nos plats Brocoli sauté aux légumes de saison, riz blanc.jpg",
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
        id: 19,
        name: "Champignons de Paris sautés au porc, riz blanc",
        price:"",
        image: "images/nos plats Champignons de Paris sautés au porc, riz blanc.jpg",
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
        id: 20,
        name: "Pommes de terre, maïs et brocoli aux légumes, servis avec du riz blanc",
        price:"",
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
         {
        id: 21,
        name: "Bœuf sauté aux oignons, œuf mariné, riz blanc",
        price:"",
        image: "images/nos plats Bœuf sauté aux oignons, œuf mariné, riz blanc.jpg",
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
        id: 22,
        name: "Poulet au curry et pommes de terre, riz blanc",
        price:"",
        image: "images/nos plats Poulet au curry et pommes de terre, riz blanc.jpg",
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
        id: 23,
        name: "Porc sauté aux champignons de Paris, œuf au plat, riz blanc",
        price:"",
        image: "images/nos plats Porc sauté aux champignons de Paris, œuf au plat, riz blanc.jpg",
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
        id: 24,
        name: "Tomates sautées au porc haché, riz blanc",
        price:"",
        image: "images/nos plats Tomates sautées au porc haché, riz blanc.jpg",
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
