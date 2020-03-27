const { ccclass, property } = cc._decorator;

@ccclass
export default class BulletControl extends cc.Component {
    private game: any;

    onLoad () {
        this.game = require('game');
        this.game.bulletControl = this;
    }

    start() {
    }

    // update (dt) {}
}