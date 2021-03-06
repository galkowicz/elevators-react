import Elevator from './models/elevator';
import Passenger from './models/passenger';
import { DOWN, IDLE, UP } from './constants';

export function isInRange(test, a, b) {
		const min = Math.min.apply(Math, [a, b]);
		const max = Math.max.apply(Math, [a, b]);
		return test >= min && test <= max;
}

export function getElevatorsProximity(elevators, passenger) {
		return elevators.map(elevator => {
				return elevator.getElevatorProximity(passenger, elevator.stops);
		});
}

function getIndexOfMin(arr) {
		return arr.reduce(function(smallestIndex, element, index, array) {
				return element < array[smallestIndex] ? index : smallestIndex;
		}, 0);
}

export function goToFloor(passenger, elevators) {
		const proximityArrayWithWay = getElevatorsProximity(elevators, passenger);
		const proximityArray = proximityArrayWithWay.map(item => item.distance);
		const indexOfChosenElevator = getIndexOfMin(proximityArray);
		return {
				elevator: elevators[indexOfChosenElevator],
		};
}

export function generateElevators(amount, buildingFloors) {
		let elevatorsArray = [];

		for (let i = 0; i < Number(amount); i++) {
				let elevatorInitialFloor = Math.floor(Math.random() * (Number(buildingFloors) + 1));
				let elevatorNextStop = Math.floor(Math.random() * (Number(buildingFloors) + 1));
				let elevatorId = (i + 10).toString(36);
				elevatorsArray.push(new Elevator([elevatorInitialFloor, elevatorNextStop], elevatorId));
		}

		return elevatorsArray;
}

export function generatePassengers(amount, buildingFloors) {
		let passengerArray = [];

		for (let i = 0; i < Number(amount); i++) {
				let passengerInitialFloor = Math.floor(Math.random() * (Number(buildingFloors) + 1));
				let passengerDestination = Math.floor(Math.random() * (Number(buildingFloors) + 1));
				while (passengerInitialFloor === passengerDestination) {
						passengerDestination = Math.floor(Math.random() * (Number(buildingFloors) + 1));
				}

				passengerArray.push(new Passenger(passengerInitialFloor, passengerDestination));
		}

		return passengerArray;
}

export function orderElevatorStops(passenger, elevator) {
		const lastStop = elevator.stops.slice(-1)[0];
		let stopsLength = elevator.stops.length;


		if (elevator.currentDirection === IDLE) {
				if (passenger.direction === UP) {
						if (passenger.currentFloor < lastStop) {
								elevator.addStop(passenger.currentFloor);
								elevator.addStop(passenger.destination);
						} else {
								elevator.stops[stopsLength - 1] = passenger.destination;
						}
				} else {
						if (passenger.currentFloor > lastStop) {
								elevator.addStop(passenger.currentFloor);
								elevator.addStop(passenger.destination);
						} else {
								elevator.stops[stopsLength - 1] = passenger.destination;
						}
				}
				addPassengerOffAtStop(elevator);
				return;
		}

		if (elevator.currentDirection === passenger.direction) { // both on same direction
				if (passenger.direction === UP) { // both going up
						if (passenger.destination >= lastStop) {
								elevator.stops[stopsLength - 1] = passenger.destination; // replace last stop
						} else {
								if (passenger.currentFloor < elevator.stops[stopsLength - 2]) {
										elevator.addStop(passenger.currentFloor);
										elevator.addStop(passenger.destination);
								}
						}
				} else { // both going down
						if (passenger.currentFloor <= lastStop) {
								elevator.stops[stopsLength - 1] = passenger.destination; // replace last stop
						} else {
								if (passenger.currentFloor > elevator.stops[stopsLength - 2]) {
										elevator.addStop(passenger.currentFloor);
										elevator.addStop(passenger.destination);
								}
						}
				}
		} else { // not on same direction
				if (passenger.direction === UP) { // passenger goes up elevator goes down
						if (passenger.currentFloor <= lastStop) {
								elevator.stops[stopsLength - 1] = passenger.currentFloor;
								elevator.addStop(passenger.destination);
						} else {
								elevator.addStop(passenger.destination);
						}
				} else { // passenger goes down elevator goes up
						if (passenger.currentFloor >= lastStop) {
								elevator.stops[stopsLength - 1] = passenger.currentFloor;
								elevator.addStop(passenger.destination);
						} else {
								elevator.addStop(passenger.destination);
						}
				}
		}
		addPassengerOffAtStop(elevator);
}

function addPassengerOffAtStop(elevator) {
		let stopsLength = elevator.stops.length;

		const passengersOffBy = elevator.passengersOffAtStop[stopsLength - 1];
		if (passengersOffBy) {
				elevator.passengersOffAtStop[stopsLength - 1] = passengersOffBy + 1;
		} else {
				elevator.passengersOffAtStop[stopsLength - 1] = 1;
		}
}

export function calculateTotalTravelTime(elevator, timeForFloor = 2) {
		return timeForFloor * elevator.stops.reduce((a, b, index, array) => {
				if (index === 1) {
						return Math.abs(a - b);
				} else {
						return a + Math.abs(array[index - 1] - b);
				}
		})
}

export function elevatorLocationAfterTime(elevatorStops, time = 60, timeForFloor = 2) {
		let timer = time;

		for (let i = 0; i < elevatorStops.length; i++) {
				let distance = Math.abs(elevatorStops[i] - elevatorStops[i + 1]);
				timer = timer - (distance * timeForFloor);

				if (timer < 0) {
						return i;
				}
		}

		return elevatorStops.length;
}

export function getDirection(from, to) {
		let status = IDLE;
		if (to === 0) {
				to = '0';
		}

		if (from === 0) {
				from = '0';
		}

		if (to && to !== from) {
				if (from < to) {
						status = UP;
				} else {
						status = DOWN;
				}
		}

		return status;
}