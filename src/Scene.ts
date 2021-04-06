import GameElement from './Element'

export default class Scene{  
    type: string
    children: Array<GameElement>
    name: string
    constructor(name: string){
      this.type = 'SCENE'
      this.children = []
      this.name = name
    }
    addChild(child: GameElement){
      if (!(child instanceof GameElement)) {
        console.error(' Unknown parameter: child')
        return
      } 
      child.parent = this
      this.children.push(child)
    }
    in(){}
    out(){}
    update(){
      this.children.forEach(e => {
      })
    }
}
