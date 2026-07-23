// ===============================
// Boutique Products Database
// ===============================


const products = [


/*
=================================
 Plat du jour
 可以购买的每日推荐
=================================
*/


{
    id:1,

    type:"daily",

    name:"Vegan Mac 'N' Cheese",

    price:8.50,

    image:"images/mac.jpg",

    shortDescription:
    "Creamy vegan pasta with cashew cheese sauce.",


    description:
    `
    Our Vegan Mac 'N' Cheese is a delicious plant-based
    dish prepared with homemade cashew sauce,
    fresh herbs and crispy breadcrumbs.
    `,


    ingredients:
    [
        "Pasta",
        "Cashew",
        "Oat Milk",
        "Garlic",
        "Onion",
        "Mustard"
    ],


    allergens:
    [
        "Gluten",
        "Nuts"
    ],


    nutrition:
    {
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



/*
=================================
 Nos plats
 菜单展示，只介绍
=================================
*/


{
    id:2,

    type:"menu",

    name:"Vegan Cheesecake",

    image:"images/cake.jpg",


    shortDescription:
    "Creamy caramel vegan cheesecake.",


    description:
    `
    A smooth vegan cheesecake made with
    natural ingredients and a caramel flavor.
    `,


    ingredients:
    [
        "Cashew",
        "Coconut",
        "Vanilla",
        "Caramel"
    ],


    allergens:
    [
        "Nuts"
    ],


    nutrition:
    {
        calories:"390 kcal",
        protein:"8g",
        fat:"20g",
        carbs:"42g"
    }

},



{
    id:3,

    type:"menu",

    name:"Buffalo Wings",

    image:"images/wings.jpg",


    shortDescription:
    "Spicy cauliflower buffalo wings.",


    description:
    `
    Crispy cauliflower wings with our
    homemade spicy buffalo sauce.
    `,


    ingredients:
    [
        "Cauliflower",
        "Spices",
        "Flour",
        "Sauce"
    ],


    allergens:
    [
        "Gluten"
    ],


    nutrition:
    {
        calories:"310 kcal",
        protein:"10g",
        fat:"12g",
        carbs:"35g"
    }

},



{
    id:4,

    type:"menu",

    name:"Sweet Potato Fries",

    image:"images/fries.jpg",


    shortDescription:
    "Crispy sweet potato fries.",


    description:
    `
    Fresh sweet potatoes cooked with
    olive oil and herbs.
    `,


    ingredients:
    [
        "Sweet Potato",
        "Olive Oil",
        "Rosemary",
        "Salt"
    ],


    allergens:
    [
        "None"
    ],


    nutrition:
    {
        calories:"285 kcal",
        protein:"3g",
        fat:"8g",
        carbs:"45g"
    }

},



{
    id:5,

    type:"menu",

    name:"Spiked Almond Latte",

    image:"images/latte.jpg",


    shortDescription:
    "Fresh almond milk latte.",


    description:
    `
    Smooth coffee with homemade almond milk.
    `,


    ingredients:
    [
        "Coffee",
        "Almond Milk"
    ],


    allergens:
    [
        "Nuts"
    ],


    nutrition:
    {
        calories:"120 kcal",
        protein:"4g",
        fat:"5g",
        carbs:"12g"
    }

},



{
    id:6,

    type:"menu",

    name:"Naughty Vegan Shake",

    image:"images/shake.jpg",


    shortDescription:
    "Chocolate vegan shake.",


    description:
    `
    A rich chocolate shake made
    with vegan ingredients.
    `,


    ingredients:
    [
        "Cocoa",
        "Plant Milk",
        "Chocolate"
    ],


    allergens:
    [
        "Soy"
    ],


    nutrition:
    {
        calories:"350 kcal",
        protein:"12g",
        fat:"14g",
        carbs:"40g"
    }

}


];



// ===============================
// 获取单个产品
// ===============================


function getProduct(id){

    return products.find(
        product => product.id == id
    );

}



// ===============================
// 获取今日推荐
// ===============================


function getDailyProduct(){

    return products.find(
        product => product.type==="daily"
    );

}



// ===============================
// 获取菜单
// ===============================


function getMenuProducts(){

    return products.filter(
        product => product.type==="menu"
    );

}
