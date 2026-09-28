document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    // Nếu là admin thì đẩy sang trang admin
    if (currentUser.role === 'admin') {
        window.location.href = "admin.html";
        return;
    }

    // Hiển thị thông tin
    document.getElementById('sidebarName').innerText = currentUser.name;
    document.getElementById('infoName').innerText = currentUser.name;
    document.getElementById('infoEmail').innerText = currentUser.email;
    document.getElementById('infoPhone').innerText = currentUser.phone || 'Chưa cập nhật';

    // Xử lý Tab
    const tabInfo = document.getElementById('tabInfo');
    const tabOrders = document.getElementById('tabOrders');
    const contentInfo = document.getElementById('contentInfo');
    const contentOrders = document.getElementById('contentOrders');

    tabInfo.addEventListener('click', (e) => {
        e.preventDefault();
        tabInfo.classList.add('active');
        tabOrders.classList.remove('active');
        contentInfo.style.display = 'block';
        contentOrders.style.display = 'none';
    });

    tabOrders.addEventListener('click', (e) => {
        e.preventDefault();
        tabOrders.classList.add('active');
        tabInfo.classList.remove('active');
        contentOrders.style.display = 'block';
        contentInfo.style.display = 'none';
        renderOrders();
    });

    document.getElementById('btnLogout').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        window.location.href = "index.html";
    });

    // Render đơn hàng
    function renderOrders() {
        const allOrders = JSON.parse(localStorage.getItem('techzone_orders')) || [];
        // Lọc đơn hàng của user hiện tại (dựa vào email)
        const myOrders = allOrders.filter(o => o.customer.email === currentUser.email);

        const tbody = document.getElementById('orderListBody');
        if (myOrders.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" style="text-align:center">Bạn chưa có đơn hàng nào.</td></tr>`;
            return;
        }

        tbody.innerHTML = myOrders.map(o => {
            const date = new Date(o.date).toLocaleDateString('vi-VN');
            let statusText = 'Đang xử lý';
            let statusClass = 'status-pending';
            
            if (o.status === 'done') { statusText = 'Hoàn thành'; statusClass = 'status-done'; }
            if (o.status === 'cancel') { statusText = 'Đã hủy'; statusClass = 'status-cancel'; }

            return `
                <tr>
                    <td><strong>${o.id}</strong></td>
                    <td>${date}</td>
                    <td style="color:var(--danger); font-weight:bold;">${formatPrice(o.total)}</td>
                    <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                </tr>
            `;
        }).join('');
    }
});
