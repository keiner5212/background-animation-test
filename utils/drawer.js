export function DrawPoints(points, ctx) {
	for (const point of points) {
		const { r, g, b } = hexToRgb(point.color);
		ctx.beginPath();
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.6)`;
		ctx.arc(point.x, point.y, point.size, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
	}
}

export function DrawLines(points, ctx) {
    let nearPoints = [];
    for (const point of points) {
        nearPoints = [];

        for (const nearPoint of points) {
            if (point !== nearPoint) {
                const distanceX = point.x - nearPoint.x;
                const distanceY = point.y - nearPoint.y;
                
                const distanceSquared = distanceX * distanceX + distanceY * distanceY;
                if (distanceSquared < 10000) {
                    nearPoints.push(nearPoint);
                }
            }
        }

        const { r, g, b } = hexToRgb(point.color);

        for (const nearPoint of nearPoints) {
            const distanceX = point.x - nearPoint.x;
            const distanceY = point.y - nearPoint.y;
            const distanceSquared = distanceX * distanceX + distanceY * distanceY;
            
            const distance = Math.sqrt(distanceSquared); 
            const opacity = Math.max(0.05, 1 - (distance / 170)); 

            ctx.beginPath();
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(nearPoint.x, nearPoint.y);
            ctx.stroke();
            ctx.closePath();
        }
    }
}


export function clearCanvas(ctx) {
	ctx.clearRect(0, 0, innerWidth, innerHeight);
}

function hexToRgb(hex) {
    hex = hex.replace('#', '');

    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }

    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return { r, g, b };
}