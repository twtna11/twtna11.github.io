// 1. 抓取按鈕與圖示元素
const toggleBtn = document.getElementById('themeToggle');
const modeIcon = document.getElementById('modeIcon');
const body = document.body;

// 2. 監聽點擊事件
toggleBtn.addEventListener('click', () => {
    
    // 3. 切換 body 的 class (如果沒有 dark-mode 就加上，如果有就移除)
    body.classList.toggle('dark-mode');

    // 4. 判斷目前的模式，更新按鈕文字與圖示 (教學重點：條件判斷)
    if (body.classList.contains('dark-mode')) {
        toggleBtn.textContent = '切換至淺色模式 ☀️';
        modeIcon.textContent = '🌙';
    } else {
        toggleBtn.textContent = '切換至深色模式 🌙';
        modeIcon.textContent = '☀️';
    }
});