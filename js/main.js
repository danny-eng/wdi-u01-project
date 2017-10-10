

let buildings = document.getElementsByClassName("obstruct");
let the_turrets = document.getElementsByClassName("turret");
let the_cities = document.getElementsByClassName("city");

const turret_a = document.getElementById("turret-a");
const turret_aa = document.getElementById("turret-a-status");
let ta_ammo = "STANDBY";
const turret_b = document.getElementById("turret-b");
const turret_ba = document.getElementById("turret-b-status");
let tb_ammo = "STANDBY";
const turret_c = document.getElementById("turret-c");
const turret_ca = document.getElementById("turret-c-status");
let tc_ammo = "STANDBY";

let level = 0;
let score = 0;
let total_score = 0;

let highScore = localStorage.getItem('wdi-de-mc-highScore');

showAmmo();

let cities_remaining = 6;
let missiles_remaining = 45;

// initiate!

// start menu
document.addEventListener("click", initiate);
document.addEventListener("keydown", initiate);
showAmmo();

// setting screen
function initiate(){
  while (highScore === null){
    localStorage.setItem('wdi-de-mc-highScore', 0);
    highScore = localStorage.getItem('wdi-de-mc-highScore');
  }
  document.removeEventListener("click", initiate);
  document.removeEventListener("keydown", initiate);
  document.getElementsByClassName("title")[0].style.visibility = "hidden";
  document.getElementsByClassName("start")[0].style.visibility = "hidden";
  setTimeout(initiate_b, 500);
}

function initiate_b(){
  document.getElementsByClassName("setting")[0].style.visibility = "visible";
  document.getElementsByClassName("setting")[0].className += " fade-in";
  setTimeout(initiate_c, 3000);
}

function initiate_c(){
  document.getElementById("please_wait").innerText = "Press any key to continue";
  document.getElementById("please_wait").className += " flicker";
  document.addEventListener("click", initiate_d);
  document.addEventListener("keydown", initiate_d);
}

function initiate_d(){
  document.removeEventListener("click", initiate_d);
  document.removeEventListener("keydown", initiate_d);
  document.getElementsByClassName("setting")[0].style.visibility = "hidden";
  startLevel();
}

// start level
function startLevel(){

  document.removeEventListener("click", startLevel);
  document.removeEventListener("keydown", startLevel);

  let sb = document.getElementsByClassName("score")[0];
  let ss = document.getElementsByClassName("score-screen")[0];
  sb.style.visibility = "visible";
  ss.innerHTML = ``;
  ss.style.visibility = "hidden";

  showScore();

  let f_missiles = document.getElementsByClassName("class", "fMissile");
  for (let i = 0; i < f_missiles.length; i++){
    f_missiles[0].remove();
  }

  level++;

  // buildings reset
  for (let i = 0; i < the_cities.length; i++){
    the_cities[i].setAttribute("class", "city obstruct");
    the_cities[i].style.visibility = "visible";
  }
  for (let i = 0; i < the_turrets.length; i++){
    the_turrets[i].setAttribute("class", "turret obstruct");
    the_turrets[i].style.visibility = "visible";
  }
  cities_remaining = 6;

  // ammo reset
  ta_ammo = 15;
  tb_ammo = 15;
  tc_ammo = 15;
  missiles_remaining = ta_ammo + tb_ammo + tc_ammo;

  showAmmo();
  enemySalvo();

  document.addEventListener("keydown", inputListener);
  document.addEventListener("mousemove", cursorTracker);

}


// EXPLOSION LOGIC

// Listen to what key has been pressed!
// document.addEventListener("keydown", inputListener);

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
// document.addEventListener("mousemove", cursorTracker);

let mouseX = 0;
let mouseY = 0;

function cursorTracker(event){
    let e = event;
    mouseX = e.x;
    mouseY = e.y;
}

