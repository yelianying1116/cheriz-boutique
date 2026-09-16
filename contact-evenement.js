
document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll(".event-step");

    const form = document.getElementById("event-form");

    const need = document.getElementById("need");
    const companySize = document.getElementById("companySize");
    const projectDescription = document.getElementById("projectDescription");

    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");

    const successMessage = document.getElementById("success-message");

    let currentStep = 1;

    function showStep(number) {
        steps.forEach(function (step) {
            step.classList.remove("active");
        });

        const step = document.getElementById("event-step-" + number);

        if (step) {
            step.classList.add("active");
        }

        currentStep = number;
    }

    // ==========================================
    // BOUTONS CONTINUER
    // ==========================================

    document.querySelectorAll(".continue-button").forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            if (currentStep === 1) {
                if (!need || !need.value) {
                    alert("Veuillez sélectionner votre besoin.");
                    return;
                }

                showStep(2);
                return;
            }

            if (currentStep === 2) {
                if (!companySize || !companySize.value) {
                    alert(
                        "Veuillez sélectionner la taille et le type d'entreprise."
                    );
                    return;
                }

                showStep(3);
                return;
            }
        });
    });

    // ==========================================
    // BOUTONS RETOUR
    // ==========================================

    document.querySelectorAll(".back-button").forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            if (currentStep === 2) {
                showStep(1);
            } else if (currentStep === 3) {
                showStep(2);
            }
        });
    });

    // ==========================================
    // ENVOI DU FORMULAIRE
    // ==========================================

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            const nameValue = name ? name.value.trim() : "";
            const phoneValue = phone ? phone.value.trim() : "";
            const emailValue = email ? email.value.trim() : "";

            if (!nameValue) {
                alert("Veuillez renseigner votre nom.");
                return;
            }

            if (!phoneValue) {
                alert("Veuillez renseigner votre téléphone.");
                return;
            }

            if (phoneValue.replace(/\D/g, "").length < 8) {
                alert("Veuillez renseigner un numéro de téléphone valide.");
                return;
            }

            if (!emailValue) {
                alert("Veuillez renseigner votre email.");
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(emailValue)) {
                alert("Veuillez renseigner une adresse email valide.");
                return;
            }

            const submitButton = form.querySelector(
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
                        need: need ? need.value : "",
                        companySize: companySize
                            ? companySize.value
                            : "",
                        projectDescription: projectDescription
                            ? projectDescription.value.trim()
                            : "",
                        name: nameValue,
                        phone: phoneValue,
                        email: emailValue
                    })
                });

                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message ||
                        "Une erreur est survenue lors de l'envoi."
                    );
                }

                steps.forEach(function (step) {
                    step.classList.remove("active");
                });

                if (successMessage) {
                    successMessage.style.display = "block";
                    successMessage.classList.add("active");
                }

            } catch (error) {
                console.error(error);

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

    // ==========================================
    // PREMIÈRE ÉTAPE AU CHARGEMENT
    // ==========================================

    showStep(1);
});

