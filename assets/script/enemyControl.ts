import Enemy from "./enemy";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyControl extends cc.Component {
    private game: any;
    private enemyPrefab: cc.Prefab[] = [];
    private enemyGroup = {};

    onLoad () {
        this.game = require('game');
        this.game.enemyControl = this;

        for (let i = 0; i < 6; i++) {
            cc.loader.loadRes(`prefab/enemy0${i + 1}`, cc.Prefab, (err, prefab) => {
                this.enemyPrefab[i] = prefab;
            });
        }
    }

    public createEnemy(data) {
        let enemy = cc.instantiate(this.enemyPrefab[data.enemyType]);
        enemy.getComponent(Enemy).init(this.game, data.enemyID);
        this.node.addChild(enemy);
        this.enemyGroup[`${data.enemyID}`] = enemy;
        console.log(this.enemyGroup);
    }

    public enemyDead(enemy: Enemy) {
        this.node.removeChild(enemy.node);
        console.log(`delete ${enemy.enemyID}`);
        delete this.enemyGroup[`${enemy.enemyID}`]
        // let winMoney = enemy.winMoney;
        // let nowMoney = Number(this.remainMoney.string);
        // this.remainMoney.string = `${nowMoney + winMoney}`
        // this.totalWin.string = `${Number(this.totalWin.string) + winMoney}`
    }
}
