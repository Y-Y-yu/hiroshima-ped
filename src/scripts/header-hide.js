document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("js-header");
  const footer = document.getElementById("js-footer");

  if (!header || !footer) return;

  // トランジションは最初に一度だけ設定
  header.style.transition = "top 0.8s";

  // IntersectionObserver設定
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // footerの上端が画面の30%位置を超えたとき
        if (entry.isIntersecting) {
          header.style.top = "-8rem"; // 上に隠す
        } else {
          header.style.top = "1.5rem"; // 表示に戻す
        }
      });
    },
    {
      root: null, // ビューポート基準
      threshold: 0, // 境界に入った瞬間に反応
      rootMargin: "0% 0px -30% 0px", 
      // ↑ これがポイント！
      // 「画面の30%上に仮想ラインを作る」
      // → footerの上端がそのラインに達したら発火
    }
  );

  observer.observe(footer);
});
