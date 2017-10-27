import { expect } from 'chai';
import { Task } from '../ts/Task';

describe('Task class', () => {
	describe('has constructor', () => {
		it('empty, does nothing', () => {
			const task: Task = new Task();
			expect(task.id).to.be.undefined;
			expect(task.title).to.be.undefined;
			expect(task.description).to.be.undefined;
			expect(task.creationDate).to.be.undefined;
			expect(task.deadline).to.be.undefined;
			expect(task.isDone).to.be.undefined;
			expect(task.userId).to.be.undefined;
		});
		it('with parameters, sets all properties', () => {
			const task: Task = new Task(0, 'Title', 'Description', 0, 1, false, 0);
			expect(task.id).to.eq(0);
			expect(task.title).to.eq('Title');
			expect(task.description).to.eq('Description');
			expect(task.creationDate).to.eq(0);
			expect(task.deadline).to.eq(1);
			expect(task.isDone).to.eq(false);
			expect(task.userId).to.eq(0);
		});
	});

	const task: Task = new Task();

	describe('has id property', () => {
		it('undefined by default', () => {
			expect(task.id).to.be.undefined;
		});
		it('with simple setter', () => {
			task.id = 0;
			expect(task.id).to.be.equal(0);
		});
	});

	describe('has title property', () => {
		it('undefined by default', () => {
			expect(task.title).to.be.undefined;
		});
		it('with simple setter', () => {
			task.title = 'Title';
			expect(task.title).to.be.equal('Title');
		});
	});

	describe('has description property', () => {
		it('undefined by default', () => {
			expect(task.description).to.be.undefined;
		});
		it('with simple setter', () => {
			task.description = 'Description';
			expect(task.description).to.be.equal('Description');
		});
	});

	describe('has creationDate property', () => {
		it('undefined by default', () => {
			expect(task.creationDate).to.be.undefined;
		});
		it('with simple setter', () => {
			task.creationDate = 100;
			expect(task.creationDate).to.be.equal(100);
		});
	});

	describe('has deadline property', () => {
		it('undefined by default', () => {
			expect(task.deadline).to.be.undefined;
		});
		it('with simple setter', () => {
			task.deadline = 100;
			expect(task.deadline).to.be.equal(100);
		});
	});

	describe('has isDone property', () => {
		it('undefined by default', () => {
			expect(task.isDone).to.be.undefined;
		});
		it('with simple setter', () => {
			task.isDone = true;
			expect(task.isDone).to.be.equal(true);
		});
	});

	describe('has userId property', () => {
		it('undefined by default', () => {
			expect(task.userId).to.be.undefined;
		});
		it('with simple setter', () => {
			task.userId = 0;
			expect(task.userId).to.be.equal(0);
		});
	});
});
