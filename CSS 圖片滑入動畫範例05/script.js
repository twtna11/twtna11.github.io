// 選擇所有帶有 'scroll-fade' 類別的元素
        const fadeElements = document.querySelectorAll('.scroll-fade');

        // 設定 Intersection Observer 的選項
        const options = {
            root: null, // 觀察視窗 (Viewport)
            rootMargin: '0px',
            threshold: 0.2 // 當元素 20% 進入視窗時觸發
        };

        // 建立 Intersection Observer
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // 如果元素進入視窗 (isIntersecting 為 true)
                if (entry.isIntersecting) {
                    // 為元素添加 'visible' 類別，觸發 CSS 動畫
                    entry.target.classList.add('visible');
                    // 停止觀察該元素，避免重複觸發
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        // 遍歷所有選定的元素並開始觀察
        fadeElements.forEach(element => {
            observer.observe(element);
        });