<?php
require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../db/example_postgres_database.php';

use \IMSGlobal\LTI;

$redirect_url = LTI\LTI_OIDC_Login::new(new Example_Database())
    ->do_oidc_login_redirect(TOOL_HOST . "/oidc_demo/lti_launch.php")
    ->get_redirect_url();

setcookie('thirdpartycookietest', 'true', time() + 3600);
?>
<a id="try-again" target="_blank">Link if blocked by popup blocker</a>
<script>

document.getElementById('try-again').href=window.location;


/**
 *
 * ************ Checking access to cookies ***************
 *
 */


var canAccessCookies = function() {
    console.log('*** Checking access to cookies ***');
    console.log('navigator.cookieEnabled=' + navigator.cookieEnabled);
    if (!navigator.cookieEnabled) {
        // We don't have access
        return false;
    }
    // Firefox returns true even if we don't actually have access
    try {
        console.log('document.cookie=' + document.cookie);
        if (!document.cookie || document.cookie == "" || document.cookie.indexOf('thirdpartycookietest') === -1) {
            return false;
        }
    } catch (e) {
        return false;
    }
    return true;
};


/**
 * *****************************************************
 */



if (canAccessCookies()) {
    console.log('*** Redirecting in current frame: ' + '<?php echo $redirect_url ?>' + ' ***' );
    window.location = '<?php echo $redirect_url ?>';
} else {
    console.log('*** Reopening in new window : ' + window.location + ' ***');
    var opened = window.open(window.location, '_blank');
    console.log(opened);
    if (opened) {
        document.getElementById('try-again').innerText = "New window opened, click to reopen";
    } else {
        document.getElementById('try-again').innerText = "Popup blocked, click to open in a new window";
    }
}

</script>