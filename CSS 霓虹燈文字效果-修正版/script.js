// 簡單的腳本：監聽顏色選擇器的變化，並更新 CSS 變數
        const colorPicker = document.getElementById('colorPicker');
        
        colorPicker.addEventListener('input', (event) => {
            const newColor = event.target.value;
            // 更新 CSS 變數，所有引用該變數的地方（文字陰影、動畫、標題底線）都會同時改變
            document.documentElement.style.setProperty('--neon-color', newColor);
        });