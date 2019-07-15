
import MapManager from "./MapManager";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.Node)
    moveNode: cc.Node = null;
    @property(MapManager)
    mapManager:MapManager = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
    goToPay(){
        
        // this.mapManager.commandSmallToPay();
        
    }

    // update (dt) {}
}
