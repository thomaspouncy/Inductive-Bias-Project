
var gameAvatar = {
    init : function () {
        this.avatar = gameParams.objects['Avatar'];
        this.keys = [];
        window.addEventListener('keydown', function (event) {
            gameAvatar.keys[event.keyCode] = (event.type == "keydown");
            gameAvatar.move();
        });
        window.addEventListener('keyup', function (event) {
            gameAvatar.keys[event.keyCode] = (event.type == "keydown");
        });
    },
    move : function () {
        this.avatar.speedX = 0, this.avatar.speedY = 0;
        if (this.keys[37]) {this.avatar.speedX = -1; gameState.actions.push('l');}
        if (this.keys[39]) {this.avatar.speedX = 1; gameState.actions.push('r');}
        if (this.keys[38]) {this.avatar.speedY = -1; gameState.actions.push('u');}
        if (this.keys[40]) {this.avatar.speedY = 1; gameState.actions.push('d');}
        this.avatar.newPos();
        gameArea.redraw();
        gameState.actions_left -= 1;
        gameState.timeout_check();
    },
};
