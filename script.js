document.addEventListener('DOMContentLoaded', function() {
    const signupPage = document.getElementById('signupPage');
    const loginPage = document.getElementById('loginPage');
    const signupBtn = document.getElementById('signupBtn');
    const signupLink = document.getElementById('loginLink');
    const signupError = document.getElementById('signupError');


    signupLink.addEventListener('click', function() {
        signupPage.classList.add('hidden');
        loginPage.classList.remove('hidden');
    });


    signupBtn.addEventListener('click', function() {
        const email = document.getElementById('gmail').value;
        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;

        if (email && name && password) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            const existingUser = users.find(user => user.email === email);

            if (existingUser) {
                signupError.style.display = 'block';
            } else {
                users.push({ email, name, password });
                localStorage.setItem('users', JSON.stringify(users));

                Swal.fire({
                    title: 'Signup Successful!',
                    text: 'You can now log in.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {

                    recreateLoginForm();
                });
            }
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill all the fields.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });

    function recreateLoginForm() {

        loginPage.innerHTML = '';


        const loginForm = `
            <div class="form-card">
                <h2>Login</h2>
                <input type="email" id="loginGmail" placeholder="Enter Gmail" class="input-field">
                <input type="password" id="loginPassword" placeholder="Enter Password" class="input-field">
                <button id="loginBtn" class="submit-btn">Login</button>
                <p>Don't have an account? <a href="#" id="signupLinkLogin">Signup</a></p>
                <p id="loginError" style="color:red; display:none;">Invalid email or password.</p>
            </div>
        `;
        loginPage.innerHTML = loginForm;


        loginPage.classList.remove('hidden');
        signupPage.classList.add('hidden');

        const loginBtn = document.getElementById('loginBtn');
        const loginLink = document.getElementById('signupLinkLogin');
        const loginError = document.getElementById('loginError');


        loginLink.addEventListener('click', function() {
            loginPage.classList.add('hidden');
            signupPage.classList.remove('hidden');
        });


        loginBtn.addEventListener('click', function() {
            const loginEmail = document.getElementById('loginGmail').value;
            const loginPassword = document.getElementById('loginPassword').value;

            if (loginEmail && loginPassword) {
                let users = JSON.parse(localStorage.getItem('users')) || [];
                const user = users.find(user => user.email === loginEmail && user.password === loginPassword);

                if (user) {
                    Swal.fire({
                        title: 'Login Successful!',
                        text: 'Welcome back! Redirecting to quiz page...',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        window.location.href = 'main.html'; 
                    });
                } else {
                    loginError.style.display = 'block';
                    Swal.fire({
                        title: 'Invalid Credentials!',
                        text: 'The email or password is incorrect.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Please fill all the fields.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    }
});
