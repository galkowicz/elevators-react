import React, { useState } from 'react';
import './App.css';
import ElevatorForm from './components/elevatorForm';
import RadioForm from './components/radioForm';
import { goToFloor, generateElevators, generatePassengers, orderElevatorStops, calculateTotalTravelTime } from './util';
import { Container, Message, Grid, Button } from 'semantic-ui-react';
import Passenger from './models/passenger';

function App() {
		const initialFormState = { elevators: 2, floors: 10, passengerFloor: 0, passengerDestination: 0 };
		const initialRadioState = { value: 'level1' };
		const [formData, setFormData] = useState(initialFormState);
		const [radioSelection, setRadioSelection] = useState(initialRadioState);
		const [levelOneResults, setLevelOneResults] = useState(null);
		let intervalId;

		const handleFormSubmit = (formData) => {
				const map = { level1, level2 };
				setFormData(formData);
				map[radioSelection.value](formData);
		};

		const handleRadioChange = (value) => {
				setRadioSelection(value);
		};

		const stopInterval = () => {
				clearInterval(intervalId);
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
				const selectedElevators = [];
				const passengers = Math.floor(Math.random() * (6)) + 5; // random from 5 to 10
				const passengersArray = generatePassengers(passengers, floors);
				const elevatorsArray = generateElevators(elevators, floors);
				let totalTime = 0;
				let passengerCount = 0;

				intervalId = setInterval(() => {
						const passenger = passengersArray[passengerCount];
						const { elevator: chosenElevatorForPassenger, isOnWay } = goToFloor(passenger, elevatorsArray);

						if (!selectedElevators.includes(chosenElevatorForPassenger)) { // add elevator in use
								selectedElevators.push(chosenElevatorForPassenger);
						}
						console.log('elevator ', chosenElevatorForPassenger.id, 'stops array: ', chosenElevatorForPassenger.stops.toString());
						orderElevatorStops(passenger, chosenElevatorForPassenger, isOnWay);

						console.log('new passenger: ', passenger);
						console.log('elevator ', chosenElevatorForPassenger.id, ' new stops array: ', chosenElevatorForPassenger.stops.toString());
						console.log('---------- ---------- ---------- ---------- ----------');

						passengerCount++;
						if (passengerCount === passengersArray.length) {
								clearInterval(intervalId);
								selectedElevators.forEach((elevator) => {
										totalTime = totalTime + calculateTotalTravelTime(elevator); // default set to 2 seconds per floor
								});
								console.log('total travel time for all elevators is: ', totalTime);
						}
				}, 1000);
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
					{radioSelection.value === 'level2' && <Container>
							<Button onClick={stopInterval}> Stop interval </Button>
					</Container>}
			</div>
		);
}

export default App;
