import { InputType } from './InputType';

export class InputTypeUtils {
	public static getPattern(inputType: InputType): string {
		switch (inputType) {
			case InputType.Text:
				return '.*';
			case InputType.Password:
				return '.*';
			case InputType.DateTime:
				return '.*';
			case InputType.DateTimeLocal:
				return '.*';
			case InputType.Date:
				return '.*';
			case InputType.Month:
				return '.*';
			case InputType.Time:
				return '.*';
			case InputType.Week:
				return '.*';
			case InputType.Number:
				return '.*';
			case InputType.Email:
				return '.*';
			case InputType.Url:
				return '.*';
			case InputType.Search:
				return '.*';
			case InputType.TelephoneNumber:
				return '[0-9]{3}-[0-9]{3}-[0-9]{4}';
			case InputType.Color:
				return '.*';
		}
	}
}
