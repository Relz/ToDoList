export interface IFormProps<DtoType> {
	title?: string;
	buttonTitle?: string;
	onSubmit: (task: DtoType) => void;
}
