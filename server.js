
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
        vip_credits
    )
    VALUES ($1, $2, $3, -1)

    ON CONFLICT (email)

    DO UPDATE SET

        name = EXCLUDED.name,
        phone = EXCLUDED.phone,
        vip_credits = -1,
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
// TEST SPECIAL MEMBER
// 临时测试账号
// ==========================================

app.get("/create-test-special-member", async (req, res) => {

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
            VALUES
            (
                'test-special-membre@cheriz.test',
                'Test Special Membre',
                '0000000000',
                FALSE,
                TRUE,
                0
            )

            ON CONFLICT (email)

            DO UPDATE SET

                special_member = TRUE,
                vip_unlimited = FALSE,
                updated_at = CURRENT_TIMESTAMP
            `
        );

        res.json({

            success: true,

            message:
                "Test special member created.",

            email:
                "test-special-membre@cheriz.test",

            special_member:
                true,

            vip_unlimited:
                false

        });

    } catch (error) {

        console.error(
            "Create test special member error:",
            error
        );

        res.status(500).json({

            success: false,

            error: error.message

        });

    }

});
// ==========================================
// ADD SPECIAL MEMBER
// ==========================================

app.get("/add-special-member", async (req, res) => {

    try {

        const email = req.query.email;
        const key = req.query.key;

        // 管理员密码检查
        if (key !== process.env.ADMIN_SECRET) {

            return res.status(403).json({
                success: false,
                error: "Accès refusé."
            });

        }

        if (!email) {

            return res.status(400).json({
                success: false,
                error: "Email manquant."
            });

        }

await pool.query(
    `
    INSERT INTO customers
    (
        email,
        special_member,
        vip_unlimited,
        vip_credits,
        special_credits
    )
    VALUES ($1, TRUE, FALSE, 3, 0)

    ON CONFLICT (email)

    DO UPDATE SET
        special_member = TRUE,
        vip_unlimited = FALSE,
        vip_credits = 3,
        updated_at = CURRENT_TIMESTAMP
    `,
    [email.trim().toLowerCase()]
);
        console.log(
            "SPECIAL MEMBER ADDED:",
            email
        );

        res.json({
            success: true,
            message: "Membre spécial ajouté avec succès.",
            email: email.trim().toLowerCase()
        });

    } catch (error) {

        console.error(
            "Add special member error:",
            error
        );

        res.status(500).json({
            success: false,
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
        // CHECK CART
        // ==========================================

        if (!cart || !Array.isArray(cart) || cart.length === 0) {

            return res.status(400).json({
                error: "Votre panier est vide."
            });

        }

        if (!customer || !customer.email) {

            return res.status(400).json({
                error: "Email client manquant."
            });

        }

        const customerEmail =
            customer.email.trim().toLowerCase();

        console.log("=================================");
        console.log("NOUVELLE COMMANDE");
        console.log("Client :", customer);
        console.log("Panier :", cart);
        console.log("=================================");

        // ==========================================
        // CHECK CUSTOMER
        // ==========================================

        const customerResult = await pool.query(
            `
            SELECT
                special_member,
                vip_credits,
                vip_unlimited
            FROM customers
            WHERE email = $1
            `,
            [customerEmail]
        );

        const customerData =
            customerResult.rows.length > 0
                ? customerResult.rows[0]
                : null;

        // ==========================================
        // ORDER PRICE
        // ==========================================

        const orderPrice =
            Number(cart[0].price);

        // ==========================================
        // SPECIAL MEMBER
        // ==========================================

        if (
            customerData &&
            customerData.special_member === true
        ) {

            // Special member can ONLY use 9.90 € VIP benefit
            if (orderPrice !== 9.90) {

                return res.status(403).json({
                    error:
                        "Votre compte membre spécial ne peut pas utiliser le tarif normal de 15,50 €."
                });

            }

            // No credits left
            if (
                Number(customerData.vip_credits) <= 0
            ) {

                return res.status(403).json({
                    error:
                        "Votre crédit VIP est épuisé."
                });

            }

        }

        // ==========================================
        // VIP 9.90 €
        // ==========================================

        let useVipCredit = false;

        if (orderPrice === 9.90) {

            if (!customerData) {

                return res.status(403).json({
                    error:
                        "Vous devez être membre VIP pour bénéficier du tarif de 9,90 €."
                });

            }

            // ==========================================
            // VIP UNLIMITED
            // ==========================================

            if (
                customerData.vip_unlimited === true
            ) {

                console.log(
                    "VIP UNLIMITED ORDER:",
                    customerEmail
                );

            }

            // ==========================================
            // SPECIAL MEMBER CREDIT
            // ==========================================

            else if (
                customerData.special_member === true &&
                Number(customerData.vip_credits) > 0
            ) {

                useVipCredit = true;

                console.log(
                    "SPECIAL MEMBER CREDIT ORDER:",
                    customerEmail,
                    "credits:",
                    customerData.vip_credits
                );

            }

            // ==========================================
            // NO VIP RIGHT
            // ==========================================

            else {

                return res.status(403).json({
                    error:
                        "Votre crédit VIP est épuisé."
                });

            }

        }

        // ==========================================
        // CREATE STRIPE LINE ITEMS
        // ==========================================

        const lineItems = cart.map(item => {

            let unitAmount =
                Math.round(
                    Number(item.price) * 100
                );

            // ==========================================
            // SPECIAL MEMBER CREDIT
            // 9.90 € benefit = 0 € actually paid
            // ==========================================

            if (
                useVipCredit &&
                Number(item.price) === 9.90
            ) {

                unitAmount = 0;

            }

            return {

                price_data: {

                    currency: "eur",

                    product_data: {

                        name: item.name

                    },

                    unit_amount: unitAmount

                },

                quantity:
                    Number(item.quantity)

            };

        });

        // ==========================================
        // CREATE STRIPE CHECKOUT SESSION
        // ==========================================

        const session =
            await stripe.checkout.sessions.create({

                mode: "payment",

                line_items: lineItems,

                customer_email:
                    customerEmail,

                metadata: {

                    customer_name:
                        customer.name || "",

                    customer_phone:
                        customer.phone || "",

                    delivery_address:
                        customer.address || "",

                    vip_credit_used:
                        useVipCredit ? "true" : "false"

                },

                success_url:
                    "https://cheriz.boutique.bienmangercommunity.com/success.html",

                cancel_url:
                    "https://cheriz.boutique.bienmangercommunity.com/checkout.html"

            });

        // ==========================================
        // RETURN STRIPE URL
        // ==========================================

        res.json({

            url: session.url

        });

    } catch (error) {

        console.error(
            "Stripe error:",
            error
        );

        res.status(500).json({

            error:
                "Impossible de créer le paiement."

        });

    }

});
// ==========================================
// TEMP - CHECK CUSTOMERS TABLE STRUCTURE
// ==========================================

app.get("/check-table", async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT
                column_name,
                data_type,
                column_default,
                is_nullable
            FROM information_schema.columns
            WHERE table_name = 'customers'
            ORDER BY ordinal_position
        `);

        res.json({
            success: true,
            columns: result.rows
        });

    } catch (error) {

        console.error(
            "Check table error:",
            error
        );

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

});
// ==========================================
// TEMP - ADD VIP CREDITS COLUMN
// ==========================================

