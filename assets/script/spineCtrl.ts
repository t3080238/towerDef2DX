const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    private spine: sp.Skeleton;
    private animationList: string[] = [];

    onLoad() {
        this.spine = this.getComponent('sp.Skeleton');
        this.animationList = Object.keys(this.spine.skeletonData.skeletonJson.animations);
        console.log(this.spine);
        console.log(this.spine.skeletonData);
        console.log(this.spine.defaultAnimation);
        console.log('--------------------------');
        this.spine.setAnimation(0, this.animationList[0], true);
    }

    start() {

    }

    // update (dt) {}
}
