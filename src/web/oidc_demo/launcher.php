<?php

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../db/example_database.php';

use \Firebase\JWT\JWT;
$message_jwt = [
    "iss" => 'https://localhost',
    "aud" => ['d42df408-70f5-4b60-8274-6c98d3b9468d'],
    "sub" => '181c62b1e-3101-4100-b4bc-0542dbdfb549',
    "exp" => time() + 600,
    "iat" => time(),
    "nonce" => uniqid("nonce"),
    "https://purl.imsglobal.org/spec/lti/claim/deployment_id" => '8c49a5fa-f955-405e-865f-3d7e959e809f',
    "https://purl.imsglobal.org/spec/lti/claim/message_type" => "LtiResourceLinkRequest",
    "https://purl.imsglobal.org/spec/lti/claim/version" => "1.3.0",
    "https://purl.imsglobal.org/spec/lti/claim/target_link_uri" => "https://ltiphp.ngrok.io/oidc_demo/lti_launch.php",
    "https://purl.imsglobal.org/spec/lti/claim/roles" => [
        "http://purl.imsglobal.org/vocab/lis/v2/membership#Instructor"
    ],
    "https://purl.imsglobal.org/spec/lti/claim/resource_link" => [
        "id" => "7b3c5109-b402-4eac-8f61-bdafa301cbb4",
    ],
];
$database = new Example_Database();
$jwt = JWT::encode(
    $message_jwt,
    $database->find_registration_by_issuer('https://localhost')->get_tool_private_key(),
    'RS256',
    '58f36e10-c1c1-4df0-af8b-85c857d1634f'
);
?>

<form id="auto_submit" action="<?= $_REQUEST['redirect_uri']; ?>" method="POST">
    <input type="hidden" name="id_token" value="<?= $jwt ?>" />
    <input type="hidden" name="state" value="<?= $_REQUEST['state']; ?>" />
</form>
<script>
    document.getElementById('auto_submit').submit();
</script>
