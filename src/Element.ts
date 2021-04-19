import Scene from './Scene'

export default class GameElement{  
  type: string
  data: object 
  parent: GameElement | Scene | null
  children: Array<GameElement>
  constructor(type: string){
    this.type = type
    this.data = {}
    this.parent = null
    this.children = []
  }
  
  addChild(child: GameElement){
    if (!(child instanceof GameElement)) {
      console.error(' Unknown parameter: child')
      return
    } 
    child.parent = this
    this.children.push(child)
  }
  appendTo(parent: GameElement){
    this.parent = parent
    parent.children.push(this)
  }
}









