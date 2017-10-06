

// Listen to what key has been pressed!
document.addEventListener("keydown", inputListener);

// This handles all the key controls.

// Z, X, C handles firing from turrets A, B, C respectively.

function inputListener(event){
    let e = event;
    if (e.code === "KeyZ"){
        console.log("Fire A!");
        fireMissile(e.code);
    }
    if (e.code === "KeyX"){
        console.log("Fire B!");
        fireMissile(e.code);
    }
    if (e.code === "KeyC"){
        console.log("Fire C!");
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

// The explosion.
function fireMissile(key){

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
