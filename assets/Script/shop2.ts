
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';
    @property(cc.Node)
    roleNode: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.node.on("mousedown", (event) => {
            //   console.log(55555);
            let pos = this.node.getPosition();
            this.roleNode.getComponent("Small").goDestination(pos); 
            },this)
    }

    // update (dt) {}
}
