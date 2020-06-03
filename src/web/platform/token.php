<?php
require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../db/example_postgres_database.php';

use \IMSGlobal\LTI;

function get_public_key($key_set_url) {

    // Download key set
    $public_key_set = json_decode(file_get_contents($key_set_url), true);

    if (empty($public_key_set)) {
        // Failed to fetch public keyset from URL.
        throw new LTI_Exception("Failed to fetch public key", 1);
    }

    // Find key used to sign the JWT (matches the KID in the header)
    foreach ($public_key_set['keys'] as $key) {
        if ($key['kid'] == $this->jwt['header']['kid'] && $key['alg'] == $this->jwt['header']['alg']) {
            try {
                return openssl_pkey_get_details(JWK::parseKey($key));
            } catch(\Exception $e) {
                return false;
            }
        }
    }

    // Could not find public key with a matching kid and alg.
    throw new LTI_Exception("Unable to find public key", 1);
}

$jwt = JWT::decode($_POST['client_assertion'], get_public_key(TOOL_HOST . "/jwk.php"), array('RS256'));

echo json_encode([
    'access_token' => '9a4b5056-cdce-4cdd-8981-053b610d0842'
]);

?>