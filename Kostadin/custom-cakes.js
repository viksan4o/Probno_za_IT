document.addEventListener("DOMContentLoaded", function() {
    const cakeOrderForm = document.getElementById("cakeOrderForm");
    const successMessageContainer = document.getElementById("successMessageContainer");

    cakeOrderForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const requiredFields = cakeOrderForm.querySelectorAll("[required]");
        let isValid = true;

        requiredFields.forEach(field => {
            field.classList.remove("error");
        });

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add("error");
            }
        });

        if (isValid) {
            successMessageContainer.textContent = "Благодарим! Ще се свържем с Вас за потвърждение до 24 часа.";
            successMessageContainer.classList.remove("hidden");
            successMessageContainer.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            cakeOrderForm.reset();
        } else {
            alert("Моля попълнете всички задължителни полета!");
        }
    });
});