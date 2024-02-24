import {
	FPS,
	HOVER_VELOCITY_MULTIPLIER,
	INITIAL_VEL_MULIPLIER,
	NUMBER_OF_POINTS,
	POINTS_BOUNCE,
	POINTS_COLOR,
	POINTS_HOVER_COLOR,
} from "./utils/constants";
import "./style.css";
import { getRamdomX, getRamdomY, getSizePoint } from "./utils/sizesGenerator";
import { Point } from "./models/Points";
import { DrawLines, DrawPoints, clearCanvas } from "./utils/drawer";

const canva = document.querySelector("canvas");

//create a 2D rendering context
const ctx = canva.getContext("2d");

function resize() {
	// set canvas size to window size
	canva.width = innerWidth;
	canva.height = innerHeight;
}

const points = [];

//create and save the points
for (let index = 0; index < NUMBER_OF_POINTS; index++) {
	const point = new Point(
		getRamdomX(),
		getRamdomY(),
		getSizePoint(),
		((Math.random() - 0.5) * INITIAL_VEL_MULIPLIER) / FPS,
		((Math.random() - 0.5) * INITIAL_VEL_MULIPLIER) / FPS,
		POINTS_COLOR
	);
	points.push(point);
}

function Update() {
	for (let index = 0; index < points.length; index++) {
		// move the point by its velocity
		points[index].x += points[index].velx;
		points[index].y += points[index].vely;

		// check if the point is out of bounds
		if (points[index].x < 0 || points[index].x > innerWidth) {
			if (POINTS_BOUNCE) {
				// reverse the direction if the bouncing is enabled
				points[index].velx *= -1;
			} else {
				// if the bouncing is disabled then set the point to the opposite side
				if (points[index].x < 0) {
					points[index].x = innerWidth;
				} else {
					points[index].x = 0;
				}
			}
		}
		// same for y axis
		if (points[index].y < 0 || points[index].y > innerHeight) {
			if (POINTS_BOUNCE) {
				points[index].vely *= -1;
			} else {
				if (points[index].y < 0) {
					points[index].y = innerHeight;
				} else {
					points[index].y = 0;
				}
			}
		}
	}

	// check if the point is out of bounds and if so set it to a random position
	for (let index = 0; index < points.length; index++) {
		if (
			points[index].x < 0-points[index].size ||
			points[index].x > innerWidth+points[index].size ||
			points[index].y < 0-points[index].size ||
			points[index].y > innerHeight+points[index].size
		) {
			points[index].x = getRamdomX();
			points[index].y = getRamdomY();
		}
	}
	// update the canvas
	clearCanvas(ctx);
	DrawPoints(points, ctx);
	DrawLines(points, ctx);
}

setInterval(() => {
	Update();
}, 1000 / FPS);

// hover effect for the points
const body = document.querySelector("body");

body.addEventListener("mousemove", function (event) {
	const rect = body.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;

	for (let index = 0; index < points.length; index++) {
		if (
			Math.abs(x - points[index].x) < 100 &&
			Math.abs(y - points[index].y) < 100
		) {
			points[index].color = POINTS_HOVER_COLOR;
			points[index].velx *= HOVER_VELOCITY_MULTIPLIER;
			points[index].vely *= HOVER_VELOCITY_MULTIPLIER;

			setTimeout(() => {
				points[index].color = POINTS_COLOR;
				points[index].velx /= HOVER_VELOCITY_MULTIPLIER;
				points[index].vely /= HOVER_VELOCITY_MULTIPLIER;
			}, 1000);
		}
	}
});

window.addEventListener("resize", () => {
	resize();
	Update();
});
resize();
