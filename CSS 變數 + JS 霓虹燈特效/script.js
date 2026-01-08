// --- 3. JavaScript 互動邏輯 ---
        
        // 選取輸入元件
        const colorPicker = document.getElementById('colorPicker');
        const glowRange = document.getElementById('glowRange');
        
        // 選取根元素 (html)，因為變數是定義在 :root
        const root = document.documentElement;

        // 監聽顏色改變事件
        colorPicker.addEventListener('input', (e) => {
            const newColor = e.target.value;
            // 核心語法：更新 CSS 變數
            root.style.setProperty('--neon-color', newColor);
        });

        // 監聽滑桿移動事件
        glowRange.addEventListener('input', (e) => {
            const newSize = e.target.value + 'px'; // 記得加上單位 px
            // 核心語法：更新 CSS 變數
            root.style.setProperty('--glow-size', newSize);
        });