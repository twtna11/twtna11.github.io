function initializeApp() {
            const contentBox = document.getElementById('content-box');
            const messageElement = document.getElementById('message');

            // --- 步驟 1: 進入動畫 (Page Load) ---
            // 延遲一點時間啟動進入動畫，確保 CSS 初始狀態已經被設定
            setTimeout(() => {
                contentBox.classList.remove('state-initial');
                contentBox.classList.add('state-entered');
            }, 50); // 輕微延遲

            // --- 步驟 2: 點擊後離開動畫 (Click Event) ---
            contentBox.addEventListener('click', () => {
                // 檢查是否已在離開中或已離開，避免重複觸發
                if (contentBox.classList.contains('state-exiting')) {
                    return;
                }

                // 設定為離開狀態
                contentBox.classList.remove('state-entered');
                contentBox.classList.add('state-exiting');
                messageElement.textContent = "內容正在旋轉縮小離開畫面...";
                
                // 動畫結束後（1000ms），隱藏並重置為初始狀態，以便下次重新進入
                setTimeout(() => {
                    // 將 box 設為不可點擊
                    contentBox.style.pointerEvents = 'none';
                    messageElement.textContent = "內容已離開。請重新整理頁面觀看進入效果。";
                }, 1000); // 匹配 CSS 過渡時間
            });
        }
        
        // 在視窗載入完成後啟動應用程式
        window.onload = initializeApp;