import MapManager from "./MapManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property(MapManager)
    mapManager:MapManager = null;

    @property
    text: string = 'hello';
    @property(cc.Node)
    moveNode: cc.Node = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
    goToLeave(){
        this.mapManager.commandSmallToLeave();
    }

    // update (dt) {}
}
