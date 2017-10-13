
var gameArea = {
    canvas : document.createElement("canvas"),
    X_grid : 2 * grid,
    Y_grid : grid,
    padding : 50 / grid,
    stepSize : 600 / grid,

    init : function() {
        // Canvas
        this.canvas.width = 1200 + 2 * this.padding, this.canvas.height = 600 + 2 * this.padding;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[-1]);
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
    drawGrid: function (ctx, rows, cols, padding) {
        var bw = this.canvas.width - 2*this.padding;
        var bh = this.canvas.height - 2*this.padding;
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
        this.drawGrid(this.context, this.Y_grid, this.X_grid, this.padding);

        Object.keys(gameParams.objects).forEach(function(key) {
            if (gameParams.objects[key].exists) {
                gameParams.objects[key].update();
            }
        });
    },
    redraw : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
