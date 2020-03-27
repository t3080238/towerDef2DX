import Enemy from "./enemy2";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EnemyControl extends cc.Component {
    private game;
    @property(cc.Float)
    private frequence: number = 1000;
    @property(cc.Label)
    private remainMoney: cc.Label = null;
    @property(cc.Label)
    private totalWin: cc.Label = null;
    // @property([cc.Prefab])
    private enemyPrefab: cc.Prefab[] = [];
    private timer: number = 0;
    // private damageTimer: number = 0;

    onLoad() {
        // @ts-ignore
        this.game = require('game');
        this.game.enemyControl = this;
        for (let i = 0; i < 6; i++) {
            cc.loader.loadRes(`others/prefab/enemy${i + 1}`, cc.Prefab, (err, prefab) => {
                this.enemyPrefab[i] = prefab;
            });
        }
    }

    start() {
        this.timer = Date.now();
        console.log(cc.game);
    }

    update(dt) {
        // if (Date.now() - this.damageTimer >= 200) {
        //     this.node.children.forEach((enemy) => {
        //         enemy.getComponent('enemy').damage(1);
        //     });
        //     this.damageTimer = Date.now();
        // }
        if (Date.now() - this.timer >= this.frequence * 1000) {
            this.createEnemy();
            this.timer = Date.now();
        }
    }

    private createEnemy() {
        let rand = Math.floor(Math.random() * 6);
        let enemy = cc.instantiate(this.enemyPrefab[rand]);
        this.node.addChild(enemy);
    }

    public enemyDead(enemy: Enemy) {
        this.node.removeChild(enemy.node);
        let winMoney = enemy.winMoney;
        let nowMoney = Number(this.remainMoney.string);
        this.remainMoney.string = `${nowMoney + winMoney}`
        this.totalWin.string = `${Number(this.totalWin.string) + winMoney}`
    }
}
