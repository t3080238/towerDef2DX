const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    private game: any;
    private animation: cc.Animation;
    private speed = 0.2;
    public enemyID;

    // 針對地圖網格長寬比不同，仍期望他們相對等速離開網格，則須除以長寬比
    private speedX = 0.2;
    private ratioWidthHeight = 90 / 86;

    private preNode;
    private nodePos = [
        // 起點
        { x: 1150, y: 360 },
        // 轉折1
        { x: 750, y: 363 },
        // 轉折2
        { x: 753, y: 540 },
        // 轉折3
        { x: 468, y: 543 },
        // 轉折4
        { x: 469, y: 206 },
        // 轉折5
        { x: 295, y: 209 },
        // 轉折6
        { x: 299, y: 375 },
        // 終點
        { x: 110, y: 379 },
    ]

    init(game, enemyID) {
        this.game = game;
        this.enemyID = enemyID;
    }

    onLoad() {
        this.animation = this.node.getComponent(cc.Animation);
        this.nextNode();
    }

    start() {

    }

    update(dt) {
        // 當前座標
        const x = this.node.x;
        const y = this.node.y;
        // 前一個轉折點座標
        const preX = this.preNode.x;
        const preY = this.preNode.y;
        // 正在移動到轉折點的座標
        const endX = this.nodePos[0].x;
        const endY = this.nodePos[0].y;

        // 判斷座標介於兩點之間
        if (((x >= preX && x <= endX) || (x <= preX && x >= endX)) &&
            ((y >= preY && y <= endY) || (y <= preY && y >= endY))) {
            const dX = endX - preX;
            const dY = endY - preY;
            // 算出兩點距離，換算單位向量
            const distPreEnd = Math.sqrt(dX * dX + dY * dY);
            this.node.x += dX * this.speed / distPreEnd;
            this.node.y += dY * this.speed / distPreEnd;
        }
        else {
            this.nextNode();
        }
    }

    nextNode() {
        this.preNode = this.nodePos.shift();

        // 走到終點的情況
        if (this.nodePos.length === 0) {
            this.game.enemyControl.enemyDead(this);
            return;
        }
        this.node.x = this.preNode.x;
        this.node.y = this.preNode.y;

        let state;
        const dX = this.nodePos[0].x - this.preNode.x;
        const dY = this.nodePos[0].y - this.preNode.y;
        // 向左走
        if (Math.abs(dX) > Math.abs(dY) && dX < 0) {
            state = this.animation.play(`${this.node.name}_left`);
            this.speed = this.speedX;
        }
        // 向右走
        else if (Math.abs(dX) > Math.abs(dY) && dX > 0) {
            state = this.animation.play(`${this.node.name}_right`);
            this.speed = this.speedX;
        }
        // 向上走
        else if (Math.abs(dX) < Math.abs(dY) && dY > 0) {
            state = this.animation.play(`${this.node.name}_up`);
            this.speed = this.speedX / this.ratioWidthHeight;
        }
        // 向下走
        else if (Math.abs(dX) < Math.abs(dY) && dY < 0) {
            state = this.animation.play(`${this.node.name}_down`);
            this.speed = this.speedX / this.ratioWidthHeight;
        }
        state.wrapMode = cc.WrapMode.Loop;

    }
}
