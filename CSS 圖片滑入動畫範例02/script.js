// 建立一個觀察器 (Intersection Observer)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // 如果元素進入視窗 (isIntersecting 為 true)
                if (entry.isIntersecting) {
                    // 加入 'show' class，觸發 CSS transition
                    entry.target.classList.add('show');
                } else {
                    // (選用) 如果希望捲動離開後動畫重置，可以把下面這行打開
                    // entry.target.classList.remove('show'); 
                }
            });
        });

        // 選取所有帶有隱藏 class 的元素
        const hiddenElements = document.querySelectorAll('.hidden-left, .hidden-right');

        // 開始觀察這些元素
        hiddenElements.forEach((el) => observer.observe(el));