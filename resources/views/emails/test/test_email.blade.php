<!DOCTYPE html>
<html>

<head>
    <title>Brevo API Test Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background-color: #f0f0f0;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }

        .content {
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }

        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #666;
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>Brevo API Test Email</h1>
    </div>

    <div class="content">
        <p>{{ $message ?? 'This is a test email sent to verify the Brevo API integration.' }}</p>

        <p>This email was generated at: {{ now() }}</p>

        <p>If you received this email, it means the Brevo API integration is working correctly.</p>
    </div>

    <div class="footer">
        <p>This is an automated test email. Please disregard.</p>
    </div>
</body>

</html>