var canvas = document.getElementById("canvas"),
ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var stars = [], 
    FPS = 90, 
    x = 100;

// Push stars to array
for (var i = 0; i < x; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1 + 1,
        vx: Math.floor(Math.random() * 50) - 25,
        vy: Math.floor(Math.random() * 50) - 25
    });
}

// Draw the scene

function draw() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.globalCompositeOperation = "lighter";

    for (var i = 0, x = stars.length; i < x; i++) {
        var s = stars[i];

        ctx.fillStyle = "#1495f7";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "#01abe7";
        // ctx.fillStyle = "#b500a6";
        ctx.stroke();
    }    
}


// Update star locations

function update() {
    for (var i = 0, x = stars.length; i < x; i++) {
        var s = stars[i];

        s.x += s.vx / FPS;
        s.y += s.vy / FPS;

        if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
        if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
    }
}

// Update and draw

function tick() {
    draw();
    update();
    requestAnimationFrame(tick);
}

tick();