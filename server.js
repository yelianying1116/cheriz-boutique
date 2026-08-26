
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const { Resend } = require("resend");
const { randomUUID } = require("crypto");
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
        // RELEASE AN UNUSED RESERVED CREDIT
        // ==========================================

        if (event.type === "checkout.session.expired") {

            const expiredSession = event.data.object;
            const reservationId =
                expiredSession.metadata?.vip_credit_reservation_id;

            if (reservationId) {
                await releaseVipCreditReservation(reservationId);
            }

            return res.json({ received: true });
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

    const vipCreditUsed =
        session.metadata?.vip_credit_used === "true";

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
        vip_credits
    )
    VALUES ($1, $2, $3, TRUE, -1)

    ON CONFLICT (email)

    DO UPDATE SET

        name = EXCLUDED.name,
        phone = EXCLUDED.phone,
        vip_unlimited = TRUE,
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

    // A reserved credit is consumed only after Stripe confirms completion.
    if (
        customerEmail &&
        vipCreditUsed &&
        session.metadata?.vip_credit_reservation_id &&
        ["paid", "no_payment_required"].includes(session.payment_status)
    ) {

        await consumeVipCreditReservation(
            session.metadata.vip_credit_reservation_id,
            customerEmail
        );
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

const VIP_PRICE = 9.90;
const NORMAL_PRICE = 15.50;
const VIP_MEMBERSHIP_PRICE = 39.60;
const VIP_CREDIT_RESERVATION_MS = 30 * 60 * 1000;

async function ensureVipCreditReservationTable(client) {

    await client.query(`
        CREATE TABLE IF NOT EXISTS vip_credit_reservations (
            reservation_id TEXT PRIMARY KEY,
            customer_email TEXT NOT NULL,
            stripe_session_id TEXT UNIQUE,
            status TEXT NOT NULL CHECK (status IN ('reserved', 'consumed', 'released')),
            expires_at TIMESTAMPTZ NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
            consumed_at TIMESTAMPTZ,
            released_at TIMESTAMPTZ
        )
    `);
}

async function releaseExpiredVipCreditReservations(client) {

    await client.query(`
        WITH expired AS (
            UPDATE vip_credit_reservations
            SET status = 'released', released_at = CURRENT_TIMESTAMP
            WHERE status = 'reserved'
              AND expires_at <= CURRENT_TIMESTAMP
            RETURNING customer_email
        ), released AS (
            SELECT customer_email, COUNT(*)::INTEGER AS credit_count
            FROM expired
            GROUP BY customer_email
        )
        UPDATE customers AS customer
        SET vip_credits = customer.vip_credits + released.credit_count,
            updated_at = CURRENT_TIMESTAMP
        FROM released
        WHERE customer.email = released.customer_email
    `);
}

async function reserveVipCredit(customerEmail) {

    const client = await pool.connect();

    try {

        await client.query("BEGIN");
        await ensureVipCreditReservationTable(client);
        await releaseExpiredVipCreditReservations(client);

        const credit = await client.query(
            `
            UPDATE customers
            SET vip_credits = vip_credits - 1,
                updated_at = CURRENT_TIMESTAMP
            WHERE email = $1
              AND special_member = TRUE
              AND vip_credits > 0
            RETURNING vip_credits
            `,
            [customerEmail]
        );

        if (credit.rowCount !== 1) {
            await client.query("ROLLBACK");
            return null;
        }

        const reservationId = randomUUID();
        const expiresAt = new Date(
            Date.now() + VIP_CREDIT_RESERVATION_MS
        );

        await client.query(
            `
            INSERT INTO vip_credit_reservations
                (reservation_id, customer_email, status, expires_at)
            VALUES ($1, $2, 'reserved', $3)
            `,
            [reservationId, customerEmail, expiresAt]
        );

        await client.query("COMMIT");

        return { reservationId, expiresAt };

    } catch (error) {

        await client.query("ROLLBACK");
        throw error;

    } finally {

        client.release();

    }
}

async function linkVipCreditReservation(reservationId, stripeSessionId) {

    await pool.query(
        `
        UPDATE vip_credit_reservations
        SET stripe_session_id = $2
        WHERE reservation_id = $1
          AND status = 'reserved'
        `,
        [reservationId, stripeSessionId]
    );
}

async function consumeVipCreditReservation(reservationId, customerEmail) {

    const client = await pool.connect();

    try {

        await client.query("BEGIN");

        const consumed = await client.query(
            `
            UPDATE vip_credit_reservations
            SET status = 'consumed', consumed_at = CURRENT_TIMESTAMP
            WHERE reservation_id = $1
              AND customer_email = $2
              AND status = 'reserved'
              AND expires_at > CURRENT_TIMESTAMP
            RETURNING reservation_id
            `,
            [reservationId, customerEmail]
        );

        await client.query("COMMIT");

        if (consumed.rowCount === 1) {
            console.log("VIP CREDIT CONSUMED:", customerEmail);
        }

    } catch (error) {

        await client.query("ROLLBACK");
        throw error;

    } finally {

        client.release();

    }
}

async function releaseVipCreditReservation(reservationId) {

    const client = await pool.connect();

    try {

        await client.query("BEGIN");

        const released = await client.query(
            `
            UPDATE vip_credit_reservations
            SET status = 'released', released_at = CURRENT_TIMESTAMP
            WHERE reservation_id = $1
              AND status = 'reserved'
            RETURNING customer_email
            `,
            [reservationId]
        );

        if (released.rowCount === 1) {
            await client.query(
                `
                UPDATE customers
                SET vip_credits = vip_credits + 1,
                    updated_at = CURRENT_TIMESTAMP
                WHERE email = $1
                `,
                [released.rows[0].customer_email]
            );
        }

        await client.query("COMMIT");

    } catch (error) {

        await client.query("ROLLBACK");
        throw error;

    } finally {

        client.release();

    }
}

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

    let vipCreditReservation = null;

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

        const orderPrice = Number(cart[0].price);
        const allowedPrices = [
            NORMAL_PRICE,
            VIP_PRICE,
            VIP_MEMBERSHIP_PRICE
        ];

        const validCart = cart.every(item =>
            Number(item.price) === orderPrice &&
            Number.isInteger(Number(item.quantity)) &&
            Number(item.quantity) > 0
        );

        if (!allowedPrices.includes(orderPrice) || !validCart) {

            return res.status(400).json({
                error: "Panier ou tarif non valide."
            });

        }

        if (
            orderPrice === VIP_MEMBERSHIP_PRICE &&
            (cart.length !== 1 || Number(cart[0].quantity) !== 1)
        ) {

            return res.status(400).json({
                error: "L'adhésion VIP ne peut être commandée qu'une fois."
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

        // ==========================================
        // SPECIAL MEMBER
        // ==========================================

        if (customerData?.special_member === true) {

            // Special members may only order through their remaining 9.90 EUR credits.
            if (orderPrice !== 9.90) {

                return res.status(403).json({
                    error:
                        "Votre compte membre spécial ne peut pas utiliser le tarif normal de 15,50 €."
                });

            }

            // No credits left
            if (Number(customerData.vip_credits) <= 0) {

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

        if (orderPrice === VIP_PRICE) {

            if (!customerData) {

        return res.status(403).json({
           error:
             "Offre réservée aux membres VIP. Accessible après 39,60 € de paiements cumulés."
              });

            }

            // ==========================================
            // VIP UNLIMITED
            // ==========================================

            if (customerData.special_member === true) {

                if (Number(customerData.vip_credits) <= 0) {

                    return res.status(403).json({
                        error: "Votre crédit VIP est épuisé."
                    });

                }

                useVipCredit = true;

                console.log(
                    "SPECIAL MEMBER CREDIT ORDER:",
                    customerEmail,
                    "credits:",
                    customerData.vip_credits
                );

            }

            // Customers who paid 39.60 EUR are VIP and may pay 9.90 EUR.
            else if (customerData.vip_unlimited === true) {

                console.log(
                    "VIP UNLIMITED ORDER:",
                    customerEmail
                );

            }

            // ==========================================
            // SPECIAL MEMBER CREDIT
            // ==========================================

            else {

                return res.status(403).json({
                    error:
                        "Votre crédit VIP est épuisé."
                });

            }

        }

        // Reserve one special-member credit before creating a free checkout.
        // This prevents concurrent sessions from using the same remaining credit.
        if (useVipCredit) {

            if (
                cart.length !== 1 ||
                Number(cart[0].quantity) !== 1
            ) {

                return res.status(400).json({
                    error:
                        "Un crédit VIP spécial couvre un seul plat du jour."
                });

            }

            vipCreditReservation =
                await reserveVipCredit(customerEmail);

            if (!vipCreditReservation) {

                return res.status(403).json({
                    error: "Votre crédit VIP est épuisé."
                });

            }

        }

        // ==========================================
        // CREATE STRIPE LINE ITEMS
        // ==========================================

        const productName =
            orderPrice === VIP_MEMBERSHIP_PRICE
                ? "Adhésion VIP + Plat du jour"
                : "Plat du jour";

        const lineItems = cart.map(item => {

            let unitAmount =
                Math.round(orderPrice * 100);

            // ==========================================
            // SPECIAL MEMBER CREDIT
            // 9.90 € benefit = 0 € actually paid
            // ==========================================

            if (
                useVipCredit &&
                orderPrice === VIP_PRICE
            ) {

                unitAmount = 0;

            }

            return {

                price_data: {

                    currency: "eur",

                    product_data: {

                        name: productName

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

                expires_at: vipCreditReservation
                    ? Math.floor(
                        vipCreditReservation.expiresAt.getTime() / 1000
                    )
                    : undefined,

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
                        useVipCredit ? "true" : "false",

                    vip_credit_reservation_id:
                        vipCreditReservation
                            ? vipCreditReservation.reservationId
                            : ""

                },

                success_url:
                    "https://cheriz.boutique.bienmangercommunity.com/success.html",

                cancel_url:
                    "https://cheriz.boutique.bienmangercommunity.com/checkout.html"

            });

        if (vipCreditReservation) {
            await linkVipCreditReservation(
                vipCreditReservation.reservationId,
                session.id
            );
        }

        // ==========================================
        // RETURN STRIPE URL
        // ==========================================

        res.json({

            url: session.url

        });

    } catch (error) {

        if (vipCreditReservation) {
            try {
                await releaseVipCreditReservation(
                    vipCreditReservation.reservationId
                );
            } catch (releaseError) {
                console.error(
                    "VIP credit release error:",
                    releaseError
                );
            }
        }

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
