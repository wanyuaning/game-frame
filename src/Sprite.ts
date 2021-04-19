import GameElement from './Element'

/**
 * ▇精灵元素▇
 * 属性：type/children/parent/data
 * 方法：addChild/appendTo
 *      translate/translateTo/rotate/rotateTo/scale/scaleTo/update
 */
 export default class Sprite extends GameElement{
  constructor(x:number, y:number, width:number, height:number, options:object, transform:object, config:object){
    super('Sprite')
    transform = Object.assign({x, y, translateX: 0, translateY: 0, scaleX: 1, scaleY: 1, rotate: 0, alpha: 1, origin: 1}, transform || {})
    console.log('transform',transform);
    
    this.data = {x, y, width, height, options, transform, config, children: null}
    this.data.children = this.children
    this.TRANSFORM = {
      transform,
      _transform: JSON.parse(JSON.stringify(transform)),
      tween: JSON.parse(JSON.stringify(transform)),
      timerX: 0,
      timerY: 0,
      timerR: 0,
      timerSX: 0,
      timerSY: 0,
      timerA: 0
    }
  }
  translate (x, y){
    let T = this.TRANSFORM, {transform, _transform, tween} = T; 
    if (x) {tween.translateX += x; T.timerX = new Date().getTime(); _transform.translateX = transform.translateX }
    if (y) {tween.translateY += y; T.timerY = new Date().getTime(); _transform.translateY = transform.translateY }
  }
  translateX (x){ let T = this.TRANSFORM, {transform, _transform, tween} = T; if (x) { tween.translateX += x; T.timerX = new Date().getTime(); _transform.translateX = transform.translateX } }
  translateY (y){ let T = this.TRANSFORM, {transform, _transform, tween} = T; if (y) { tween.translateY += y; T.timerY = new Date().getTime(); _transform.translateY = transform.translateY } }
  translateTo(x, y){ let {transform, _transform, tween} = this.TRANSFORM; x && (_transform.translateX = transform.translateX = tween.translateX = x); y && (_transform.translateY = transform.translateY = tween.translateY = y) }  

  
  scale  (x, y){
    let T = this.TRANSFORM, {transform, _transform, tween} = T
    console.log(transform.scaleX, transform.scaleX, tween.scaleX);
    if (x) { tween.scaleX += x; T.timerSX = new Date().getTime(); _transform.scaleX = transform.scaleX }
    if (y) { tween.scaleY += y; T.timerSY = new Date().getTime(); _transform.scaleY = transform.scaleY }
    console.log(transform.scaleX, transform.scaleX, tween.scaleX);
  }
  scaleX  (x){ let T = this.TRANSFORM, {transform, _transform, tween} = T; if (x) { tween.scaleX += x; T.timerSX = new Date().getTime(); _transform.scaleX = transform.scaleX } }
  scaleY  (y){ let T = this.TRANSFORM, {transform, _transform, tween} = T; if (y) { tween.scaleY += y; T.timerSY = new Date().getTime(); _transform.scaleY = transform.scaleY } }
  scaleTo(x, y){ let {transform, _transform, tween} = this.TRANSFORM; x && (_transform.scaleX = transform.scaleX = tween.scaleX = x); y && (_transform.scaleY = transform.scaleY = tween.scaleY = y) }

  alpha (a){ let T = this.TRANSFORM, {transform, _transform, tween, timerA} = T; tween.alpha += a; T.timerA = new Date().getTime(); _transform.alpha = transform.alpha }
  rotate (deg){ let T = this.TRANSFORM, {transform, _transform, tween, timerR} = T; tween.rotate += deg; T.timerR = new Date().getTime(); _transform.rotate = transform.rotate }
  rotateTo(deg){ let {transform, _transform, tween} = this.TRANSFORM; deg && (_transform.rotate = transform.rotate = tween.rotate = deg) }  
  
  update(){
    let T = this.TRANSFORM, {transform, _transform, tween, timerX, timerY, timerR, timerSX, timerSY, timerA} = T, now = new Date().getTime();
    // 缩放
    if (transform.scaleX < tween.scaleX) {
      transform.scaleX = tweens.runDefault(now - timerSX, _transform.scaleX, tween.scaleX, 2000) 
      transform.scaleX > tween.scaleX && (_transform.scaleX = transform.scaleX = tween.scaleX)
    }
    if (transform.scaleX > tween.scaleX) {
      transform.scaleX = tweens.runDefault(now - timerSX, _transform.scaleX, tween.scaleX, 2000) 
      transform.scaleX < tween.scaleX && (_transform.scaleX = transform.scaleX = tween.scaleX)
    }
    if (transform.scaleY < tween.scaleY) {
      transform.scaleY = tweens.runDefault(now - timerSY, _transform.scaleY, tween.scaleY, 2000) 
      transform.scaleY > tween.scaleY && (_transform.scaleY = transform.scaleY = tween.scaleY)
    }
    if (transform.scaleY > tween.scaleY) {
      transform.scaleY = tweens.runDefault(now - timerSY, _transform.scaleY, tween.scaleY, 2000) 
      transform.scaleY < tween.scaleY && (_transform.scaleY = transform.scaleY = tween.scaleY)
    }
    // 位移
    if (transform.translateX < tween.translateX) {
      transform.translateX = tweens.runDefault(now - timerX, _transform.translateX, tween.translateX, 2000) 
      transform.translateX > tween.translateX && (_transform.translateX = transform.translateX = tween.translateX)
    }
    if (transform.translateX > tween.translateX) {
      transform.translateX = tweens.runDefault(now - timerX, _transform.translateX, tween.translateX, 2000) 
      transform.translateX < tween.translateX && (_transform.translateX = transform.translateX = tween.translateX)
    }
    if (transform.translateY < tween.translateY) {
      transform.translateY = tweens.runDefault(now - timerY, _transform.translateY, tween.translateY, 2000) 
      transform.translateY > tween.translateY && (_transform.translateY = transform.translateY = tween.translateY)
    }
    if (transform.translateY > tween.translateY) {
      transform.translateY = tweens.runDefault(now - timerY, _transform.translateY, tween.translateY, 2000) 
      transform.translateY < tween.translateY && (_transform.translateY = transform.translateY = tween.translateY)
    }
    // 旋转
    if (transform.rotate < tween.rotate) {
      transform.rotate = tweens.runDefault(now - timerR, _transform.rotate, tween.rotate, 2000)
      transform.rotate > tween.rotate && (_transform.rotate = transform.rotate = tween.rotate %= 360)
    }
    if (transform.rotate > tween.rotate) {
      transform.rotate = tweens.runDefault(now - timerR, _transform.rotate, tween.rotate, 2000)
      transform.rotate < tween.rotate && (_transform.rotate = transform.rotate = tween.rotate %= 360)
    }
    // 透明度
    if (transform.alpha < tween.alpha) {
      transform.alpha = tweens.runDefault(now - timerA, _transform.alpha, tween.alpha, 2000)
      transform.alpha > tween.alpha && (_transform.alpha = transform.alpha = tween.alpha)
    }
    if (transform.alpha > tween.alpha) {
      transform.alpha = tweens.runDefault(now - timerA, _transform.alpha, tween.alpha, 2000)
      transform.alpha < tween.alpha && (_transform.alpha = transform.alpha = tween.alpha)
    }
  }
}