function showAmmo(){
  if (ta_ammo === 0 || turret_a.getAttribute("class").includes("lost") === true){
    turret_aa.innerText = `OUT`;
    ta_ammo = 0;
  } else {
    turret_aa.innerText = `${ta_ammo}`;
  }
  if (tb_ammo === 0 || turret_b.getAttribute("class").includes("lost") === true){
    turret_ba.innerText = `OUT`;
    tb_ammo = 0;
  } else {
    turret_ba.innerText = `${tb_ammo}`;
  }
  if (tc_ammo === 0 || turret_c.getAttribute("class").includes("lost") === true){
    turret_ca.innerText = `OUT`;
    tc_ammo = 0;
  } else {
    turret_ca.innerText = `${tc_ammo}`;
  }
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

    if (key === "KeyZ" && turret_a.getAttribute("class").includes("lost") === false && ta_ammo > 0){
      x_origin = x_origin * 0.1;

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
      ta_ammo--;
      showAmmo();

    }
    if (key === "KeyX" && turret_b.getAttribute("class").includes("lost") === false && tb_ammo > 0){
      x_origin = x_origin * 0.5;

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
      tb_ammo--;
      showAmmo();

    }
    if (key === "KeyC" && turret_c.getAttribute("class").includes("lost") === false && tc_ammo > 0){
      x_origin = x_origin * 0.9;

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
      tc_ammo--;
      showAmmo();

    }

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

function citiesCount(){
  for (let i = 0; i < the_cities.length; i++){
    if (the_cities[i].className.includes(" lost") === true){
      cities_remaining--;
    }
  }
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
    if (yp >= y_target && missileDraw.getAttribute("class").includes("detonated") === false){
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

let intv;
function enemySalvo(){
  for (let i = 0; i < 20; i++){
    setTimeout(enemyMissiles, Math.random() * 2000);
  }
  intv = setInterval(checkScreen, 2000);
}

function checkScreen(){

  let activeMissiles = document.getElementsByClassName("eMissile");

  if (activeMissiles.length > 0){
    return;
  } else {
    scoreScreen();
  }

}

function scoreScreen(){

  clearInterval(intv);
  missiles_remaining = ta_ammo + tb_ammo + tc_ammo;
  citiesCount();
  total_score += (cities_remaining * 1000) + (missiles_remaining * 100);

  let sb = document.getElementsByClassName("score")[0];
  let ss = document.getElementsByClassName("score-screen")[0];
  sb.style.visibility = "hidden";
  document.removeEventListener("keydown", inputListener);
  document.removeEventListener("mousemove", cursorTracker);
  if (cities_remaining > 0){
    ss.innerHTML = `<h2>Level Score: ${cities_remaining} * 1000 = ${cities_remaining * 1000}</h2><br><h2>Missiles Left: ${missiles_remaining} * 100 = ${missiles_remaining * 100}</h2><br><h2>Total Score: ${total_score}</h2>`;
    ss.style.visibility = "visible";
    setTimeout(function(){
      ss.innerHTML = `<h2>Level Score: ${cities_remaining} * 1000 = ${cities_remaining * 1000}</h2><br><h2>Missiles Left: ${missiles_remaining} * 100 = ${missiles_remaining * 100}</h2><br><h2>Total Score: ${total_score}</h2><br><br><br><h2 class="flicker">Press any key to continue</h2>`;
      document.addEventListener("keydown", startLevel);
      document.addEventListener("click", startLevel);
    }, 4000);
  } else {
    if (total_score < highScore){
      localStorage.setItem('wdi-de-mc-highScore', total_score);
      highScore = total_score;
      ss.innerHTML = `<h2>You lost.</h2><br><br><h2>All your cities have been destroyed.</h2><br><h2>Total Score: ${total_score}</h2><br><br><h2>YOU HAVE A NEW HIGH SCORE!</h2>`;
      ss.style.visibility = "visible";
    } else {
      ss.innerHTML = `<h2>You lost.</h2><br><br><h2>All your cities have been destroyed.</h2><br><h2>Total Score: ${total_score}</h2>`;
      ss.style.visibility = "visible";
    }
  }

}

function showScore(){
  document.getElementsByClassName("score")[0].innerText = `Score: ${total_score}`;
  if (highScore === undefined || null || NaN){
    highScore = 0;
  }
  document.getElementsByClassName("hScore")[0].innerText = `Highest Score: ${highScore}`;
}

// collisions!

function collisionCheck(x, y){

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
        buildings[i].className += " lost";
        showAmmo();
      } else if (e_l < b_l && b_r < e_r){
        buildings[i].style.visibility = "hidden";
        buildings[i].className += " lost";
        showAmmo();
      } else if (e_l < b_r && b_r < e_r){
        buildings[i].style.visibility = "hidden";
        buildings[i].className += " lost";
        showAmmo();
      } else if (b_r < e_l){
      } else {
      }
    }
  }
  for (let i = 0; i < activeMissiles.length; i++){
    let c_ox = activeMissiles[i].getClientRects()[0].x - 2;
    let c_oy = activeMissiles[i].getClientRects()[0].y - 2;
    let c_r = 4;

    let dist = Math.sqrt(Math.pow((c_ox - x),2) + Math.pow((c_oy - y),2));

    if (dist < 27){
      activeMissiles[i].className += " detonated";
      activeMissiles[i].style.visibility = "hidden";
      activeMissiles[i].remove();
    }
  }

}



// enemySalvo();
