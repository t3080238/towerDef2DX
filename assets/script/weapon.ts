// import TweenMax from "./TweenMax.min.js"
import WeaponControl from './weaponControl'

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

    private game;
    private attackTimer: number = 0;
    private numberLabel: cc.Label
    private randArray: Number[] = [];
    private bulletPrefab: cc.Prefab;
    private bulletControl: cc.Node;

    onLoad() {
        console.log('onLoad');
        cc.loader.loadRes(`prefab/bullet`, cc.Prefab, (err, prefab) => {
            this.bulletPrefab = prefab;
        });
    }

    init(game, weaponName) {
        this.game = game;
        console.log('init');
        this.randArray = this.game.randArray[weaponName];
    }

    start() {
        console.log('start');
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
                    this.shootBullet(enemy);
                    this.attackTimer = Date.now();
                    this.bulletsNumber -= 1;
                    this.updateLabel();
                    if (this.bulletsNumber <= 0) this.node.parent.removeChild(this.node);
                    break;
                }
            }
        }
    }

    shootBullet(target) {
        let bullet = cc.instantiate(this.bulletPrefab);
        this.game.bulletControl.addChild(bullet);
        TweenMax.fromTo(bullet, 0.1,
            {
                x: this.node.x,
                y: this.node.y
            },
            {
                x: target.x,
                y: target.y,
                ease: Power0.easeInOut,
                onComplete: () => {
                    let attack = this.getAttack();
                    this.game.bulletControl.removeChild(bullet);
                    target.getComponent('enemy').damage(attack);
                }
            }
        );
        // 计算出朝向
        let distX = this.node.x - target.x;
        let distY = this.node.y - target.y;
        let dir = cc.v2(distX, distY)
        // 根据朝向计算出夹角弧度
        let angle = dir.signAngle(cc.v2(0, 1));
        // 将弧度转换为欧拉角
        let degree = angle / Math.PI * 180;
        //赋值给节点
        bullet.rotation = degree;
    }

    putWeapon() {
        this.attackTimer = 1;
        return this.costMoney;
    }

    updateLabel() {
        this.numberLabel.string = `${this.bulletsNumber}`;
    }

    getAttack(): Number {
        let randNum = Math.floor(Math.random() * this.randArray.length);
        return this.randArray[randNum];
    }
}
