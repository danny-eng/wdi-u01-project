


// EXPLOSION LOGIC

// Listen to what key has been pressed!
document.addEventListener("keydown", inputListener);

// This handles all the key controls.

// Z, X, C handles firing from turrets A, B, C respectively.
// side note: A = 90vh, 10vw
//            B = 90vh, 50vw
//            C = 90vh, 90vw

function inputListener(event){
    let e = event;
    if (e.code === "KeyZ"){
        fireMissile(e.code);
    }
    if (e.code === "KeyX"){
        fireMissile(e.code);
    }
    if (e.code === "KeyC"){
        fireMissile(e.code);
    }
}

// How's the firing going to work?

// At a keypress, fire a missile.

// 1. Create a missile.
// 2. Make the missile move to the spot you pointed out.

// Listen to your mouse position.
document.addEventListener("mousemove", cursorTracker);

let mouseX = 0;
let mouseY = 0;

function cursorTracker(event){
    let e = event;
    mouseX = e.x;
    mouseY = e.y;
}

// The laser?
function fireMissile(key){

    // draw the div
    let missileDraw = document.createElement("div");
    missileDraw.setAttribute("class", "fMissile");
    document.body.appendChild(missileDraw);

    // calculating positions
    let x_origin = document.documentElement.clientWidth;
    let y_origin = document.documentElement.clientHeight * 0.88;

      if (key === "KeyZ"){
        x_origin = x_origin * 0.1;
      }
      if (key === "KeyX"){
        x_origin = x_origin * 0.5;
      }
      if (key === "KeyC"){
        x_origin = x_origin * 0.9;
      }

    // origin of trail
    missileDraw.style.left = x_origin + 'px';
    missileDraw.style.top = y_origin + 'px';

    // imagine this is a triangle
    // trail is the hypotenuse
    // opposite is y-difference
    // adjacent is x-difference
    let opposite = mouseY - y_origin;
    let adjacent = mouseX - x_origin;
    let hypotenuse = Math.sqrt(Math.pow(opposite, 2) + Math.pow(adjacent, 2));
    let angle = Math.atan2(opposite, adjacent) * 180 / Math.PI;
    missileDraw.style.transform = `rotate(${angle}deg)`;
    missileDraw.style.width = hypotenuse + `px`;

    // removing clutter
    window.setTimeout(function(){
      missileDraw.remove();
    }, 1000);

    explode();

}

function explode(){

    // Creates a div that uses the explosion class.
    let explosion = document.createElement("div");
    explosion.setAttribute("class", "explosion");
    document.body.appendChild(explosion);

    // Varying explosion size.
    let boomScale = (Math.random() * 60) + 40;
    explosion.style.height = boomScale + 'px';
    explosion.style.width = explosion.style.height;
    explosion.style.left = (mouseX - (boomScale / 2)) + 'px';
    explosion.style.top = (mouseY - (boomScale / 2)) + 'px';

    // Removes after a few seconds so the screen doesn't pollute.
    window.setTimeout(function(){
        explosion.remove();
    }, 1000);

}


// FALLING MISSILES LOGIC

// Giant bars of doom falling from the sky...
// Use two points: one to designate place of origin, another to designate target

function enemyMissiles(){

    // stuff for targeting
    let x_entry = Math.random() * document.documentElement.clientWidth;
    let y_entry = 0;

    let x_target = Math.random() * document.documentElement.clientWidth;
    let y_target = 0.9 * document.documentElement.clientHeight;

    let xp = x_entry;
    let yp = y_entry;

    // draw the enemy
    let missileDraw = document.createElement("div");
    missileDraw.setAttribute("class", "eMissile");
    document.body.appendChild(missileDraw);

    missileDraw.style.left = xp + 'px';
    missileDraw.style.top = yp + 'px';

    let x_spd = (x_target - x_entry) / ((Math.random() * 100) + 300);
    let y_spd = (y_target - y_entry) / ((Math.random() * 100) + 300);

    function draw() {
        requestAnimationFrame(draw);
        // Drawing code goes here
        xp += x_spd;
        yp += y_spd;
        console.log(`${xp}, ${yp}`);
        missileDraw.style.left = xp + 'px';
        missileDraw.style.top = yp + 'px';
    }
    draw();

}

function enemySalvo(){
  for (let i = 0; i < 8; i++){
    enemyMissiles();
  }
}

enemySalvo();

