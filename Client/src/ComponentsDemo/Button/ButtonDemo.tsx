import * as React from 'react';
import { Button } from '../../Component/Button/Button';
import { ButtonType } from '../../Component/Button/ButtonType';
import { ButtonSize } from '../../Component/Button/ButtonSize';

export class ButtonDemo extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<div>
				<Button
					type={ButtonType.Basic}
					size={ButtonSize.ExtraSmall}
					onClick={this.onClick}
				>
					Очень маленькая базовая кнопка
				</Button>
				<Button
					type={ButtonType.Basic}
					size={ButtonSize.Small}
					onClick={this.onClick}
				>
					Маленькая базовая кнопка
				</Button>
				<Button
					type={ButtonType.Basic}
					size={ButtonSize.Medium}
					onClick={this.onClick}
				>
					Средняя базовая кнопка
				</Button>
				<Button
					type={ButtonType.Basic}
					size={ButtonSize.Large}
					onClick={this.onClick}
				>
					Огромная базовая кнопка
				</Button>
				<br/>
				<Button
					type={ButtonType.Default}
					size={ButtonSize.ExtraSmall}
					onClick={this.onClick}
				>
					Очень маленькая дефолтная кнопка
				</Button>
				<Button
					type={ButtonType.Default}
					size={ButtonSize.Small}
					onClick={this.onClick}
				>
					Маленькая дефолтная кнопка
				</Button>
				<Button
					type={ButtonType.Default}
					size={ButtonSize.Medium}
					onClick={this.onClick}
				>
					Средняя дефолтная кнопка
				</Button>
				<Button
					type={ButtonType.Default}
					size={ButtonSize.Large}
					onClick={this.onClick}
				>
					Огромная дефолтная кнопка
				</Button>
				<br/>
				<Button
					type={ButtonType.Primary}
					size={ButtonSize.ExtraSmall}
					onClick={this.onClick}
				>
					Очень маленькая основная кнопка
				</Button>
				<Button
					type={ButtonType.Primary}
					size={ButtonSize.Small}
					onClick={this.onClick}
				>
					Маленькая основная кнопка
				</Button>
				<Button
					type={ButtonType.Primary}
					size={ButtonSize.Medium}
					onClick={this.onClick}
				>
					Средняя основная кнопка
				</Button>
				<Button
					type={ButtonType.Primary}
					size={ButtonSize.Large}
					onClick={this.onClick}
				>
					Огромная основная кнопка
				</Button>
				<br/>
				<Button
					type={ButtonType.Success}
					size={ButtonSize.ExtraSmall}
					onClick={this.onClick}
				>
					Очень маленькая кнопка успеха
				</Button>
				<Button
					type={ButtonType.Success}
					size={ButtonSize.Small}
					onClick={this.onClick}
				>
					Маленькая кнопка успеха
				</Button>
				<Button
					type={ButtonType.Success}
					size={ButtonSize.Medium}
					onClick={this.onClick}
				>
					Средняя кнопка успеха
				</Button>
				<Button
					type={ButtonType.Success}
					size={ButtonSize.Large}
					onClick={this.onClick}
				>
					Огромная кнопка успеха
				</Button>
				<br/>
				<Button
					type={ButtonType.Info}
					size={ButtonSize.ExtraSmall}
					onClick={this.onClick}
				>
					Очень маленькая информационная кнопка
				</Button>
				<Button
					type={ButtonType.Info}
					size={ButtonSize.Small}
					onClick={this.onClick}
				>
					Маленькая информационная кнопка
				</Button>
				<Button
					type={ButtonType.Info}
					size={ButtonSize.Medium}
					onClick={this.onClick}
				>
					Средняя информационная кнопка
				</Button>
				<Button
					type={ButtonType.Info}
					size={ButtonSize.Large}
					onClick={this.onClick}
				>
					Огромная информационная кнопка
				</Button>
				<br/>
				<Button
					type={ButtonType.Warning}
					size={ButtonSize.ExtraSmall}
					onClick={this.onClick}
				>
					Очень маленькая предупреждающая кнопка
				</Button>
				<Button
					type={ButtonType.Warning}
					size={ButtonSize.Small}
					onClick={this.onClick}
				>
					Маленькая предупреждающая кнопка
				</Button>
				<Button
					type={ButtonType.Warning}
					size={ButtonSize.Medium}
					onClick={this.onClick}
				>
					Средняя предупреждающая кнопка
				</Button>
				<Button
					type={ButtonType.Warning}
					size={ButtonSize.Large}
					onClick={this.onClick}
				>
					Огромная предупреждающая кнопка
				</Button>
				<br/>
				<Button
					type={ButtonType.Danger}
					size={ButtonSize.ExtraSmall}
					onClick={this.onClick}
				>
					Очень маленькая кнопка, требующая внимания
				</Button>
				<Button
					type={ButtonType.Danger}
					size={ButtonSize.Small}
					onClick={this.onClick}
				>
					Маленькая кнопка, требующая внимания
				</Button>
				<Button
					type={ButtonType.Danger}
					size={ButtonSize.Medium}
					onClick={this.onClick}
				>
					Средняя кнопка, требующая внимания
				</Button>
				<Button
					type={ButtonType.Danger}
					size={ButtonSize.Large}
					onClick={this.onClick}
				>
					Огромная кнопка, требующая внимания
				</Button>
				<br/>
				<Button
					type={ButtonType.Link}
					size={ButtonSize.ExtraSmall}
					onClick={this.onClick}
				>
					Очень маленькая ссылочная кнопка
				</Button>
				<Button
					type={ButtonType.Link}
					size={ButtonSize.Small}
					onClick={this.onClick}
				>
					Маленькая ссылочная кнопка
				</Button>
				<Button
					type={ButtonType.Link}
					size={ButtonSize.Medium}
					onClick={this.onClick}
				>
					Средняя ссылочная кнопка
				</Button>
				<Button
					type={ButtonType.Link}
					size={ButtonSize.Large}
					onClick={this.onClick}
				>
					Огромная ссылочная кнопка
				</Button>
				<br/>
				<Button
					type={ButtonType.Primary}
					size={ButtonSize.Medium}
					onClick={this.onClick}
					disabled={true}
				>
					Неактивная средняя основная кнопка
				</Button>
			</div>
		);
	}

	private onClick(): void {
		/*tslint:disable-next-line:no-console*/
		console.log('click!');
	}
}
