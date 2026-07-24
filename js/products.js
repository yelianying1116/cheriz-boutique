// ===============================
// Configuration
// ===============================

// 每天只需要修改这里
// 例如今天推荐 id=1
// 明天推荐 id=5
const DAILY_PRODUCT_ID = 1;


// ===============================
// Products Database
// ===============================

const products = [

{
    id:1,

    name:"Vegan Mac 'N' Cheese",

    price:8.50,

    image:"images/mac.jpg",

    available:true,

    category:"Main",

    shortDescription:
    "Creamy vegan pasta with cashew cheese sauce.",

    description:
    `
    Our Vegan Mac 'N' Cheese is a delicious plant-based
    dish prepared with homemade cashew sauce,
    fresh herbs and crispy breadcrumbs.
    `,

    ingredients:[
        "Pasta",
        "Cashew",
        "Oat Milk",
        "Garlic",
        "Onion",
        "Mustard"
    ],

    allergens:[
        "Gluten",
        "Nuts"
    ],

    nutrition:{
        calories:"540 kcal",
        protein:"18g",
        fat:"21g",
        carbs:"64g"
    },

    chefNote:
    `
    Best enjoyed hot.
    Our chef recommends adding fresh herbs before serving.
    `
},

{
    id:2,

    name:"Vegan Cheesecake",

    image:"images/cake.jpg",

    available:true,

    category:"Dessert",

    shortDescription:
    "Creamy caramel vegan cheesecake.",

    description:
    `
    A smooth vegan cheesecake made with
    natural ingredients and a caramel flavor.
    `,

    ingredients:[
        "Cashew",
        "Coconut",
        "Vanilla",
        "Caramel"
    ],

    allergens:[
        "Nuts"
    ],

    nutrition:{
        calories:"390 kcal",
        protein:"8g",
        fat:"20g",
        carbs:"42g"
    }
},

{
    id:3,

    name:"Buffalo Wings",

    image:"images/wings.jpg",

    available:true,

    category:"Snack",

    shortDescription:
    "Spicy cauliflower buffalo wings.",

    description:
    `
    Crispy cauliflower wings with our
    homemade spicy buffalo sauce.
    `,

    ingredients:[
        "Cauliflower",
        "Spices",
        "Flour",
        "Sauce"
    ],

    allergens:[
        "Gluten"
    ],

    nutrition:{
        calories:"310 kcal",
        protein:"10g",
        fat:"12g",
        carbs:"35g"
    }
},

{
    id:4,

    name:"Sweet Potato Fries",

    image:"images/fries.jpg",

    available:true,

    category:"Snack",

    shortDescription:
    "Crispy sweet potato fries.",

    description:
    `
    Fresh sweet potatoes cooked with
    olive oil and herbs.
    `,

    ingredients:[
        "Sweet Potato",
        "Olive Oil",
        "Rosemary",
        "Salt"
    ],

    allergens:[
        "None"
    ],

    nutrition:{
        calories:"285 kcal",
        protein:"3g",
        fat:"8g",
        carbs:"45g"
    }
},

{
    id:5,

    name:"Spiked Almond Latte",

    image:"images/latte.jpg",

    available:true,

    category:"Drink",

    shortDescription:
    "Fresh almond milk latte.",

    description:
    `
    Smooth coffee with homemade almond milk.
    `,

    ingredients:[
        "Coffee",
        "Almond Milk"
    ],

    allergens:[
        "Nuts"
    ],

    nutrition:{
        calories:"120 kcal",
        protein:"4g",
        fat:"5g",
        carbs:"12g"
    }
},

{
    id:6,

    name:"Naughty Vegan Shake",

    image:"images/shake.jpg",

    available:true,

    category:"Drink",

    shortDescription:
    "Chocolate vegan shake.",

    description:
    `
    A rich chocolate shake made
    with vegan ingredients.
    `,

    ingredients:[
        "Cocoa",
        "Plant Milk",
        "Chocolate"
    ],

    allergens:[
        "Soy"
    ],

    nutrition:{
        calories:"350 kcal",
        protein:"12g",
        fat:"14g",
        carbs:"40g"
    }
}

];


// ===============================
// Functions
// ===============================

function getProduct(id){

    return products.find(product=>product.id==id);

}

function getDailyProduct(){

    return getProduct(DAILY_PRODUCT_ID);

}

function getMenuProducts(){

    return products.filter(product=>product.id!==DAILY_PRODUCT_ID);

}
