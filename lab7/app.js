document.addEventListener("DOMContentLoaded", () => {
    
    const mainContent = document.getElementById("main-content");
    const homeLink = document.getElementById("home-link");
    const catalogLink = document.getElementById("catalog-link");

    // Оновлення сторінки при кліку на Home
    homeLink.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.reload();
    });

    // Завантаження каталогу при кліку на Catalog
    catalogLink.addEventListener("click", (e) => {
        e.preventDefault();
        loadCatalog();
    });

    // --- ФУНКЦІЯ ЗАВАНТАЖЕННЯ СПИСКУ КАТЕГОРІЙ ---
    async function loadCatalog() {
        try {
            const response = await fetch('data/categories.json');
            if (!response.ok) throw new Error("Помилка завантаження categories.json");
            
            const categories = await response.json();
            
            let html = `<h2 class="mb-4">Каталог товарів</h2><div class="list-group mb-4">`;
            
            categories.forEach(cat => {
                html += `
                    <a href="#" class="list-group-item list-group-item-action category-link" data-shortname="${cat.shortname}">
                        <h5 class="mb-1">${cat.name}</h5>
                        <small class="text-muted">ID: ${cat.id} | ${cat.notes}</small>
                    </a>
                `;
            });
            html += `</div>`;

            html += `
                <div class="mt-4 text-center">
                    <button id="specials-btn" class="btn btn-warning btn-lg">🌟 Specials (Випадкова категорія) 🌟</button>
                </div>
            `;

            mainContent.innerHTML = html;

            document.querySelectorAll(".category-link").forEach(link => {
                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    const shortname = e.currentTarget.getAttribute("data-shortname");
                    loadCategoryItems(shortname);
                });
            });

            document.getElementById("specials-btn").addEventListener("click", () => {
                const randomIndex = Math.floor(Math.random() * categories.length);
                const randomCategory = categories[randomIndex].shortname;
                loadCategoryItems(randomCategory);
            });

        } catch (error) {
            mainContent.innerHTML = `<div class="alert alert-danger">Помилка: ${error.message}</div>`;
        }
    }

    // --- ФУНКЦІЯ ЗАВАНТАЖЕННЯ ТОВАРІВ ТА ВІДОБРАЖЕННЯ КАРТИНОК ---
    async function loadCategoryItems(shortname) {
        try {
            const response = await fetch(`data/${shortname}.json`);
            if (!response.ok) throw new Error(`Помилка завантаження ${shortname}.json`);
            
            const data = await response.json();

            let html = `
                <button class="btn btn-secondary mb-3" id="back-btn">&larr; Повернутися до категорій</button>
                <h2 class="mb-4 text-primary">${data.categoryName}</h2>
                <div class="row">
            `;

            data.items.forEach(item => {
                // Визначаємо джерело картинки: якщо є в JSON - беремо її, якщо ні - ставимо заглушку
                const imgSrc = item.image ? item.image : `https://placehold.co/200x200/e9ecef/495057?text=${encodeURIComponent(item.shortname)}`;
                
                html += `
                    <div class="col-md-6 col-lg-3 mb-4">
                        <div class="card h-100 shadow-sm">
                            <img src="${imgSrc}" class="card-img-top p-2" alt="${item.name}" style="height: 200px; object-fit: contain;">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text text-muted" style="font-size: 0.9em;">ID: ${item.id} | ${item.shortname}</p>
                                <p class="card-text flex-grow-1">${item.description}</p>
                                <h4 class="text-success mt-2">${item.price}</h4>
                            </div>
                        </div>
                    </div>
                `;
            });

            html += `</div>`;
            mainContent.innerHTML = html;

            document.getElementById("back-btn").addEventListener("click", () => {
                loadCatalog();
            });

        } catch (error) {
            mainContent.innerHTML = `<div class="alert alert-danger">Помилка: ${error.message}</div>
                                     <button class="btn btn-secondary" id="back-btn">&larr; Назад</button>`;
            document.getElementById("back-btn").addEventListener("click", loadCatalog);
        }
    }
});
