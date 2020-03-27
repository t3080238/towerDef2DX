const { ccclass, property } = cc._decorator;

@ccclass
export default class ButtonEvent extends cc.Component {
    private game: any;

    onLoad() {
        this.game = require('game');
    }

    start() {

    }

    onGameStart() {
        console.log('onGameStart');
        this.game.webSocket.sendWs('login');
    }

    onWeaponClick(event) {
        console.log(event);
        this.game.weaponControl.addWeapon(event.target)
    }

    // update (dt) {}
}
