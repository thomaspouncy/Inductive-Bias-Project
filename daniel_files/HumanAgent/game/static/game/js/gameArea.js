
var gameArea = {
    canvas : document.getElementById("main"),
    stock : document.getElementById("stock"),
    X_grid : 2 * grid,
    Y_grid : grid,
    padding : 50 / grid,
    stepSize : 500 / grid,
    stockSize : stock,

    init : function() {
        // Canvas
        this.canvas.width = 1000 + 2 * this.padding;
        this.canvas.height = 500 + 2 * this.padding;
        this.stock.width = this.stockSize * this.stepSize + 2 * this.padding;
        this.stock.height = this.stepSize + 2 * this.padding;
        this.context = this.canvas.getContext("2d");
        this.stock_context = this.stock.getContext("2d");
        gameArea.draw();
        // State alert modal
        this.modal = document.getElementById('myModal');
        document.getElementsByClassName("close")[0].onclick = function() {
            gameArea.modal.style.display = "none";
        };
        window.onclick = function(event) {
            if (event.target == gameArea.modal) {
                gameArea.modal.style.display = "none";
            }
        };
    },
    drawGrid: function (ctx, bw, bh, rows, cols, padding) {
        for (var x = 0.0; x <= bw; x += bw / cols) {
            ctx.moveTo(0.5 + x + padding, padding);
            ctx.lineTo(0.5 + x + padding, bh + padding);
        }
        for (var x = 0.0; x <= bh; x += bh / rows) {
            ctx.moveTo(padding, 0.5 + x + padding);
            ctx.lineTo(bw + padding, 0.5 + x + padding);
        }
        ctx.strokeStyle = '#5e0231';
        ctx.stroke();
    },
    draw : function() {
        this.drawGrid(
            this.context,
            this.canvas.width - 2*this.padding,
            this.canvas.height - 2*this.padding,
            this.Y_grid,
            this.X_grid,
            this.padding);
        this.drawGrid(
            this.stock_context,
            this.stock.width - 2*this.padding,
            this.stock.height - 2*this.padding,
            1, this.stockSize,
            this.padding);

        Object.keys(gameParams.objects).forEach(function(key) {
            if (gameParams.objects[key].exists) {
                gameParams.objects[key].update();
            }
        });
        this.picked_up();
    },
    picked_up : function() {
        var y = 0;
        Object.keys(gameState.pickedUp).forEach(function(key) {
            var obj = gameParams.objects[gameState.pickedUp[key]];
            obj.X = y;
            obj.Y = 0;
            obj.update(gameArea.stock_context);
            y += 1;
        });
    },
    redraw : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.stock_context.clearRect(0, 0, this.stock.width, this.stock.height);
        this.draw();
    },
    win_alert : function() {
        document.getElementById("status").innerHTML = "Game Won!";
        this.modal.style.display = "block";
    },
    lose_alert : function() {
        document.getElementById("status").innerHTML = "Game Over!";
        this.modal.style.display = "block";
    },
};
