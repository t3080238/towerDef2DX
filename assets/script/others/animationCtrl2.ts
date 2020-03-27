const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    onLoad () {
        setTimeout(() => {
            console.log('change 塔防');
            cc.director.loadScene('塔防');
        }, 60000)
    }

    start () {

    }
}
