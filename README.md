# 蔬味平生 VEGALCHEMY 美國官網（初版，純靜態）

給包裝背面 QR code（`https://meetsuu.us/order`）用的英文品牌站。純 HTML／CSS，少量原生 JS，唯一外部依賴是 Google Fonts（Montserrat、Noto Sans）。

## 檔案結構

```
蔬味平生美國官網\
├─ index.html            單頁官網（Hero／兩款商品／Our Story／FAQ／頁尾）
├─ order\index.html      QR code 落地頁：有亞馬遜網址就立刻轉過去，沒有就顯示 Coming soon＋聯絡方式
├─ assets\
│  ├─ config.js          ★ 亞馬遜連結只在這裡填
│  ├─ site.js            按鈕切換、手機選單、/order 轉址（不用改）
│  ├─ style.css          樣式（色票依 C:\claude-context\DESIGN.md）
│  ├─ logo.svg / logo_white.svg
│  ├─ noodles-photo.jpg / sashimi-photo.jpg   商品照（蒟蒻麵 1600px；素生魚片是實拍 1290px，不放大）
│  └─ pouch-noodle.webp / pouch-sashimi.webp  立袋包裝示意圖（印前擺拍示意，不是實拍）
└─ README.md
```

圖片的原檔都沒動。蒟蒻麵照片與包裝示意圖來源在 `E:\Claude專區\蔬味平生\2026-10-21_蔬味平生_美國立袋印刷交付\`；素生魚片照片是實拍 `E:\Claude專區\蔬味平生\通路合作\產品照片庫_上架用1\生魚片\生魚片 (3).jpg`（網站不使用 AI 生成的 sashimi_hero_v3）。

## 怎麼填亞馬遜連結

只改 `assets\config.js` 三個值，整站（導覽列、Hero、兩款商品、頁尾、/order）自動跟著變：

```js
window.VEGA_CONFIG = {
  AMAZON_URL: '',          // 品牌商店或主要商品頁
  AMAZON_KONJAC_URL: '',   // 蒟蒻麵商品頁（沒填就用 AMAZON_URL）
  AMAZON_SASHIMI_URL: ''   // 素生魚片商品頁（沒填就用 AMAZON_URL）
};
```

- 空字串：按鈕顯示 **Coming soon on Amazon**，點了跳到頁尾的 Phoenix Forest 聯絡資料。
- 填了完整網址（含 `https://`）：按鈕自動變 **Buy on Amazon**，開新分頁到亞馬遜。
- `/order` 看 `AMAZON_URL`：有填就立刻轉過去（meta refresh＋JS）。如果只填了兩個商品連結、沒填 `AMAZON_URL`，`/order` 會顯示「選哪一款」兩顆按鈕。
- 建議：QR code 是同一個網址，所以最好有一個品牌商店或雙商品共用的連結填 `AMAZON_URL`。

## 怎麼預覽

兩種都行：

1. 已設定好的：`C:\claude-context\.claude\launch.json` 裡的 `vega-us-site`（port 8651），在 Claude Code 桌面版用 preview_start 開，網址 http://localhost:8651/ 。
2. 手動：`python -m http.server 8651 --directory "E:\Claude專區\網頁\蔬味平生美國官網"`，瀏覽器開 http://localhost:8651/ 與 http://localhost:8651/order/ 。

不要直接雙擊 index.html 開（`/order/` 的相對路徑與字型在 file:// 下表現不同）。

## 之後上線到 meetsuu.us 要做哪幾步（只列步驟，尚未做）

1. 先確認亞馬遜商店／商品頁已上架，把網址填進 `assets\config.js`。
2. 把待確認事項清掉：頁尾 Instagram 網址（`index.html` 內標 TODO）、Phoenix Forest 公開的 email／電話是否同意、`index.html` 的 og:image／og:url（要用 `https://meetsuu.us/...` 絕對網址）。
3. 選一個靜態網站代管（例如 Cloudflare Pages、Netlify、GitHub Pages）。把本資料夾整包當作網站根目錄上傳／連 repo。
4. 在代管服務加上自訂網域 `meetsuu.us`，照它給的紀錄到 meetsuu.us 的網域註冊商改 DNS（誰管 DNS、誰有權限要先確認）；等憑證（HTTPS）發好。
5. 上線後用手機掃一次實際包裝上的 QR code，確認 `https://meetsuu.us/order` 會轉到亞馬遜；沒填連結時會看到 Coming soon 頁。
6. 注意：`meetsuu.com` 是蔬味平生台灣官網（FreeStore），`meetsuu.us` 是這個新站，兩邊網域別搞混、DNS 別動到 .com。
7. 日後改版：改完檔案重新上傳／push 即可；`/order` 頁已設 noindex，不會被搜尋引擎收錄。


## 預覽版（2026-10-22）

目前推在 GitHub Pages 當預覽給奇奇看，加了不被搜尋引擎收錄的設定。**正式上線 meetsuu.us 前要拿掉**：`index.html` 的 `<meta name="robots" content="noindex, nofollow">` 與 `robots.txt`（`order/index.html` 本來就有 noindex，轉址頁可留）。
