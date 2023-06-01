// made with the extensive help of this tutorial: https://www.codeandweb.com/texturepacker/tutorials/how-to-create-sprite-sheets-and-animations-with-pixijs
const app = new PIXI.Application({ width: 720, height: 250 })

const animationBox = document.getElementById('animation')
animationBox.appendChild(app.view)

PIXI.Assets.load([
  'animation/background.png',
  'animation/middleground.png'
]).then(() => {
  const background = PIXI.Sprite.from('animation/background.png')
  app.stage.addChild(background)
  const middleground = PIXI.Sprite.from('animation/middleground.png')
  app.stage.addChild(middleground)
  app.stage.scale.x = app.view.width / background.width
  app.stage.scale.y = app.view.height / background.height
})
