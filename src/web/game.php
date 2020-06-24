<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../db/example_postgres_database.php';

use \IMSGlobal\LTI;
$launch = LTI\LTI_Message_Launch::new(new Example_Database())
    ->validate();

?>
<link href="static/shooter.css" rel="stylesheet">
<!--<link href="static/breakout.css" rel="stylesheet">-->
<style>
@font-face {
  font-family: 'Gugi';
  src: url('/static/Gugi-Regular.ttf') format('truetype');
}
</style>
<?php

if ($launch->is_deep_link_launch()) {
    ?>
    <div class="dl-config" style="padding:24px">
        <h1>Pick a Difficulty</h1>
        <ul>
            <li><a href="<?= TOOL_HOST ?>/configure.php?diff=easy&launch_id=<?= $launch->get_launch_id(); ?>">Easy</a></li>
            <li><a href="<?= TOOL_HOST ?>/configure.php?diff=normal&launch_id=<?= $launch->get_launch_id(); ?>">Normal</a></li>
            <li><a href="<?= TOOL_HOST ?>/configure.php?diff=hard&launch_id=<?= $launch->get_launch_id(); ?>">Hard</a></li>
        </ul>
    </div>
    <?php
    die;
}
?>


<div id="game-screen">
    <div style="position:absolute;width:1120px;margin-left:-560px;left:50%; display:block;">
        <div id="scoreboard" style="position:absolute; right:0; width:310px; height:486px">
            <h2 style="margin-left:12px;">Scoreboard</h2>
            <div id="sets">
                <table id="leadertable" style="margin-left:12px;">
                </table>
            </div>
            <ul class="stats">
            <li>Score: <div id="score"></div></li>
            <li>Frames: <div id="framecount"></div></li>
            <li>FPS: <div id="fps">0</div></li>
            <ul>
        </div>
        <canvas id="breakoutbg" width="804" height="504" style="position:absolute;left:0;border:0;">
        </canvas>
        <canvas id="breakout" width="800" height="500" style="position:absolute;left:0;border:2px solid white;" tabindex="0">
        </canvas>
    </div>
</div>
<script>
    // Set game difficulty if it has been set in deep linking
    var curr_diff = "<?= $launch->get_launch_data()['https://purl.imsglobal.org/spec/lti/claim/custom']['difficulty'] ?: 'normal'; ?>";
    var curr_user_name = "<?= $launch->get_launch_data()['name']; ?>";
    var launch_id = "<?= $launch->get_launch_id(); ?>";
    var for_user = "<?= $launch->is_submission_review_launch() ? $launch->get_launch_data()['https://purl.imsglobal.org/spec/lti/claim/for_user']['id'] : ''; ?>";
</script>
<script type="text/javascript" src="static/shooter.js" charset="utf-8"></script>
<!--<script type="text/javascript" src="static/breakout.js" charset="utf-8"></script>-->