// 設定觀察器選項
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // 重要：必須看到 50% 才觸發
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // 進入視窗 50% -> 顯示
                    entry.target.classList.add('show');
                } else {
                    // 離開視窗 -> 移除 (讓動畫可以重複播放)
                    // 如果希望動畫只播一次，請將下面這行刪除
                    entry.target.classList.remove('show');
                }
            });
        }, observerOptions);

        // 選取所有需要動畫的元素
        const animatedElements = document.querySelectorAll('.hidden-left, .hidden-right');
        
        // 開始監聽
        animatedElements.forEach((el) => observer.observe(el));