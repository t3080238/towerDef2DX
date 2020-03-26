const {ccclass, property} = cc._decorator;

@ccclass
export default class TileMap extends cc.Component {
    private game;

    init(game) {
        this.game = game;
        console.log('TileMap init');
    }

    onLoad () {
        console.log('TileMap onload');
    }

    start () {
        console.log('TileMap start');
    }

    // update (dt) {}
}
