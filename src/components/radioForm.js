import React, { Component } from 'react';
import { Form, Radio } from 'semantic-ui-react';

export default class RadioForm extends Component {
		constructor(props) {
				super(props);
				this.state = {value: 'level1'};
		}

		handleChange = (e, { value }) => {
				this.setState({ value }, () => {
						this.props.onRadioChange({value})
				});
		};

		render() {
				return (
					<Form>
							<Form.Field>
									Selected value: <b>{this.state.value}</b>
							</Form.Field>
							<Form.Field>
									<Radio
										label='Level 1 - One passenger'
										name='radioGroup'
										value='level1'
										checked={this.state.value === 'level1'}
										onChange={this.handleChange}
									/>
							</Form.Field>
							<Form.Field>
									<Radio
										label='Level 2 - Random'
										name='radioGroup'
										value='level2'
										checked={this.state.value === 'level2'}
										onChange={this.handleChange}
									/>
							</Form.Field>
							<Form.Field>
									<Radio
										label='Level 3 - With Interval'
										name='radioGroup'
										value='level3'
										checked={this.state.value === 'level3'}
										onChange={this.handleChange}
									/>
							</Form.Field>
					</Form>
				)
		}
}