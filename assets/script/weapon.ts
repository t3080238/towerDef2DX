// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Weapon extends cc.Component {
    @property(cc.Integer)
    bulletsNumber: number = 0;
    @property(cc.Integer)
    attack: number = 0;
    @property(cc.Integer)
    shootDistance: number = 0;
    @property(cc.Float)
    shootFrequency: number = 0;

    private attackTimer: number = 0;
    private numberLabel: cc.Label

    onLoad() {
    }

    start() {
        let attackArea = this.node.getChildByName('attackArea');
        attackArea.width = this.shootDistance * 2;
        attackArea.height = this.shootDistance * 2;
        this.numberLabel = this.node.getChildByName('numberLabel').getComponent(cc.Label);
        this.updateLabel();
    }

    // update (dt) {}

    moveWeapon(event) {
        this.node.x = event.getLocationX();
        this.node.y = event.getLocationY();
    }

    checkAttack(enemyParent) {
        if (this.attackTimer === 0) return;
        if (Date.now() - this.attackTimer >= this.shootFrequency * 1000) {
            for (let i = 0; i < enemyParent.children.length; i++) {
                let enemy = enemyParent.children[i];
                let distX = this.node.x - enemy.x;
                let distY = this.node.y - enemy.y;
                let dist = Math.sqrt(distX * distX + distY * distY) - enemy.width / 2;
                if (dist <= this.shootDistance) {
                    enemy.getComponent('enemy').damage(this.attack);
                    this.attackTimer = Date.now();
                    this.bulletsNumber -= 1;
                    this.updateLabel();
                    if (this.bulletsNumber <= 0) this.node.parent.removeChild(this.node);
                    break;
                }
            }
            // enemyParent.children.forEach((enemy) => {
            //     let distX = this.node.x - enemy.x;
            //     let distY = this.node.y - enemy.y;
            //     let dist = Math.sqrt(distX * distX + distY * distY) - enemy.width / 2;
            //     if (dist <= this.shootDistance) {
            //         enemy.getComponent('enemy').damage(this.attack);
            //         this.attackTimer = Date.now();
            //         this.bulletsNumber -= 1;
            //         this.updateLabel();
            //         if (this.bulletsNumber <= 0) this.node.parent.removeChild(this.node);
            //         console.log(123);
            //     }
            //     return;
            // })
        }
    }

    putWeapon() {
        this.attackTimer = Date.now();
    }

    updateLabel() {
        this.numberLabel.string = `${this.bulletsNumber}`;
    }
}
