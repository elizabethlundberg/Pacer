// made with the extensive help of this tutorial: https://www.codeandweb.com/texturepacker/tutorials/how-to-create-sprite-sheets-and-animations-with-pixijs
const app = new PIXI.Application({ width: 720, height: 250 })

const animationBox = document.getElementById('animation')
animationBox.appendChild(app.view)

let pagesLeftText = document.getElementById('pages-left').innerText
let pagesLeft = parseInt(pagesLeftText.split(': ')[1].split(' |')[0])
let goalForTodayText = document.getElementById('goal-for-today').innerText
let goalForToday = parseInt(goalForTodayText.split(': ')[1].split(' |')[0])
let pagesReadText = document.getElementById('pages-read').innerText
let pagesRead = parseInt(pagesReadText.split(': ')[1])
if (pagesRead === 0) {
  pagesRead = 1
}
let runnerPosition = (goalForToday / pagesRead) * 32
console.log(runnerPosition)

PIXI.Assets.load([
  'animation/sprites.json',
  'animation/background.png',
  'animation/foreground.png'
]).then(() => {
  const background = PIXI.Sprite.from('animation/background.png')
  app.stage.addChild(background)
  const middleground = PIXI.Sprite.from('animation/foreground.png')
  app.stage.addChild(middleground)
  app.stage.scale.x = app.view.width / background.width
  app.stage.scale.y = app.view.height / background.height
  const animations = PIXI.Assets.cache.get('animation/sprites.json').data
    .animations
  const runner = PIXI.AnimatedSprite.fromFrames(animations['runner/runner'])
  runner.animationSpeed = 1 / 6
  runner.position.set(runnerPosition, 140)
  runner.play()
  app.stage.addChild(runner)
  const pacer = PIXI.AnimatedSprite.fromFrames(animations['pacer/pacer'])
  pacer.animationSpeed = 1 / 12
  pacer.position.set(28, 160)
  pacer.play()
  app.stage.addChild(pacer)
})
