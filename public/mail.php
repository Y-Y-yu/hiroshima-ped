<?php
// セキュリティ設定
header("Content-Type: text/plain; charset=UTF-8");
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: SAMEORIGIN");
header("X-XSS-Protection: 1; mode=block");

// 環境変数から取得（サーバーに設定済み前提）
$mailTo = $_ENV['MAIL_TO'] ?? $_SERVER['MAIL_TO'];
$mailFrom = $_ENV['MAIL_FROM'] ?? $_SERVER['MAIL_FROM'];
$recaptchaSecret = $_ENV['RECAPTCHA_SECRET'] ?? $_SERVER['RECAPTCHA_SECRET'];

// POSTデータ受け取り
$idNumber = trim($_POST['id_number'] ?? '');
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$birthYear = trim($_POST['birth_year'] ?? '');
$birthMonth = trim($_POST['birth_month'] ?? '');
$birthDay = trim($_POST['birth_day'] ?? '');
$type = trim($_POST['type'] ?? '');
$message = trim($_POST['message'] ?? '');
$token = $_POST['g-recaptcha-response'] ?? '';

// 生年月日を統合
$birthday = "{$birthYear}年{$birthMonth}月{$birthDay}日";

// バリデーション
if (empty($token)) {
    http_response_code(400);
    exit('reCAPTCHAトークンが見つかりません。');
}

if (empty($recaptchaSecret)) {
    http_response_code(500);
    exit('サーバー設定エラー: reCAPTCHAシークレットキーが設定されていません。');
}

// reCAPTCHA検証
$verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
$verifyData = [
    'secret' => $recaptchaSecret,
    'response' => $token,
    'remoteip' => $_SERVER['REMOTE_ADDR'] ?? ''
];

$options = [
    'http' => [
        'method' => 'POST',
        'header' => 'Content-Type: application/x-www-form-urlencoded',
        'content' => http_build_query($verifyData)
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($verifyUrl, false, $context);

if ($response === false) {
    http_response_code(500);
    exit('reCAPTCHA検証サーバーへの接続に失敗しました。');
}

$responseKeys = json_decode($response, true);

// デバッグ用(開発環境のみ)
// error_log('reCAPTCHA response: ' . print_r($responseKeys, true));

if (!$responseKeys['success']) {
    http_response_code(400);
    $errorCodes = isset($responseKeys['error-codes']) ? implode(', ', $responseKeys['error-codes']) : 'unknown';
    exit("reCAPTCHA検証に失敗しました。エラー: {$errorCodes}");
}

// スコアチェック(v3の場合、0.5以上を推奨)
if (isset($responseKeys['score']) && $responseKeys['score'] < 0.5) {
    http_response_code(400);
    exit('スパムの可能性が検出されました。');
}

// メール本文
$body = <<<EOT
【医籍番号(下4桁)】
{$idNumber}

【お名前】
{$name}

【メールアドレス】
{$email}

【生年月日】
{$birthday}

【お問い合わせ種別】
{$type}

【内容】
{$message}
EOT;

// 送信
$subject = "お問い合わせがありました";
$headers = [
    'From' => $mailFrom,
    'Reply-To' => $email,
];
$headers_str = '';
foreach ($headers as $key => $value) {
    $headers_str .= "{$key}: {$value}\r\n";
}

if (mb_send_mail($mailTo, $subject, $body, $headers_str)) {
    header('Location: /thanks');
    exit;
} else {
    http_response_code(500);
    echo 'メール送信に失敗しました。';
}
?>