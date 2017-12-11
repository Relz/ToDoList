import * as React from 'react';
import { Task } from '../../Component/Task/Task';

export class TaskDemo extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<div>
				<Task
					id={1}
					token={'token'}
					title={'Не важная'}
					description={'Не завершённая'}
					deadline={Date.now().toString()}
					isImportant={false}
					isDone={false}
					onRemove={() => undefined}
				/>
				<Task
					id={2}
					token={'token'}
					title={'Важная'}
					description={'Не завершённая'}
					deadline={undefined}
					isImportant={true}
					isDone={false}
					onRemove={() => undefined}
				/>
				<Task
					id={3}
					token={'token'}
					title={'Не важная'}
					description={'Завершённая'}
					deadline={undefined}
					isImportant={false}
					isDone={true}
					onRemove={() => undefined}
				/>
				<Task
					id={4}
					token={'token'}
					title={'Важная'}
					description={'Завершённая'}
					deadline={undefined}
					isImportant={true}
					isDone={true}
					onRemove={() => undefined}
				/>
			</div>
		);
	}
}
