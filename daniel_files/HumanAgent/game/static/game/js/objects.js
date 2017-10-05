
function Objects(params) {
    this.obj_id = params.obj_id;
    this.X = params.X;
    this.Y = params.Y;
    this.exists = params.exists;
    this.color = params.color;
    this.size = params.size;
    this.shape = '';

    this.speedX = 0;
    this.speedY = 0;
    this.newPos = function() {
        gameState.board[this.X][this.Y] = 0
        var new_x = Math.min(Math.max(this.X + this.speedX, 0), gameArea.Y_grid - 1);
        var new_y = Math.min(Math.max(this.Y + this.speedY, 0), gameArea.X_grid - 1);
        if (gameState.board[new_x][new_y]==0) {this.X = new_x; this.Y = new_y; }
        else {
            var action = gameParams.interactions[this.obj_id][gameState.board[new_x][new_y]];
            if (action) { 
                action.invoke();
                gameState.goal_check();
            }
        }
        gameState.board[this.X][this.Y] = this.obj_id;
    }
}

var Shapes = {
    rect : function(params) { return new rect(params); },
    circle : function(params) { return new circle(params); },
    diamond : function(params) { return new diamond(params); },
    star : function(params) { return new star(params); },
}

function scale(x) {
    return gameArea.padding + x*gameArea.stepSize;
}

var color_map = {};
    color_map['black'] = '#212121';
    color_map['green'] = '#259b24';
    color_map['red'] = '#ff5177';
    color_map['blue'] = '#3366CC';

function rect(params) {
    Objects.call(this, params);
    this.shape = 'rect';
    this.side = gameArea.stepSize - 2*gameArea.padding;
    this.update = function() {
        var geo_x = scale(this.X) + gameArea.padding;
        var geo_y = scale(this.Y) + gameArea.padding;
        sketch_rect(gameArea.context, geo_x, geo_y, this.side, this.side, color_map[this.color]); 
    }
}

function circle(params) {
    Objects.call(this, params);
    this.shape = 'circle';
    this.radius = gameArea.stepSize/2 - gameArea.padding;
    this.update = function() {
       sketch_circle(gameArea.context, scale(this.X+0.5), scale(this.Y+0.5), this.radius, color_map[this.color]);
    }
}

function diamond(params) {
    Objects.call(this, params);
    this.shape = 'diamond';
    this.squareLength = gameArea.stepSize - 2*gameArea.padding;
    this.update = function() {
        sketch_diamond(gameArea.context, scale(this.X), scale(this.Y), this.squareLength, this.squareLength, this.color);
    }
}

function star(params) {
    Objects.call(this, params);
    this.shape = 'star';
    this.radius = (gameArea.stepSize - gameArea.padding)/2;
    this.update = function() {
        sketch_star(gameArea.context, scale(this.X+0.5), scale(this.Y+0.5), this.radius, color_map[this.color]);
    }
}
