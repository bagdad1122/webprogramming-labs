document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. НАВІГАЦІЯ (ГАМБУРГЕР)
    // ==========================================
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");

    hamburgerBtn.addEventListener("click", () => {
        // Додаємо або забираємо клас 'open', що запускає CSS-анімацію max-height
        navMenu.classList.toggle("open");
    });


    // ==========================================
    // 2. КАРУСЕЛЬ СЛАЙДІВ
    // ==========================================
    const track = document.getElementById("carousel-track");
    const slides = document.querySelectorAll(".carousel-slide");
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");
    const dots = document.querySelectorAll(".dot");

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;

    // Функція оновлення каруселі (ковзання)
    function updateCarousel() {
        // Зміщуємо трек по осі X
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Оновлюємо активну крапку
        dots.forEach(dot => dot.classList.remove("active"));
        dots[currentIndex].classList.add("active");
    }

    // Наступний слайд
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }

    // Попередній слайд
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    // Запуск автоматичного гортання (кожні 3 секунди)
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 3000);
    }

    // Скидання таймера при ручному кліку (щоб не проскочило два слайди одразу)
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Обробники кліків по стрілках
    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoPlay();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoPlay();
    });

    // Обробники кліків по індикаторах (крапках)
    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            currentIndex = parseInt(e.target.getAttribute("data-index"));
            updateCarousel();
            resetAutoPlay();
        });
    });

    // Запускаємо автоплей при старті
    startAutoPlay();
});
