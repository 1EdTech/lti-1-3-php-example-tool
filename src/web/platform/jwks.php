<?php
require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../db/example_postgres_database.php';

use \IMSGlobal\LTI;

LTI\JWKS_Endpoint::new([
    'fcec4f14-28a5-4697-87c3-e9ac361dada5' => file_get_contents(__DIR__ . '/../../db/platform.key')
])->output_jwks();

?>