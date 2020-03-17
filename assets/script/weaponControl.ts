const { ccclass, property } = cc._decorator;

@ccclass
export default class WeaponControl extends cc.Component {
    @property(cc.Node)
    private waeponParent: cc.Node = null;

    private enemyParent: cc.Node = null;
    private newWeapon: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:
    private damageTimer: number = 0;

    onLoad() {
        for (let i = 1; i <= 3; i++) {
            cc.loader.loadRes(`prefab/weaponBtn${i}`, cc.Prefab, (err, prefab) => {
                let weaponBtn = cc.instantiate(prefab);
                this.node.addChild(weaponBtn);
                this.setButton(weaponBtn, i);
            });
        }
        this.enemyParent = this.node.parent.getChildByName('enemyControl')
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
        this.newWeapon.getComponent('weapon').putWeapon();
        this.newWeapon = null;
    }

    removeWeapon() {
        if (!this.newWeapon) return;
        this.waeponParent.removeChild(this.newWeapon);
    }
}
