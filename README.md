# Project One - Tetris

![screenshot](https://github.com/PaddyCello/SEI-Project-One/blob/08de10e5789117e18b45fb6273ce29e6e1521a4b/gifs/recording%20(1).gif)

# Project Brief

For my first project at General Assembly, I had one week to make a grid-based game in JavaScript, HTML and CSS, choosing from a list of nine provided. I opted for Tetris, which was apparently one of the most challenging games on the list; but I always enjoy a good challenge.

# Deployed Link

[paddycello.github.io/sei-project-one](https://paddycello.github.io/SEI-Project-One/)

# Overview and Concept

Apart from the level of challenge, another motivator for building this game was that I had a clear concept of the feel and styling of the game from the outset, which gave Tetris an advantage over many of the other options. I wanted a very strong Soviet, brutalist aesthetic, complete with a reel-to-reel camera feel, plenty of grey, red and gold, and some Shostakovich accompanying the gameplay. From a gameplay perspective, I wanted to have the requisite seven individually coloured, rotatable, moveable tetriminoes (as the shapes in Tetris are apparently called!) descending on an 11x20 grid, with an imperceptible increase in speed as the playing continues - the idea being that the user would be slow to notice that the game was getting steadily harder.  The user’s score would have to be logged on a scoreboard, and should update with every row cleared - updating exponentially, as there is a bonus for clearing four rows simultaneously, and another bonus for doing this on consecutive clearings.

# Technologies Used

- JavaScript
- CSS
- HTML (strictly no HTML Canvas!)
- GitHub

# Approach Taken

As I knew that this was going to be a detailed task with multiple steps, I began by writing a few pages of pseudocode, starting with a top-level overview of each perceived step, and drilling further and further down in terms of detail until I almost had a set of instructions for myself. After having done this, I made a Trello board and populated it with tickets derived from these instructions. I continued to add to both of these throughout the week; this is due in part to having made a clear distinction between my ultimate goal and my MVP, and having set deadlines for both. 
My MVP was mainly a pared-down, unstyled interpretation of the final product, with no speed increases or audio. I had four tetriminoes instead of seven (and all uniformly coloured), and a 7x15 grid instead of 11x20, knowing that expanding all of these things later would be pretty straightforward. I also made a point of displaying the numbers of the cells of the grid, as this would help with visualizing the movements and rotations of the shapes. As mentioned earlier, I was forbidden from using HTML Canvas to make my grid - instead, I had to use a for loop to create a grid of flex-wrapped divs within a larger container:

```javascript
  const width = 11
  const height = 20
  const gridArea = width * height
  const gridWrapper = document.querySelector('.grid-wrapper')
  const cells = []
```

```javascript
function makeGrid() {
    for (let i = 0; i < gridArea; i++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      gridWrapper.appendChild(cell)
      cells.push(cell)
    }
  }
  makeGrid(gridArea)
```

The illusion of tetrimino movement is created by adding and removing classes to cells, in the configuration of whichever tetrimino is currently in play. 
After reaching MVP, I then proceeded to add the additional features in order of preference. My immediate intentions were to build out the number of shapes, the grid size, and the range of colours; then to add more styling (using a box shadow to give a 3D feel to the tetrimino squares was a particular win):

```css
.tetrimino {
  background-color: #dabc12;
  box-shadow: inset 3px 3px 2px #e4e3e3, inset -3px -3px 2px #504f4f;
}
```

Another big priority was to get my grain filter working. I did this with a bit of CSS animation, overlaying a larger filter over a smaller one (the larger one being substantially larger than the screen size), and moving the larger one around:

```css
.grain {
  background-image: url('https://image.freepik.com/free-vector/grainy-overlay-texture_1102-1186.jpg');
  opacity: 0.4;
  position: fixed;
  z-index: 4;
  height: 110vh;
  width: 110vw;
  margin: 0;
  padding: 0;
}
.grain:after {
  content: '';
  animation: grain 8s steps(10) infinite;
  background-image: url('https://image.freepik.com/free-vector/grainy-overlay-texture_1102-1186.jpg');
  opacity: 0.3;
  position: fixed;
  z-index: 5;
  height: 150vh;
  width: 150vw;
}
@keyframes grain {
  0%, 100% { transform:translate(0, 0) }
  10% { transform:translate(-5%, -10%) }
  20% { transform:translate(-15%, 5%) }
  30% { transform:translate(7%, -25%) }
  40% { transform:translate(-5%, 25%) }
  50% { transform:translate(-15%, 10%) }
  60% { transform:translate(15%, 0%) }
  70% { transform:translate(0%, 15%) }
  80% { transform:translate(3%, 35%) }
  90% { transform:translate(-10%, 10%) }
}
```

After this, I added the gradual speed increase, the aggregate scoring, the high score, and the audio.

# Bugs, Blockers and Wins

The project, for the most part, went pretty smoothly - however, there were still a few obstacles. One of the biggest ones involved the rotation of the shapes, which I had assigned to the space bar. Rather than rotate properly, the shape would instead duplicate and begin descending from the original departure point on the grid! This bothered both me and the teaching assistants that I consulted for about two days. Eventually, we discovered that a keyup event on the space bar will also trigger onclick events - and specifically, the onclick event on the button that would start the game! It turned out that one line of code, disabling the button after it had been clicked, would solve the problem.

```javascript
document.querySelector('button').disabled = 'true'
```

I did also have to make a couple of modifications to my concept for the game in order to get it to work. I made a grain filter with CSS animation, to replicate an old reel-to-reel camera, and my plan was for this to run continuously. I ended up having to compromise on this slightly in order for the user to operate the start button, as having it behind the grain filter would have put it too far into the background to be clickable. My solution was to have the game devoid of the grain filter until the user clicked the button; as an unexpected win, this added to the element of surprise when the grain filter then appeared, not least as I’d also discovered that HTML audio won’t play until there has been some sort of user interaction - in other words, not on page load as I had initially envisioned.

![screenshot](https://github.com/PaddyCello/SEI-Project-One/blob/2048ae384c1c55d97597a5a2d3fbd20392a937e3/gifs/Screenshot%202021-04-27%20at%2015.41.50.png)

# Future Features and Key Learning

This project was, at this point, by far the most ambitious thing that I had ever done with code. Outside of expanding my skills with JavaScript, HTML and CSS, I learned much about breaking down tasks and timeboxing, and my starting point of writing detailed pseudocode and making a Trello board of tasks has set the blueprint for every project since. Additionally, this project was also my first real introduction into researching my queries online.

Regarding future features, I would experiment with localStorage for logging high scores. At the moment, my high score logging is dependent on continuous gameplay - while this incentivises the user to not give up, it’s also less than ideal. Also, I could add to the reel-to-reel feel by using CSS animation to introduce movement into the game panels themselves.

