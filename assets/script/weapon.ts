import TweenMax from "./TweenMax.min.js"
const { ccclass, property } = cc._decorator;

@ccclass
export default class Weapon extends cc.Component {
    @property(cc.Integer)
    costMoney: number = 0;
    @property(cc.Integer)
    bulletsNumber: number = 0;
    // @property(cc.Integer)
    // attack: number = 0;
    @property(cc.Integer)
    shootDistance: number = 0;
    @property(cc.Float)
    shootFrequency: number = 0;

    private attackTimer: number = 0;
    private numberLabel: cc.Label
    private randArray: Number[] = []

    onLoad() {
    }

    start() {
        let attackArea = this.node.getChildByName('attackArea');
        attackArea.width = this.shootDistance * 2;
        attackArea.height = this.shootDistance * 2;
        this.numberLabel = this.node.getChildByName('numberLabel').getComponent(cc.Label);
        this.updateLabel();
        console.log(this.node.name);
        this.randArray = this.node.parent.parent.getChildByName('weaponControl').getComponent('weaponControl').randArray[this.node.name];
        console.log(this.randArray);
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
                    let attack = this.getAttack();
                    enemy.getComponent('enemy').damage(attack);
                    this.attackTimer = Date.now();
                    this.bulletsNumber -= 1;
                    this.updateLabel();
                    if (this.bulletsNumber <= 0) this.node.parent.removeChild(this.node);
                    break;
                }
            }
        }
    }

    shootBullet() {
        // let tl = new TweenMax();
    }

    putWeapon() {
        this.attackTimer = 1;
        this.shootBullet();
        return this.costMoney;
    }

    updateLabel() {
        this.numberLabel.string = `${this.bulletsNumber}`;
    }

    getAttack(): Number {
        let randNum = Math.floor(Math.random() * this.randArray.length);
        return randNum;
    }
}
