```js
<canvas id="myCanvas" width="1000" height="400"></canvas>

// 游戏(自建默认场景)
let game = new Game({
  FPS:1, 
  sceneTransition:{type: 'fade'},
  //showGrid: true,
  showRuler: true,
  debug: true
})
let sp = new Sprite(50, 50, 100, 50,{},{origin:5},{showRange:true})
let r1 = new Rect(0, 0, 100, 50, {fillStyle: '#f00'})
let r2 = new Rect(100, 100, 200, 100, {fillStyle: '#0f0'})
let r3 = new Rect(120, 120, 100, 500, {fillStyle: '#00f'})
sp.addChild(r1)

let ss
let img = new Image()
img.onload = function(){
  
  ss = new SpriteSheet(400, 100, 50, 60, this, {origin: 5}, {
      matrix:[[1,1,1],[1,1,1]], 
      children: {'righter': [0,1,2], 'lefter': [3,4,5]}, 
      defaultName: 'lefter'
    })
  game.addActor(ss)
  game.create('marry', {
    type: 'SpriteSheet', 
    data:[500, 100, 50, 60, this, {origin: 5}, {
      matrix:[[1,1,1],[1,1,1]], 
      children: {'righter': [0,1,2], 'lefter': [3,4,5]}, 
      defaultName: 'lefter'
    }]})
  game.create('blueRect', {
    type: 'Rect',
    data: [120, 120, 100, 500, {fillStyle: '#00f'}]
  })
  game.create('mask', {
    type: 'Sprite',
    data: [0, 0, 1000, 400, {fillStyle: '#fff'}]
  })
  game.create('bg', {type: 'Rect', data: [0, 0, 1000, 400]}, 'mask')
  game.transform('mask', {alpha: -1})
  //game.draw()
}
img.src = './images/marry.png'




game.addActor(sp)
//game.addActor(r2)
//game.addActor(r3)


game.start()
//game.draw()


$test = document.querySelector('#test')
  $test.addEventListener('click', function(e){
    var target = e.target, type = target.getAttribute('data-type')
    if (target.tagName !== 'BUTTON') return 
    switch(type){
      case 'game01': game.getActor('marry').changeName('righter'); break; 

      case 'spritSheet1': ss.rotate(180); break;
      case 'spritSheet2': ss.changeName('righter'); break;
      case 'spritSheet3': ss.changeName('lefter'); break;
      
      case 'translate1': sp.translate(100); break;
      case 'translate2': sp.translate(-50); break;
      case 'translateX1': sp.translateX(100); break;
      case 'translateX2': sp.translateX(-50); break;
      case 'translateTo1': sp.translateTo(100); break;
      case 'translateTo2': sp.translateTo(-50); break;

      case 'scale1': sp.scale(1,1); break;
      case 'scale2': sp.scale(-0.5,-0.5); break;

      case 'rotate1': sp.rotate(45); break;
      case 'rotate2': sp.rotate(-90); break;

      case 'all1': sp.translate(100); sp.rotate(90); sp.scale(1,1); break;
      case 'all2': sp.translate(-50, 100); sp.rotate(-45); sp.scale(-0.5,-0.5); break;
    }
    
  })
```