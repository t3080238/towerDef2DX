const { ccclass, property } = cc._decorator;

@ccclass
export default class BulletControl extends cc.Component {
    private game: any;

    onLoad () {
        console.log('BulletControl onLoad');
    }

    start() {
        console.log('BulletControl start');
    }

    // update (dt) {}
}