import { MAX_SIZE_POINTS, MIN_SIZE_POINTS } from "./constants";

export function getSizePoint() {
	return MIN_SIZE_POINTS/2 + Math.floor(Math.random()* MAX_SIZE_POINTS/2);
}

export function getRamdomY() {
    return Math.floor(Math.random() * innerHeight)
}

export function getRamdomX() {
    return Math.floor(Math.random() * innerWidth)
}