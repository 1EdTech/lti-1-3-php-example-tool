<?php
require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../db/example_postgres_database.php';

use \IMSGlobal\LTI;

LTI\LTI_OIDC_Login::new(new Example_Database())
    ->do_oidc_login_redirect(TOOL_HOST . "/oidc_demo/lti_launch.php")
    ->do_redirect();
?>