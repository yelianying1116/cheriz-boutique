```javascript
document.addEventListener("DOMContentLoaded", function () {

    const form =
        document.getElementById("event-form");

    const steps =
        document.querySelectorAll(".event-step");

    const successMessage =
        document.getElementById("success-message");


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const need =
        document.getElementById("need");

    const companySize =
        document.getElementById("company-size");

    const projectDescription =
        document.getElementById("project-description");

    const name =
        document.getElementById("name");

    const phone =
        document.getElementById("phone");

    const email =
        document.getElementById("email");


    const step1Continue =
        document.getElementById("step1-continue");

    const step2Continue =
        document.getElementById("step2-continue");

    const step2Back =
        document.getElementById("step2-back");

    const step3Back =
        document.getElementById("step3-back");

    const submitButton =
        document.getElementById("submit-button");


    const needError =
        document.getElementById("need-error");

    const companySizeError =
        document.getElementById("company-size-error");

    const nameError =
        document.getElementById("name-error");

    const phoneError =
        document.getElementById("phone-error");

    const emailError =
        document.getElementById("email-error");

    const submitError =
        document.getElementById("submit-error");


    /* =====================================================
       CHANGE STEP
    ===================================================== */

    function showStep(stepNumber) {

        steps.forEach(function (step) {

            step.classList.remove("active");

        });


        const targetStep =
            document.querySelector(
                '.event-step[data-step="' +
                stepNumber +
                '"]'
            );


        if (targetStep) {

            targetStep.classList.add("active");

        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =====================================================
       CLEAR ERRORS
    ===================================================== */

    function clearError(element) {

        if (element) {

            element.classList.remove("show");

        }

    }


    function showError(element) {

        if (element) {

            element.classList.add("show");

        }

    }


    /* =====================================================
       STEP 1
    ===================================================== */

    step1Continue.addEventListener("click", function () {

        clearError(needError);


        if (!need.value) {

            showError(needError);

            need.focus();

            return;

        }


        showStep(2);

    });


    /* =====================================================
       STEP 2
    ===================================================== */

    step2Continue.addEventListener("click", function () {

        clearError(companySizeError);


        if (!companySize.value) {

            showError(companySizeError);

            companySize.focus();

            return;

        }


        showStep(3);

    });


    /* =====================================================
       BACK BUTTON
    ===================================================== */

    step2Back.addEventListener("click", function () {

        showStep(1);

    });


    step3Back.addEventListener("click", function () {

        showStep(2);

    });


    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    function isValidEmail(value) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            value
        );

    }


    /* =====================================================
       PHONE VALIDATION
    ===================================================== */

    function isValidPhone(value) {

        const digits =
            value.replace(/\D/g, "");

        return digits.length >= 8;

    }


    /* =====================================================
       SUBMIT
    ===================================================== */

    form.addEventListener("submit", async function (event) {

        event.preventDefault();


        clearError(nameError);
        clearError(phoneError);
        clearError(emailError);

        submitError.textContent = "";
        clearError(submitError);


        let valid = true;


        /* =========================
           NAME
        ========================== */

        if (!name.value.trim()) {

            showError(nameError);

            valid = false;

        }


        /* =========================
           PHONE
        ========================== */

        if (!phone.value.trim()) {

            showError(phoneError);

            valid = false;

        }

        else if (!isValidPhone(phone.value.trim())) {

            phoneError.textContent =
                "Veuillez renseigner un numéro de téléphone valide.";

            showError(phoneError);

            valid = false;

        }


        /* =========================
           EMAIL
        ========================== */

        if (!email.value.trim()) {

            showError(emailError);

            valid = false;

        }

        else if (!isValidEmail(email.value.trim())) {

            showError(emailError);

            valid = false;

        }


        if (!valid) {

            return;

        }


        /* =========================
           BUTTON LOADING
        ========================== */

        submitButton.disabled = true;

        submitButton.classList.add("loading");

        submitButton.textContent =
            "Envoi en cours...";


        try {

            const response =
                await fetch(
                    "/send-event-request",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            need:
                                need.value,

                            companySize:
                                companySize.value,

                            projectDescription:
                                projectDescription.value.trim(),

                            name:
                                name.value.trim(),

                            phone:
                                phone.value.trim(),

                            email:
                                email.value.trim()

                        })

                    }
                );


            const result =
                await response.json();


            if (!response.ok || !result.success) {

                throw new Error(
                    result.message ||
                    "Une erreur est survenue."
                );

            }


            /* =========================
               SUCCESS
            ========================== */

            steps.forEach(function (step) {

                step.classList.remove("active");

            });


            successMessage.classList.add("show");


            form.reset();


        }

        catch (error) {

            console.error(
                "Erreur:",
                error
            );


            submitError.textContent =
                "Impossible d'envoyer votre demande. Veuillez réessayer.";

            showError(submitError);

        }

        finally {

            submitButton.disabled = false;

            submitButton.classList.remove("loading");

            submitButton.textContent =
                "Envoyer ma demande";

        }

    });

});
```
