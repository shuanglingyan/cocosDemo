
const { ccclass, property } = cc._decorator;

import * as dj from "dijkstrajs";
import MapManager from "./MapManager";

enum Direction {
    Left,
    Right,
    Up,
    Down
}
enum RoleState {
    Idle,
    GoToWatch,
    Watching,
    GoToPay,
    Paying,
    Leaving,
}
const Map: number = 0;
@ccclass
export default class Small extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;




    counterAllPosIndex: string[] = [];
    terminalAllPosIndex: string;
    checkoutAllPosIndex: string;

    state: RoleState = RoleState.Idle;
    @property
    text: string = 'hello';
    isMove: boolean = false;
    endPos: cc.Vec2;
    private multiple: number;
    speed: number = 200;
    private XDirection: number = 1;
    private YDirection: number = 1;
    vector: cc.Vec2 = new cc.Vec2(1, 1);
    prePosIndex: number = -1;           //要到达的点在所有点组成的数组中的位置
    moveActionArr: any[] = [];
    mapManager: MapManager = null;
    counter: cc.Node[];
    terminal: cc.Node = null;
    checkout: cc.Node = null;
    atEndPos: boolean = true;     //判断人物是否在终点

    actionState: string;   //判断人物当前状态 goToWatch  watching  goToPay paying goToLeave left
    clickLeave: boolean = false;   //是否点击了离开按钮让他离开

    // LIFE-CYCLE CALLBACKS:

    init(mapManager: MapManager, terminal: cc.Node, checkout: cc.Node, counter: cc.Node[]) {
        this.mapManager = mapManager;
        this.terminal = terminal;
        this.checkout = checkout;
        this.counter = counter;
    }

    toWatch() {
        if (this.moveActionArr.length !== 0 || !this.atEndPos) {
            return;
        }


        this.atEndPos = false;
        let graph = this.node.parent.getComponent("MapManager").returnMap();
        let arrCanvasChildren = [].concat(this.node.parent.children);
        arrCanvasChildren.splice(0, 5);
        let counterIndex: string[] = [];
        for (let i = 0; i < this.counter.length; i++) {
            counterIndex.push(arrCanvasChildren.indexOf(this.counter[i]) + "");
        }
        this.counterAllPosIndex = counterIndex;
        // console.log(counterIndex);
        if (this.prePosIndex === -1) {
            // let path = dj.find_path(graph, '0',  counterIndex[0]);
            this.moveActionArr.push(arrCanvasChildren[0].getPosition());
            this.moveActionArr.push(arrCanvasChildren[1].getPosition());
            this.prePosIndex = 1;
            this.actionLink();
            this.updateStatus('去柜台中');
            this.actionState = 'goToWatch';
        } else {

            let nextPos = counterIndex.filter((value, index) => {
                return value !== this.prePosIndex + '';
            })
            // console.log(nextPos);

            let nextPosIndex = nextPos[Math.floor(Math.random() * nextPos.length)]
            let path = dj.find_path(graph, this.prePosIndex + '', nextPosIndex);
            path.shift(0, 1);
            if (path.length === 0) {
                this.moveActionArr.push(new cc.Vec2(this.node.getPosition().x + 1, this.node.getPosition().y + 1));
            } else {
                // console.log(path.length);

                for (let i = 0; i < path.length; i++) {
                    this.moveActionArr.push(arrCanvasChildren[path[i] - 0].getPosition());
                    if (i === path.length - 1) {
                        this.prePosIndex = path[path.length - 1] - 0;
                    }
                }
            }
            this.actionLink();
            this.updateStatus('去柜台中');
            this.actionState = 'goToWatch';
        }


        // allPosition.
    }
    toLeave() {
        if (this.moveActionArr.length !== 0 || !this.atEndPos) {
            return;
        }
        // console.log(8888);
        this.atEndPos = false;
        let graph = this.node.parent.getComponent("MapManager").returnMap();
        let arrCanvasChildren = [].concat(this.node.parent.children);
        arrCanvasChildren.splice(0, 5);
        let terminalIndex: string;
        terminalIndex = arrCanvasChildren.indexOf(this.terminal) + "";
        this.terminalAllPosIndex = terminalIndex;
        // console.log(terminalIndex);
        if (this.prePosIndex === -1) {
            let path = dj.find_path(graph, '0', terminalIndex);
            for (let i = 0; i < path.length; i++) {
                this.moveActionArr.push(arrCanvasChildren[path[i] - 0].getPosition());
            }
            this.prePosIndex = parseInt(terminalIndex);
            this.actionLink();
            this.updateStatus('离开中');
            this.actionState = 'goToLeave';
        } else if (this.prePosIndex !== -1 && parseInt(terminalIndex) !== this.prePosIndex) {
            let path = dj.find_path(graph, this.prePosIndex + '', terminalIndex);
            for (let i = 0; i < path.length; i++) {
                this.moveActionArr.push(arrCanvasChildren[path[i] - 0].getPosition());
                if (i === path.length - 1) {
                    this.prePosIndex = parseInt(terminalIndex);
                }
            }
            this.actionLink();
            this.updateStatus('离开中');
            this.actionState = 'goToLeave';
        }
    }
    toPay() {
        if (this.moveActionArr.length !== 0 || !this.atEndPos) {
            return;
        }
        this.atEndPos = false;
        let graph = this.node.parent.getComponent("MapManager").returnMap();
        let arrCanvasChildren = [].concat(this.node.parent.children);
        arrCanvasChildren.splice(0, 5);
        let checkoutIndex: string;
        checkoutIndex = arrCanvasChildren.indexOf(this.checkout) + "";
        this.checkoutAllPosIndex = checkoutIndex;
        if (this.prePosIndex === -1) {
            let path = dj.find_path(graph, '0', checkoutIndex);
            for (let i = 0; i < path.length; i++) {
                this.moveActionArr.push(arrCanvasChildren[path[i] - 0].getPosition());
            }
            this.prePosIndex = parseInt(checkoutIndex);
            this.actionLink();
            this.updateStatus('去付款');
            this.actionState = 'goToPay';
        } else if (this.prePosIndex !== -1 && parseInt(checkoutIndex) !== this.prePosIndex) {
            let path = dj.find_path(graph, this.prePosIndex + '', checkoutIndex);
            for (let i = 0; i < path.length; i++) {
                this.moveActionArr.push(arrCanvasChildren[path[i] - 0].getPosition());
                if (i === path.length - 1) {
                    this.prePosIndex = parseInt(checkoutIndex);
                }
            }
            this.actionLink();
            this.updateStatus('去付款');
            this.actionState = 'goToPay';
        }


    }

    updateStatus(text: string) {
        // this.node.children[0].getComponent("Label").String=text;
        this.label.string = text;
    }

    // onLoad () {}
    findVerticalPos(pos) {
        let v2 = this.vector;
        let v1 = pos;
        return cc.pProject(v1, v2);
    }

    goDestination(pos) {
        let verticalPos = this.findVerticalPos(pos);
        let currentPos = this.node.getPosition();
        let verticalPosPeople = this.findVerticalPos(currentPos);
        if (cc.pDistance(verticalPosPeople, currentPos) < 2) {
            this.move(verticalPos);
            setTimeout(() => {
                this.move(pos);
            }, 4000);
        } else {
            // console.log("搓");
            this.move(verticalPosPeople);
            setTimeout(() => {
                this.move(verticalPos);
                setTimeout(() => {
                    this.move(pos);
                }, 3000);
            }, 3000);
        }
    }
    move(endPos: cc.Vec2) {
        // console.log(endPos);
        this.endPos = endPos;
        let smallPos = this.node.getPosition();
        let results = cc.pSub(this.endPos, smallPos);
        this.multiple = Math.abs(results.y / results.x);
        if (results.y >= 0) {
            this.YDirection = 1;
        } else {
            this.YDirection = -1;
        }
        if (results.x >= 0) {
            this.XDirection = 1;
        } else {
            this.XDirection = -1;
        }
        // console.log(this.multiple);
        this.isMove = true;
    }
    randomSum(max, min) {
        var num = Math.floor(Math.random() * (max - min) + min);
        return num;
    }
    getPathPos() {
        let arrCanvasChildren = [].concat(this.node.parent.children);
        arrCanvasChildren.splice(0, 5);
        if (this.prePosIndex === -1) {
            this.moveActionArr.push(arrCanvasChildren[0].getPosition());
            this.prePosIndex = 0;
        } else {
            let path = dj.find_path(this.mapManager.returnMap(), this.prePosIndex + '', this.mapManager.setNextPoint());
            // console.log(path);
            path.shift(0, 1);
            // console.log(path);
            if (path.length === 0) {
                this.moveActionArr.push(new cc.Vec2(this.node.getPosition().x + 1, this.node.getPosition().y + 1));
            } else {
                // console.log(path.length);

                for (let i = 0; i < path.length; i++) {
                    this.moveActionArr.push(arrCanvasChildren[path[i] - 0].getPosition());
                    if (i === path.length - 1) {
                        this.prePosIndex = path[path.length - 1] - 0;
                    }
                }
            }




        }
        // console.log(arrCanvasChildren);
        // for (let index = 5; index < arrCanvasChildren.length; index++) {
        //     // arrPos.push(arrCanvasChildren[index].getPosition());
        //     this.moveActionArr.push(arrCanvasChildren[index].getPosition());
        // }
        // return arrPos;
    }


    actionLink() {
        // console.log(this.moveActionArr,this.moveActionArr.length,this.moveActionArr[0],this.moveActionArr[1]);
        // let arr = [new cc.Vec2(0,0),new cc.Vec2(1,1)];
        // console.log("arrr",arr);
        // arr.shift();
        let pos = this.moveActionArr.shift();
        this.move(pos);

    }
    start() {
        // this.getPathPos();
        // this.actionLink();

        // var graph = {
        //     a: {b: 10, d: 1},
        //     b: {a: 1, c: 1, e: 1},
        //     c: {b: 1, f: 1},
        //     d: {a: 1, e: 1, g: 1},
        //     e: {b: 1, d: 1, f: 1, h: 1},
        //     f: {c: 1, e: 1, i: 1},
        //     g: {d: 1, h: 1},
        //     h: {e: 1, g: 1, i: 1},
        //     i: {f: 1, h: 1}
        // };
        // var path = dj.find_path(graph, 'a', 'i');
        // let mapManager = new MapManager();
        // let info = mapManager.returnMap();
        // console.log(info);
        // this.getPathPos();
        // let info = this.node.parent.children[0].getComponent(MapManager).returnMap();
        // let a = this.mapManager.returnMap();

        // let path = dj.find_path(this.mapManager.returnMap(), '0',"5");
        // console.log(path);
    }

    // 沿路径移动
    private moveOnRoad(dt: number) {
        let smallPos = this.node.getPosition();
        let dist = dt * this.speed;
        let distX = dist / Math.sqrt((Math.pow(this.multiple, 2) + 1));
        let distY = dist / (Math.sqrt((Math.pow(this.multiple, 2) + 1)) / this.multiple);
        // console.log(distY/distX);

        this.node.position = cc.v2(this.node.position.x + distX * this.XDirection, this.node.position.y + distY * this.YDirection);
        let nextDist = cc.pDistance(smallPos, this.endPos);

        // 距离当前路径要走到的点小于一帧能行走距离，直接停止
        // 走到一个目标点，继续走
        if (nextDist < dist) {
            // 继续走分两种情况，1 走完了当前路径 2 没走完当前路径
            this.isMove = false;

            if (this.moveActionArr.length !== 0) {
                this.actionLink();
            } else {
                //到达终点后，判断人物在什么类型的点上
                if (this.counterAllPosIndex.indexOf(this.prePosIndex + '') !== -1) {
                    this.updateStatus('到达柜台');
                    this.actionState = 'watching';
                    setTimeout(() => {
                        this.atEndPos = true;
                        this.randomAction();
                    }, 2000)
                } else if (this.terminalAllPosIndex === this.prePosIndex + '') {
                    this.updateStatus('到达终点');
                    this.actionState = 'left';

                    setTimeout(() => {
                        this.atEndPos = true;
                        this.mapManager.removeSmall(this);
                        this.node.destroy();
                    }, 1000)
                } else if (this.checkoutAllPosIndex === this.prePosIndex + '') {
                    setTimeout(() => {
                        this.atEndPos = true;
                        this.randomAction();
                    }, 2000)
                    this.updateStatus('付款中');
                    this.actionState = 'paying';
                }
            }
        }
    }

    randomAction() {
        if (this.prePosIndex === -1) {
            this.toWatch();
        } else if (this.counterAllPosIndex.indexOf(this.prePosIndex + '') != -1) {
            if (this.clickLeave) {
                this.toPay();
            } else {
                let num = Math.floor(Math.random() * 4);
                if (num === 3) {
                    this.toPay();
                } else {
                    this.toWatch();
                }
            }
        } else if (this.checkoutAllPosIndex === this.prePosIndex + '') {
            if (this.clickLeave) {
                this.toLeave();
            } else {
                let num = Math.floor(Math.random() * 2);
                if (num === 0) {
                    this.toWatch();
                } else {
                    this.toLeave();
                }

            }

        }
    }
    update(dt) {

        if (!this.isMove) {
            return;
        }
        this.moveOnRoad(dt);


    }
}
