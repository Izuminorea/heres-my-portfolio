document.addEventListener("DOMContentLoaded", function () {
    var projectSwiper = new Swiper(".swiper-container", {
        loop: true,  // Infinite loop
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        slidesPerView: 1, // <-- Ito ang importante! Isa lang dapat makita
        spaceBetween: 10, // Distansya ng slides
        autoplay: {
            delay: 3000, // 3 seconds per slide
            disableOnInteraction: false,
        },
    });

    // Para sa bawat image slider sa loob ng projects
    document.querySelectorAll(".swiper-container-inner").forEach(function (el) {
        new Swiper(el, {
            loop: true,
            slidesPerView: 1, // Show only one image at a time
            spaceBetween: 10,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: el.querySelector(".swiper-button-next"),
                prevEl: el.querySelector(".swiper-button-prev"),
            },
        });
    });
});

//GFS Modal Script
document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("modalContainerGFS");
    var btn = document.getElementById("openModal2");
    var closeBtn = document.querySelector(".close");

    // Open modal when clicking the icon
    btn.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    // Close modal when clicking the close button
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close modal when clicking outside the content area
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

//APCBA Modal Script
document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("modalContainerAPCBA");
    var btn = document.getElementById("openModal1");
    var closeBtn = document.querySelector(".close");

    // Open modal when clicking the icon
    btn.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    // Close modal when clicking the close button
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close modal when clicking outside the content area
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

function openModal() {
    document.getElementById("emailModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("emailModal").style.display = "none";
}

function outsideClick(event) {
    let modal = document.getElementById("emailModal");
    if (event.target === modal) {
        closeModal();
    }
}

function sendEmail() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;

    fetch("/send_email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, subject, message })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        closeModal();
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to send email.");
    });
}