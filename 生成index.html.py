import os

def generate_index(folder_path='.'):
    # 定義輸出的檔名
    output_file = 'index.html'
    
    # 獲取資料夾內所有檔案
    files = os.listdir(folder_path)
    
    # 過濾出所有 .html 檔案，且排除 index.html 本身
    html_files = [f for f in files if f.endswith('.html') and f != output_file]
    
    # 排序檔案名稱（可選，按字母順序排列）
    html_files.sort()

    # 開始構建 HTML 內容
    content = ['''
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fu-Yi個人工作室</title>
    <style>
        ul { list-style-type: none; padding: 0; }
        li { margin: 10px 0; }
        a { text-decoration: none; color: #0066cc; }
        a:hover { text-decoration: underline; }
        .fixed-right-down-container {
            position: fixed;
            right: 20px; /* 距離視窗右邊緣 20 像素 */
            bottom: 20px; /* 距離視窗底邊緣 20 像素 */
            width: 200px;
            height: 100px;
            background-color: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            border-radius: 5px;
        }

        .fixed-right-down-container img {
            width: 45%; 
            height: 90%;
            object-fit: cover;
            border: 1px solid #ffffff;
        }
    </style>
</head>
<body>
<h1>Fu-Yi個人工作室</h1>
<h2>前端網頁範例</h2>
<ul>
''' ]

    # 為每個 HTML 檔案建立超連結
    if not html_files:
        content.append('        <li>找不到其他 HTML 檔案。</li>')
    else:
        for file in html_files:
            # 建立 <li><a href="filename.html">filename.html</a></li>
            line = f'        <li><a href="{file}"  target="_blank">{file}</a></li>'
            content.append(line)

    # 結尾標籤
    content.extend(['''
</ul>

    <div class="fixed-right-down-container">
        <img src="images/NPSC2023.jpg" alt="大頭照">        
        <img src="images/fuyistudioQRcode.jpg" alt="QRcode">
    </div>
</body>
</html>

'''
    ])

    # 將內容寫入 index.html
    with open(os.path.join(folder_path, output_file), 'w', encoding='utf-8') as f:
        f.write('\n'.join(content))

    print(f"成功！已生成 {output_file}，共連結了 {len(html_files)} 個檔案。")

if __name__ == "__main__":
    # 執行程式，預設為當前執行目錄
    generate_index()