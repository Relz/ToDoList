import * as React from 'react';
import { Task } from '../../Component/Task/Task';

export class TaskDemo extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<div>
				<Task
					id={1}
					userId={1}
					title={'Не важная'}
					description={'Не завершённая'}
					isImportant={false}
					isDone={false}
				/>
				<Task
					id={2}
					userId={1}
					title={'Важная'}
					description={'Не завершённая'}
					isImportant={true}
					isDone={false}
				/>
				<Task
					id={3}
					userId={1}
					title={'Не важная'}
					description={'Завершённая'}
					isImportant={false}
					isDone={true}
				/>
				<Task
					id={4}
					userId={1}
					title={'Важная'}
					description={'Завершённая'}
					isImportant={true}
					isDone={true}
				/>
			</div>
		);
	}
}
