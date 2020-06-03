var c = document.getElementById("breakout");
var ctx = window.c.getContext("2d");

var bgctx = document.getElementById("breakoutbg").getContext("2d");
bgctx.beginPath();
var bggrad = ctx.createLinearGradient(0,0,0,c.height);
bggrad.addColorStop(0,"rgb(0, 0, 0)");
bggrad.addColorStop(1,"rgb(0, 0, 50)");
bgctx.fillStyle = bggrad;
bgctx.rect(0, 0, c.width, c.height);
bgctx.fill();
bgctx.font = "10px Gugi";
bgctx.fillStyle = '#FFFFFF';
bgctx.textAlign = "left";

var score = 0;

function RNG(seed) {
    // LCG using GCC's constants
    this.m = 0x80000000, // 2**31;
    this.a = 1103515245,
    this.c = 12345,
    this.cycle = 0,

    this.state = seed ? seed : 54321,

    this.nextInt = function() {
        this.cycle++;
        this.state = (this.a * this.state + this.c) % this.m;
        return this.state;
    },
    this.nextFloat = function() {
        // returns in range [0,1]
        return this.nextInt() / (this.m - 1);
    },
    this.nextMax = function(max) {
        return this.nextInt() % (max + 1);
    }
}

var difficulty = {
    hard: {
        speed_multiplier:1.5
    },
    normal: {
        speed_multiplier:1
    },
    easy: {
        speed_multiplier:0.7
    },
}

function asteroid_set() {
    this.asteroids = [],
    this.max = 50,
    this.index = 0,
    this.cool_down = 5,
    this.cool_down_min = 20,
    this.cool_down_max = 70,
    this.create_asteroid = function() {
        if (this.cool_down > 0) {
            this.cool_down--;
            return;
        }
        this.cool_down = this.cool_down_min + srng.nextMax(this.cool_down_max);
        this.asteroids[this.index] = new asteroid();
        this.asteroids[this.index].r = 20 + srng.nextMax(30);
        this.asteroids[this.index].x.pos = srng.nextMax(this.asteroids[this.index].x.max);
        this.asteroids[this.index].y.pos = - this.asteroids[this.index].r;
        this.asteroids[this.index].x.vel = (srng.nextMax(20)/10)-1;
        this.asteroids[this.index].y.vel += srng.nextMax(3);
        // recycle array to save memory
        if (this.index++ > this.max) {
            this.index = 0;
        }

    },
    this.update_positions = function() {
        for (var i = 0; i < this.asteroids.length; i++) {
            this.asteroids[i].update_pos();
        }
    },
    this.render = function(ctx) {
        for (var i = 0; i < this.asteroids.length; i++) {
            this.asteroids[i].render(ctx);
        }
    }
}

function asteroid() {
    this.r = 8,
    this.rot = 0,
    this.vel_rot = srng.nextMax(2) ? 0.01 : -0.01;
    this.x = {
        pos: 0,
        vel: 0,
        max: 800,
        min: 0
    },
    this.y = {
        pos: 0,
        vel: 3,
        max: 500,
        min: 0
    },
    this.active = true,
    this.hit = function() {
        this.r -= 10;
        window.score += 10;
        if (this.r < 16) {
            this.active = false;
            window.score += 20;
        }
    }
    this.update_pos = function() {
        if (!this.active) {
            return;
        }
        this.x.pos += this.x.vel;
        this.y.pos += this.y.vel;
        this.rot += this.vel_rot;
        switch(true) {
            case this.x.pos < this.x.min - this.r:
            case this.x.pos > this.x.max + this.r:
            case this.y.pos < this.y.min - this.r:
            case this.y.pos > this.y.max + this.r:
                this.active = false;
        }
    },
    this.render = function(ctx) {
        if (!this.active) {
            return;
        }
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = 'rgba(102, 87, 41, 1)';
        ctx.translate(this.x.pos, this.y.pos);
        ctx.rotate(this.rot * Math.PI);
        ctx.arc(0, 0, this.r, 0, 2 * Math.PI);
        ctx.fill();

        ctx.strokeStyle = 'rgba(74, 64, 35, 1)';
        ctx.lineCap = 'round';

        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.setLineDash([0,25,8,21,16,10]);
        ctx.lineWidth = 8;
        ctx.stroke();

        ctx.setLineDash([9,45,8,39,4,29]);
        ctx.lineWidth = 12;
        ctx.stroke();

        // Crater
        ctx.beginPath();
        ctx.arc(3, 5, this.r/2 , 0, 2 * Math.PI);

        ctx.strokeStyle = 'rgba(74, 64, 35, 1)';
        ctx.lineCap = 'round';

        ctx.setLineDash([3,45,6,51]);
        ctx.lineWidth = 8;
        ctx.stroke();

        ctx.setLineDash([1,55,8,59]);
        ctx.lineDashOffset = 33;
        ctx.lineWidth = 12;
        ctx.stroke();

        ctx.restore();
    }
};

