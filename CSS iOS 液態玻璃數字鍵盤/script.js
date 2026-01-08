let currentPin = "";
        const maxPinLength = 4;
        const pinDots = document.querySelectorAll('.pin-dot');
        const pinDisplay = document.getElementById('pin-display');

        // 模擬觸覺與點擊效果
        function pressKey(num) {
            if (currentPin.length < maxPinLength) {
                currentPin += num;
                updateDisplay();
                
                // 模擬震動 (如果裝置支援)
                if (navigator.vibrate) navigator.vibrate(10);
            }

            if (currentPin.length === maxPinLength) {
                // 模擬驗證
                setTimeout(() => {
                    if (currentPin === "1234") { // 測試密碼
                        successAnimation();
                    } else {
                        errorAnimation();
                    }
                }, 300);
            }
        }

        function deleteKey() {
            if (currentPin.length > 0) {
                currentPin = currentPin.slice(0, -1);
                updateDisplay();
                if (navigator.vibrate) navigator.vibrate(10);
            }
        }

        function updateDisplay() {
            pinDots.forEach((dot, index) => {
                if (index < currentPin.length) {
                    dot.classList.add('filled');
                } else {
                    dot.classList.remove('filled');
                }
            });
        }

        function errorAnimation() {
            // 讓整個顯示區震動
            pinDisplay.classList.add('shake');
            
            // 顏色變紅提示錯誤
            pinDots.forEach(dot => dot.style.borderColor = "#ff3b30");
            pinDots.forEach(dot => dot.style.backgroundColor = currentPin.length > 0 ? "#ff3b30" : "transparent");

            if (navigator.vibrate) navigator.vibrate([50, 50, 50]);

            setTimeout(() => {
                pinDisplay.classList.remove('shake');
                currentPin = "";
                updateDisplay();
                // 重置樣式
                pinDots.forEach(dot => {
                    dot.style.borderColor = "rgba(255, 255, 255, 0.8)";
                    dot.style.backgroundColor = "";
                });
            }, 500);
        }

        function successAnimation() {
            pinDots.forEach(dot => {
                dot.style.borderColor = "#34c759";
                dot.style.backgroundColor = "#34c759";
            });
            setTimeout(() => {
                alert("解鎖成功！");
                currentPin = "";
                updateDisplay();
                pinDots.forEach(dot => {
                    dot.style.borderColor = "rgba(255, 255, 255, 0.8)";
                    dot.style.backgroundColor = "";
                });
            }, 300);
        }

        // 鍵盤支援
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') {
                // 找到對應的按鈕並觸發視覺效果
                const buttons = document.querySelectorAll('.keypad-btn');
                let targetBtn;
                buttons.forEach(btn => {
                    if(btn.innerText.includes(e.key)) targetBtn = btn;
                });
                
                if(targetBtn) {
                    targetBtn.classList.add('active');
                    setTimeout(() => targetBtn.classList.remove('active'), 150);
                }
                pressKey(e.key);
            } else if (e.key === 'Backspace') {
                deleteKey();
            }
        });