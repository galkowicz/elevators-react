import Elevator from './elevator';
import Passenger from './passenger';

it('getElevatorProximity should return 1 when elevator going 4 -> 9 and passenger going 5 -> 6', function() {
		const elevator = new Elevator([4, 9], 'a');
		const passenger = new Passenger(5, 6);
		const {distance} = elevator.getElevatorProximity(passenger, elevator.stops);

		expect(distance).toEqual(1);
});

it('getElevatorProximity should return 5 when elevator going 4 -> 2 and passenger going 5 -> 0', function() {
		const elevator = new Elevator([4, 2], 'a');
		const passenger = new Passenger(5);
		const {distance} = elevator.getElevatorProximity(passenger, elevator.stops);

		expect(distance).toEqual(5);
});

it('getElevatorProximity should return 10 when elevator going 8 -> 14 and passenger going 10 -> 7', function() {
		const elevator = new Elevator([8, 14], 'a');
		const passenger = new Passenger(10, 7);
		const {distance} = elevator.getElevatorProximity(passenger, elevator.stops);

		expect(distance).toEqual(10);
});

it('getElevatorProximity should return {distance: 9, isOnWay: false} when elevator going 3 -> 6 -> 1 and passenger going 2 -> 6', function() {
		const elevator = new Elevator([3, 6, 1], 'a');
		const passenger = new Passenger(2,6);
		const {distance, isOnWay} = elevator.getElevatorProximity(passenger, elevator.stops);

		expect(distance).toEqual(9);
		expect(isOnWay).toEqual(false);
});

it('getElevatorProximity should return {distance: 4, isOnWay: true} when elevator going 6 -> 2 -> 8 -> 4 and passenger going 2 -> 6', function() {
		const elevator = new Elevator([6, 2, 8, 4], 'a');
		const passenger = new Passenger(2,6);
		const {distance, isOnWay} = elevator.getElevatorProximity(passenger, elevator.stops);

		expect(distance).toEqual(4);
		expect(isOnWay).toEqual(true);
});

it('getElevatorProximity should return {distance: 4, isOnWay: true} when elevator going 2 -> 4 -> 3 -> 5 and passenger going 3 -> 2', function() {
		const elevator = new Elevator([2, 4, 3, 5], 'a');
		const passenger = new Passenger(3,2);
		const {distance, isOnWay} = elevator.getElevatorProximity(passenger, elevator.stops);

		expect(distance).toEqual(7);
		expect(isOnWay).toEqual(false);
});

it('getElevatorProximity should return {distance: 12, isOnWay: false} when elevator going 3 -> 6 -> 0 and passenger going 3 -> 0', function() {
		const elevator = new Elevator([3, 6, 0], 'a');
		const passenger = new Passenger(3,0);
		const {distance, isOnWay} = elevator.getElevatorProximity(passenger, elevator.stops);

		expect(distance).toEqual(12);
		expect(isOnWay).toEqual(false);
});

it('getElevatorProximity should return {distance: 10, isOnWay: false} when elevator going 0 -> 0 -> 7 and passenger going 10 -> 9', function() {
		const elevator = new Elevator([0, 0, 7], 'a');
		const passenger = new Passenger(10,9);
		const {distance, isOnWay} = elevator.getElevatorProximity(passenger, elevator.stops);

		expect(distance).toEqual(10);
		expect(isOnWay).toEqual(false);
});

it('getElevatorProximity should return {distance: 18, isOnWay: false} when elevator going 6 -> 7 -> 0 and passenger going 10 -> 9', function() {
		const elevator = new Elevator([6, 7, 0], 'a');
		const passenger = new Passenger(10,9);
		const {distance, isOnWay} = elevator.getElevatorProximity(passenger, elevator.stops);

		expect(distance).toEqual(18);
		expect(isOnWay).toEqual(false);
});

it('getElevatorProximity should return {distance: 19, isOnWay: false} when elevator going 1 -> 10 and passenger going 0 -> 4', function() {
		const elevator = new Elevator([1, 10], 'a');
		const passenger = new Passenger(0,4);
		const {distance, isOnWay} = elevator.getElevatorProximity(passenger, elevator.stops);

		expect(distance).toEqual(19);
		expect(isOnWay).toEqual(false);
});

it('getElevatorProximity should return {distance: 3, isOnWay: false} when elevator going 7 -> 7 and passenger going 0 -> 4', function() {
		const elevator = new Elevator([7, 7], 'a');
		const passenger = new Passenger(0,4);
		const {distance, isOnWay} = elevator.getElevatorProximity(passenger, elevator.stops);

		expect(distance).toEqual(7);
		expect(isOnWay).toEqual(false);
});


