
export function DrawPoints(points, ctx) {
	for (const point of points) {
		ctx.beginPath();
        ctx.fillStyle = point.color;
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
				if (
					Math.abs(point.x - nearPoint.x) < 100 &&
					Math.abs(point.y - nearPoint.y) < 100
				) {
					nearPoints.push(nearPoint);
				}
			}
		}
		for (const nearPoint of nearPoints) {
            ctx.beginPath();
            ctx.strokeStyle = point.color;
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
