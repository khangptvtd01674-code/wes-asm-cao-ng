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

    // Chuyển Tab
    window.switchTab = (tabId, element) => {
        document.querySelectorAll('.admin-nav a').forEach(el => el.classList.remove('active'));
        element.classList.add('active');
        
        document.getElementById('view-overview').style.display = 'none';
        document.getElementById('view-products').style.display = 'none';
        document.getElementById('view-users').style.display = 'none';
        
        document.getElementById(`view-${tabId}`).style.display = 'block';
        
        if (tabId === 'products') loadAdminProducts();
        if (tabId === 'users') loadAdminUsers();
    };

    // Load Products
    window.loadAdminProducts = () => {
        const productList = document.getElementById('adminProductList');
        let prods = JSON.parse(localStorage.getItem('techzone_products')) || [];
        if (prods.length === 0) {
            productList.innerHTML = `<tr><td colspan="5" style="text-align:center">Chưa có sản phẩm nào</td></tr>`;
            return;
        }
        
        productList.innerHTML = prods.map(p => `
            <tr>
                <td><strong>${p.id}</strong></td>
                <td><img src="${p.image}" alt="${p.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;"></td>
                <td>${p.name}</td>
                <td style="color:var(--danger); font-weight:bold;">${formatPrice(p.price)}</td>
                <td>
                    <button class="btn-outline" style="padding: 3px 8px; font-size: 12px; margin-right: 5px;" onclick="editProduct(${p.id})"><i class="fas fa-edit"></i> Sửa</button>
                    <button class="btn-outline" style="padding: 3px 8px; font-size: 12px; border-color: var(--danger); color: var(--danger);" onclick="deleteProduct(${p.id})"><i class="fas fa-trash"></i> Xóa</button>
                </td>
            </tr>
        `).join('');
    };

    // Load Users
    window.loadAdminUsers = () => {
        const userList = document.getElementById('adminUserList');
        let users = JSON.parse(localStorage.getItem('techzone_users')) || [];
        
        userList.innerHTML = users.map(u => {
            let roleBadge = u.role === 'admin' ? '<span class="status-badge status-done">Admin</span>' : '<span class="status-badge status-pending">Khách hàng</span>';
            return `
            <tr>
                <td><strong>${u.name}</strong></td>
                <td>${u.email}</td>
                <td>${u.phone || 'Chưa cập nhật'}</td>
                <td>${roleBadge}</td>
                <td>
                    ${u.role !== 'admin' ? `<button class="btn-outline" style="padding: 3px 8px; font-size: 12px; border-color: var(--danger); color: var(--danger);" onclick="deleteUser('${u.email}')"><i class="fas fa-trash"></i> Xóa</button>` : '<em>Bảo vệ</em>'}
                </td>
            </tr>
            `;
        }).join('');
    };

    // Thêm Sản phẩm
    window.addProduct = () => {
        const name = prompt("Nhập tên sản phẩm mới:");
        if (!name) return;
        const price = prompt("Nhập giá sản phẩm (VND):", "100000");
        if (!price || isNaN(price)) { alert("Giá không hợp lệ"); return; }
        
        let prods = JSON.parse(localStorage.getItem('techzone_products')) || [];
        const newId = prods.length > 0 ? Math.max(...prods.map(p => p.id)) + 1 : 1;
        
        prods.push({
            id: newId,
            name: name,
            category: "other",
            price: Number(price),
            image: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=600&q=80", // Ảnh mặc định
            rating: 5,
            isNew: true
        });
        localStorage.setItem('techzone_products', JSON.stringify(prods));
        loadAdminProducts();
    };

    // Sửa Sản phẩm
    window.editProduct = (id) => {
        let prods = JSON.parse(localStorage.getItem('techzone_products')) || [];
        const index = prods.findIndex(p => p.id === id);
        if (index === -1) return;
        
        const newPrice = prompt(`Nhập giá mới cho "${prods[index].name}":`, prods[index].price);
        if (newPrice && !isNaN(newPrice)) {
            prods[index].price = Number(newPrice);
            localStorage.setItem('techzone_products', JSON.stringify(prods));
            loadAdminProducts();
        }
    };

    // Xóa Sản phẩm
    window.deleteProduct = (id) => {
        if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            let prods = JSON.parse(localStorage.getItem('techzone_products')) || [];
            prods = prods.filter(p => p.id !== id);
            localStorage.setItem('techzone_products', JSON.stringify(prods));
            loadAdminProducts();
        }
    };

    // Xóa User
    window.deleteUser = (email) => {
        if (confirm("Xóa khách hàng này sẽ không thể khôi phục. Xóa?")) {
            let users = JSON.parse(localStorage.getItem('techzone_users')) || [];
            users = users.filter(u => u.email !== email);
            localStorage.setItem('techzone_users', JSON.stringify(users));
            loadAdminUsers();
        }
    };

    loadAdminData();
});
