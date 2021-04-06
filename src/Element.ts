/**
 * ▇元素基类▇
 * 属性：type/children/parent/data
 * 方法：addChild/appendTo
 */
export default class GameElement{  
  type: string
  data: object 
  parent: GameElement | null
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

export class Scene extends GameElement{
  name: string
  constructor(name:string){
    super('SCENE')
    this.name = name 
  }
  in(){}
  out(){}
  update(){
    this.children.forEach(e => {
    })
  }
}







