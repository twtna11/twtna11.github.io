let totalScore = 0;
        const scoreElement = document.getElementById('score');
        const scoreBoard = document.getElementById('score-board');

        function createBubble() {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');

            // 1. 隨機大小 (20px 到 80px)
            // 越小越難點，分數應該越高
            const size = Math.random() * 60 + 20; 
            bubble.style.width = size + 'px';
            bubble.style.height = size + 'px';

            // 2. 隨機位置
            bubble.style.left = Math.random() * 100 + 'vw';

            // 3. 隨機速度 (越小的泡泡通常飄越快，增加難度)
            // 這裡我做了一個調整：尺寸越小，速度越快
            const speedFactor = size / 80; // 0.25 ~ 1.0
            const duration = Math.random() * 4 + 4 + (speedFactor * 4); // 大泡泡比較慢
            bubble.style.animationDuration = duration + 's';

            // 4. 隨機顏色
            const hue = Math.random() * 360;
            bubble.style.filter = `hue-rotate(${hue}deg) drop-shadow(0 0 5px rgba(255,255,255,0.5))`;

            // 5. 設定分數權重
            let points = 2; // 預設大泡泡
            if (size < 40) {
                points = 10; // 小泡泡
            } else if (size < 60) {
                points = 5;  // 中泡泡
            }

            // 6. 點擊事件
            bubble.addEventListener('click', function(e) {
                if (bubble.classList.contains('pop')) return; // 防止重複點擊

                // 播放破裂動畫
                bubble.classList.add('pop');
                
                // 更新分數
                updateScore(points);

                // 顯示飄浮分數動畫 (傳入滑鼠座標)
                showFloatingPoints(e.clientX, e.clientY, points);

                setTimeout(() => {
                    bubble.remove();
                }, 150);
            });

            document.body.appendChild(bubble);

            // 自動移除
            setTimeout(() => {
                if (!bubble.classList.contains('pop')) {
                    bubble.remove();
                }
            }, duration * 1000);
        }

        function updateScore(points) {
            totalScore += points;
            scoreElement.innerText = totalScore;
            
            // 讓分數板閃一下，增加回饋感
            scoreElement.classList.remove('score-update');
            void scoreElement.offsetWidth; // 觸發重繪 (Reflow)
            scoreElement.classList.add('score-update');
        }

        function showFloatingPoints(x, y, points) {
            const pointEl = document.createElement('div');
            pointEl.classList.add('floating-points');
            pointEl.innerText = "+" + points;
            
            // 設定顏色區分分數
            if(points === 10) pointEl.style.color = "#ff4081"; // 高分粉紅色
            else if(points === 5) pointEl.style.color = "#ffeb3b"; // 中分黃色
            else pointEl.style.color = "#ffffff"; // 低分白色

            pointEl.style.left = x + 'px';
            pointEl.style.top = y + 'px';
            
            document.body.appendChild(pointEl);

            // 動畫結束後移除
            setTimeout(() => {
                pointEl.remove();
            }, 800);
        }

        // 產生泡泡頻率
        setInterval(createBubble, 300);