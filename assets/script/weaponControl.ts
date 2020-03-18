const { ccclass, property } = cc._decorator;

@ccclass
export default class WeaponControl extends cc.Component {
    @property(cc.Node)
    private waeponParent: cc.Node = null;
    @property(cc.Label)
    private remainMoney: cc.Label = null;
    @property(cc.Label)
    private totalPay: cc.Label = null;

    private enemyParent: cc.Node = null;
    private newWeapon: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:
    private damageTimer: number = 0;
    public randArray = {};

    onLoad() {
        for (let i = 1; i <= 3; i++) {
            cc.loader.loadRes(`prefab/weaponBtn${i}`, cc.Prefab, (err, prefab) => {
                let weaponBtn = cc.instantiate(prefab);
                this.node.addChild(weaponBtn);
                this.setButton(weaponBtn, i);
            });
        }
        this.enemyParent = this.node.parent.getChildByName('enemyControl');

        // 載入機率資料
        // @ts-ignore
        let weaponData = require('./weaponData').default;
        console.log(weaponData);

        // weapon1~weapon3
        for (let key in weaponData) {
            let attackRand = weaponData[key].attackRand;
            let totalWeight = 0;
            this.randArray[key] = [];
            for (let attackNum in attackRand) {
                let weight = attackRand[attackNum];
                let attackValue = Number(attackNum);
                for (let i = totalWeight; i < totalWeight + weight; i++) {
                    console.log(key, i, attackValue);
                    this.randArray[key][i] = attackValue;
                }
                totalWeight += weight;
            }
        }
    }

    start() {
        this.node.on('touchmove', (event) => { this.moveWeapon(event); })
        this.node.on('touchend', (event) => { this.putWeapon(event); })
        this.node.on('touchcancel', (event) => { this.putWeapon(event); })
    }

    update(dt) {
        if (Date.now() - this.damageTimer >= 200) {
            this.waeponParent.children.forEach((weapon) => {
                // console.log(this.node.parent.getChildByName('enemyControl'));
                weapon.getComponent('weapon').checkAttack(this.enemyParent);
            });
            this.damageTimer = Date.now();
        }
    }

    setButton(weaponBtn: cc.Node, index) {
        weaponBtn.on('touchstart', (event) => { this.addWeapon(index, event); })
    }

    addWeapon(index, event) {
        cc.loader.loadRes(`prefab/weapon${index}`, cc.Prefab, (err, prefab) => {
            this.newWeapon = cc.instantiate(prefab);
            this.waeponParent.addChild(this.newWeapon);
            this.newWeapon.x = event.getLocationX();
            this.newWeapon.y = event.getLocationY();
            this.newWeapon.on('touchcancel', (event) => { this.removeWeapon(); })
        });
    }

    moveWeapon(event) {
        if (!this.newWeapon) return;
        this.newWeapon.x = event.getLocationX();
        this.newWeapon.y = event.getLocationY();
    }

    putWeapon(event) {
        if (!this.newWeapon) return;
        this.newWeapon.x = event.getLocationX();
        this.newWeapon.y = event.getLocationY();
        if (this.newWeapon.y < 120 || this.newWeapon.y > 560 || this.newWeapon.x > 880) {
            this.removeWeapon();
            return;
        }
        let costMoney = this.newWeapon.getComponent('weapon').putWeapon();
        let nowMoney = Number(this.remainMoney.string);
        this.remainMoney.string = `${nowMoney - costMoney}`
        this.newWeapon = null;
        this.totalPay.string = `${Number(this.totalPay.string) + costMoney}`
    }

    removeWeapon() {
        if (!this.newWeapon) return;
        this.waeponParent.removeChild(this.newWeapon);
    }
}
