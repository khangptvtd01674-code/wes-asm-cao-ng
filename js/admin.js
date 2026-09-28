document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'admin') {
        alert("Bạn không có quyền truy cập trang này!");
        window.location.href = "index.html";
        return;
    }

    document.getElementById('adminLogout').addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = "login.html";
    });

    const loadAdminData = () => {
        const orders = JSON.parse(localStorage.getItem('techzone_orders')) || [];
        const users = JSON.parse(localStorage.getItem('techzone_users')) || [];

        // Thống kê
        document.getElementById('countOrders').innerText = orders.length;
        document.getElementById('countUsers').innerText = users.filter(u => u.role !== 'admin').length;
        
        let revenue = 0;
        let pending = 0;
        
        orders.forEach(o => {
            if (o.status === 'done') revenue += o.total;
            if (!o.status || o.status === 'pending') pending++;
        });

        document.getElementById('countRevenue').innerText = formatPrice(revenue);
        document.getElementById('countPending').innerText = pending;

        // Bảng đơn hàng
        const tbody = document.getElementById('adminOrderList');
        if (orders.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center">Chưa có đơn hàng nào</td></tr>`;
            return;
        }

        // Đảo ngược để đơn mới lên đầu
        const sortedOrders = [...orders].reverse();

        tbody.innerHTML = sortedOrders.map(o => {
            const date = new Date(o.date).toLocaleDateString('vi-VN');
            const status = o.status || 'pending';
            
            let statusBadge = '';
            if (status === 'pending') statusBadge = '<span class="status-badge status-pending">Chờ xử lý</span>';
            else if (status === 'done') statusBadge = '<span class="status-badge status-done">Hoàn thành</span>';
            else if (status === 'cancel') statusBadge = '<span class="status-badge status-cancel">Đã hủy</span>';

            return `
                <tr>
                    <td><strong>${o.id}</strong></td>
                    <td>${o.customer.name}<br><small>${o.customer.phone}</small></td>
                    <td>${date}</td>
                    <td style="color:var(--danger); font-weight:bold;">${formatPrice(o.total)}</td>
                    <td>${statusBadge}</td>
                    <td>
                        <select class="action-select" onchange="updateOrderStatus('${o.id}', this.value)">
                            <option value="pending" ${status === 'pending' ? 'selected' : ''}>Chờ xử lý</option>
                            <option value="done" ${status === 'done' ? 'selected' : ''}>Hoàn thành</option>
                            <option value="cancel" ${status === 'cancel' ? 'selected' : ''}>Hủy đơn</option>
                        </select>
                    </td>
                </tr>
            `;
        }).join('');
    };

    // Hàm update status
    window.updateOrderStatus = (orderId, newStatus) => {
        let orders = JSON.parse(localStorage.getItem('techzone_orders')) || [];
        const index = orders.findIndex(o => o.id === orderId);
        if (index !== -1) {
            orders[index].status = newStatus;
            localStorage.setItem('techzone_orders', JSON.stringify(orders));
            loadAdminData(); // Refresh UI
        }
    };

    loadAdminData();
});
