
var Actions = {
    to_dead: function(specs) {
        return new remove(specs.actor_id, specs.obj_id);
    },
    toggle_color: function(specs) {
        console.log(gameParams.objects);
        return new cycle_state(specs.actor_id, specs.obj_id, 'color');
    },
    toggle_shape: function(specs) {
        return new cycle_state(specs.actor_id, specs.obj_id, 'shape');
    },
    toggle_size: function(specs) {
        return new cycle_state(specs.actor_id, specs.obj_id, 'size');
    },
    to_red: function(specs) {
        return new change_state(specs.actor_id, specs.obj_id, 'color', 'red');
    },
    to_circle: function(specs) {
        return new change_state(specs.actor_id, specs.obj_id, 'shape', 'circle');
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
        if (feature == 'shape') {gameParams.objects[obj_id] = Shapes[end_state](gameParams.objects[obj_id]);}
        else {gameParams.objects[obj_id][feature] = end_state;}
        gameArea.redraw();
    }
}

function change_state(actor_id, obj_id, feature, end_state) {
    this.invoke = function() {
        if (feature == 'shape') {gameParams.objects[obj_id] = Shapes[end_state](gameParams.objects[obj_id]);}
        else {gameParams.objects[obj_id][feature] = end_state;}
        gameArea.redraw();
    }
}
