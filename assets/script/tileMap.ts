const { ccclass, property } = cc._decorator;

@ccclass
export default class TileMap extends cc.Component {
    private game;

    init(game) {
    }

    onLoad() {
        this.game = require('game');
        this.game.tileMap = this;
    }

    start() {
    }

    // update (dt) {}
}
