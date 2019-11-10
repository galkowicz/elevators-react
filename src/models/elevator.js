import { isInRange, getDirection } from '../util';
import { UP } from '../constants';

export default class Elevator {
		constructor(stops = [], id = null) {
				this.id = id;
				const stopsCount = stops.length - 1;
				this.currentDirection = getDirection(stops[stopsCount - 1], stops[stopsCount] && stops[stopsCount]);
				this.stops = stops;
		}

		addStop(floor) {
				this.stops.push(floor);
				const stopsCount = this.stops.length - 1;
				this.currentDirection = getDirection(this.stops[stopsCount - 1], this.stops[stopsCount] && this.stops[stopsCount]);
		}

		getElevatorProximity(passenger, stops) { // onWatTo array of stop where last one is last stop
				let result = { distance: 0, isOnWay: false };
				const passengerDirection = getDirection(passenger.currentFloor, passenger.destination);
				let elevatorDirection = this.currentDirection;


				for (let index = 0; index < stops.length - 1; index++) {
						elevatorDirection = getDirection(stops[index], stops[index + 1]);
						if (passengerDirection === UP && elevatorDirection === UP) {
								if (isInRange(passenger.currentFloor, stops[index], stops[index + 1])) { // passenger currentFloor on range of current way
										if (stops[index + 1] >= passenger.destination) { // no added stop
												result.distance = result.distance + Math.abs(passenger.currentFloor - stops[index]);
												result.isOnWay = true;
												break;
										} else {
												result.distance = result.distance + Math.abs(stops[index] - stops[index + 1]);
										}
								} else { // TODO remove duplication
										result.distance = result.distance + Math.abs(stops[index] - stops[index + 1]);
										if (stops.length - 1 === index + 1 && passenger.currentFloor !== stops[index + 1]) { // last iteration and elevator not on passenger floor
												result.distance = result.distance + Math.abs(stops[index + 1] - passenger.currentFloor);
										}
								}
						} else {
								result.distance = result.distance + Math.abs(stops[index] - stops[index + 1]);
								if (stops.length - 1 === index + 1 && passenger.currentFloor !== stops[index + 1]) { // last iteration and elevator not on passenger floor
										result.distance = result.distance + Math.abs(stops[index + 1] - passenger.currentFloor);
								}
						}
				}

				return result;
		}
}
