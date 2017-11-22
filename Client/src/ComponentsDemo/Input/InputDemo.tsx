import * as React from 'react';
import { InputType } from '../../Component/Input/InputType';
import { Input } from '../../Component/Input/Input';

export class InputDemo extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<div>
				<label>Text:
					<Input type={InputType.Text} onChange={this.onChange}/>
				</label>
				<label>Password:
					<Input type={InputType.Password} onChange={this.onChange}/>
				</label>
				<label>DateTime:
					<Input type={InputType.DateTime} onChange={this.onChange}/>
				</label>
				<label>DateTimeLocal:
					<Input type={InputType.DateTimeLocal} onChange={this.onChange}/>
				</label>
				<label>Date:
					<Input type={InputType.Date} onChange={this.onChange}/>
				</label>
				<label>Month:
					<Input type={InputType.Month} onChange={this.onChange}/>
				</label>
				<label>Time:
					<Input type={InputType.Time} onChange={this.onChange}/>
				</label>
				<label>Week:
					<Input type={InputType.Week} onChange={this.onChange}/>
				</label>
				<label>Number:
					<Input type={InputType.Number} onChange={this.onChange}/>
				</label>
				<label>Email:
					<Input type={InputType.Email} onChange={this.onChange}/>
				</label>
				<label>Url:
					<Input type={InputType.Url} onChange={this.onChange}/>
				</label>
				<label>Search:
					<Input type={InputType.Search} onChange={this.onChange}/>
				</label>
				<label>TelephoneNumber:
					<Input type={InputType.TelephoneNumber} onChange={this.onChange}/>
				</label>
				<label>Color:
					<Input type={InputType.Color} onChange={this.onChange}/>
				</label>
				<label>Color(disabled):
					<Input type={InputType.Color} disabled={true} onChange={this.onChange}/>
				</label>
			</div>
		);
	}

	private onChange(value: string): void {
		/*tslint:disable-next-line:no-console*/
		console.log(value);
	}
}
