This is a game inspired by the Atari classic "Missile Command."

USER STORY

Enemy missiles fall from the sky to obliterate your people; defend them with the three laser turrets station along these cities.

The idea is to save at least one city each level from the onslaught.

You receive points after each level depending on the number of cities remaining and the number of shots you have left.

Levels become increasingly more difficult.

Your highest score will be recorded.

WIREFRAMES

```
+-----------------------+    +-----------------------+
|                       |    | jibberjabber stuff to |
|    missile command    |    | establish a setting + |
|                       |    | directions on how to  |
|                       | => | play.                 |
|                       | => |                       |
|         START         |    |         CONT.         |
|                       |    |                       |
|-----------------------|    |-----------------------|
+-----------------------+    +-----------------------+
                          
+-----------------------+
| SCORE   HIGH.         |     SCORE = player's current score
|                       |     HIGH. = highest score reached
|                       |     T = turret
|                       |     C = city
|                       |
|                       |
|                       |
|---T-C-C-C-T-C-C-C-T---|
+-----------------------+

+-----------------------+
| SCORE   HIGH.         |     . = Enemy missiles
|                  .    |
|    .                  |
|                .      |
|         .             |
|   .                   |
|                       |
|---T-C-C-C-T-C-C-C-T---|
+-----------------------+

+-----------------------+
|                       |      SCORE COUNTING 
|         SCORE         |      Remaining stuff
|                       |      Point tallying
|   REMAINING           |
|   TOTAL               |
|                       |
|                       |
|---X-C-C-C-X-C-C-C-T---|
+-----------------------+

+-----------------------+
|                       |
|                       |
|                       |
|         GAME          |
|          OVER         |
|                       |
|                       |
|---X-X-X-X-X-X-X-X-X---|
+-----------------------+
```

INSTRUCTIONS

These turrets respond to your commands; pressing Z, X, and C fires the turrets from left, to middle, to right, respectively at your cursor position. These lasers can eliminate the falling missiles.

TECHNOLOGIES USED

The components of this game include the HTML, the CSS, and the JS portions.

The HTML structures the game. It handles much of the text and the framework of the stage.

The CSS handles the color, creates animations, and a large portion of the visual elements.

The JS does all of the work. It employs numerous counters, event listening, and show/hides. 

APPROACH TAKEN

First, I broke the game down into components I thought I needed. 

The most important part, I thought, were functioning turrets and missiles.

Turrets functioned by shooting at where you pointed, so I used two event listeners: one for your key presses, and the other for your mouse position.

Missiles I simplified to explosions -- when they happened, I appended a child to the HTML body and played an animation by adding a class. That same function also detects destructable objects within its vicinity through getElementsByClassName, a for loop, and position checking.

Next, I had to find a way to make missiles fall in random angles. I achieved this by using basic trigonometry (finding arctangents) and Math.random().

With these three tasks done, I created a functional model of how levels functioned.

The last steps included setting up a title screen, score calculation, and score tracking, all of which required some degree of DOM manipulation.

The game also features high score tracking through localStorage.

UNSOLVED PROBLEMS

- Not very KISS or DRY.
- Limited adaptivity. Game might be easier with a smaller browser window.
- Tried to make it work with object prototypes and failed.

LINK

[Game is hosted here.](danny-eng-wdi-missile-command.bitballoon.com)

