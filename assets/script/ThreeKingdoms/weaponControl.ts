const { ccclass, property } = cc._decorator;

@ccclass
export default class WeaponControl extends cc.Component {
    private game: any;

    onLoad () {
        console.log('WeaponControl onLoad');
    }

    start() {
        console.log('WeaponControl start');
    }

    // update (dt) {}
}
