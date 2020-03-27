export default class WebSocket {
    private game: any;
    private listenEvents: any = {};

    constructor(game) {
        this.game = game;
        this.setListenEvent();
    }

    handleData(info) {
        if (!info.key) return;

        let key = info.key;
        if (key && this.listenEvents[key]) {
            this.listenEvents[key](info);
        }
    }

    setListenEvent() {
        this.listenEvents = {
            "createEnemy": (data: any) => {
                this.game.enemyControl.createEnemy(data);
            }
        }
    }

    sendWs(key: string) {
        const send = (data) => {
            this.game.server.getData(data);
        }

        let data;
        switch (key) {
            case 'login':
                data = {
                    key: 'login'
                }
                send(data);
                break;
            case 'setWeapon':
                send(data);
                break;
            default:
                break;
        }
    }
}