const { ccclass, property } = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {
    @property(cc.Integer)
    winMoney: number = 0;
    @property(cc.Integer)
    speed: number = 0;
    @property(cc.Integer)
    private maxHp: number = 1;
    @property
    text: string = 'hello';

    private hp = 0;
    private hpBar: cc.Node = null;
    private hpLine: cc.Node = null;
    private hpNum: cc.Label = null;
    private damageText: cc.Label = null;
    private isDead: boolean = false;

    // LIFE-CYCLE CALLBACKS:
    constructor() {
        super();
    }

    onLoad () {
        this.hpBar = this.node.getChildByName('hpBar');
        this.hpLine = this.hpBar.getChildByName('hpLine');
        this.hpNum = this.hpBar.getChildByName('hpNum').getComponent(cc.Label);
        this.damageText = this.hpBar.getChildByName('damage').getComponent(cc.Label);
    }

    start() {
        this.node.x = -52;
        this.node.y = 472;
        this.setHp(this.maxHp);
    }

    update(dt) {
        if (this.node.y > 208 && this.node.x < 760) {
            this.node.x = this.node.x + this.speed;
        }
        else if (this.node.x >= 760 && this.node.y > 208) {
            this.node.y = this.node.y - this.speed;
        }
        else {
            this.node.x = this.node.x - this.speed;
            if (this.node.x < 44) {
                this.node.parent.removeChild(this.node);
            }
        }
    }

    public setHp(hpValue: number) {
        if (this.isDead) return;

        this.hp = hpValue < 0 ? 0 : hpValue;
        this.hp = hpValue > this.maxHp ? this.maxHp : this.hp;
        this.hpLine.width = Math.ceil(this.hp / this.maxHp * (this.hpBar.width - 4));
        this.hpNum.string = `${this.hp}`;
        if (this.hp > 0) return;
        console.log(this.node.parent);
        this.node.parent.getComponent('enemyControl2').enemyDead(this);
        this.isDead = true;
    }

    public damage(dmgValue) {
        this.damageText.string = `-${dmgValue}`;
        this.setHp(this.hp - dmgValue);
    }
}
