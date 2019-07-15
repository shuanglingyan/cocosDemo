import MapManager from "./MapManager";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Booth extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.Node)
    watchNode: cc.Node = null;
    mapManager:MapManager = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    start () {

    }
    goTOBooth(){
        this.mapManager.commandSmallToWatch();
    }

    // update (dt) {}
}
