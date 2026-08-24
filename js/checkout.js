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
// 暂时的付款按钮
// ====================================

function submitOrder() {

    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const address =
        document.getElementById("address").value.trim();


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


    alert(
        "Les informations sont correctement remplies. Le paiement Stripe sera ajouté à cette étape."
    );

}


// ====================================
// INITIALISATION
// ====================================

showOrder();
