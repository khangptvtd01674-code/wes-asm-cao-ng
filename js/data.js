// Mock Data cho website (Chuyên Phụ kiện công nghệ)
const products = [
    {
        id: 1,
        name: "Chuột không dây Logitech MX Master 3S",
        category: "mouse_keyboard",
        price: 2490000,
        oldPrice: 2790000,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80",
        description: "Chuột công thái học cao cấp dành cho lập trình viên và designer, cuộn siêu tốc vô cực.",
        rating: 5,
        isNew: true,
        isHot: true,
        isSale: true
    },
    {
        id: 2,
        name: "Bàn phím cơ Keychron K8 Pro (Nhôm, RGB)",
        category: "mouse_keyboard",
        price: 2690000,
        oldPrice: 2990000,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&q=80",
        description: "Bàn phím cơ không dây layout TKL, hỗ trợ QMK/VIA custom phím tiện lợi.",
        rating: 5,
        isNew: true,
        isHot: true,
        isSale: false
    },
    {
        id: 3,
        name: "Củ sạc nhanh Anker Nano II 65W",
        category: "charger_cable",
        price: 850000,
        oldPrice: 1100000,
        image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80",
        description: "Sạc nhanh siêu nhỏ gọn công nghệ GaN II, sạc tốt cho cả Macbook và điện thoại.",
        rating: 5,
        isNew: false,
        isHot: true,
        isSale: true
    },
    {
        id: 4,
        name: "Cáp sạc Type-C to Type-C Baseus 100W (2m)",
        category: "charger_cable",
        price: 199000,
        oldPrice: 250000,
        image: "https://images.unsplash.com/photo-1615526653118-2c2629b35061?w=600&q=80",
        description: "Cáp bọc dù siêu bền, hỗ trợ sạc siêu nhanh 100W PD cho laptop.",
        rating: 4,
        isNew: false,
        isHot: false,
        isSale: true
    },
    {
        id: 5,
        name: "Tai nghe Bluetooth Sony WH-1000XM5",
        category: "audio",
        price: 7990000,
        oldPrice: 8590000,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80",
        description: "Tai nghe chống ồn chủ động xuất sắc nhất thế giới, âm thanh High-Res.",
        rating: 5,
        isNew: false,
        isHot: true,
        isSale: true
    },
    {
        id: 6,
        name: "Tai nghe Apple AirPods Pro 2 Type-C",
        category: "audio",
        price: 5890000,
        oldPrice: 6290000,
        image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&q=80",
        description: "Chống ồn thông minh, âm thanh không gian vượt trội với cổng sạc Type-C mới.",
        rating: 5,
        isNew: true,
        isHot: true,
        isSale: false
    },
    {
        id: 7,
        name: "Loa Bluetooth Marshall Emberton II",
        category: "audio",
        price: 3990000,
        oldPrice: 4590000,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
        description: "Thiết kế vintage cổ điển, âm thanh đa hướng True Stereophonic mạnh mẽ.",
        rating: 4,
        isNew: true,
        isHot: false,
        isSale: true
    },
    {
        id: 8,
        name: "Pin sạc dự phòng Magsafe 10000mAh",
        category: "charger_cable",
        price: 990000,
        oldPrice: 1200000,
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80",
        description: "Sạc không dây tiện lợi dính chặt mặt lưng iPhone, hỗ trợ sạc nhanh 20W.",
        rating: 4,
        isNew: false,
        isHot: true,
        isSale: true
    },
    {
        id: 9,
        name: "Balo Laptop 15.6 inch Tomtoc Premium",
        category: "bag",
        price: 1890000,
        oldPrice: 2200000,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
        description: "Chất liệu kháng nước bền bỉ, công nghệ bảo vệ góc CornerArmor.",
        rating: 5,
        isNew: false,
        isHot: false,
        isSale: true
    },
    {
        id: 10,
        name: "Túi chống sốc Laptop/Macbook 14 inch",
        category: "bag",
        price: 450000,
        oldPrice: 600000,
        image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=600&q=80",
        description: "Đệm lót nhung mềm mại, chống va đập tuyệt đối 360 độ.",
        rating: 4,
        isNew: false,
        isHot: false,
        isSale: true
    },
    {
        id: 11,
        name: "Giá đỡ Laptop hợp kim nhôm gấp gọn",
        category: "other",
        price: 290000,
        oldPrice: 400000,
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&q=80",
        description: "Thiết kế kim loại tản nhiệt tốt, giúp chống gù lưng khi làm việc.",
        rating: 4,
        isNew: true,
        isHot: false,
        isSale: true
    },
    {
        id: 12,
        name: "Hub chuyển đổi Type-C Ugreen 6 in 1",
        category: "other",
        price: 790000,
        oldPrice: 950000,
        image: "https://images.unsplash.com/photo-1616410011236-7a42121dd981?w=600&q=80",
        description: "Mở rộng 6 cổng kết nối: HDMI 4K, USB 3.0, LAN, khe thẻ nhớ tiện lợi.",
        rating: 5,
        isNew: false,
        isHot: true,
        isSale: false
    },
    {
        id: 13,
        name: "Chuột không dây Logitech Pebble M350",
        category: "mouse_keyboard",
        price: 590000,
        oldPrice: 690000,
        image: "https://images.unsplash.com/photo-1615663245857-ac1eebc5d6e9?w=600&q=80",
        description: "Thiết kế siêu mỏng nhẹ, click êm ái chống ồn, màu sắc đa dạng.",
        rating: 4,
        isNew: false,
        isHot: false,
        isSale: true
    },
    {
        id: 14,
        name: "Củ sạc nhanh Apple 20W Type-C",
        category: "charger_cable",
        price: 550000,
        oldPrice: 690000,
        image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600&q=80",
        description: "Sạc chính hãng Apple chuẩn PD, tương thích tối đa với iPhone/iPad.",
        rating: 5,
        isNew: false,
        isHot: true,
        isSale: false
    },
    {
        id: 15,
        name: "Bàn phím cơ Akko 3098B Multi-modes",
        category: "mouse_keyboard",
        price: 1990000,
        oldPrice: 2200000,
        image: "https://images.unsplash.com/photo-1606149866160-c3d6cdeaf861?w=600&q=80",
        description: "Màu sắc nổi bật, hỗ trợ 3 chế độ kết nối, keycap PBT chất lượng cao.",
        rating: 4,
        isNew: true,
        isHot: true,
        isSale: true
    }
];

