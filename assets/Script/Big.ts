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
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Node)
    roleNode: cc.Node = null;
    endPos: cc.Vec2 ;
    multiple: number;
    xDir: number = 1;
    YDirection: number = 1;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        // this.node.on(cc.Node.EventType.TOUCH_END, (event) => {
        //     let pos = this.node.convertTouchToNodeSpaceAR(event); //转换一个 cc.Touch（世界坐标）到一个局部坐标，该方法基于节点坐标    
        //     // let pos = this.node.parent.convertToWorldSpaceAR(touchpos);//将一个点转换到世界空间坐标系。结果以 Vec2 为单位。返回值将基于世界坐标。
        //     // pos = this.roleNode.parent.convertToNodeSpaceAR(pos);//将一个点转换到节点 (局部) 空间坐标系。结果以 Vec2 为单位。 返回值将基于节点坐标
        //     this.endPos = pos;
        //     let smallPos = this.roleNode.getPosition();          
        //     if (cc.pDistance(smallPos,pos)>=2) {              
        //         this.roleNode.getComponent("Small").move(this.endPos);        
        //     }          
        // },this)

    }

    // update (dt) {
       
        
    // }
}
