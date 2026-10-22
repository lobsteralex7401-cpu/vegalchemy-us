/*
  ============================================================
  亞馬遜連結設定檔（整個網站只在這裡填）
  Amazon link settings — the ONLY place to edit.

  - 空字串 '' = 還沒上架：所有按鈕顯示「Coming soon on Amazon」，
    點了會跳到頁面下方的 Phoenix Forest 聯絡資料。
  - 填入完整網址（含 https://）= 按鈕自動變成「Buy on Amazon」，
    開新分頁到亞馬遜；meetsuu.us/order 也會自動轉過去。

  AMAZON_URL          品牌商店或主要商品頁（導覽列、Hero、頁尾、/order 轉址用）
  AMAZON_KONJAC_URL   蒟蒻麵商品頁（沒填就退回 AMAZON_URL）
  AMAZON_SASHIMI_URL  素生魚片商品頁（沒填就退回 AMAZON_URL）
  ============================================================
*/
window.VEGA_CONFIG = {
  AMAZON_URL: '',
  AMAZON_KONJAC_URL: '',
  AMAZON_SASHIMI_URL: ''
};
