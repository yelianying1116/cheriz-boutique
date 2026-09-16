
document.addEventListener("DOMContentLoaded", function () {
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

    /*
     * IMPORTANT :
     * Le formulaire est affiché sur le site Cheriz,
     * mais le serveur API fonctionne sur Render.
     */
    const API_URL = "https://cheriz-payment.onrender.com";

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

    continue1.addEventListener("click", function () {
        if (!need.value) {
            alert("Veuillez sélectionner votre besoin.");
            return;
        }

        showStep(2);
    });

    continue2.addEventListener("click", function () {
        if (!companySize.value) {
            alert(
                "Veuillez sélectionner la taille et le type d'entreprise."
            );
            return;
        }

        showStep(3);
    });

    back2.addEventListener("click", function () {
        showStep(1);
    });

    back3.addEventListener("click", function () {
        showStep(2);
    });

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const nameValue = name.value.trim();
        const phoneValue = phone.value.trim();
        const emailValue = email.value.trim();

        if (!nameValue) {
            alert("Veuillez renseigner votre nom.");
            return;
        }

        if (!phoneValue) {
            alert("Veuillez renseigner votre téléphone.");
            return;
        }

        const phoneDigits = phoneValue.replace(/\D/g, "");

        if (phoneDigits.length < 8) {
            alert(
                "Veuillez renseigner un numéro de téléphone valide."
            );
            return;
        }

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

        const submitButton =
            form.querySelector(".submit-button");

        submitButton.disabled = true;
        submitButton.textContent = "Envoi...";

        try {
            const response = await fetch(
                API_URL + "/send-event-request",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        need: need.value,
                        companySize: companySize.value,
                        projectDescription:
                            projectDescription.value.trim(),
                        name: nameValue,
                        phone: phoneValue,
                        email: emailValue
                    })
                }
            );

            const responseText =
                await response.text();

            console.log(
                "Réponse serveur :",
                response.status,
                responseText
            );

            if (
                responseText
                    .trim()
                    .startsWith("<")
            ) {
                throw new Error(
                    "Le serveur a renvoyé une page HTML au lieu de la réponse attendue."
                );
            }

            let result;

            try {
                result =
                    JSON.parse(responseText);
            } catch (jsonError) {
                console.error(
                    "Réponse serveur non JSON :",
                    responseText
                );

                throw new Error(
                    "Réponse invalide du serveur."
                );
            }

            if (
                !response.ok ||
                !result.success
            ) {
                throw new Error(
                    result.message ||
                    "Une erreur est survenue lors de l'envoi."
                );
            }

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

            alert(error.message);

            submitButton.disabled = false;
            submitButton.textContent =
                "Envoyer ma demande";
        }
    });

    showStep(1);
});
