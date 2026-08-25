
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const { Resend } = require("resend");
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


    // ==========================================
    // CLIENT
    // ==========================================

    const customerName =
        session.metadata?.customer_name || "";

    const customerPhone =
        session.metadata?.customer_phone || "";

    const customerEmail =
        session.customer_email || "";

    const deliveryAddress =
        session.metadata?.delivery_address || "";


    // ==========================================
    // MONTANT
    // ==========================================

    const totalAmount =
        (session.amount_total / 100).toFixed(2);


    // ==========================================
    // PRODUITS
    // ==========================================

    const lineItems =
        await stripe.checkout.sessions.listLineItems(
            session.id
        );


    let productsHtml = "";


    lineItems.data.forEach(item => {

        const itemTotal =
            (item.amount_total / 100).toFixed(2);


        productsHtml += `

            <tr>

                <td style="padding:8px;">
                    ${item.description}
                </td>

                <td style="padding:8px;">
                    ${item.quantity}
                </td>

                <td style="padding:8px;">
                    ${itemTotal} €
                </td>

            </tr>

        `;

    });


    // ==========================================
    // LOG
    // ==========================================

    console.log("=================================");
    console.log("PAIEMENT STRIPE RÉUSSI");

    console.log(
        "Nom :",
        customerName
    );

    console.log(
        "Téléphone :",
        customerPhone
    );

    console.log(
        "Email :",
        customerEmail
    );

    console.log(
        "Adresse de livraison :",
        deliveryAddress
    );

    console.log(
        "Montant :",
        totalAmount,
        "€"
    );

    console.log(
        "Statut :",
        session.payment_status
    );

    console.log(
        "Produits commandés :"
    );


    lineItems.data.forEach(item => {

        console.log(
            "-",
            item.description,
            "x",
            item.quantity,
            "=",
            (item.amount_total / 100).toFixed(2),
            "€"
        );

    });


    // ==========================================
    // ENVOYER L'EMAIL
    // ==========================================

    try {

        const { data, error } =
            await resend.emails.send({

                from:
                    "Cheriz <onboarding@resend.dev>",

                to: [
                    "david139.doublet@gmail.com"
                ],

                subject:
                    `Nouvelle commande payée - ${totalAmount} €`,

                html: `

                    <h2>
                        Nouvelle commande payée
                    </h2>

                    <h3>
                        Client
                    </h3>

                    <p>
                        <strong>Nom :</strong>
                        ${customerName}
                    </p>

                    <p>
                        <strong>Téléphone :</strong>
                        ${customerPhone}
                    </p>

                    <p>
                        <strong>Email :</strong>
                        ${customerEmail}
                    </p>

                    <h3>
                        Livraison
                    </h3>

                    <p>
                        <strong>Adresse :</strong>
                        ${deliveryAddress}
                    </p>

                    <h3>
                        Commande
                    </h3>

                    <table
                        border="1"
                        cellpadding="0"
                        cellspacing="0"
                        style="border-collapse:collapse;"
                    >

                        <thead>

                            <tr>

                                <th style="padding:8px;">
                                    Produit
                                </th>

                                <th style="padding:8px;">
                                    Quantité
                                </th>

                                <th style="padding:8px;">
                                    Total
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            ${productsHtml}

                        </tbody>

                    </table>

                    <h3>
                        Total :
                        ${totalAmount} €
                    </h3>

                    <p>
                        <strong>
                            Paiement : PAID
                        </strong>
                    </p>

                `

            });


        if (error) {

            console.error(
                "Erreur Resend :",
                error
            );

        } else {

            console.log(
                "EMAIL ENVOYÉ AVEC SUCCÈS"
            );

            console.log(
                "Email ID :",
                data?.id
            );

        }

    } catch (emailError) {

        console.error(
            "Erreur envoi email :",
            emailError
        );

    }


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
const resend = new Resend(
    process.env.RESEND_API_KEY
);

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

    customer_email: customer.email,

    metadata: {

        customer_name: customer.name,

        customer_phone: customer.phone,

        delivery_address: customer.address

    },

    success_url:
        "https://cheriz.boutique.bienmangercommunity.com/success.html",

    cancel_url:
        "https://cheriz.boutique.bienmangercommunity.com/checkout.html"

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
