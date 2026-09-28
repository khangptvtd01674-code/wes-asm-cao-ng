document.addEventListener('DOMContentLoaded', () => {
    // 1. Hiển thị thông tin user nếu đã đăng nhập
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        const userNameDisplay = document.getElementById('userNameDisplay');
        if(userNameDisplay) userNameDisplay.textContent = currentUser.name;
        
        const userBtn = document.getElementById('userBtn');
        if(userBtn) {
            if (currentUser.role === 'admin') {
                userBtn.href = "admin.html";
            } else {
                userBtn.href = "account.html";
            }
        }
    }

    // 2. Render sản phẩm trang chủ
    if (document.getElementById('newProducts')) {
        const newProducts = products.filter(p => p.isNew).slice(0, 4);
        document.getElementById('newProducts').innerHTML = newProducts.map(createProductCard).join('');
    }

    if (document.getElementById('bestSellerProducts')) {
        const bestSeller = products.filter(p => p.isHot).slice(0, 4);
        document.getElementById('bestSellerProducts').innerHTML = bestSeller.map(createProductCard).join('');
    }

    if (document.getElementById('flashSaleProducts')) {
        const flashSale = products.filter(p => p.isSale).slice(0, 4);
        document.getElementById('flashSaleProducts').innerHTML = flashSale.map(createProductCard).join('');
    }

    // 3. Chức năng tìm kiếm Live Search
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchBtn = document.getElementById('searchBtn');

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            if (query.length > 0) {
                const results = products.filter(p => p.name.toLowerCase().includes(query)).slice(0, 5);
                if (results.length > 0) {
                    searchResults.innerHTML = results.map(p => `
                        <a href="product-detail.html?id=${p.id}" class="search-result-item">
                            <img src="${p.image}" alt="${p.name}">
                            <div>
                                <div style="font-size: 14px; font-weight: 500; color: #333;">${p.name}</div>
                                <div style="color: #e74c3c; font-weight: bold; font-size: 13px;">${formatPrice(p.price)}</div>
                            </div>
                        </a>
                    `).join('');
                } else {
                    searchResults.innerHTML = `<div style="padding: 10px; text-align: center; color: #777;">Không tìm thấy sản phẩm phù hợp.</div>`;
                }
                searchResults.classList.add('active');
            } else {
                searchResults.classList.remove('active');
            }
        });

        // Đóng search result khi click ra ngoài
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });

        // Nút search -> chuyển trang
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if(query) {
                window.location.href = `products.html?search=${encodeURIComponent(query)}`;
            }
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') searchBtn.click();
        });
    }
});
