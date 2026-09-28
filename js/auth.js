document.addEventListener('DOMContentLoaded', () => {
    
    // Đăng ký
    const registerForm = document.getElementById('registerForm');
    if(registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            const name = document.getElementById('regName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const phone = document.getElementById('regPhone').value.trim();
            const password = document.getElementById('regPassword').value;
            const passwordConfirm = document.getElementById('regPasswordConfirm').value;
            
            document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');
            
            if(name === '') { document.getElementById('errRegName').style.display = 'block'; isValid = false; }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email)) { document.getElementById('errRegEmail').style.display = 'block'; isValid = false; }
            
            const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
            if(!phoneRegex.test(phone)) { document.getElementById('errRegPhone').style.display = 'block'; isValid = false; }
            
            if(password.length < 6) { document.getElementById('errRegPassword').style.display = 'block'; isValid = false; }
            
            if(password !== passwordConfirm || passwordConfirm === '') { document.getElementById('errRegPasswordConfirm').style.display = 'block'; isValid = false; }
            
            if(isValid) {
                const users = JSON.parse(localStorage.getItem('techzone_users')) || [];
                // Check exist
                if(users.find(u => u.email === email || u.phone === phone)) {
                    alert("Email hoặc số điện thoại đã được đăng ký!");
                    return;
                }
                
                users.push({ name, email, phone, password });
                localStorage.setItem('techzone_users', JSON.stringify(users));
                
                document.getElementById('regSuccessModal').style.display = 'flex';
            }
        });
    }

    // Đăng nhập
    const loginForm = document.getElementById('loginForm');
    if(loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value;
            
            document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');
            
            if(username === '') { document.getElementById('errLoginUsername').style.display = 'block'; isValid = false; }
            if(password === '') { document.getElementById('errLoginPassword').style.display = 'block'; isValid = false; }
            
            if(isValid) {
                // Tạo tài khoản demo nếu chưa có data
                let users = JSON.parse(localStorage.getItem('techzone_users')) || [];
                if(users.length === 0) {
                    users.push({name: "Admin", email: "admin@techzone.com", phone: "0999999999", password: "123456", role: "admin"});
                    users.push({name: "Người dùng Demo", email: "user@techzone.com", phone: "0909090909", password: "123456", role: "user"});
                    localStorage.setItem('techzone_users', JSON.stringify(users));
                }

                const user = users.find(u => (u.email === username || u.phone === username) && u.password === password);
                
                if(user) {
                    localStorage.setItem('currentUser', JSON.stringify({name: user.name, email: user.email, role: user.role, phone: user.phone}));
                    if(user.role === 'admin') {
                        window.location.href = "admin.html";
                    } else {
                        window.location.href = "index.html";
                    }
                } else {
                    document.getElementById('loginGlobalError').style.display = 'block';
                }
            }
        });
    }
});
