export default class Server {
    private game: any;
    private enemyFrequence = 6;
    private enemyGroup = {};
    private nowEnemyKey = 1;

    constructor(game) {
        this.game = game;

        setInterval(() => {
            this.createEnemy();
        }, this.enemyFrequence * 1000)
    }

    createEnemy() {
        let rand = Math.floor(Math.random() * 6);

        let data = {
            key: 'createEnemy',
            enemyID: this.nowEnemyKey,
            enemyType: rand
        };

        this.enemyGroup[`${this.nowEnemyKey}`] = data;
        this.game.webSocket.handleData(data);

        this.nowEnemyKey += 1;
    }

}
