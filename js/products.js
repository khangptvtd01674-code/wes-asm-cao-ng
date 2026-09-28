document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.getElementById('productsGrid');
    const categoryRadios = document.querySelectorAll('input[name="cat"]');
    const filterSale = document.getElementById('filterSale');
    const filterNew = document.getElementById('filterNew');
    const sortSelect = document.getElementById('sortSelect');
    const pageTitle = document.getElementById('pageTitle');
    const noResults = document.getElementById('noResults');

    // Parse URL params
    const urlParams = new URLSearchParams(window.location.search);
    const initialCategory = urlParams.get('category');
    const initialSearch = urlParams.get('search');
    const initialSale = urlParams.get('sale');
    const initialNew = urlParams.get('new');

    let currentProducts = [...products];

    // Initial setup from URL
    if (initialCategory) {
        const radio = document.querySelector(`input[name="cat"][value="${initialCategory}"]`);
        if(radio) radio.checked = true;
    }
    if (initialSale === 'true') filterSale.checked = true;
    if (initialNew === 'true') filterNew.checked = true;

    const renderProducts = () => {
        if (currentProducts.length === 0) {
            productsGrid.style.display = 'none';
            noResults.style.display = 'block';
        } else {
            productsGrid.style.display = 'grid';
            noResults.style.display = 'none';
            productsGrid.innerHTML = currentProducts.map(createProductCard).join('');
        }
    };

    const applyFilters = () => {
        let filtered = [...products];
        let title = "Tất cả sản phẩm";

        // 1. Search
        if (initialSearch) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(initialSearch.toLowerCase()));
            title = `Kết quả tìm kiếm cho: "${initialSearch}"`;
        }

        // 2. Category
        const selectedCat = document.querySelector('input[name="cat"]:checked').value;
        if (selectedCat !== 'all') {
            filtered = filtered.filter(p => p.category === selectedCat);
            const titles = {
                mouse_keyboard: 'Chuột & Bàn phím',
                charger_cable: 'Sạc & Cáp kết nối',
                audio: 'Tai nghe & Loa',
                bag: 'Balo & Túi chống sốc',
                other: 'Phụ kiện khác'
            };
            if(!initialSearch) title = titles[selectedCat];
        }

        // 3. Status
        if (filterSale.checked) filtered = filtered.filter(p => p.isSale);
        if (filterNew.checked) filtered = filtered.filter(p => p.isNew);

        // 4. Sort
        const sortVal = sortSelect.value;
        if (sortVal === 'price-asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortVal === 'price-desc') {
            filtered.sort((a, b) => b.price - a.price);
        }

        currentProducts = filtered;
        pageTitle.innerText = title;
        renderProducts();
    };

    // Event Listeners
    categoryRadios.forEach(r => r.addEventListener('change', applyFilters));
    filterSale.addEventListener('change', applyFilters);
    filterNew.addEventListener('change', applyFilters);
    sortSelect.addEventListener('change', applyFilters);

    // Initial render
    applyFilters();
});
