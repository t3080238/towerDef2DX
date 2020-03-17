import Enemy from "./enemy";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EnemyControl extends cc.Component {
    @property(cc.Float)
    private frequence: number = 1000;

    private enemyPrefab: cc.Prefab[] = [];
    private timer: number = 0;
    // private damageTimer: number = 0;

    onLoad() {
        for (let i = 0; i < 6; i++) {
            cc.loader.loadRes(`prefab/enemy${i + 1}`, cc.Prefab, (err, prefab) => {
                this.enemyPrefab[i] = prefab;
            });
        }
    }

    start() {
        this.timer = Date.now();
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
}
