// 選取 DOM 元素
        const stars = document.getElementById('stars');
        const moon = document.getElementById('moon');
        const mountainsBehind = document.getElementById('mountains_behind');
        const text = document.getElementById('text');
        const mountainsFront = document.getElementById('mountains_front');

        // 監聽滾動事件
        window.addEventListener('scroll', function() {
            // 取得目前的滾動數值
            let value = window.scrollY;

            // 應用視差邏輯： transform: translateY(距離 * 速度係數)
            // 係數越大，移動越快；係數為0，不移動

            // 1. 星星：向右稍微移動，營造旋轉感
            stars.style.left = value * 0.25 + 'px';
            
            // 2. 月亮：向下移動速度較快，且稍微產生視差
            moon.style.transform = `translateY(${value * 1.05}px)`; 

            // 3. 後方山脈：移動緩慢，製造遠景感
            // 這裡使用 translateY，這比修改 top 屬性效能更好 (不會觸發 reflow)
            mountainsBehind.style.transform = `translateY(${value * 0.5}px)`;

            // 4. 文字：快速向下，並且稍微向右，避免擋住視線
            text.style.marginTop = value * 1.5 + 'px';
            text.style.opacity = 1 - (value / 500); // 滾動時淡出

            // 5. 前方山脈：通常不動，或者移動非常微小，作為視覺錨點
            mountainsFront.style.transform = `translateY(${value * 0}px)`;
        });