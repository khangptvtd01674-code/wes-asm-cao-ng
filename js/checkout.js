document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('techzone_cart')) || [];
    if(cart.length === 0) {
        alert("Giỏ hàng trống! Đang chuyển về trang chủ.");
        window.location.href = "index.html";
        return;
    }

    // Render items
    const checkoutItems = document.getElementById('checkoutItems');
    let total = 0;
    checkoutItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="checkout-item">
                <div class="checkout-item-name">${item.name} x ${item.quantity}</div>
                <div class="checkout-item-price">${formatPrice(itemTotal)}</div>
            </div>
        `;
    }).join('');

    document.getElementById('checkoutTotal').innerText = formatPrice(total);

    // Validation form
    const form = document.getElementById('checkoutForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        const name = document.getElementById('cusName').value.trim();
        const phone = document.getElementById('cusPhone').value.trim();
        const email = document.getElementById('cusEmail').value.trim();
        const address = document.getElementById('cusAddress').value.trim();
        
        // Reset errors
        document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');

        if(name === '') {
            document.getElementById('errName').style.display = 'block';
            isValid = false;
        }

        const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
        if(!phoneRegex.test(phone)) {
            document.getElementById('errPhone').style.display = 'block';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            document.getElementById('errEmail').style.display = 'block';
            isValid = false;
        }

        if(address === '') {
            document.getElementById('errAddress').style.display = 'block';
            isValid = false;
        }

        if(isValid) {
            // Save order to localStorage
            const order = {
                id: 'ORD' + new Date().getTime(),
                date: new Date().toISOString(),
                customer: { name, phone, email, address },
                items: cart,
                total: total,
                paymentMethod: document.querySelector('input[name="payment"]:checked').value
            };
            
            const orders = JSON.parse(localStorage.getItem('techzone_orders')) || [];
            orders.push(order);
            localStorage.setItem('techzone_orders', JSON.stringify(orders));
            
            // Clear cart
            localStorage.removeItem('techzone_cart');
            
            // Show success modal
            document.getElementById('successModal').style.display = 'flex';
        }
    });
});
