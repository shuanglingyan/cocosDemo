// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Button extends cc.Component {

    @property(cc.Node)
    tNode: cc.Node = null;

    @property
    text: string = 'hello';

    @property(cc.Node)
    testNode: cc.Node = null;

    
    moveFirst: cc.Vec2= new cc.Vec2(200, -200);
    
    moveLast: cc.Vec2= new cc.Vec2(200, 200);


    // @property
    // move



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    testNodeMove(){
        this.testNode.getComponent("Test").move(this.moveFirst,this.moveLast);       
    }



    // update (dt) {}
}
