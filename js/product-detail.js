document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        document.getElementById('detailContainer').innerHTML = "<h2>Không tìm thấy sản phẩm!</h2>";
        return;
    }

    document.title = product.name + " - TECHZONE";

    // Render detail
    const detailContainer = document.getElementById('detailContainer');
    
    let starsHtml = '';
    for(let i = 1; i <= 5; i++) {
        starsHtml += i <= product.rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
    }

    detailContainer.innerHTML = `
        <div class="detail-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="detail-info">
            <h1>${product.name}</h1>
            <div class="product-rating" style="font-size: 16px; margin-bottom: 15px;">
                ${starsHtml} <span style="color: #555; font-size: 14px;">(Đánh giá)</span>
            </div>
            <div class="price-box">
                <span class="price">${formatPrice(product.price)}</span>
                ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : ''}
            </div>
            <p class="detail-desc">${product.description}</p>
            
            <div class="quantity-box">
                <label style="font-weight: 500;">Số lượng:</label>
                <div class="quantity-control">
                    <button id="btnMinus">-</button>
                    <input type="number" id="qtyInput" value="1" min="1" readonly>
                    <button id="btnPlus">+</button>
                </div>
            </div>

            <div class="action-btns">
                <button class="btn-add-cart" id="btnAddCart"><i class="fas fa-cart-plus"></i> Thêm vào giỏ</button>
                <button class="btn-buy-now" id="btnBuyNow">Mua ngay</button>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #555;">
                <p><i class="fas fa-check-circle" style="color: green"></i> Bảo hành chính hãng 12 tháng</p>
                <p><i class="fas fa-sync" style="color: green"></i> 1 đổi 1 trong 30 ngày</p>
                <p><i class="fas fa-truck" style="color: green"></i> Giao hàng miễn phí toàn quốc</p>
            </div>
        </div>
    `;

    // Quantity logic
    const qtyInput = document.getElementById('qtyInput');
    document.getElementById('btnMinus').addEventListener('click', () => {
        let val = parseInt(qtyInput.value);
        if(val > 1) qtyInput.value = val - 1;
    });
    document.getElementById('btnPlus').addEventListener('click', () => {
        qtyInput.value = parseInt(qtyInput.value) + 1;
    });

    // Add to cart
    document.getElementById('btnAddCart').addEventListener('click', () => {
        addToCart(product.id, parseInt(qtyInput.value));
    });

    document.getElementById('btnBuyNow').addEventListener('click', () => {
        addToCart(product.id, parseInt(qtyInput.value));
        window.location.href = "cart.html";
    });

    // Related products
    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    if(relatedProducts.length > 0) {
        document.getElementById('relatedProducts').innerHTML = relatedProducts.map(createProductCard).join('');
    } else {
        document.getElementById('relatedProducts').innerHTML = "<p>Không có sản phẩm liên quan.</p>";
    }
});