function spaceship_set() {
    this.spaceships = [],
    this.max = 20,
    this.index = 0,
    this.cool_down = 100,
    this.cool_down_min = 100,
    this.cool_down_max = 200,
    this.max_spaceships = 1,
    this.create_spaceship = function() {
        var count = 0;
        for (var i = 0; i < this.spaceships.length; i++) {
            if (!this.spaceships[i].active) {
                continue;
            }
            if (++count < this.max_spaceships) {
                continue;
            }
            return;
        }
        if (this.cool_down > 0) {
            this.cool_down--;
            return;
        }
        this.cool_down = this.cool_down_min + srng.nextMax(this.cool_down_max);
        this.spaceships[this.index] = new spaceship();
        this.spaceships[this.index].r = 20;
        this.spaceships[this.index].x.pos = this.spaceships[this.index].x.min + srng.nextMax(this.spaceships[this.index].x.max - this.spaceships[this.index].x.min);
        this.spaceships[this.index].y.pos = - this.spaceships[this.index].r;
        this.spaceships[this.index].y.vel += srng.nextMax(3);
        this.spaceships[this.index].x.vel_direction = srng.nextMax(1) ? 0.3 : -0.3;

        // recycle array to save memory
        if (this.index++ > this.max) {
            this.index = 0;
        }

    },
    this.update_positions = function() {
        for (var i = 0; i < this.spaceships.length; i++) {
            this.spaceships[i].update_pos();
        }
    },
    this.render = function(ctx) {
        for (var i = 0; i < this.spaceships.length; i++) {
            this.spaceships[i].render(ctx);
        }
    }
}

