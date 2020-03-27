const { ccclass, property } = cc._decorator;

@ccclass
export default class WeaponControl extends cc.Component {
    private game: any;
    private newWeapon: cc.Node = null;
    private weaponGroup = {};

    onLoad () {
        this.game = require('game');
        this.game.weaponControl = this;
    }

    start() {
    }

    addWeapon(node: cc.Node) {
        cc.loader.loadRes(`prefab/${node.name}`, cc.Prefab, (err, prefab) => {
            this.newWeapon = cc.instantiate(prefab);
            this.node.addChild(this.newWeapon);

        })
    }
}
