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
				>
					Очень маленькая базовая кнопка
				</Button>
				<Button
					type={ButtonType.Basic}
					size={ButtonSize.Small}
				>
					Маленькая базовая кнопка
				</Button>
				<Button
					type={ButtonType.Basic}
					size={ButtonSize.Medium}
				>
					Средняя базовая кнопка
				</Button>
				<Button
					type={ButtonType.Basic}
					size={ButtonSize.Large}
				>
					Огромная базовая кнопка
				</Button>
				<br/>
				<Button
					type={ButtonType.Default}
					size={ButtonSize.ExtraSmall}
				>
					Очень маленькая дефолтная кнопка
				</Button>
				<Button
					type={ButtonType.Default}
					size={ButtonSize.Small}
				>
					Маленькая дефолтная кнопка
				</Button>
				<Button
					type={ButtonType.Default}
					size={ButtonSize.Medium}
				>
					Средняя дефолтная кнопка
				</Button>
				<Button
					type={ButtonType.Default}
					size={ButtonSize.Large}
				>
					Огромная дефолтная кнопка
				</Button>
				<br/>
				<Button
					type={ButtonType.Primary}
					size={ButtonSize.ExtraSmall}
				>
					Очень маленькая основная кнопка
				</Button>
				<Button
					type={ButtonType.Primary}
					size={ButtonSize.Small}
				>
					Маленькая основная кнопка
				</Button>
				<Button
					type={ButtonType.Primary}
					size={ButtonSize.Medium}
				>
					Средняя основная кнопка
				</Button>
				<Button
					type={ButtonType.Primary}
					size={ButtonSize.Large}
				>
					Огромная основная кнопка
				</Button>
				<br/>
				<Button
					type={ButtonType.Success}
					size={ButtonSize.ExtraSmall}
				>
					Очень маленькая кнопка успеха
				</Button>
				<Button
					type={ButtonType.Success}
					size={ButtonSize.Small}
				>
					Маленькая кнопка успеха
				</Button>
				<Button
					type={ButtonType.Success}
					size={ButtonSize.Medium}
				>
					Средняя кнопка успеха
				</Button>
				<Button
					type={ButtonType.Success}
					size={ButtonSize.Large}
				>
					Огромная кнопка успеха
				</Button>
				<br/>
				<Button
					type={ButtonType.Info}
					size={ButtonSize.ExtraSmall}
				>
					Очень маленькая информационная кнопка
				</Button>
				<Button
					type={ButtonType.Info}
					size={ButtonSize.Small}
				>
					Маленькая информационная кнопка
				</Button>
				<Button
					type={ButtonType.Info}
					size={ButtonSize.Medium}
				>
					Средняя информационная кнопка
				</Button>
				<Button
					type={ButtonType.Info}
					size={ButtonSize.Large}
				>
					Огромная информационная кнопка
				</Button>
				<br/>
				<Button
					type={ButtonType.Warning}
					size={ButtonSize.ExtraSmall}
				>
					Очень маленькая предупреждающая кнопка
				</Button>
				<Button
					type={ButtonType.Warning}
					size={ButtonSize.Small}
				>
					Маленькая предупреждающая кнопка
				</Button>
				<Button
					type={ButtonType.Warning}
					size={ButtonSize.Medium}
				>
					Средняя предупреждающая кнопка
				</Button>
				<Button
					type={ButtonType.Warning}
					size={ButtonSize.Large}
				>
					Огромная предупреждающая кнопка
				</Button>
				<br/>
				<Button
					type={ButtonType.Danger}
					size={ButtonSize.ExtraSmall}
				>
					Очень маленькая кнопка, требующая внимания
				</Button>
				<Button
					type={ButtonType.Danger}
					size={ButtonSize.Small}
				>
					Маленькая кнопка, требующая внимания
				</Button>
				<Button
					type={ButtonType.Danger}
					size={ButtonSize.Medium}
				>
					Средняя кнопка, требующая внимания
				</Button>
				<Button
					type={ButtonType.Danger}
					size={ButtonSize.Large}
				>
					Огромная кнопка, требующая внимания
				</Button>
				<br/>
				<Button
					type={ButtonType.Link}
					size={ButtonSize.ExtraSmall}
				>
					Очень маленькая ссылочная кнопка
				</Button>
				<Button
					type={ButtonType.Link}
					size={ButtonSize.Small}
				>
					Маленькая ссылочная кнопка
				</Button>
				<Button
					type={ButtonType.Link}
					size={ButtonSize.Medium}
				>
					Средняя ссылочная кнопка
				</Button>
				<Button
					type={ButtonType.Link}
					size={ButtonSize.Large}
				>
					Огромная ссылочная кнопка
				</Button>
				<br/>
				<Button
					type={ButtonType.Primary}
					size={ButtonSize.Medium}
					disabled={true}
				>
					Неактивная средняя основная кнопка
				</Button>
			</div>
		);
	}
}
