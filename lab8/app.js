document.addEventListener("DOMContentLoaded", () => {
    
const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");

    hamburgerBtn.addEventListener("click", () => {
        navMenu.classList.toggle("open");
    });


    const track = document.getElementById("carousel-track");
    const slides = document.querySelectorAll(".carousel-slide");
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");
    const dots = document.querySelectorAll(".dot");

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;


    function updateCarousel() {

        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        

        dots.forEach(dot => dot.classList.remove("active"));
        dots[currentIndex].classList.add("active");
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 3000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoPlay();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoPlay();
    });

    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            currentIndex = parseInt(e.target.getAttribute("data-index"));
            updateCarousel();
            resetAutoPlay();
        });
    });

    startAutoPlay();
});
