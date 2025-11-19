import { useState, useEffect } from 'preact/hooks';

export default function Ham() {
    const [open, setOpen] = useState(false);

    // 開閉状態に応じて body にクラスを付与
    useEffect(() => {
        if (open) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [open]);

    return (
        <>
            <div 
                class={`c-header__ham ${open ? 'open' : ''}`}
                aria-label="メニューを開く"
                onClick={() => setOpen(!open)}
            >
                <span class="c-header__ham-bar"></span>
                <span class="c-header__ham-bar"></span>
                <span class="c-header__ham-bar"></span>
            </div>
            <ul class={`c-header__ham-lists ${open ? 'active' : ''}`}>
                <li class="c-header__ham-list">
                    <a href="/">トップ</a>
                </li>
                <li class="c-header__ham-list">
                    <a href="/about">広島県小児科医会について</a>
                </li>
                <li class="c-header__ham-list">
                    <a href="/join">入会案内</a>
                </li>
                <li class="c-header__ham-list">
                    <a href="/news">お知らせ</a>
                </li>
                <li class="c-header__ham-list">
                    <a href="/contact">お問い合わせ</a>
                </li>
                <li class="c-header__ham-btn">
                    <a href="/members">会員ページ<span class="c-header__ham-btn-arrow"></span></a>
                </li>
                <li class="c-header__ham-btn">
                    <a href="/registration">会員登録<span class="c-header__ham-btn-arrow"></span></a>
                </li>
                <li class="c-header__ham-policy">
                    <a href="/sitepolicy">サイトポリシー</a>
                    <a href="/privacypolicy">プライバシーポリシー</a>
                </li>
            </ul>
        </>
    );
}