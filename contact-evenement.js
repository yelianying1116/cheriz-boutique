
document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // ELEMENTS
    // ==========================================

    const step1 = document.getElementById("step-1");
    const step2 = document.getElementById("step-2");
    const step3 = document.getElementById("step-3");

    const need = document.getElementById("need");
    const companySize = document.getElementById("company-size");
    const projectDescription =
        document.getElementById("project-description");

    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");

    const continue1 = document.getElementById("continue-1");
    const continue2 = document.getElementById("continue-2");

    const back2 = document.getElementById("back-2");
    const back3 = document.getElementById("back-3");

    const form = document.getElementById("step-3");
    const successMessage =
        document.getElementById("success-message");


    // ==========================================
    // SHOW STEP
    // ==========================================

    function showStep(stepNumber) {

        step1.classList.remove("active");
        step2.classList.remove("active");
        step3.classList.remove("active");

        if (stepNumber === 1) {
            step1.classList.add("active");
        }

        if (stepNumber === 2) {
            step2.classList.add("active");
        }

        if (stepNumber === 3) {
            step3.classList.add("active");
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    // ==========================================
    // STEP 1 → STEP 2
    // ==========================================

    continue1.addEventListener("click", function () {

        if (!need.value) {
            alert("Veuillez sélectionner votre besoin.");
            return;
        }

        showStep(2);
    });


    // ==========================================
    // STEP 2 → STEP 3
    // ==========================================

    continue2.addEventListener("click", function () {

        if (!companySize.value) {
            alert(
                "Veuillez sélectionner la taille et le type d'entreprise."
            );
            return;
        }

        showStep(3);
    });


    // ==========================================
    // STEP 2 → STEP 1
    // ==========================================

    back2.addEventListener("click", function () {
        showStep(1);
    });


    // ==========================================
    // STEP 3 → STEP 2
    // ==========================================

    back3.addEventListener("click", function () {
        showStep(2);
    });


    // ==========================================
    // STEP 3 → SEND
    // ==========================================

    form.addEventListener("submit", async function (event) {

        event.preventDefault();


        const nameValue = name.value.trim();
        const phoneValue = phone.value.trim();
        const emailValue = email.value.trim();


        // ------------------------------
        // VALIDATION NOM
        // ------------------------------

        if (!nameValue) {
            alert("Veuillez renseigner votre nom.");
            return;
        }


        // ------------------------------
        // VALIDATION TELEPHONE
        // ------------------------------

        if (!phoneValue) {
            alert("Veuillez renseigner votre téléphone.");
            return;
        }

        const phoneDigits =
            phoneValue.replace(/\D/g, "");

        if (phoneDigits.length < 8) {
            alert(
                "Veuillez renseigner un numéro de téléphone valide."
            );
            return;
        }


        // ------------------------------
        // VALIDATION EMAIL
        // ------------------------------

        if (!emailValue) {
            alert("Veuillez renseigner votre email.");
            return;
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(emailValue)) {
            alert(
                "Veuillez renseigner une adresse email valide."
            );
            return;
        }


        // ------------------------------
        // BOUTON ENVOI
        // ------------------------------

        const submitButton =
            form.querySelector(".submit-button");

        submitButton.disabled = true;
        submitButton.textContent = "Envoi...";


        // ------------------------------
        // ENVOI AU SERVEUR
        // ------------------------------

        try {

            const response = await fetch(
                "/send-event-request",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        need: need.value,

                        companySize:
                            companySize.value,

                        projectDescription:
                            projectDescription.value.trim(),

                        name: nameValue,

                        phone: phoneValue,

                        email: emailValue
                    })
                }
            );


            const result =
                await response.json();


            if (!response.ok || !result.success) {

                throw new Error(
                    result.message ||
                    "Une erreur est survenue lors de l'envoi."
                );
            }


            // ------------------------------
            // SUCCÈS
            // ------------------------------

            step1.classList.remove("active");
            step2.classList.remove("active");
            step3.classList.remove("active");

            successMessage.classList.add("active");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });


        } catch (error) {

            console.error(
                "Erreur contact événement :",
                error
            );

            alert(
                error.message ||
                "Une erreur est survenue lors de l'envoi."
            );

            submitButton.disabled = false;
            submitButton.textContent =
                "Envoyer ma demande";
        }

    });


    // ==========================================
    // INITIALISATION
    // ==========================================

    showStep(1);

});

