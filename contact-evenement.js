```js
document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll(".event-step");

    const needSelect = document.getElementById("need");
    const companySizeSelect = document.getElementById("companySize");
    const projectDescription = document.getElementById("projectDescription");

    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");

    const continueStep1 = document.getElementById("continue-step-1");
    const continueStep2 = document.getElementById("continue-step-2");
    const backStep2 = document.getElementById("back-step-2");
    const backStep3 = document.getElementById("back-step-3");

    const eventForm = document.getElementById("event-form");
    const successMessage = document.getElementById("success-message");

    let currentStep = 1;

    function showStep(stepNumber) {
        steps.forEach(function (step) {
            step.classList.remove("active");
        });

        const targetStep = document.getElementById(
            "event-step-" + stepNumber
        );

        if (targetStep) {
            targetStep.classList.add("active");
        }

        currentStep = stepNumber;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // ==============================
    // STEP 1
    // ==============================

    if (continueStep1) {
        continueStep1.addEventListener("click", function (event) {
            event.preventDefault();

            if (!needSelect || !needSelect.value) {
                alert("Veuillez sélectionner votre besoin.");
                return;
            }

            showStep(2);
        });
    }

    // ==============================
    // STEP 2
    // ==============================

    if (continueStep2) {
        continueStep2.addEventListener("click", function (event) {
            event.preventDefault();

            if (!companySizeSelect || !companySizeSelect.value) {
                alert("Veuillez sélectionner la taille de votre entreprise.");
                return;
            }

            showStep(3);
        });
    }

    // ==============================
    // RETOUR STEP 2 -> STEP 1
    // ==============================

    if (backStep2) {
        backStep2.addEventListener("click", function (event) {
            event.preventDefault();
            showStep(1);
        });
    }

    // ==============================
    // RETOUR STEP 3 -> STEP 2
    // ==============================

    if (backStep3) {
        backStep3.addEventListener("click", function (event) {
            event.preventDefault();
            showStep(2);
        });
    }

    // ==============================
    // SUBMIT
    // ==============================

    if (eventForm) {
        eventForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const name = nameInput ? nameInput.value.trim() : "";
            const phone = phoneInput ? phoneInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";

            if (!name) {
                alert("Veuillez renseigner votre nom.");
                return;
            }

            if (!phone) {
                alert("Veuillez renseigner votre téléphone.");
                return;
            }

            const phoneDigits = phone.replace(/\D/g, "");

            if (phoneDigits.length < 8) {
                alert("Veuillez renseigner un numéro de téléphone valide.");
                return;
            }

            if (!email) {
                alert("Veuillez renseigner votre email.");
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                alert("Veuillez renseigner une adresse email valide.");
                return;
            }

            const submitButton = eventForm.querySelector(
                'button[type="submit"]'
            );

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Envoi...";
            }

            try {
                const response = await fetch("/send-event-request", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        need: needSelect ? needSelect.value : "",
                        companySize: companySizeSelect
                            ? companySizeSelect.value
                            : "",
                        projectDescription: projectDescription
                            ? projectDescription.value.trim()
                            : "",
                        name: name,
                        phone: phone,
                        email: email
                    })
                });

                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message ||
                        "Une erreur est survenue lors de l'envoi."
                    );
                }

                if (successMessage) {
                    successMessage.style.display = "block";
                }

                const formSteps = document.querySelectorAll(".event-step");

                formSteps.forEach(function (step) {
                    step.style.display = "none";
                });

                if (successMessage) {
                    successMessage.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }

            } catch (error) {
                console.error(
                    "Erreur envoi formulaire événement:",
                    error
                );

                alert(
                    error.message ||
                    "Une erreur est survenue lors de l'envoi."
                );

                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = "Envoyer ma demande";
                }
            }
        });
    }

    // ==============================
    // INITIALISATION
    // ==============================

    showStep(currentStep);
});
```
