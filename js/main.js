


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

  if (mouseY < 585){
    // draw the div
    let missileDraw = document.createElement("div");
    missileDraw.setAttribute("class", "fMissile");
    document.body.appendChild(missileDraw);

    // calculating positions
    let x_origin = document.documentElement.clientWidth;
    let y_origin = document.documentElement.clientHeight * 0.87;

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

    explode(mouseX, mouseY);

  } else {
    return;
  }

}

function explode(x, y){

    // Creates a div that uses the explosion class.
    let explosion = document.createElement("div");
    explosion.setAttribute("class", "explosion");
    document.body.appendChild(explosion);

    // Varying explosion size.
    explosion.style.left = (x - 25) + 'px';
    explosion.style.top = (y - 25) + 'px';

    collisionCheck(x, y);

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

    let x_spd = (x_target - x_entry) / 500;
    let y_spd = (y_target - y_entry) / 500;

    function draw() {
      if (yp >= y_target && missileDraw.getAttribute("class").contains("detonated") === false){
        missileDraw.remove();
        explode(xp, yp);
        return;
      } else {
        requestAnimationFrame(draw);
        xp += x_spd;
        yp += y_spd;
        missileDraw.style.left = xp + 'px';
        missileDraw.style.top = yp + 'px';
      }
    }

    draw();
}

function enemySalvo(){
  for (let i = 0; i < 8; i++){
    enemyMissiles();
  }
}

// collision

function collisionCheck(x, y){

  let buildings = document.getElementsByClassName("obstruct");
  let activeMissiles = document.getElementsByClassName("eMissile");

  let e_l = x - 25;
  let e_r = x + 25;

  // explosion span and building span needs to share values

  // e_l, e_r designate explosion left, right
  // b_l, b_r designate building left, right

  // e_l, e_r, b_l, b_r is a miss
  // e_l, b_l, e_r, b_r is hit
  // e_l, b_l, b_r, e_r is hit
  // b_l, e_l, b_r, e_r is hit
  // b_l, b_r, e_l, e_r is a miss
  if (y > 585){
    for (let i = 0; i < buildings.length; i++){
      let b_l = buildings[i].getClientRects()[0].x;
      let b_r = buildings[i].getClientRects()[0].x + buildings[i].getClientRects()[0].width;
      if (e_r < b_l){
      } else if (e_l < b_l && b_l < e_r){
        buildings[i].style.visibility = "hidden";
      } else if (e_l < b_l && b_r < e_r){
        buildings[i].style.visibility = "hidden";
      } else if (e_l < b_r && b_r < e_r){
        buildings[i].style.visibility = "hidden";
      } else if (b_r < e_l){
      } else {
      }
    }
  }
    for (let i = 0; i < activeMissiles.length; i++){
      let b_l = activeMissiles[i].getClientRects()[0].x;
      let b_r = activeMissiles[i].getClientRects()[0].x + activeMissiles[i].getClientRects()[0].width;
      if (e_r < b_l){
      } else if (e_l < b_l && b_l < e_r){
        activeMissiles[i].setAttribute("class",'eMissile detonated');
        activeMissiles[i].remove();
      } else if (e_l < b_l && b_r < e_r){
        activeMissiles[i].setAttribute("class",'eMissile detonated');
        activeMissiles[i].remove();
      } else if (e_l < b_r && b_r < e_r){
        activeMissiles[i].setAttribute("class",'eMissile detonated');
        activeMissiles[i].remove();
      } else if (b_r < e_l){
      } else {
      }
    }



}

enemySalvo();