// Hàm format tiền tệ VNĐ
const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

// Hàm tạo HTML cho 1 thẻ sản phẩm
const createProductCard = (product) => {
    let badgeHtml = '';
    if (product.isNew) badgeHtml = `<span class="product-badge badge-new">Mới</span>`;
    else if (product.isHot) badgeHtml = `<span class="product-badge badge-hot">Hot</span>`;
    else if (product.isSale) badgeHtml = `<span class="product-badge badge-sale">Sale</span>`;

    // Tính % giảm giá
    let discountHtml = '';
    if (product.oldPrice > product.price) {
        const discount = Math.round((product.oldPrice - product.price) / product.oldPrice * 100);
        discountHtml = `<span style="color:red; font-size: 12px; margin-left: 5px;">-${discount}%</span>`;
    }

    // Render sao đánh giá
    let starsHtml = '';
    for(let i = 1; i <= 5; i++) {
        if (i <= product.rating) starsHtml += '<i class="fas fa-star"></i>';
        else starsHtml += '<i class="far fa-star"></i>';
    }

    return `
        <div class="product-card">
            ${badgeHtml}
            <a href="product-detail.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-img">
            </a>
            <a href="product-detail.html?id=${product.id}">
                <h3 class="product-name">${product.name}</h3>
            </a>
            <div class="product-price-wrapper">
                <span class="product-price">${formatPrice(product.price)}</span>
                ${product.oldPrice ? `<span class="product-old-price">${formatPrice(product.oldPrice)}</span>` : ''}
                ${discountHtml}
            </div>
            <div class="product-rating">${starsHtml}</div>
            <div class="product-actions">
                <a href="product-detail.html?id=${product.id}" class="btn-outline">Xem chi tiết</a>
                <button class="btn-fill" onclick="addToCart(${product.id})">Thêm vào giỏ</button>
            </div>
        </div>
    `;
};
