import React, { useState } from 'react';
import './App.css';
import ElevatorForm from './components/elevatorForm';
import RadioForm from './components/radioForm';
import { goToFloor, generateElevators, generatePassengers, orderElevatorStops } from './util';
import { Container, Header, Message, Grid } from 'semantic-ui-react';
import Passenger from './models/passenger';
import elevator from "./models/elevator";

function App() {
		const initialFormState = { elevators: 2, floors: 10, passengerFloor: 0, passengerDestination: 0 };
		const initialRadioState = { value: 'level1' };
		const [formData, setFormData] = useState(initialFormState);
		const [radioSelection, setRadioSelection] = useState(initialRadioState);
		const [levelOneResults, setLevelOneResults] = useState(null);

		const handleFormSubmit = (formData) => {
				const map = { level1, level2 };
				setFormData(formData);
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

				// testing starts here
				// const elevatorsArray = [new Elevator([4, 5, 2], 'a')];
				// const bob = new Passenger(8, 7);
				// const chosenElevator = goToFloor(bob, elevatorsArray);
				// const { elevator: chosenElevatorForPassenger, isOnWay } = goToFloor(bob, elevatorsArray);
				// testing ends here
				// orderElevatorStops(bob, chosenElevatorForPassenger, isOnWay);

				console.log('Elevators: ', elevatorsArray);
				console.log('Bob: ', passenger);
				console.log('chosenElevator: ', chosenElevator);
				setLevelOneResults({ passenger, elevatorsArray, chosenElevator });
		};

		const level2 = (formData) => {
				console.log('level2');
				const { elevators, floors } = formData;
				const selectedElevators = [];
				// const passengers = Math.floor(Math.random() * (6)) + 5; // random from 5 to 10
				const passengers = 4; // TODO change back to random
				const passengersArray = generatePassengers(passengers, floors);
				const elevatorsArray = generateElevators(elevators, floors);
				passengersArray.forEach((passenger) => {
						const { elevator: chosenElevatorForPassenger, isOnWay } = goToFloor(passenger, elevatorsArray);

						if (!selectedElevators.includes(chosenElevatorForPassenger)) { // add elevator in use
								selectedElevators.push(chosenElevatorForPassenger);
						}
						orderElevatorStops(passenger, chosenElevatorForPassenger, isOnWay);
				});
				console.log(selectedElevators);
				console.log(passengersArray);
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
