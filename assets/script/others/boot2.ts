const {ccclass, property} = cc._decorator;

@ccclass
export default class Boot extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    private ani : cc.Animation;

    onLoad () {
        // cc.view.setDesignResolutionSize(1920, 1080, cc.ResolutionPolicy.SHOW_ALL);
        console.log('Boot');
        console.log(cc.sys);

        this.ani = new cc.Animation();

        setTimeout(() => {
            console.log('change animation');
            // cc.director.loadScene('animation');
        }, 60000)

        ///////////////////
        // this.node.on('init', (event) =>  this.init(event.detail) );
        // var node = cc.instantiate(prefab);
        // this.node.addChild(node);
        // node.emit('init', xxx) //不会再有你的硬编码了

        // this.node.init = () => {

        // }
        // node.init()
        ///////////////////

        ///////////////////

        ///////////////////
    }

    onDestroy () {

    }

    start () {

    }

    // update (dt) {}
}
