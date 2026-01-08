// 獲取 DOM 元素
    const textColorInput = document.getElementById('text-color');
    const color1Input = document.getElementById('color1');
    const color2Input = document.getElementById('color2'); // 中間色
    const color3Input = document.getElementById('color3'); // 結束色 (原 color2)
    const angleRange = document.getElementById('angle-range');
    const angleInput = document.getElementById('angle-input');
    
    const previewBox = document.getElementById('gradient-preview');
    const previewText = document.getElementById('preview-text-content');
    const cssCode = document.getElementById('css-code');
    const copyBtn = document.getElementById('copy-btn');

    // 主要更新函數
    function updateStyles() {
        const tColor = textColorInput.value;
        const c1 = color1Input.value;
        const c2 = color2Input.value;
        const c3 = color3Input.value;
        const deg = angleInput.value;

        // 建立三色 CSS 字串
        // 瀏覽器自動分配：c1(0%), c2(50%), c3(100%)
        const gradientString = `linear-gradient(${deg}deg, ${c1}, ${c2}, ${c3})`;

        // 應用樣式
        previewBox.style.background = gradientString;
        previewText.style.color = tColor;

        // 更新代碼區
        cssCode.value = `color: ${tColor};\nbackground: ${gradientString};`;
    }

    // 批量添加監聽器
    const inputs = [textColorInput, color1Input, color2Input, color3Input];
    inputs.forEach(input => {
        input.addEventListener('input', updateStyles);
    });

    // 角度滑桿
    angleRange.addEventListener('input', (e) => {
        angleInput.value = e.target.value;
        updateStyles();
    });

    // 角度輸入框
    angleInput.addEventListener('input', (e) => {
        let val = e.target.value;
        if (val === '') return;
        val = Math.min(360, Math.max(0, val));
        angleRange.value = val;
        updateStyles();
    });
    
    // 輸入框失焦處理
    angleInput.addEventListener('blur', (e) => {
         if (e.target.value === '') {
             e.target.value = angleRange.value;
         }
         updateStyles();
    });

    // 複製功能
    copyBtn.addEventListener('click', () => {
        if (!cssCode.value) return;
        
        cssCode.select();
        cssCode.setSelectionRange(0, 99999);
        
        navigator.clipboard.writeText(cssCode.value)
            .then(() => {
                const originalText = copyBtn.innerText;
                copyBtn.innerText = "✨ 複製成功！";
                copyBtn.style.backgroundColor = "#059669";
                
                setTimeout(() => {
                    copyBtn.innerText = originalText;
                    copyBtn.style.backgroundColor = "";
                }, 2000);
            });
    });

    // 初始化
    updateStyles();