function spaceship() {
    this.render_count = 0,
    this.r = 8,
    this.x = {
        pos: 0,
        vel: 0,
        max: 750,
        min: 50,
        max_vel: 3,
        vel_direction: 0.3
    },
    this.y = {
        pos: 0,
        vel: 3,
        max: 150,
        min: 20,
        max_vel: 3,
        vel_direction: 0.3
    },
    this.active = true,
    this.shooting = false,
    this.shoot_cool_down = 100,
    this.shoot_timer = 0,
    this.shoot_recover = 0,
    this.bullets = new bullet_set(),
    this.target = {x:0, y:0},
    this.shots = 6;
    this.lives = 4,
    this.hit = function() {
        window.score += 10;
        if (--this.lives < 1) {
            this.active = false;
            window.score += 200;
        }
    },
    this.shoot = function() {
        if (this.shoot_recover > 0) {
            this.shoot_recover--;
            return;
        }
        if (this.shoot_cool_down > 0) {
            this.shoot_cool_down--;
            return;
        }
        if (this.shoot_timer > 0) {
            this.shoot_timer--;
            return;
        }

        this.target.x = window.player.x.pos;
        this.target.y = window.player.y.pos;
        this.shoot_recover = 120;
        this.shoot_cool_down = 400 + srng.nextMax(300);
        this.shoot_timer = 120;

        for (var i = 0; i < this.shots; i++) {
            var bullet = this.bullets.add_bullet(this.x.pos, this.y.pos, srng.nextMax(12)-6, -srng.nextMax(6));
        }

    }
    this.update_pos = function() {
        if (!this.active) {
            return;
        }
        this.shoot();
        var v = 0.8;
        for (var i = 0; i < this.bullets.bullets.length; i++) {
            if (!this.bullets.bullets[i].active) {
                continue;
            }
            var targetx = this.bullets.bullets[i].x.pos - this.target.x;
            var targety = this.bullets.bullets[i].y.pos - this.target.y;
            if (Math.abs(targetx) > 100) {
                this.bullets.bullets[i].x.max_vel = 10;
            } else if (Math.abs(targetx) > 50) {
                this.bullets.bullets[i].x.max_vel = 8;
            } else if (Math.abs(targetx) > 20) {
                this.bullets.bullets[i].x.max_vel = 4;
            }
            if (targetx > 0) {
                this.bullets.bullets[i].x.vel -= v;
            }
            if (targetx < 0) {
                this.bullets.bullets[i].x.vel += v;
            }
            if (targety > 0) {
                this.bullets.bullets[i].y.vel -= v;
            }
            if (targety < 0) {
                this.bullets.bullets[i].y.vel += v;
            }
        }
        this.bullets.test_hit([window.player]);
        if ((this.shoot_cool_down < 1 && this.shoot_timer > 0) || this.shoot_recover > 0) {
            return;
        }

        // Randomly flip direction once in a while
        if (srng.nextMax(40) % 40 == 1) {
            this.x.vel_direction = -this.x.vel_direction;
        }
        if (srng.nextMax(40) % 40 == 1) {
            this.y.vel_direction = -this.y.vel_direction;
        }

        this.x.vel += this.x.vel_direction;
        this.y.vel += this.y.vel_direction;
        if (Math.abs(this.x.vel) > this.x.max_vel) {
            this.x.vel = (this.x.vel > 0) ? this.x.max_vel : -this.x.max_vel;
        }
        if (Math.abs(this.y.vel) > this.y.max_vel) {
            this.y.vel = (this.y.vel > 0) ? this.y.max_vel : -this.y.max_vel;
        }

        this.x.pos += this.x.vel;
        this.y.pos += this.y.vel;
        if (this.x.pos < this.x.min - this.r) {
            this.x.vel_direction = 0.3;
        }

        if (this.x.pos > this.x.max + this.r) {
            this.x.vel_direction = -0.3;
        }

        if (this.y.pos < this.y.min - this.r) {
            this.y.vel_direction = 0.3;
        }

        if (this.y.pos > this.y.max + this.r) {
            this.y.vel_direction = -0.3;
        }
    },
    this.render = function(ctx) {
        if (!this.active) {
            return;
        }
        this.bullets.render(ctx);
        this.render_count++;
        if (this.render_count > 24) {
            this.render_count = 0;
        }
        ctx.save();
        // Body
        ctx.beginPath();
        ctx.fillStyle = "rgb(105, 114, 128)";
        ctx.translate(this.x.pos, this.y.pos);
        ctx.arc(0, 0, this.r, 0, 2 * Math.PI);
        ctx.fill();

        // Bolts
        ctx.beginPath();
        ctx.arc(0, 0, this.r - 6 , 0, 2 * Math.PI);
        ctx.setLineDash([2,9]);
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.strokeStyle = "rgb(164, 173, 186)";
        ctx.stroke()

        // Inner Body
        ctx.beginPath();
        ctx.arc(0, 0, this.r - 12 , 0, 2 * Math.PI);

        ctx.fillStyle = "rgb(0, 38, 92)";
        ctx.fill();
        ctx.setLineDash([]);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "rgb(42, 74, 120)";
        ctx.lineDashOffset = 0 - this.render_count;
        ctx.stroke();

        // Lights
        ctx.beginPath();
        ctx.arc(0, 0, this.r + 6 , 0, 2 * Math.PI);

        ctx.lineCap = 'round';
        ctx.setLineDash([2,25]);
        ctx.lineWidth = 8;

        ctx.strokeStyle = "rgba(255, 255, 0, 0.6)";
        ctx.lineDashOffset = 0 - this.render_count;
        ctx.stroke();

        ctx.strokeStyle = "rgba(255, 0, 0, 0.6)";
        ctx.lineDashOffset = 14 + this.render_count;
        ctx.stroke();

        ctx.restore();
    }
}

