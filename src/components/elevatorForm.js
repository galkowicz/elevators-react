import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import useForm from '../hooks/useForm';

const ElevatorForm = ({ onFormSubmit, initialState }) => {
		const formSubmit = () => {
				onFormSubmit && onFormSubmit(inputs);
		};
		const { inputs, handleInputChange } = useForm(initialState, formSubmit);

		return (
			<Form onSubmit={formSubmit}>
					<Form.Field>
							<label>Number of floors</label>
							<Form.Input
								placeholder='Number of floors'
								type='number'
								name='floors'
								value={inputs.floors}
								onChange={handleInputChange}
							/>
					</Form.Field>
					<Form.Field>
							<label>Number of elevators</label>
							<Form.Input
								placeholder='Number of elevators'
								name='elevators'
								type='number'
								value={inputs.elevators}
								onChange={handleInputChange}
							/>
					</Form.Field>

					<Form.Field>
							<label>Passenger floor</label>
							<Form.Input
								placeholder='Passenger current floor'
								type='number'
								name='passengerFloor'
								value={inputs.passengerFloor}
								onChange={handleInputChange}
							/>
					</Form.Field>
					<Form.Field>
							<label>Passenger destination</label>
							<Form.Input
								placeholder='Passenger destination'
								name='passengerDestination'
								type='number'
								value={inputs.passengerDestination}
								onChange={handleInputChange}
							/>
					</Form.Field>

					<Button primary type='submit'>Submit</Button>
			</Form>
		);
};

export default ElevatorForm;
