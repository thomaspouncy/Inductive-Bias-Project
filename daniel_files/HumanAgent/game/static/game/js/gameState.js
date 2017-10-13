
var gameState = {
    goal_achieved : 0,
    actions : new Array(),
    board : new Array(),
    actions_left : 100,

    init : function() {
        for (i = 0; i < gameArea.X_grid; i++) {
            gameState.board[i] = new Array();
            for (j = 0; j < gameArea.Y_grid; j++) {
                gameState.board[i][j] = 0;
            }
        }
        Object.keys(gameParams.objects).forEach(function(key) {
            var obj = gameParams.objects[key];
            if (gameParams.objects[obj.obj_id].exists) {
                gameState.board[obj.X][obj.Y] = obj.obj_id;
            }
        });
    },
    goal_check : function() {
        Object.keys(gameParams.propositions).forEach(function(key) {
            var proposition = gameParams.propositions[key];
            if (gameParams.objects[proposition.obj_id][proposition.feature] == proposition.state) {
                gameState.goal_achieved = 1;
                gameArea.win_alert();
            }
        });
    },
    timeout_check : function() {
        if (this.actions_left < 1) { 
            gameArea.lose_alert(); 
        }   
    }, 
};