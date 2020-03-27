const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    private color;

    @property(cc.Boolean)
    public canSetWeapon: boolean = false;

    onLoad () {
        this.color = this.node.color;
        console.log(this.color);
    }

    start () {

    }

    // update (dt) {}
}
