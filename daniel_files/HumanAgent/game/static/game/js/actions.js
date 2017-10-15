
var Actions = {
    to_dead: function(params) {
        return new remove(params.actor_id, params.obj_id);
    },
    cycle_color: function(params) {
        return new cycle_state(params.actor_id, params.obj_id, 'color');
    },
    cycle_shape: function(params) {
        return new cycle_state(params.actor_id, params.obj_id, 'shape');
    },
    cycle_size: function(params) {
        return new cycle_state(params.actor_id, params.obj_id, 'size');
    },
    to_red: function(params) {
        return new change_state(params.actor_id, params.obj_id, 'color', 'red');
    },
    to_circle: function(params) {
        return new change_state(params.actor_id, params.obj_id, 'shape', 'circle');
    },
    push: function(params) {
        return new push(params.actor_id, params.obj_id);
    },
    pick_up: function(params) {
        return new pick_up(params.actor_id, params.obj_id);
    },
};

function remove(actor_id, obj_id) {
    this.invoke = function() {
        gameParams.objects[obj_id].exists = false;
        gameParams.objects[actor_id].X = gameParams.objects[obj_id].X;
        gameParams.objects[actor_id].Y = gameParams.objects[obj_id].Y;
        gameArea.redraw();
    }
}

function cycle_state(actor_id, obj_id, feature) {
    this.features = {
        color : ['red', 'blue', 'black', 'green'],
        size : ['small', 'medium', 'large'],
        shape : ['rect', 'circle', 'diamond', 'star'],
    }

    this.invoke = function() {
        var options = this.features[feature];
        var end_state_id = (options.indexOf(gameParams.objects[obj_id][feature]) + 1) % options.length;
        var end_state = options[end_state_id];
        if (feature == 'shape') {
            gameParams.objects[obj_id] = Shapes[end_state](gameParams.objects[obj_id]);
        } else {
            gameParams.objects[obj_id][feature] = end_state;
        }
        gameArea.redraw();
    }
}

function change_state(actor_id, obj_id, feature, end_state) {
    this.invoke = function() {
        if (feature == 'shape') {
            gameParams.objects[obj_id] = Shapes[end_state](gameParams.objects[obj_id]);
        } else {
            gameParams.objects[obj_id][feature] = end_state;
        }
        gameArea.redraw();
    }
}

function push(actor_id, obj_id) {
    this.invoke = function() {
        var actor = gameParams.objects[actor_id];
        var obj = gameParams.objects[obj_id];
        var x = obj.X;
        var y = obj.Y;
        var speedX = obj.X - actor.X;
        var speedY = obj.Y - actor.Y;

        obj.speedX = speedX;
        obj.speedY = speedY;
        obj.newPos();

        if (gameState.board[x][y] == 0) {
            actor.speedX = speedX;
            actor.speedY = speedY;
            actor.newPos();
        }
        gameArea.redraw();
    }
}

function pick_up(actor_id, obj_id) {
    this.invoke = function() {
        if (gameState.pickedUp.length < gameArea.stockSize) {
            gameParams.objects[obj_id].exists = false;
            gameParams.objects[actor_id].X = gameParams.objects[obj_id].X;
            gameParams.objects[actor_id].Y = gameParams.objects[obj_id].Y;
            gameState.pickedUp.push(obj_id);
            gameArea.redraw();
        }
    }
}