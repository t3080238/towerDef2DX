const { ccclass, property } = cc._decorator;

@ccclass
export default class WeaponControl extends cc.Component {
    private game: any;

    onLoad () {
        this.game = require('game');
        this.game.weaponControl = this;
    }

    start() {
    }

    // update (dt) {}
}
