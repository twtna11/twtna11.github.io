document.addEventListener('DOMContentLoaded', function () {
            const form = document.getElementById('registrationForm');
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('confirmPassword');
            const passwordMatchFeedback = document.getElementById('passwordMatchFeedback');
            const registerButton = document.getElementById('registerButton');
            const recaptchaFeedback = document.getElementById('recaptchaFeedback');
            let isRecaptchaVerified = false;

            // reCAPTCHA 成功回呼函式 (全域變數)
            window.recaptchaCallback = function() {
                isRecaptchaVerified = true;
                // reCAPTCHA 成功後，隱藏錯誤提示
                recaptchaFeedback.style.display = 'none'; 
                // 檢查所有條件是否滿足，以啟用按鈕
                checkFormValidity();
            };

            // 檢查密碼是否匹配
            function checkPasswordMatch() {
                if (passwordInput.value !== confirmPasswordInput.value) {
                    confirmPasswordInput.setCustomValidity('密碼不一致');
                    passwordMatchFeedback.textContent = '兩次輸入的密碼不一致。';
                    confirmPasswordInput.classList.add('is-invalid');
                } else {
                    confirmPasswordInput.setCustomValidity('');
                    passwordMatchFeedback.textContent = '請再次輸入密碼。'; // 重設為預設提示
                    confirmPasswordInput.classList.remove('is-invalid');
                }
            }

            // 檢查表單是否整體有效 (包含密碼匹配和 reCAPTCHA)
            function checkFormValidity() {
                // 使用原生的 checkValidity() 檢查 HTML5 驗證 (required, minlength 等)
                const isHtmlValid = form.checkValidity();
                const isPasswordMatch = passwordInput.value === confirmPasswordInput.value;
                
                // 只有在 HTML 驗證、密碼匹配且 reCAPTCHA 通過時，才啟用按鈕
                if (isHtmlValid && isPasswordMatch && isRecaptchaVerified) {
                    registerButton.disabled = false;
                } else {
                    registerButton.disabled = true;
                }
            }

            // 監聽密碼輸入，即時檢查匹配
            passwordInput.addEventListener('input', function() {
                checkPasswordMatch();
                checkFormValidity();
            });

            confirmPasswordInput.addEventListener('input', function() {
                checkPasswordMatch();
                checkFormValidity();
            });

            // 監聽表單其他輸入，即時檢查啟用按鈕
            form.querySelectorAll('input').forEach(input => {
                if (input.id !== 'password' && input.id !== 'confirmPassword') {
                    input.addEventListener('input', checkFormValidity);
                }
            });


            // 表單提交事件處理
            form.addEventListener('submit', function (event) {
                
                // 1. 執行密碼匹配檢查
                checkPasswordMatch();
                
                // 2. 檢查 reCAPTCHA 是否已驗證
                if (!isRecaptchaVerified) {
                    recaptchaFeedback.style.display = 'block'; // 顯示 reCAPTCHA 錯誤提示
                } else {
                    recaptchaFeedback.style.display = 'none';
                }

                // 3. 檢查 HTML5 驗證和 reCAPTCHA 狀態
                if (!form.checkValidity() || !isRecaptchaVerified) {
                    event.preventDefault(); // 阻止表單提交
                    event.stopPropagation();
                } else {
                    // 表單通過所有前端驗證
                    alert('前端驗證通過！\n帳號: ' + username.value + '\n請準備將資料發送到後端伺服器進行最終處理。');
                    // 這裡可以加入您的 AJAX/Fetch 程式碼，將表單資料發送到後端
                    event.preventDefault(); 
                }

                form.classList.add('was-validated'); // 顯示 Bootstrap 的驗證提示
            }, false);
        });