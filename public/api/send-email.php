<?php
header('Content-Type: application/json');

// 1. Load configuration (In production, these would be in environment variables or a secure config file)
// For OVH Shared Hosting, we can use a .env file or hardcode them here securely as it's server-side.
$config = [
    'resend_api_key' => 're_3zZvi2PG_EmcEc6n6Muj6xuD4m4t7bAxg', // Replace with real key
    'turnstile_secret_key' => '0x4AAAAAACpybv2K3d3cI-nMgQHv0huX1aU', // Replace with real key
    'to_email' => 'contact@tnexa.fr'
];

// 2. Get POST data
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request']);
    exit;
}

$name = strip_tags($input['name']);
$email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
$message = strip_tags($input['message']);
$turnstileToken = $input['turnstileToken'];

// 3. Verify Turnstile Token
$verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
$verifyData = [
    'secret' => $config['turnstile_secret_key'],
    'response' => $turnstileToken,
    'remoteip' => $_SERVER['REMOTE_ADDR']
];

$ch = curl_init($verifyUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $verifyData);
$verifyResponse = curl_exec($ch);
curl_close($ch);

$verifyResult = json_decode($verifyResponse, true);

if (!$verifyResult['success']) {
    http_response_code(403);
    echo json_encode(['error' => 'Turnstile verification failed']);
    exit;
}

// 4. Send Email via Resend
$resendUrl = 'https://api.resend.com/emails';
$emailData = [
    'from' => 'TneXa Contact <contact@tnexa.fr>', // Update with verified domain
    'to' => [$config['to_email']],
    'subject' => 'New Contact Form TneXa: ' . $name,
    'html' => "
        <h3>New Message from TneXa Website</h3>
        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Message:</strong><br>{$message}</p>
    "
];

$ch = curl_init($resendUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $config['resend_api_key']
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($emailData));
$sendResponse = curl_exec($ch);
$sendStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($sendStatus >= 200 && $sendStatus < 300) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email', 'details' => json_decode($sendResponse)]);
}
?>
