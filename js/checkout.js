// ====================================
// CHECKOUT
// ====================================

let cart = JSON.parse(
    localStorage.getItem("cart")
) || [];

const orderBox = document.getElementById("order-list");
const totalBox = document.getElementById("total");

let total = 0;


// ====================================
// 显示订单
// ====================================

function showOrder() {

    orderBox.innerHTML = "";
    total = 0;

    cart.forEach(item => {

        const price = item.price * item.quantity;

        total += price;

        orderBox.innerHTML += `

            <div class="order-item">

                <span>
                    ${item.name} x${item.quantity}
                </span>

                <span>
                    ${price.toFixed(2)} €
                </span>

            </div>

        `;

    });

    totalBox.textContent = total.toFixed(2);

}


// ====================================
// 提交订单
// ====================================

async function submitOrder() {

    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const address =
        document.getElementById("address").value.trim();
    // 检查客户信息

    if (
        name === "" ||
        phone === "" ||
        email === "" ||
        address === ""
    ) {

        alert(
            "Veuillez remplir toutes vos informations."
        );

        return;
    }


    // 检查购物车

    if (cart.length === 0) {

        alert(
            "Votre panier est vide."
        );

        return;
    }


    // ====================================
    // 等待提示
    // ====================================

    const payButton =
        document.querySelector(".pay");

    payButton.disabled = true;

    payButton.textContent =
        "Préparation du paiement...";


    try {

        // ====================================
        // 发送订单到 Render
        // ====================================

        const response = await fetch(
            "https://cheriz-payment.onrender.com/create-checkout-session",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    customer: {

                        name: name,

                        phone: phone,

                        email: email,

                        address: address

                    },

                    cart: cart

                })

            }
        );


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Une erreur est survenue."
            );

        }


        // ====================================
        // 前往 Stripe
        // ====================================

        window.location.href = data.url;


    } catch (error) {

        console.error(error);

        alert(
            "Impossible de préparer le paiement. Veuillez réessayer."
        );


        payButton.disabled = false;

        payButton.textContent =
            "Payer maintenant";

    }

}


// ====================================
// INITIALISATION
// ====================================

showOrder();
