<?php

// Would be good if this was validated.

?>
<link href="https://fonts.googleapis.com/css?family=Gugi" rel="stylesheet">
<link href="static/breakout.css" rel="stylesheet">
<?php

// We should add some configuration.

?>
<div id="game-screen">
    <div style="position:absolute;width:1000px;margin-left:-500px;left:50%; display:block">

        <!-- Scores would be nice -->

        <canvas id="breakoutbg" width="800" height="500" style="position:absolute;left:0;border:0;">
        </canvas>
        <canvas id="breakout" width="800" height="500" style="position:absolute;left:0;">
        </canvas>
    </div>
</div>
<script>
    var curr_diff = "normal"; // Need to change difficulty.
    var curr_user_name = ""; // Would be nice if we know this.
</script>
<script type="text/javascript" src="static/breakout.js" charset="utf-8"></script>