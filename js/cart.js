// Lấy giỏ hàng từ localStorage
const getCart = () => {
    const cart = localStorage.getItem('techzone_cart');
    return cart ? JSON.parse(cart) : [];
};

// Lưu giỏ hàng
const saveCart = (cart) => {
    localStorage.setItem('techzone_cart', JSON.stringify(cart));
    updateCartCount();
    if(typeof renderCart === 'function') renderCart();
};

// Cập nhật số lượng trên header
const updateCartCount = () => {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const badge = document.getElementById('cartCount');
    if (badge) badge.innerText = count;
};

// Thêm vào giỏ
window.addToCart = (productId, quantity = 1) => {
    if(typeof products === 'undefined') {
        alert("Lỗi dữ liệu sản phẩm.");
        return;
    }
    const cart = getCart();
    const product = products.find(p => p.id === productId);
    
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    saveCart(cart);
    alert('Đã thêm sản phẩm vào giỏ hàng!');
};

window.removeFromCart = (productId) => {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
};

window.updateQuantity = (productId, change) => {
    let cart = getCart();
    const item = cart.find(i => i.id === productId);
    if(item) {
        item.quantity += change;
        if(item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
        saveCart(cart);
    }
};

// Render Cart Page
const renderCart = () => {
    const tbody = document.getElementById('cartTableBody');
    if(!tbody) return;
    
    const cart = getCart();
    if(cart.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 30px;">Giỏ hàng của bạn đang trống.<br><a href="products.html" style="color:var(--primary-color); display:inline-block; margin-top:10px;">Tiếp tục mua sắm</a></td></tr>`;
        document.getElementById('cartTotal').innerText = '0 đ';
        return;
    }

    let total = 0;
    tbody.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <tr>
                <td>
                    <div class="cart-product-info">
                        <img src="${item.image}" alt="${item.name}">
                        <p>${item.name}</p>
                    </div>
                </td>
                <td>${formatPrice(item.price)}</td>
                <td>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <input type="text" class="qty-input" value="${item.quantity}" readonly>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </td>
                <td style="font-weight:bold; color:var(--danger)">${formatPrice(itemTotal)}</td>
                <td><button class="btn-remove" onclick="removeFromCart(${item.id})"><i class="fas fa-trash-alt"></i></button></td>
            </tr>
        `;
    }).join('');

    document.getElementById('cartTotal').innerText = formatPrice(total);
};

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();
});