function shooter() {
    this.lives = 3,
    this.active = true,
    this.x = {
        pos: 400,
        min: 0,
        max: 800
    },
    this.y = {
        pos: 500,
        min: 500,
        max: 500
    },
    this.r = 10,
    this.angle = {
        val: 0,
        min: -8,
        max: 8
    },
    this.cool_down = 0,
    this.bullets = new bullet_set(),
    this.hit = function() {
        if (this.invincible > 0) {
            return;
        }
        // touching!
        this.lives--;
        this.invincible = 120;
    },
    this.change_angle = function(angle) {
        this.angle.val += angle;
        if (this.angle.val < this.angle.min) {
            this.angle.val = this.angle.min;
        }
        if (this.angle.val > this.angle.max) {
            this.angle.val = this.angle.max;
        }
    },
    this.change_pos = function(x) {
        this.x.pos += x;
        if (this.x.pos < this.x.min) {
            this.x.pos = this.x.min;
        }
        if (this.x.pos > this.x.max) {
            this.x.pos = this.x.max;
        }
    },
    this.shoot = function() {
        if (this.cool_down != 0) {
            return;
        }
        this.bullets.add_bullet(this.x.pos, this.y.pos - this.r, this.angle.val, ((this.angle.val + 5)/4+1)*-1);
        this.cool_down = 10;
    },
    this.test_hit = function() {
        if (this.cool_down > 0) {
            this.cool_down--;
        }
        if (this.invincible > 0) {
            this.invincible--;
        }
        if (this.angle.val > 0) {
            this.angle.val--;
        } else if (this.angle.val < 0) {
            this.angle.val++;
        }

        for (var i = 0; i < window.asteroids.asteroids.length; i++) {
            var a = window.asteroids.asteroids[i];
            //is it active?
            if (!a.active || this.invincible > 0) {
                continue;
            }
            // is it close
            var xdist = Math.abs(this.x.pos - a.x.pos);
            if (xdist > a.r + 6) {
                continue;
            }
            var ydist = Math.abs(this.y.pos - a.y.pos);
            if (ydist > a.r + 6) {
                continue;
            }

            // is it touching
            if (Math.pow(Math.pow(xdist,2) + Math.pow(ydist,2), 0.5) > a.r + 6) {
                continue;
            }

            // touching!
            this.lives--;
            this.invincible = 120;

        }
        this.bullets.test_hit(window.asteroids.asteroids.concat(window.spaceships.spaceships));
    },
    this.render = function(ctx) {
        this.bullets.render(ctx);

        // flash if invincible
        if (this.invincible % 12 > 6) {
            return;
        }
        ctx.save();

        ctx.beginPath();
        ctx.translate(this.x.pos, this.y.pos);
        ctx.fillStyle = "rgb(95, 103, 115)";
        ctx.arc(0, -this.r+2, this.r/2+2, 0, 2 * Math.PI);
        ctx.fill();

        ctx.lineWidth = 4;
        ctx.strokeStyle = "rgb(95, 103, 115)";
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = "rgb(160, 171, 189)";
        ctx.arc(0, 0, this.r, 0, 2 * Math.PI);
        ctx.fill();

        ctx.lineWidth = 4;
        ctx.strokeStyle = "rgb(95, 103, 115)";
        ctx.stroke();



        ctx.restore();
    }
};

