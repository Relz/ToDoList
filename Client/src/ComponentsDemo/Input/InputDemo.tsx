import * as React from 'react';
import { InputType } from '../../Component/Input/InputType';
import { Input } from '../../Component/Input/Input';

export class InputDemo extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<div>
				<label>Text:
					<Input type={InputType.Text}/>
				</label>
				<label>Password:
					<Input type={InputType.Password}/>
				</label>
				<label>DateTime:
					<Input type={InputType.DateTime}/>
				</label>
				<label>DateTimeLocal:
					<Input type={InputType.DateTimeLocal}/>
				</label>
				<label>Date:
					<Input type={InputType.Date}/>
				</label>
				<label>Month:
					<Input type={InputType.Month}/>
				</label>
				<label>Time:
					<Input type={InputType.Time}/>
				</label>
				<label>Week:
					<Input type={InputType.Week}/>
				</label>
				<label>Number:
					<Input type={InputType.Number}/>
				</label>
				<label>Email:
					<Input type={InputType.Email}/>
				</label>
				<label>Url:
					<Input type={InputType.Url}/>
				</label>
				<label>Search:
					<Input type={InputType.Search}/>
				</label>
				<label>TelephoneNumber:
					<Input type={InputType.TelephoneNumber}/>
				</label>
				<label>Color:
					<Input type={InputType.Color}/>
				</label>
				<label>Color(disabled):
					<Input type={InputType.Color} disabled={true}/>
				</label>
			</div>
		);
	}
}
