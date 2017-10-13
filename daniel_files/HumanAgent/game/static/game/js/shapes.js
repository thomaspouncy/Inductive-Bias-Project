var allShadowColor =  "rgba( 4, 4, 4, 0.3 )";

function sketch_rect(ctx, x, y, length, width, color) {
    ctx.fillStyle = color;
    ctx.shadowColor = allShadowColor;
    ctx.shadowBlur = 10;
    ctx.fillRect(x, y, length, width);
    ctx.shadowColor = 'transparent';

}

function sketch_circle(ctx, x, y, radius, color) {
    ctx.beginPath();
    ctx.strokeStyle = ctx.fillStyle = color;
    ctx.arc(x, y, radius, 0, 2*Math.PI);
    ctx.shadowColor = allShadowColor;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.stroke();
    ctx.shadowColor = 'transparent';
}

function sketch_diamond(ctx, x, y, w, h, color) {
    x = x + (gameArea.stepSize - w)/2;
    y = y + (gameArea.stepSize)/2 - 2*gameArea.padding;

    var color_map = {};
    color_map['black'] = ['#484848','#303030','#686868'];
    color_map['green'] = ['#4BB74C','#517B58','#5B9C64'];
    color_map['red'] = ['#E3170D','#9D1309','#F22C1E'];
    color_map['blue'] = ['#3366CC','#003399','#333399'];
    colors = color_map[color];

    ctx.shadowColor = allShadowColor;
    ctx.shadowBlur = 10;
    ctx.fillStyle=colors[0];
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x+w/2,y+0.7*h);
    ctx.lineTo(x+w/2,y);
    ctx.fill();

    ctx.fillStyle=colors[1];
    ctx.beginPath();
    ctx.moveTo(x+w/2, y);
    ctx.lineTo(x+w/2,y+0.7*h);
    ctx.lineTo(x+w,y);
    ctx.fill();

    // Upper left triangle
    ctx.beginPath();
    ctx.moveTo(x+w/4,y-0.3*h);
    ctx.lineTo(x,y);
    ctx.lineTo(x+w/2,y);
    ctx.fill();

    // centre inverted triangle
    ctx.fillStyle=colors[2];
    ctx.beginPath();
    ctx.moveTo(x+w/4,y-0.3*h);
    ctx.lineTo(x+w/2,y);
    ctx.lineTo(x+0.75*w,y-0.3*h);
    ctx.fill();

    //Upper left triangle.
    ctx.fillStyle=colors[0];
    ctx.beginPath();
    ctx.moveTo(x+0.75*w,y-0.3*h);
    ctx.lineTo(x+w/2,y);
    ctx.lineTo(x+w,y);
    ctx.fill();
    ctx.shadowColor = 'transparent';

 }

function sketch_star(ctx, x, y, radius, color, p=5, m=0.5)
{
    ctx.save();
    ctx.moveTo(0,0-radius);
    ctx.beginPath();
    ctx.translate(x, y);

    for (var i = 0; i < p; i++)
    {
        ctx.rotate(Math.PI / p);
        ctx.lineTo(0, 0 - (radius*m));
        ctx.rotate(Math.PI / p);
        ctx.lineTo(0, 0 - radius);
    }
    ctx.fillStyle = color;
    ctx.shadowColor = allShadowColor;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.restore();
    ctx.shadowColor = 'transparent';
    ctx.beginPath();
}