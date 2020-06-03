<?php
require_once __DIR__ . '/../vendor/autoload.php';
define("TOOL_HOST", ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?: $_SERVER['REQUEST_SCHEME']) . '://' . $_SERVER['HTTP_HOST']);
session_start();
use \IMSGlobal\LTI;

class Example_Database implements LTI\Database {

    private $dbconn;

    public function __construct() {
        $this->dbconn = pg_connect("host=db dbname=postgres user=postgres password=postgres");
    }

    public function find_registration_by_issuer($iss) {

        $result = pg_query_params(
            $this->dbconn,
            'SELECT * FROM lti_registration WHERE issuer = $1 LIMIT 1',
            [$iss]
        );

        if (!$result) {
            return false;
        }

        $registration = pg_fetch_assoc($result);

        if (empty($registration)) {
            return false;
        }

        $key_result = pg_query_params(
            $this->dbconn,
            'SELECT * FROM lti_key WHERE key_set_id = $1 LIMIT 1',
            [$registration['key_set_id']]
        );

        if (!$key_result) {
            return false;
        }

        $key = pg_fetch_assoc($key_result);

        if (empty($key_result)) {
            return false;
        }

        return LTI\LTI_Registration::new()
            ->set_issuer($registration['issuer'])
            ->set_client_id($registration['client_id'])
            ->set_auth_login_url($registration['platform_login_auth_endpoint'])
            ->set_auth_token_url($registration['platform_service_auth_endpoint'])
            ->set_key_set_url($registration['platform_jwks_endpoint'])
            ->set_auth_server($registration['platform_auth_provider'])
            ->set_kid($key['id'])
            ->set_tool_private_key($key['private_key']);
    }

    public function find_deployment($iss, $deployment_id) {
        $result = pg_query_params(
            $this->dbconn,
            'SELECT d.deployment_id FROM lti_deployment d JOIN lti_registration r ON (d.registration_id = r.id) WHERE r.issuer = $1 AND d.deployment_id = $2',
            [$iss, $deployment_id]
        );

        if (!$result) {
            return false;
        }

        $deployment = pg_fetch_assoc($result);

        if (empty($deployment)) {
            return false;
        }
        return LTI\LTI_Deployment::new()
            ->set_deployment_id($deployment['deployment_id']);
    }

    public function get_keys_in_set($key_set_id) {
        $key_result = pg_query_params(
            $this->dbconn,
            'SELECT * FROM lti_key WHERE key_set_id = $1',
            [$key_set_id]
        );

        if (!$key_result) {
            return [];
        }

        $keys = [];
        while($key = pg_fetch_assoc($key_result)) {
            $keys[$key['id']] = $key['private_key'];
        }
        return $keys;
    }
}
?>