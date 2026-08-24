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
// STRIPE PAYMENT
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

    const deliveryAgreement =
        document.getElementById("delivery-agreement");


    // 检查客户资料

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


    // 检查配送条款

    if (
        deliveryAgreement &&
        !deliveryAgreement.checked
    ) {

        alert(
            "Veuillez lire et accepter les conditions de livraison."
        );

        return;
    }


    // 检查购物车

    if (
        !cart ||
        cart.length === 0
    ) {

        alert(
            "Votre panier est vide."
        );

        return;
    }


    // 找到付款按钮

    const payButton =
        document.querySelector(".pay");


    if (payButton) {

        payButton.disabled = true;

        payButton.textContent =
            "Préparation du paiement...";

    }


    try {

        const response = await fetch(

            "https://cheriz-payment.onrender.com/create-checkout-session",

            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    cart: cart,

                    customer: {

                        name: name,

                        phone: phone,

                        email: email,

                        address: address

                    }

                })

            }

        );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(

                data.error ||
                "Erreur lors de la préparation du paiement."

            );

        }


        // 跳转 Stripe

        window.location.href =
            data.url;


    } catch (error) {

        console.error(error);


        alert(

            "Une erreur est survenue. Veuillez réessayer."

        );


        if (payButton) {

            payButton.disabled = false;

            payButton.textContent =
                "Payer maintenant";

        }

    }

}


// ====================================
// INITIALISATION
// ====================================

showOrder();
