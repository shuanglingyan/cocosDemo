enum WalkType{
    Normal,
    Shop,
}

const { ccclass, property } = cc._decorator;
@ccclass
export default class WalkNode extends cc.Component {
    @property([WalkNode])
    public links: WalkNode[] = [];

    @property({type:cc.Enum(WalkType)})
    type:WalkType = WalkType.Normal;

    id:string = "";
}
