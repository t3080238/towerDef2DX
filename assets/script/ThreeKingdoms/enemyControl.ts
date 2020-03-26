const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyControl extends cc.Component {
    private game: any;

    onLoad () {
        console.log('EnemyControl onLoad');
    }

    start () {
        console.log('EnemyControl start');
    }

    // update (dt) {}
}
