import Server from "./server"
import Websocket from "./webSocket"
const {ccclass, property} = cc._decorator;

@ccclass
export default class Boot extends cc.Component {
    private game: any = {}

    onLoad () {
        this.game = require('game');
        this.game.server = new Server(this.game);
        this.game.webSocket = new Websocket(this.game);
    }

    start () {
    }

    // update (dt) {}
}
