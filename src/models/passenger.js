import { getDirection } from '../util';

export default class Passenger {
		constructor(initialFloor = 0, destination = 0) {
				this.currentFloor = initialFloor;
				this.destination = destination;
				// this.travelDistance = Math.abs(initialFloor - destination);
				this.direction = getDirection(initialFloor, destination);
		}
}
