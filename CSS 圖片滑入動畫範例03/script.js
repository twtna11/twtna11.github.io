// 設定 Intersection Observer 的選項
        const observerOptions = {
            root: null, // 使用視窗作為觀察基準
            rootMargin: '0px',
            threshold: 0.5 // 【關鍵修改】: 0.5 代表元素出現 50% 時才觸發 callback
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // 當元素進入視窗且符合 threshold 比例時
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    
                    // (選用) 如果想要動畫只執行一次，顯示後就停止觀察，可以取消註解下面這行：
                    // observer.unobserve(entry.target);
                } 
                else {
                    // (選用) 如果希望捲回去時隱藏（重複播放動畫），保留這行
                    // 如果希望動畫只播一次，請把下面這行註解掉
                    // entry.target.classList.remove('show'); 
                }
            });
        }, observerOptions); // 將選項傳入

        const hiddenElements = document.querySelectorAll('.hidden-left, .hidden-right');
        hiddenElements.forEach((el) => observer.observe(el));