<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../db/example_database.php';

use \IMSGlobal\LTI;

LTI\JWKS_Endpoint::new([
    '58f36e10-c1c1-4df0-af8b-85c857d1634f' => file_get_contents(__DIR__ . '/../db/keys/private.key')
])->output_jwks();

?>