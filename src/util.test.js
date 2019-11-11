import Elevator from './models/elevator';
import Passenger from './models/passenger';
import { DOWN, IDLE, UP } from './constants';
import { getDirection, orderElevatorStops } from './util';

it('getDirection should return IDLE when elevator going 4 -> 4', function() {
		const elevator = new Elevator([4, 4], 'A');
		const status = getDirection(elevator.stops[0], elevator.stops[1]);

		expect(status).toEqual(IDLE);
});

it('getDirection should return IDLE when elevator going 4 -> undefined', function() {
		const elevator = new Elevator([4, undefined], 'A');
		const status = getDirection(elevator.stops[0], elevator.stops[1]);

		expect(status).toEqual(IDLE);
});

it('getDirection should return IDLE when elevator going 4 -> 0', function() {
		const elevator = new Elevator([4, 0], 'A');
		const status = getDirection(elevator.stops[0], elevator.stops[1]);

		expect(status).toEqual(DOWN);
});

it('getDirection should return UP when elevator going 4 -> 6', function() {
		const elevator = new Elevator([4, 6], 'A');
		const status = getDirection(elevator.stops[0], elevator.stops[1]);

		expect(status).toEqual(UP);
});

it('getDirection should return IDLE when passenger going 0 -> 0', function() {
		const status = getDirection(0, 0);

		expect(status).toEqual(IDLE);
});

it('getDirection should return IDLE when passenger going 0 -> undefined', function() {
		const status = getDirection(0, undefined);

		expect(status).toEqual(IDLE);
});

it('orderElevatorStops should edit elevator stops to [4, 0, 5] when passenger goes 3 -> 5 and elevator stops are [4,0]', function() {
		const passenger = new Passenger(3, 5);
		const elevator = new Elevator([4, 0], 'a');
		orderElevatorStops(passenger, elevator);

		expect(elevator.stops).toEqual([4, 0, 5]);
});

it('orderElevatorStops should edit elevator stops to [9, 0] when passenger goes 4 -> 0 and elevator stops are [9,8]', function() {
		const passenger = new Passenger(4, 0);
		const elevator = new Elevator([9, 8], 'a');
		orderElevatorStops(passenger, elevator);

		expect(elevator.stops).toEqual([9, 0]);
});

it('orderElevatorStops should edit elevator stops to [5, 10] when passenger goes 7 -> 8 and elevator stops are [5,10]', function() {
		const passenger = new Passenger(7, 8);
		const elevator = new Elevator([5, 10], 'a');
		orderElevatorStops(passenger, elevator);

		expect(elevator.stops).toEqual([5, 10]);
});

it('orderElevatorStops should edit elevator stops to [4, 5, 2] when passenger goes 5 -> 2 and elevator stops are [4, 5]', function() {
		const passenger = new Passenger(5, 2);
		const elevator = new Elevator([4, 5], 'a');
		orderElevatorStops(passenger, elevator);

		expect(elevator.stops).toEqual([4, 5, 2]);
});

it('orderElevatorStops should edit elevator stops to [4, 5, 2, 8, 7] when passenger goes 8 -> 7 and elevator stops are [4, 5, 2]', function() {
		const passenger = new Passenger(8, 7);
		const elevator = new Elevator([4, 5, 2], 'a');
		orderElevatorStops(passenger, elevator);

		expect(elevator.stops).toEqual([4, 5, 2, 8, 7]);
});

it('orderElevatorStops should edit elevator stops to [10, 2, 5] when passenger goes 2 -> 5 and elevator stops are [10, 6]', function() {
		const passenger = new Passenger(2, 5);
		const elevator = new Elevator([10, 6], 'a');
		orderElevatorStops(passenger, elevator);

		expect(elevator.stops).toEqual([10, 2, 5]);
});

it('orderElevatorStops should edit elevator stops to [1, 3, 2] when passenger goes 3 -> 2 and elevator stops are [1, 2]', function() {
		const passenger = new Passenger(3, 2);
		const elevator = new Elevator([1, 2], 'a');
		orderElevatorStops(passenger, elevator);

		expect(elevator.stops).toEqual([1, 3, 2]);
});

it('orderElevatorStops should edit elevator stops to [5, 9, 1] when passenger goes 7 -> 1 and elevator stops are [5, 9]', function() {
		const passenger = new Passenger(7, 1);
		const elevator = new Elevator([5, 9], 'a');
		orderElevatorStops(passenger, elevator);

		expect(elevator.stops).toEqual([5, 9, 1]);
});

it('orderElevatorStops should edit elevator stops to [10, 2] when passenger goes 8 -> 3 and elevator stops are [10, 2]', function() {
		const passenger = new Passenger(8, 3);
		const elevator = new Elevator([10, 2], 'a');
		orderElevatorStops(passenger, elevator);

		expect(elevator.stops).toEqual([10, 2]);
});

it('orderElevatorStops should edit elevator stops to [1, 1] when passenger goes 5 -> 6 and elevator stops are [1,6]', function() {
		const passenger = new Passenger(5, 6);
		const elevator = new Elevator([1, 1], 'a');
		orderElevatorStops(passenger, elevator);

		expect(elevator.stops).toEqual([1, 6]);
});

it('orderElevatorStops should edit elevator stops to [7, 1] when passenger goes 0 -> 10 and elevator stops are [7, 0, 10]', function() {
		const passenger = new Passenger(0, 10);
		const elevator = new Elevator([7, 1], 'a');
		orderElevatorStops(passenger, elevator);

		expect(elevator.stops).toEqual([7, 0, 10]);
});

it('orderElevatorStops should edit elevator stops to [5,8,1,3,1] when passenger goes 2 -> 1 and elevator stops are [5, 8, 1, 3, 2]', function() {
		const passenger = new Passenger(2, 1);
		const elevator = new Elevator([5,8,1,3,2], 'a');
		orderElevatorStops(passenger, elevator);

		expect(elevator.stops).toEqual([5, 8, 1, 3, 1]);
});

it('orderElevatorStops should edit elevator stops to [5,10,1,8] when passenger goes 1 -> 8 and elevator stops are [5,10]', function() {
		const passenger = new Passenger(1, 8);
		const elevator = new Elevator([5,10], 'a');
		orderElevatorStops(passenger, elevator);

		expect(elevator.stops).toEqual([5,10,1,8]);
});