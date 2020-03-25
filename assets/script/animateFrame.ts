const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    private animation: cc.Animation;
    private timer;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.animation = this.node.getComponent(cc.Animation);
        console.log('12345678');
        console.log(this.animation);
        let state = this.animation.play();
        console.log(state);
        console.log(state.clip);
        state.wrapMode = cc.WrapMode.Loop;
        console.log(state.wrapMode);
        this.timer = setInterval(() => {
            let state = this.animation.play('fish22_hit');
        }, 3000)
        this.animation.on('finished', () => {
            console.log('finished');
            this.animation.play();
        })
        // state.repeatCount = Infinity

    }

    start() {

    }

    onDestroy() {
        clearInterval(this.timer);
    }

    onAnimComplete(num, string, bool) {
        // console.log('onAnimComplete');
        // console.log(num, string, bool);
        // this.animation.play();
    }

    // update (dt) {}
}
