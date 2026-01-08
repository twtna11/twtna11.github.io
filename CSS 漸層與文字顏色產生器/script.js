// 獲取 DOM 元素
    const textColorInput = document.getElementById('text-color');
    const color1Input = document.getElementById('color1');
    const color2Input = document.getElementById('color2');
    const angleRange = document.getElementById('angle-range');
    const angleInput = document.getElementById('angle-input');
    
    const previewBox = document.getElementById('gradient-preview');
    const previewText = document.getElementById('preview-text-content');
    const cssCode = document.getElementById('css-code');
    const copyBtn = document.getElementById('copy-btn');

    // 主要更新函數：同時處理漸層與文字顏色
    function updateStyles() {
        const tColor = textColorInput.value;
        const c1 = color1Input.value;
        const c2 = color2Input.value;
        const deg = angleInput.value;

        // 建立 CSS 字串
        const gradientString = `linear-gradient(${deg}deg, ${c1}, ${c2})`;

        // 應用到預覽區塊 (背景)
        previewBox.style.background = gradientString;
        // 應用到預覽文字 (前景顏色)
        previewText.style.color = tColor;

        // 更新 Textarea 顯示 (組合兩行 CSS)
        // 使用 \n 換行讓代碼更易讀
        cssCode.value = `color: ${tColor};\nbackground: ${gradientString};`;
    }

    // 事件監聽器設定

    // 監聽所有顏色輸入框
    [textColorInput, color1Input, color2Input].forEach(input => {
        input.addEventListener('input', updateStyles);
    });

    // 角度滑桿同步
    angleRange.addEventListener('input', (e) => {
        angleInput.value = e.target.value;
        updateStyles();
    });

    // 角度輸入框同步與驗證
    angleInput.addEventListener('input', (e) => {
        let val = e.target.value;
        if (val === '') return; // 允許暫時清空
        val = Math.min(360, Math.max(0, val)); // 限制在 0-360
        
        angleRange.value = val;
        updateStyles();
    });
    
    // 確保輸入框失去焦點時數值正確 (處理空值情況)
    angleInput.addEventListener('blur', (e) => {
         if (e.target.value === '') {
             e.target.value = angleRange.value;
         }
         updateStyles();
    });


    // 複製功能 (增加視覺回饋優化)
    copyBtn.addEventListener('click', () => {
        if (!cssCode.value) return;
        
        cssCode.select();
        cssCode.setSelectionRange(0, 99999); // 支持行動裝置
        
        navigator.clipboard.writeText(cssCode.value)
            .then(() => {
                const originalText = copyBtn.innerText;
                copyBtn.innerText = "✨ 已複製成功！";
                copyBtn.style.backgroundColor = "#059669"; // 深綠色
                
                setTimeout(() => {
                    copyBtn.innerText = originalText;
                    copyBtn.style.backgroundColor = "";
                }, 2000);
            })
            .catch(err => {
                console.error('複製失敗:', err);
                copyBtn.innerText = "❌ 複製失敗";
                setTimeout(() => copyBtn.innerText = "複製 CSS 代碼", 2000);
            });
    });

    // 頁面載入時初始化一次
    updateStyles();