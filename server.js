
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const { Resend } = require("resend");
const app = express();
const { Pool } = require("pg");

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
// VIP MEMBERSHIP
// ==========================================

if (
    customerEmail &&
    Number(totalAmount) === 39.60
) {

    try {

        await pool.query(
            `
            INSERT INTO customers
            (
                email,
                name,
                phone,
                vip_unlimited,
                special_member,
                special_credits
            )
            VALUES ($1, $2, $3, TRUE, FALSE, 0)

            ON CONFLICT (email)

            DO UPDATE SET

                name = EXCLUDED.name,
                phone = EXCLUDED.phone,
                vip_unlimited = TRUE,
                special_member = FALSE,
                special_credits = 0,
                updated_at = CURRENT_TIMESTAMP
            `,
            [
                customerEmail,
                customerName,
                customerPhone
            ]
        );

        console.log(
            "VIP MEMBERSHIP ACTIVATED:",
            customerEmail
        );

    } catch (vipError) {

        console.error(
            "VIP membership database error:",
            vipError
        );

    }

}
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
// ENVOYER LES EMAILS
// ==========================================

try {

    // ==========================================
    // 1. EMAIL POUR CHERIZ
    // ==========================================

    const adminEmail = await resend.emails.send({

from:
    "Cheriz <commande@bienmangercommunity.com>",

        to: [
            "yelianying1116@gmail.com"
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


    // ==========================================
    // 2. EMAIL POUR LE CLIENT
    // ==========================================

    if (customerEmail) {

        const customerEmailResult =
            await resend.emails.send({

from:
    "Cheriz <commande@bienmangercommunity.com>",
                to: [
                    customerEmail
                ],

                subject:
                    "Paiement confirmé et commande enregistrée",

                html: `

                    <div
                        style="
                            font-family: Arial, sans-serif;
                            max-width: 600px;
                            margin: auto;
                            color: #6E4A44;
                            line-height: 1.6;
                        "
                    >

                        <h2
                            style="
                                color: #2F6D49;
                                text-align: center;
                            "
                        >
                            Paiement confirmé et commande enregistrée
                        </h2>

                        <p>
                            Bonjour ${customerName},
                        </p>

                        <p>
                            Nous avons bien reçu votre paiement
                            et votre commande a été enregistrée.
                        </p>

                        <h3>
                            Votre commande
                        </h3>

                        <table
                            border="1"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="
                                border-collapse: collapse;
                                margin-top: 15px;
                            "
                        >

                            <thead>

                                <tr>

                                    <th
                                        style="
                                            padding: 10px;
                                            text-align: left;
                                        "
                                    >
                                        Produit
                                    </th>

                                    <th
                                        style="
                                            padding: 10px;
                                            text-align: center;
                                        "
                                    >
                                        Quantité
                                    </th>

                                    <th
                                        style="
                                            padding: 10px;
                                            text-align: right;
                                        "
                                    >
                                        Total
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                ${productsHtml}

                            </tbody>

                        </table>

                        <h3
                            style="
                                margin-top: 20px;
                                color: #2F6D49;
                            "
                        >
                            Total payé :
                            ${totalAmount} €
                        </h3>

                        <p>
                            <strong>
                                Paiement : confirmé
                            </strong>
                        </p>

                        <p>
                            <strong>
                                Adresse de livraison :
                            </strong>
                            ${deliveryAddress}
                        </p>

                        <p>
                            Merci pour votre commande chez Cheriz.
                        </p>

                    </div>

                `

            });


        // ==========================================
        // CLIENT EMAIL LOG
        // ==========================================

        if (customerEmailResult.error) {

            console.error(
                "Erreur email client :",
                customerEmailResult.error
            );

        } else {

            console.log(
                "EMAIL CLIENT ENVOYÉ AVEC SUCCÈS"
            );

            console.log(
                "Email client :",
                customerEmail
            );

            console.log(
                "Email ID client :",
                customerEmailResult.data?.id
            );

        }

    }


    // ==========================================
    // ADMIN EMAIL LOG
    // ==========================================

    if (adminEmail.error) {

        console.error(
            "Erreur email Cheriz :",
            adminEmail.error
        );

    } else {

        console.log(
            "EMAIL CHERIZ ENVOYÉ AVEC SUCCÈS"
        );

        console.log(
            "Email ID Cheriz :",
            adminEmail.data?.id
        );

    }


} catch (emailError) {

    console.error(
        "Erreur générale envoi email :",
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
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
const resend = new Resend(
    process.env.RESEND_API_KEY
);

// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {

    res.send("Cheriz payment server is running.");

});

app.get("/test-database", async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT NOW()"
        );

        res.json({
            success: true,
            databaseTime: result.rows[0].now
        });

    } catch (error) {

        console.error("Database error:", error);

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

});


// ==========================================
// CREATE CUSTOMERS TABLE
// ==========================================

app.get("/create-customers-table", async (req, res) => {

    try {

        await pool.query(`

            CREATE TABLE IF NOT EXISTS customers (

                id SERIAL PRIMARY KEY,

                email TEXT UNIQUE NOT NULL,

                name TEXT,

                phone TEXT,

                vip_unlimited BOOLEAN DEFAULT FALSE,

                special_member BOOLEAN DEFAULT FALSE,

                special_credits INTEGER DEFAULT 0,

                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

            );

        `);

        res.json({

            success: true,

            message: "Customers table created."

        });

    } catch (error) {

        console.error(
            "Create customers table error:",
            error
        );

        res.status(500).json({

            success: false,

            error: error.message

        });

    }

});


// ==========================================
// CHECK CUSTOMER
// ==========================================

app.get("/check-customer", async (req, res) => {

    try {

        const email = req.query.email;

        if (!email) {

            return res.status(400).json({

                error: "请提供 email"

            });

        }

        const result = await pool.query(

            `

            SELECT

                email,

                name,

                phone,

                vip_unlimited,

                special_member,

                special_credits

            FROM customers

            WHERE email = $1

            `,

            [email]

        );

        if (result.rows.length === 0) {

            return res.json({

                found: false

            });

        }

        res.json({

            found: true,

            customer: result.rows[0]

        });

    } catch (error) {

        console.error(

            "Check customer error:",

            error

        );

        res.status(500).json({

            error: error.message

        });

    }

});
// ==========================================
// CREATE STRIPE CHECKOUT SESSION
// ==========================================

app.post("/create-checkout-session", async (req, res) => {

    try {

const { cart, customer } = req.body;
                // ==========================================
        // CHECK SPECIAL MEMBER
        // ==========================================

        if (customer && customer.email) {

            const customerResult = await pool.query(

                `
                SELECT
                    special_member
                FROM customers
                WHERE email = $1
                `,

                [customer.email]
            );


            if (
                customerResult.rows.length > 0 &&
                customerResult.rows[0].special_member === true
            ) {

                return res.status(403).json({

                    error:
                        "Ce tarif n'est pas disponible pour votre compte membre spécial."

                });

            }

        }

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
