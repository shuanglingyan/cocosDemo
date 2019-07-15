// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Test extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    ismove:boolean=true;

    speed:number=150;
    @property(cc.Node)
    shop1Node: cc.Node = null;
    @property(cc.Node)
    shop2Node: cc.Node = null;
    @property(cc.Node)
    shop3Node: cc.Node = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    move(){
        if (!this.ismove) {
            return
        }
        let currentPosition = this.node.getPosition();
        let shop1Position=this.shop1Node.getPosition();
        let shop2Position=this.shop2Node.getPosition();
        let shop3Position=this.shop3Node.getPosition();
        let firstTime= cc.pDistance(currentPosition,shop1Position)/this.speed;
        let secondTime= cc.pDistance(shop2Position,shop1Position)/this.speed;
        let lastTime= cc.pDistance(shop2Position,shop3Position)/this.speed;
        var seq = cc.sequence(cc.moveTo( firstTime, shop1Position.x, shop1Position.y), cc.delayTime(1),cc.moveTo(secondTime,shop2Position.x,shop2Position.y),cc.delayTime(1),cc.moveTo(lastTime,shop3Position.x,shop3Position.y));
        this.node.runAction(seq);
        this.ismove=false;
    }



    start() {

        // this.node.on(cc.Node.EventType.TOUCH_END, (event) => {
        //     var seq = cc.sequence(cc.moveTo(1, 200, -200), cc.delayTime(1),cc.moveTo(1, 200,200));
        //     this.node.runAction(seq);
        // }, this);



    }

    // update (dt) {}
}
