const {ccclass, property} = cc._decorator;

@ccclass
export default class Boot extends cc.Component {
    private game: any = {}

    onLoad () {
        this.game = require('game')
        console.log(this.game);
        console.log('Boot onload');
    }

    start () {
        console.log('Boot start');
    }

    // update (dt) {}
}
