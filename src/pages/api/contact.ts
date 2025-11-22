import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
try {
  console.log('=== Contact API Debug ===');
  console.log('RESEND_API_KEY:', import.meta.env.RESEND_API_KEY ? 'exists' : 'missing');
  console.log('MAIL_TO:', import.meta.env.MAIL_TO);
  
  const formData = await request.formData();
    
    const idNumber = formData.get('id_number') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const birthYear = formData.get('birth_year') as string;
    const birthMonth = formData.get('birth_month') as string;
    const birthDay = formData.get('birth_day') as string;
    const type = formData.get('type') as string;
    const message = formData.get('message') as string;
    const token = formData.get('g-recaptcha-response') as string;

    // reCAPTCHA検証
    const recaptchaSecret = import.meta.env.RECAPTCHA_SECRET;
    
    if (!token) {
      return new Response('reCAPTCHAトークンがありません', { status: 400 });
    }

    const verifyResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${recaptchaSecret}&response=${token}`,
    });

    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      console.error('reCAPTCHA verification failed:', verifyData);
      return new Response('reCAPTCHA検証に失敗しました', { status: 400 });
    }

    if (verifyData.score && verifyData.score < 0.5) {
      return new Response('スパムの可能性が検出されました', { status: 400 });
    }

    // メール送信（Resendを使用）
    const mailTo = import.meta.env.MAIL_TO;
    const resendApiKey = import.meta.env.RESEND_API_KEY;

    const emailBody = `
【医籍番号(下4桁)】
${idNumber}

【お名前】
${name}

【メールアドレス】
${email}

【生年月日】
${birthYear}年${birthMonth}月${birthDay}日

【お問い合わせ種別】
${type}

【内容】
${message || '（なし）'}
    `.trim();

    // Resend APIでメール送信
    const sendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'お問い合わせフォーム <onboarding@resend.dev>',
        to: [mailTo],
        reply_to: email,
        subject: 'お問い合わせがありました',
        text: emailBody,
      }),
    });

    if (!sendResponse.ok) {
      const errorText = await sendResponse.text();
      console.error('Resend error:', errorText);
      return new Response('メール送信に失敗しました', { status: 500 });
    }

    // サンクスページにリダイレクト
    return redirect('/thanks', 302);

  } catch (error) {
    console.error('Contact form error:', error);
    return new Response('送信に失敗しました', { status: 500 });
  }
};