function bullet_set() {
    this.bullets = [],
    this.max = 100,
    this.index = 0,
    this.add_bullet = function(px, py, vx, vy) {
        this.bullets[this.index] = new bullet();
        this.bullets[this.index].x.pos = px;
        this.bullets[this.index].y.pos = py;
        this.bullets[this.index].x.vel = vx;
        this.bullets[this.index].y.vel = vy;
        // recycle array to save memory
        if (this.index++ > this.max) {
            this.index = 0;
        }
        return this.bullets[this.index];
    },
    this.test_hit = function(hit_objects) {
        for (var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].test_hit(hit_objects);
        }
    },
    this.render = function(ctx) {
        for (var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].render(ctx);
        }
    }
}

function bullet() {
    this.x = {
        pos: 0,
        vel: 0,
        max: 800,
        min: 0,
        max_vel: 10
    },
    this.y = {
        pos: 0,
        vel: 0,
        max: 500,
        min: 0,
        max_vel: 6
    },
    this.active = true,
    this.update_pos = function() {
        if (Math.abs(this.x.vel) > this.x.max_vel) {
            this.x.vel = (this.x.vel > 0) ? this.x.max_vel : -this.x.max_vel;
        }
        if (Math.abs(this.y.vel) > this.y.max_vel) {
            this.y.vel = (this.y.vel > 0) ? this.y.max_vel : -this.y.max_vel;
        }
        this.x.pos += this.x.vel;
        this.y.pos += this.y.vel;
        switch(true) {
            case this.x.pos < this.x.min:
            case this.x.pos > this.x.max:
            case this.y.pos < this.y.min:
            case this.y.pos > this.y.max:
                this.active = false;
        }
    },
    this.test_hit = function(hit_objects) {
        this.update_pos();
        for (var i = 0; i < hit_objects.length; i++) {
            this.hit_check(hit_objects[i]);
        }
    },
    this.hit_check = function(a) {
        //is it active?
        if (!a.active || !this.active) {
            return;
        }
        // is it close
        var xdist = Math.abs(this.x.pos - a.x.pos);
        if (xdist > a.r) {
            return;
        }
        var ydist = Math.abs(this.y.pos - a.y.pos);
        if (ydist > a.r) {
            return;
        }

        // is it touching
        if (Math.pow(Math.pow(xdist,2) + Math.pow(ydist,2), 0.5) > a.r) {
            return;
        }

        // touching!
        a.hit();
        this.active = false;
    },
    this.render = function(ctx) {
        if (!this.active) {
            return;
        }
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "rgb(255, 232, 102)";
        ctx.strokeStyle = "rgb(255, 232, 102)";
        ctx.lineWidth = 4;
        ctx.translate(this.x.pos, this.y.pos);
        ctx.arc(0, 0, 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if (keyName == "ArrowLeft") {
        press_left = true;
    }
    if (keyName == "ArrowRight") {
        press_right = true;
    }
    if (keyName == " ") {
        press_space = true;
    }
  });

document.addEventListener('keyup', (event) => {
    const keyName = event.key;
    if (keyName == "ArrowLeft") {
        press_left = false;
    }
    if (keyName == "ArrowRight") {
        press_right = false;
    }
    if (keyName == " ") {
        press_space = false;
        if (pause && !gameover) {
            if (!start_time) {
                start_time = Math.floor(Date.now() / 1000);
            }
            pause = false;
            frame();
        } else {
            //pause = true;
        }
    }
});

/**
 * Game Setup
 */

function game_setup() {
    window.score = 0;
    // Seeded random, allows for repeatable game play.
    window.srng = new RNG(45893845);
    window.press_left = false;
    window.press_right = false;
    window.press_space = false;
    window.pause = true;
    window.gameover = false;
    window.player = new shooter();
    window.asteroids = new asteroid_set();
    window.spaceships = new spaceship_set();
    window.start_time = false;
}
game_setup();

score_div = document.getElementById('score');
frame_div = document.getElementById('framecount');
fps_div = document.getElementById('fps');

function recording() {
    this.frame_count = 0,
    this.frame_buffer = '',
    this.recording_data = '',
    this.replay = [],
    this.replay_data = '',
    this.recording_loaded = function() {
        return this.replay.length > 0;
    }
    this.next = function() {
        if (this.frame_count < this.replay.length) {
            return this.replay[this.frame_count++];
        }
        return false;
    },
    this.load_recording = function(data) {
        // reset RNG and other things
        window.game_setup();
        this.frame_count = 0;
        this.frame_buffer = '';
        this.recording_data = '';
        this.replay = [];
        this.replay_data = '';

        this.replay_data = data;
        // Read off 6 characters of the base 32 number.
        for (var i = 0; i < data.length; i += 6) {
            // Convert from base 32 to binary.
            var chunk = parseInt(data.substring(i, i + 6), 32).toString(2);
            // Make sure the chunk is always 30 characters.
            while (chunk.length < 30) {
                chunk = '0' + '' + chunk;
            }

            // Read off each 3 bits from the chunk to get 1 frame's inputs
            for (var j = 0; j < chunk.length; j += 3) {
                var frame_int = parseInt(chunk.substring(j, j + 3), 2);
                // Save frame to replay array.
                this.replay.push({
                    l: (frame_int & parseInt('0001', 2)) > 0,
                    r: (frame_int & parseInt('0010', 2)) > 0,
                    s: (frame_int & parseInt('0100', 2)) > 0
                });
            }

        }
        window.frame();
    },
    this.add_frame = function(frame) {
        // Create bitfield of inputs.
        var b = 0;
        if (frame.l) {
            b |= parseInt('001', 2);
        }
        if (frame.r) {
            b |= parseInt('010', 2);
        }
        if (frame.s) {
            b |= parseInt('100', 2);
        }

        // Binary as string
        var s = b.toString(2);

        // Make sure string always show 3 bits
        while (s.length < 3) {
            s = '0' + '' + s;
        }

        // Add to buffer
        this.frame_buffer += '' + s;

        // If buffer isn't full, we are done.
        if (this.frame_buffer.length < 30) {
            return;
        }

        // Save the buffer
        this.save_buffer();

    },
    this.save_buffer = function() {
        // Check if there is anything to add.
        if (this.frame_buffer.length == 0) {
            return;
        }
        // Buffer must be full to save it
        while (this.frame_buffer.length < 30) {
            // Add empty inputs.
            this.frame_buffer += '' + '0';
        }

        // Convert to base 32 to save space
        var frames_chunk = parseInt(this.frame_buffer, 2).toString(32);
        // Make sure we are adding a consistent number of characters.
        while (frames_chunk.length < 6) {
            frames_chunk = '0' + '' + frames_chunk;
        }

        this.recording_data += '' + frames_chunk;
        this.frame_buffer = '';
    }

}

var game_recorder = new recording();

var last_frame_time = Date.now();

var frame = function() {

    // Has player died?
    if (window.player.lives < 1) {
        // Make sure all frames are saved.
        window.game_recorder.save_buffer();
        console.log(window.game_recorder.replay_data);
        console.log(window.game_recorder.recording_data);
        endGame();
    }

    // Clear screen
    window.ctx.clearRect(0, 0, window.c.width, window.c.height);

    window.frame_div.innerHTML = window.game_recorder.frame_count;

    // record or play back recording
    var f;
    if (!pause && window.game_recorder.recording_loaded()) {
        f = window.game_recorder.next();
    } else {
        f = {
            l: press_left,
            r: press_right,
            s: press_space
        };
        if (!pause) {
            window.game_recorder.frame_count++;
        }
    }

    if (window.game_recorder.frame_count > 2000) {
        window.asteroids.cool_down_min = 2;
        window.asteroids.cool_down_max = 10;
        window.spaceships.max_spaceships = 8;
    } else if (window.game_recorder.frame_count > 1000) {
        window.asteroids.cool_down_min = 5;
        window.asteroids.cool_down_max = 20;
        window.spaceships.max_spaceships = 3;
    }

    // Update positions
    if (f.l) {
        window.player.change_pos(-5);
        window.player.change_angle(-1);
    }
    if (f.r) {
        window.player.change_pos(5);
        window.player.change_angle(1);
    }
    if (f.s) {
        window.player.shoot();
    }
    window.asteroids.create_asteroid();
    window.asteroids.update_positions();
    window.spaceships.create_spaceship();
    window.spaceships.update_positions();
    window.player.test_hit();
    window.asteroids.render(window.ctx);
    window.spaceships.render(window.ctx);
    window.player.render(window.ctx);

    window.score_div.innerHTML = window.score;

    if (pause) {
        if (!gameover) {
            ctx.font = "50px Gugi";
            ctx.fillStyle = '#FFFFFF';
            ctx.textAlign = "center";
            if (window.game_recorder.recording_loaded()) {
                ctx.fillText("Press Space to Play Recording", c.width/2, c.height/2);
            } else {
                ctx.fillText("Ready " + curr_user_name, c.width/2, c.height/2);
                ctx.fillText("Press Space to Start", c.width/2, c.height/2 + 60);
            }
        }
    } else {
        window.game_recorder.add_frame(f);
        var frame_time = Date.now() - window.last_frame_time;
        // Lock to max 60 fps
        while (frame_time < 16) {
            frame_time = Date.now() - window.last_frame_time;
        }
        if (window.game_recorder.frame_count % 10 == 1) {
            window.fps_div.innerText = Math.floor(1000/frame_time);
        }
        window.last_frame_time = Date.now();
        requestAnimationFrame(frame);
    }
}

start_time = false;
if (!for_user) {
    document.fonts.load('50px Gugi').then(frame);
}

var endGame = function() {
    window.pause = true;
    window.gameover = true;
    // Only submit a score if we just played the game
    if (!window.game_recorder.recording_loaded()) {
        window.submitScore();
    }
}

var refreshScoreBoard = function() {
    var teams = JSON.parse(this.responseText);
    console.log(teams);
    var output = '';
    for (teamid in teams) {
        if (for_user && teamid != 'all') {
            continue;
        }
        output = '<li><a href="#leadertable-' + teamid + '">' + teams[teamid]['name'] + '</a></li>' + output;
    }
    output = '<ul class="tabs">' + output + '</ul>';
    for (teamid in teams) {
        if (for_user && teamid != 'all') {
            continue;
        }
        var scores = teams[teamid]['scoreboard'];
        output += '<table class="scoreboard-tab" id="leadertable-' + teamid + '" style="margin-left:12px;"><tr><th>Score</th><th>Time</th><th>Name</th><th>' + (teamid == 'all' ? 'Load Run' : '') + '</th></tr>';
        for (var i = 0; i < scores.length; i++) {
            if (for_user && for_user != scores[i].user_id) {
                continue;
            }
            var load_save_btn = '';
            if (scores[i].comment) {
                load_save_btn = '<button class="load_btn" onclick="window.game_recorder.load_recording(\'' + scores[i].comment + '\'); window.c.focus();">&#x3E;</button>';
                if (for_user) {
                    window.game_recorder.load_recording(scores[i].comment);
                    window.c.focus();
                }
            }
            output += '<tr><td>' + scores[i].score + '</td><td>' + scores[i].time + 's</td><td>' + scores[i].name + '</td><td>' + load_save_btn + '</td></tr>';
        }
        output += '</table>';
    }
    document.getElementById("sets").innerHTML = output;
}

var submitScore = function() {
    var time_taken = Math.floor(Date.now() / 1000) - start_time;
    var xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", getScoreBoard);
    xhttp.open("POST", "api/score.php" , false);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("launch_id=" + launch_id + "&score=" + window.score + "&time=" + time_taken + "&comment=" + window.game_recorder.recording_data);
}

var getScoreBoard = function() {
    var xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", refreshScoreBoard);
    xhttp.open("GET", "api/scoreboard.php?launch_id=" + launch_id, true);
    xhttp.send();
}

getScoreBoard();
