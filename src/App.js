import React, { useState } from 'react';
import './App.css';
import ElevatorForm from './components/elevatorForm';
import RadioForm from './components/radioForm';
import {
		goToFloor,
		generateElevators,
		generatePassengers,
		orderElevatorStops,
		calculateTotalTravelTime,
		elevatorLocationAfterTime
} from './util';
import { Container, Message, Grid } from 'semantic-ui-react';
import Passenger from './models/passenger';
import Elevator from './models/elevator';

function App() {
		const initialFormState = { elevators: 2, floors: 10, passengerFloor: 0, passengerDestination: 0 };
		const initialRadioState = { value: 'level1' };
		const [radioSelection, setRadioSelection] = useState(initialRadioState);
		const [levelOneResults, setLevelOneResults] = useState(null);

		const handleFormSubmit = (formData) => {
				const map = { level1, level2, level3 };
				map[radioSelection.value](formData);
		};

		const handleRadioChange = (value) => {
				setRadioSelection(value);
		};

		const level1 = (formData) => {
				const { elevators, floors, passengerFloor, passengerDestination } = formData;

				const passenger = new Passenger(passengerFloor, passengerDestination);
				const elevatorsArray = generateElevators(elevators, floors);
				const { elevator: chosenElevator } = goToFloor(passenger, elevatorsArray);

				console.log('Elevators: ', elevatorsArray);
				console.log('Bob: ', passenger);
				console.log('chosenElevator: ', chosenElevator);
				setLevelOneResults({ passenger, elevatorsArray, chosenElevator });
		};

		const level2 = (formData) => {
				console.log('level2');
				const { elevators, floors } = formData;
				const passengers = Math.floor(Math.random() * (6)) + 5; // random from 5 to 10
				const passengersArray = generatePassengers(passengers, floors);
				const elevatorsArray = generateElevators(elevators, floors);
				let totalTime = 0;

				const selectedElevators = setElevatorsForPassengers(elevatorsArray, passengersArray);

				selectedElevators.forEach((elevator) => {
						totalTime = totalTime + calculateTotalTravelTime(elevator); // default set to 2 seconds per floor
				});
				console.log('total travel time for all elevators is: ', totalTime);
				console.log(selectedElevators);
		};

		const level3 = (formData) => {
				const { elevators, floors } = formData;
				let elevatorsArray = [];
				let passengersArray = [];
				let passengersOffByTime = 0;

				for (let i = 0; i < elevators; i++) {
						let elevatorId = (i + 10).toString(36);
						elevatorsArray.push(new Elevator([0, 0], elevatorId));
				}

				for (let i = 0; i < 12; i++) { // if the elevator runs for 60 seconds and every 5 seconds we randomize passengers it will run 12 times
						const newPassengersAmount = Math.floor(Math.random() * (4)); // 0~3 new passengers
						const newPassengers = generatePassengers(newPassengersAmount, floors);
						passengersArray.push(...newPassengers)
				}

				const selectedElevators = setElevatorsForPassengers(elevatorsArray, passengersArray);

				// foreach elevator check location after 60 seconds get index
				selectedElevators.forEach((elevator) => {
						elevator.locationAfterTime = elevatorLocationAfterTime(elevator.stops, 60, 2);

						// check amount of passengers off on elevator journey
						for (let i = 0; i < elevator.locationAfterTime; i++) {
								if (elevator.passengersOffAtStop[i]) {
										passengersOffByTime = passengersOffByTime + elevator.passengersOffAtStop[i];
								}
						}
				});

				console.log('Total passengers: ', passengersArray.length);
				console.log('Passengers off after 60 seconds: ', passengersOffByTime);

				if (passengersOffByTime < (passengersArray.length / 2)) {
						console.log('less then half were delivered');
				} else {
						console.log('more then half were delivered');
				}

				console.log(selectedElevators);
		};

		const setElevatorsForPassengers = (elevators, passengers) => {
				let selectedElevators = [];
				passengers.forEach((passenger) => {
						const { elevator: chosenElevatorForPassenger } = goToFloor(passenger, elevators);

						if (!selectedElevators.includes(chosenElevatorForPassenger)) { // add elevator in use
								selectedElevators.push(chosenElevatorForPassenger);
						}
						console.log('elevator ', chosenElevatorForPassenger.id, 'stops array: ', chosenElevatorForPassenger.stops.toString());
						orderElevatorStops(passenger, chosenElevatorForPassenger);
						console.log('new passenger: ', passenger);
						console.log('elevator ', chosenElevatorForPassenger.id, ' new stops array: ', chosenElevatorForPassenger.stops.toString());
						console.log('---------- ---------- ---------- ---------- ----------');
				});

				return selectedElevators;
		};

		return (
			<div className="App">
					<Container>
							<Grid divided='vertically'>
									<Grid.Row columns={2}>
											<Grid.Column>
													<ElevatorForm onFormSubmit={handleFormSubmit} initialState={initialFormState}/>
											</Grid.Column>
											<Grid.Column>
													<RadioForm onRadioChange={handleRadioChange} initialState={initialRadioState}/>
											</Grid.Column>
									</Grid.Row>
							</Grid>
					</Container>
					{levelOneResults && (radioSelection.value === 'level1') && <Message success>
							<Message.Header>Passenger going
									from {levelOneResults.passenger.currentFloor} to {levelOneResults.passenger.destination}</Message.Header>
							<div>
									Optional elevators:
									<Message.List>
											{levelOneResults.elevatorsArray.map((elevator) => {
													return <Message.Item key={elevator.id}>
															<span>id: {elevator.id}   </span>
															<span>stops: {elevator.stops.toString()}</span>
													</Message.Item>
											})}
									</Message.List>
							</div>
							<div>chosen elevator id: {levelOneResults.chosenElevator.id}</div>
					</Message>}
			</div>
		);
}

export default App;
