import os
from bs4 import BeautifulSoup

def process_html_files(target_folder="."):
    """
    掃描目標資料夾，將 .html 拆分為 index.html, style.css, script.js
    並存入同名子資料夾中。
    """
    # 確保路徑存在
    if not os.path.exists(target_folder):
        print(f"錯誤：找不到資料夾 '{target_folder}'")
        return

    # 取得所有 .html 檔案
    files = [f for f in os.listdir(target_folder) if f.endswith('.html')]

    if not files:
        print("未發現任何 .html 檔案。")
        return

    print(f"找到 {len(files)} 個檔案，開始處理...")

    for filename in files:
        file_path = os.path.join(target_folder, filename)
        base_name = os.path.splitext(filename)[0]
        output_dir = os.path.join(target_folder, base_name)

        # 1. 讀取原始 HTML
        with open(file_path, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')

        css_content = []
        js_content = []

        # 2. 提取並移除 <style> (CSS)
        for style in soup.find_all('style'):
            if style.string:
                css_content.append(style.string.strip())
            style.decompose() # 從 HTML 移除該標籤

        # 3. 提取並移除 內嵌 <script> (JS)
        # 注意：忽略帶有 src 的外部 script
        for script in soup.find_all('script'):
            if not script.get('src'):
                if script.string:
                    js_content.append(script.string.strip())
                script.decompose()

        # 4. 建立子資料夾
        os.makedirs(output_dir, exist_ok=True)

        # 5. 修改 HTML：加入連結標籤
        # 加入 CSS 連結 (放在 head 末端)
        if css_content:
            link_tag = soup.new_tag("link", rel="stylesheet", href="style.css")
            if soup.head:
                soup.head.append(link_tag)
            else:
                # 若無 head 則自動補上 (較少見但以防萬一)
                new_head = soup.new_tag("head")
                soup.insert(0, new_head)
                new_head.append(link_tag)

        # 加入 JS 連結 (放在 body 末端)
        if js_content:
            script_tag = soup.new_tag("script", src="script.js")
            if soup.body:
                soup.body.append(script_tag)
            else:
                soup.append(script_tag)

        # 6. 寫入檔案 (index.html, style.css, script.js)
        
        # 寫入 index.html
        with open(os.path.join(output_dir, 'index.html'), 'w', encoding='utf-8') as f:
            f.write(soup.prettify()) # prettify 會格式化 HTML 使其易讀

        # 寫入 style.css (如果有內容)
        if css_content:
            with open(os.path.join(output_dir, 'style.css'), 'w', encoding='utf-8') as f:
                f.write('\n\n'.join(css_content))

        # 寫入 script.js (如果有內容)
        if js_content:
            with open(os.path.join(output_dir, 'script.js'), 'w', encoding='utf-8') as f:
                f.write('\n\n'.join(js_content))

        print(f"已處理: {filename} -> ./{base_name}/")

    print("\n所有作業完成！")

if __name__ == "__main__":
    # 設定要處理的資料夾路徑，預設為當前目錄 '.'
    process_html_files('.')