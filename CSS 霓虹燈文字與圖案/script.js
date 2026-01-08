function toggleLights() {
            const body = document.body;
            const toggleDot = document.querySelector('.dot');
            const checkbox = document.getElementById('toggle');
            
            if (checkbox.checked) {
                // 開燈
                body.classList.remove('lights-off');
                toggleDot.classList.add('translate-x-5', 'bg-green-400', 'shadow-[0_0_10px_#4ade80]');
                toggleDot.classList.remove('translate-x-1', 'bg-gray-400');
            } else {
                // 關燈
                body.classList.add('lights-off');
                toggleDot.classList.remove('translate-x-5', 'bg-green-400', 'shadow-[0_0_10px_#4ade80]');
                toggleDot.classList.add('translate-x-1', 'bg-gray-400');
            }
        }

        function adjustBrightness(value) {
            // 更新 CSS 變數
            document.documentElement.style.setProperty('--neon-brightness', value);
            
            // 更新百分比顯示
            const percentage = Math.round(value * 100);
            document.getElementById('brightness-val').innerText = percentage + '%';
        }