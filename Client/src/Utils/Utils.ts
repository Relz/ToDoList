export class Utils {
	public static toClassNames(...elements: any[]): string {
		let result: string = ' ';
		elements.forEach((element: any) => {
			result += element.toString() + ' ';
		});

		return result;
	}
}
