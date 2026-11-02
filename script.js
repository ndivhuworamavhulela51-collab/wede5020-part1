
document.addEventListener("DOMContentLoaded", function () {


    const galleryImages = document.querySelectorAll(".gallery img");

    if (galleryImages.length > 0) {

        const lightbox = document.createElement("div");
        lightbox.id = "lightbox";

        lightbox.innerHTML = `
            <span id="close-lightbox" aria-label="Close image">&times;</span>
            <img id="lightbox-image" src="" alt="Enlarged plumbing image">
        `;

        document.body.appendChild(lightbox);

        const lightboxImage = document.getElementById("lightbox-image");
        const closeButton = document.getElementById("close-lightbox");

        galleryImages.forEach(function (image) {

            image.addEventListener("click", function () {
                lightbox.style.display = "flex";
                lightboxImage.src = image.src;
                lightboxImage.alt = image.alt;
            });

        });

        closeButton.addEventListener("click", function () {
            lightbox.style.display = "none";
        });

        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                lightbox.style.display = "none";
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                lightbox.style.display = "none";
            }
        });

    }


    const searchInput = document.getElementById("serviceSearch");
    const serviceCards = document.querySelectorAll(".service");
    const noResults = document.getElementById("noResults");

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const searchText = searchInput.value.toLowerCase().trim();
            let visibleCount = 0;

            serviceCards.forEach(function (card) {

                const serviceName = card.textContent.toLowerCase();

                if (serviceName.includes(searchText)) {
                    card.style.display = "";
                    visibleCount++;
                } else {
                    card.style.display = "none";
                }

            });

            if (noResults) {
                noResults.style.display =
                    visibleCount === 0 ? "block" : "none";
            }

        });

    }


    const backToTop = document.createElement("button");

    backToTop.id = "backToTop";
    backToTop.textContent = "↑ Top";
    backToTop.setAttribute("aria-label", "Back to top");

    document.body.appendChild(backToTop);

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }

    });

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    document.documentElement.style.scrollBehavior = "smooth";

    const enquiryForm = document.getElementById("enquiryForm");
    const formMessage = document.getElementById("formMessage");

    if (enquiryForm) {

        enquiryForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const service = document.getElementById("service").value;
            const message = document.getElementById("message").value.trim();

            // Check empty fields
            if (!name || !email || !phone || !service || !message) {

                formMessage.textContent = "Please complete all fields.";
                formMessage.style.color = "red";
                return;

            }

            // Check name
            if (!/^[A-Za-z\s'-]{2,}$/.test(name)) {

                formMessage.textContent = "Please enter a valid name.";
                formMessage.style.color = "red";
                return;

            }

            // Check email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                formMessage.textContent = "Please enter a valid email address.";
                formMessage.style.color = "red";
                return;

            }

            // Check phone number
            const phonePattern = /^[0-9+\s()-]{7,20}$/;

            if (!phonePattern.test(phone)) {

                formMessage.textContent = "Please enter a valid phone number.";
                formMessage.style.color = "red";
                return;

            }

            // Check message length
            if (message.length < 10) {

                formMessage.textContent = "Please enter at least 10 characters in your enquiry.";
                formMessage.style.color = "red";
                return;

            }

            // Display successful validation message
            formMessage.textContent =
                "Your enquiry has passed validation. Thank you!";

            formMessage.style.color = "green";

            enquiryForm.reset();

        });

    }

});
