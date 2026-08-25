
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");

const app = express();

app.use(cors());
// ==========================================
// STRIPE WEBHOOK
// ==========================================

app.post(
    "/stripe-webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {

        const sig = req.headers["stripe-signature"];

        let event;

        try {

            event = stripe.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );

        } catch (err) {

            console.error(
                "Webhook signature verification failed:",
                err.message
            );

            return res.status(400).send(
                `Webhook Error: ${err.message}`
            );

        }


        // ==========================================
        // PAYMENT SUCCESS
        // ==========================================

        if (event.type === "checkout.session.completed") {

            const session = event.data.object;

            console.log("=================================");
            console.log("PAIEMENT STRIPE RÉUSSI");
            console.log("Session ID :", session.id);
            console.log("Montant :", session.amount_total / 100, "€");
            console.log("Email :", session.customer_details?.email);
            console.log("=================================");

        }


        res.json({
            received: true
        });

    }
);
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Stripe Secret Key
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {

    res.send("Cheriz payment server is running.");

});


// ==========================================
// CREATE STRIPE CHECKOUT SESSION
// ==========================================

app.post("/create-checkout-session", async (req, res) => {

    try {

const { cart, customer } = req.body;

        if (!cart || !Array.isArray(cart) || cart.length === 0) {

            return res.status(400).json({
                error: "Votre panier est vide."
            });

        }

console.log("=================================");
console.log("NOUVELLE COMMANDE");
console.log("Client :", customer);
console.log("Panier :", cart);
console.log("=================================");
        const lineItems = cart.map(item => ({

            price_data: {

                currency: "eur",

                product_data: {

                    name: item.name

                },

                unit_amount: Math.round(
                    Number(item.price) * 100
                )

            },

            quantity: Number(item.quantity)

        }));


        const session = await stripe.checkout.sessions.create({

            mode: "payment",

            line_items: lineItems,

            success_url:
                "https://cheriz.boutique.bienmangercommunity.com/success.html",

            cancel_url:
                "https://cheriz.boutique.bienmangercommunity.com/checkout.html",

        });


        res.json({

            url: session.url

        });


    } catch (error) {

        console.error("Stripe error:", error);

        res.status(500).json({

            error: "Impossible de créer le paiement."

        });

    }

});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {

    console.log(
        `Cheriz payment server running on port ${PORT}`
    );

});