app.get("/add-vip-credits-column", async (req, res) => {

    try {

        const key = req.query.key;

        if (key !== process.env.ADMIN_SECRET) {

            return res.status(403).json({
                success: false,
                error: "Accès refusé."
            });

        }

        await pool.query(`
            ALTER TABLE customers
            ADD COLUMN IF NOT EXISTS vip_credits INTEGER DEFAULT 0;
        `);

        res.json({
            success: true,
            message: "vip_credits column added successfully."
        });

    } catch (error) {

        console.error(
            "Add vip_credits column error:",
            error
        );

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

});
// ==========================================
// TEMP - LIST CUSTOMERS
// ==========================================

app.get("/list-customers", async (req, res) => {

    try {

        const key = req.query.key;

        if (key !== process.env.ADMIN_SECRET) {

            return res.status(403).json({
                success: false,
                error: "Accès refusé."
            });

        }

        const result = await pool.query(`
            SELECT
                email,
                name,
                vip_credits,
                vip_unlimited,
                special_member,
                special_credits
            FROM customers
            ORDER BY id
        `);

        res.json({
            success: true,
            customers: result.rows
        });

    } catch (error) {

        console.error(
            "List customers error:",
            error
        );

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

});
// ==========================================
// TEMP - MIGRATE VIP CREDITS
// ==========================================

app.get("/migrate-vip-credits", async (req, res) => {

    try {

        const key = req.query.key;

        if (key !== process.env.ADMIN_SECRET) {

            return res.status(403).json({
                success: false,
                error: "Accès refusé."
            });

        }

        const result = await pool.query(`
            UPDATE customers
            SET
                vip_credits = -1,
                updated_at = CURRENT_TIMESTAMP
            WHERE vip_unlimited = TRUE
        `);

        res.json({
            success: true,
            updated: result.rowCount,
            message: "VIP credits migrated successfully."
        });

    } catch (error) {

        console.error(
            "Migrate VIP credits error:",
            error
        );

        res.status(500).json({
            success: false,
            error: error.message
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
