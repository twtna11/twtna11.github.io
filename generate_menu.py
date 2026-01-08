import sys
from pathlib import Path

def generate_blank_target_index():
    root_dir = Path('.')
    output_file = root_dir / 'index.html'
    
    html_files = sorted(root_dir.rglob('index.html'))
    
    links = []
    for file_path in html_files:
        if file_path.resolve() == output_file.resolve():
            continue
        relative_path = file_path.relative_to(root_dir).as_posix()
        links.append(relative_path)

    html_content = f"""<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fu-Yi個人工作室</title>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            max-width: 1200px;
            margin: 2rem auto;
            margin-bottom: 100px;
            padding: 0 20px;
            background-color: #f4f4f4;
            color: #333;
        }}
        h1 {{ text-align: center; color: #444; margin-bottom: 2rem; }}
        h2 {{ text-align: center; color: #444; margin-bottom: 1.2rem; }}
        .link-container {{
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            padding: 0;
            list-style: none;
        }}
        .link-item {{
            /* 3欄寬度計算：(100% / 3) - 間距補償 */
            flex: 0 0 calc(33.333% - 14px);
            box-sizing: border-box;
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            transition: transform 0.1s, box-shadow 0.1s;
        }}
        .link-item:hover {{
            background-color: #f8faff;        
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }}
        .link-item a {{
            display: block;
            padding: 20px;
            text-decoration: none;
            color: #0066cc;
            font-weight: 500;
            text-align: center;
            height: 100%;
            word-break: break-all;
        }}
        .link-item a:hover {{
            color: #004499;
        }}
        @media (max-width: 768px) {{
            .link-item {{ flex: 0 0 100%; }}
        }}
        .fixed-right-down-container {{
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
        }}

        .fixed-right-down-container img {{
            width: 45%; 
            height: 90%;
            object-fit: cover;
            border: 1px solid #ffffff;
        }}
    </style>
</head>
<body>
    <h1>Fu-Yi個人工作室</h1>
    <h2>前端網頁作品集</h2>
    <ul class="link-container">
"""

    for link in links:
        # target="_blank" 用於開新分頁
        html_content += f'        <li class="link-item"><a href="{link}" target="_blank">{link[:-11]}</a></li>\n'

    html_content += """    </ul>
    <div class="fixed-right-down-container">
        <img src="images/NPSC2023.jpg" alt="大頭照">        
        <img src="images/fuyistudioQRcode.jpg" alt="QRcode">
    </div>

</body>
</html>"""

    try:
        output_file.write_text(html_content, encoding='utf-8')
        print(f"✅ 已生成 index.html (點擊連結將開啟新分頁)")
    except Exception as e:
        print(f"❌ 錯誤：{e}")

if __name__ == "__main__":
    generate_blank_target_index()