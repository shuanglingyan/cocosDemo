import WalkNode from "./WalkNode";
import * as dj from "dijkstrajs";
import Small from "./Small";

interface NodeInfo {
    [nodeIndex: string]: number;
}
interface GraphInfo {
    [nodeIndex: string]: NodeInfo;
}

const { ccclass, property } = cc._decorator;
@ccclass
export default class MapManager extends cc.Component {
    @property([WalkNode])
    public walkNodes: WalkNode[] = [];

    @property([cc.Node])
    counter: cc.Node[] = [];

    @property(cc.Node)
    terminal: cc.Node = null;

    @property(cc.Node)
    checkout: cc.Node = null;

    @property(cc.Prefab)
    rolePrefab: cc.Prefab = null;

    roleComs: Small[] = [];

    num: number = 0;
    peopleNum: number = 0;

    @property(cc.Label)
    label: cc.Label = null;

    private createMap() {
        let graph: GraphInfo = {};
        for (let i = 0; i < this.walkNodes.length; i++) {
            let obj: NodeInfo = {};
            let arr = this.walkNodes[i].links;
            let currentPos = this.walkNodes[i].node.getPosition();
            for (let j = 0; j < arr.length; j++) {
                let index = this.walkNodes.indexOf(arr[j]);
                if (index === -1) {
                    cc.error("没有要连接的节点！", i, j);
                    continue;
                }
                obj[index] = cc.pDistance(arr[j].node.getPosition(), currentPos);
                arr[j].id = index.toString();
            }
            graph[i] = obj;
        }
        return graph;
    }
    createRole() {
        let node = cc.instantiate(this.rolePrefab);
        let com = node.getComponent(Small);
        node.x = -403;
        node.y = -403;
        com.init(this, this.terminal, this.checkout, this.counter);
        this.roleComs.push(com);
        // console.log(this.roleComs);
        this.node.addChild(node);
        return com;
    }

    removeSmall(small: Small) {
        let idx = this.roleComs.indexOf(small);
        if (idx != -1) {
            this.roleComs.splice(idx, 1);
        }
    }
    returnMap() {
        return this.createMap();
    }
    randomSum(max, min) {
        var num = Math.floor(Math.random() * (max - min) + min);
        return num;
    }
    setNextPoint() {
        return this.randomSum(this.walkNodes.length, 0) + '';
    }
    start() {
    }

    update(dt: number) {
        // console.log(this.num);
        // this.num++;
        if (this.roleComs.length < 5) {
            if (this.num % 180 === 0) {
                let com = this.createRole();
                com.toWatch();
            }
        }
        this.num++;
        this.peopleNum = 0;
        for (let i = 0; i < this.roleComs.length; i++) {
            if (this.roleComs[i].actionState !== 'goToLeave') {
                this.peopleNum++;
            }
        }
        this.label.string = `当前人数为: ${this.peopleNum}`;


    }
    commandSmallToWatch() {
        // this.roleComs.forEach((com: Small, idx: number) => {
        //     com.toWatch();
        // })
    }


    commandSmallToLeave() {
        // this.roleComs.forEach((com: Small, idx: number) => {
        //     com.toLeave();
        // })

        for (let i = 0; i < this.roleComs.length; i++) {
            if (this.roleComs[i].actionState === 'goToLeave') {
                return;
            }
        }

        for (let i = 0; i < this.roleComs.length; i++) {
            if (this.roleComs[i].actionState === 'paying') {
                this.roleComs[i].atEndPos = true;
                this.roleComs[i].toLeave();
                return;
            }
        }
        for (let i = 0; i < this.roleComs.length; i++) {
            if (this.roleComs[i].actionState === 'goToPay') {
                this.roleComs[i].clickLeave = true;
                return;
            }
        }
        for (let i = 0; i < this.roleComs.length; i++) {
            if (this.roleComs[i].actionState === 'watching') {
                this.roleComs[i].clickLeave = true;
                return;
            }
        }
        for (let i = 0; i < this.roleComs.length; i++) {
            if (this.roleComs[i].actionState === 'goToWatch') {
                this.roleComs[i].clickLeave = true;
                return;
            }
        }


    }

    // commandSmallToPay() {
    //     this.roleComs.forEach((com: Small, idx: number) => {
    //         com.toPay();
    //     })
    // }

}

