import * as chai from 'chai';
import { expect, request } from 'chai';
import * as express from 'express';
import { UserInfo } from '../ts/UserInfo';
import server from '../ts/server';
import { ResponseCode } from '../ts/ResponseCode';
import { User } from '../ts/User';
import * as HttpStatusCode from 'http-status-codes';
import { DataBase } from '../ts/DataBase';
import { Task } from '../ts/Task';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const serverExpress: express.Application = server.express;

const user: User = new User(0, 'test user for register', 'password', 'name');
const editedUser: User = new User(0, 'test user for editing', 'edited password', 'edited name');
const notExistingUser: User = new User(0, 'not existing user', 'password', 'name');
const anotherUser: User = new User(0, 'another one user', 'password', 'name');

let userToken: string;
const invalidToken: string = 'invalid_token';

const task: Task = new Task(
	undefined,
	'test user task',
	'test description',
	undefined,
	Date.now(),
	false,
	false
);
const editedTask: Task = new Task(
	undefined,
	'edited test user task',
	'edited test description',
	undefined,
	task.deadline + 1000,
	true,
	true
);

before(() => {
	DataBase.insertUser(anotherUser.login, anotherUser.password, () => {
		DataBase.getUserId(anotherUser.login, anotherUser.password, (code: number, id: number) => {
			anotherUser.id = id;
		});
	});
});

after(() => {
	server.close();
	DataBase.deleteUserById(user.id, () => undefined);
	DataBase.deleteUserById(anotherUser.id, () => undefined);
	DataBase.deleteTask(user.id, task.id, () => undefined);
	process.exit(0);
});

const checkBadRequest: (err: any, code: ResponseCode) => void = (err: any, code: ResponseCode) => {
	expect(err.response.status).to.be.equals(HttpStatusCode.BAD_REQUEST);
	expect(err.response.body).not.to.be.undefined;
	expect(err.response.body.code).to.be.equals(code);
	expect(err.response.body.body).to.be.undefined;
};

const createEditUserDto: (login: string, password: string, newPassword: string, name: string) => any
	= (login: string, password: string, newPassword: string, name: string) => {
	return {
		login: login,
		password: password,
		newPassword: newPassword,
		name: name
	};
};

describe('POST /users/register', () => {
	const testingRoute: string = '/users/register';

	it('returns status code OK, response code OK and token if user data is defined and login is not is use yet', () => {
		return request(serverExpress).post(testingRoute)
			.send(User.createFromUser(user).json())
			.then((res: ChaiHttp.Response) => {
				expect(res.status).to.be.equals(HttpStatusCode.OK);
				expect(res.body).not.to.be.undefined;
				expect(res.body.code).to.be.equals(ResponseCode.OK);
				expect(res.body.body).not.to.be.undefined;
				const token: string = res.body.body.token;
				expect(token).not.to.be.undefined;
				userToken = token;
				DataBase.getUserId(user.login, user.password, (code: number, id: number) => {
					user.id = id;
				});
			});
	});

	describe('returns status code BAD_REQUEST', () => {
		it('response code WRONG_LOGIN if login is already in use', () => {
			return request(serverExpress).post(testingRoute)
				.send(User.createFromUser(user).json())
				.catch((err: any) => checkBadRequest(err, ResponseCode.WRONG_LOGIN));
		});

		describe('response code BAD_BODY', () => {
			it('if body is not defined', () => {
				return request(serverExpress).post(testingRoute)
					.send(undefined)
					.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_BODY));
			});

			it('if login is not defined', () => {
				const userData: User = User.createFromUser(user);
				userData.login = undefined;

				return request(serverExpress).post(testingRoute)
					.send(userData.json())
					.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_BODY));
			});

			it('if password is not defined', () => {
				const userData: User = User.createFromUser(user);
				userData.password = undefined;

				return request(serverExpress).post(testingRoute)
					.send(userData.json())
					.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_BODY));
			});

			it('if name is not defined', () => {
				const userData: User = User.createFromUser(user);
				userData.name = undefined;

				return request(serverExpress).post(testingRoute)
					.send(userData.json())
					.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_BODY));
			});
		});
	});
});

describe('GET /users/:token', () => {
	it('returns status code BAD_REQUEST and response code BAD_TOKEN if token is invalid', () => {
		return request(serverExpress).get(`/users/${invalidToken}`)
			.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_TOKEN));
	});

	it('returns status code OK, response code OK and user info if token is valid', () => {
		return request(serverExpress).get(`/users/${userToken}`)
			.then((res: ChaiHttp.Response) => {
				expect(res.status).to.be.equals(HttpStatusCode.OK);
				expect(res).to.be.json;
				expect(res.body).not.to.be.undefined;
				expect(res.body.code).to.be.equals(ResponseCode.OK);
				expect(res.body.body).not.to.be.undefined;
				const userInfo: UserInfo = res.body.body;
				expect(userInfo.login).to.be.equals(user.login);
				expect(userInfo.name).to.be.equals(user.name);
			});
	});
});

describe('POST /users/authenticate', () => {
	const testingRoute: string = '/users/authenticate';

	it('returns status code OK, response code OK and token if user data is defined, login is exists and password is right', () => {
		return request(serverExpress).post(testingRoute)
			.send(User.createFromUser(user).json())
			.then((res: ChaiHttp.Response) => {
				expect(res.status).to.be.equals(HttpStatusCode.OK);
				expect(res.body).not.to.be.undefined;
				expect(res.body.code).to.be.equals(ResponseCode.OK);
				expect(res.body.body).not.to.be.undefined;
				userToken = res.body.body.token;
				expect(userToken).not.to.be.undefined;
			});
	});

	describe('returns status code BAD_REQUEST', () => {
		it('response code WRONG_LOGIN if login does not exists', () => {
			return request(serverExpress).post(testingRoute)
				.send(User.createFromUser(notExistingUser).json())
				.catch((err: any) => checkBadRequest(err, ResponseCode.WRONG_LOGIN));
		});

		it('response code WRONG_PASSWORD if password is wrong', () => {
			return request(serverExpress).post(testingRoute)
				.send(User.createFromUser(notExistingUser).json())
				.catch((err: any) => checkBadRequest(err, ResponseCode.WRONG_LOGIN));
		});

		describe('response code BAD_BODY', () => {
			it('if body is not defined', () => {
				return request(serverExpress).post(testingRoute)
					.send(undefined)
					.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_BODY));
			});

			it('if login is not defined', () => {
				const userData: User = User.createFromUser(user);
				userData.login = undefined;

				return request(serverExpress).post(testingRoute)
					.send(userData.json())
					.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_BODY));
			});

			it('if password is not defined', () => {
				const userData: User = User.createFromUser(user);
				userData.password = undefined;

				return request(serverExpress).post(testingRoute)
					.send(userData.json())
					.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_BODY));
			});
		});
	});
});

describe('PUT /users/edit/:token', () => {
	it('returns status code OK, response code OK if data is defined, login is not in use and password is right', () => {
		return request(serverExpress).put(`/users/edit/${userToken}`)
			.send(createEditUserDto(editedUser.login, user.password, editedUser.password, editedUser.name))
			.then((res: ChaiHttp.Response) => {
				expect(res.status).to.be.equals(HttpStatusCode.OK);
				expect(res.body).not.to.be.undefined;
				expect(res.body.code).to.be.equals(ResponseCode.OK);
				expect(res.body.body).to.be.undefined;
			});
	});

	describe('returns status code BAD_REQUEST', () => {
		it('response code BAD_TOKEN if token is invalid', () => {
			return request(serverExpress).put(`/users/edit/${invalidToken}`)
				.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_TOKEN));
		});

		it('response code WRONG_LOGIN if login is already in use', () => {
			return request(serverExpress).put(`/users/edit/${userToken}`)
				.send(createEditUserDto(anotherUser.login, editedUser.password, editedUser.password, editedUser.name))
				.catch((err: any) => checkBadRequest(err, ResponseCode.WRONG_LOGIN));
		});

		it('response code WRONG_PASSWORD if password is wrong', () => {
			return request(serverExpress).put(`/users/edit/${userToken}`)
				.send(createEditUserDto(user.login, `${user.password}q`, 'edited password', 'edited name'))
				.catch((err: any) => checkBadRequest(err, ResponseCode.WRONG_PASSWORD));
		});

		describe('response code BAD_BODY', () => {
			it('if body is not defined', () => {
				return request(serverExpress).put(`/users/edit/${userToken}`)
					.send(undefined)
					.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_BODY));
			});

			it('if login is not defined', () => {
				const userData: User = User.createFromUser(user);
				userData.login = undefined;

				return request(serverExpress).put(`/users/edit/${userToken}`)
					.send(userData.json())
					.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_BODY));
			});

			it('if password is not defined', () => {
				const userData: User = User.createFromUser(user);
				userData.password = undefined;

				return request(serverExpress).put(`/users/edit/${userToken}`)
					.send(userData.json())
					.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_BODY));
			});

			it('if name is not defined', () => {
				const userData: User = User.createFromUser(user);
				userData.name = undefined;

				return request(serverExpress).put(`/users/edit/${userToken}`)
					.send(userData.json())
					.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_BODY));
			});
		});
	});
});

describe('DELETE /users/delete/:token', () => {
	it('returns status code BAD_REQUEST and response code BAD_TOKEN if token is invalid', () => {
		return request(serverExpress).del(`/users/delete/${invalidToken}`)
			.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_TOKEN));
	});

	it('returns status code OK, response code OK if token is valid', () => {
		return request(serverExpress).del(`/users/delete/${userToken}`)
			.then((res: ChaiHttp.Response) => {
				expect(res.status).to.be.equals(HttpStatusCode.OK);
				expect(res.body).not.to.be.undefined;
				expect(res.body.code).to.be.equals(ResponseCode.OK);
			});
	});
});

describe('POST /tasks/create/:token', () => {
	it('returns status code OK, response code OK if token is valid', () => {
		return request(serverExpress).post(`/tasks/create/${userToken}`)
			.send(Task.createFromTask(task).json())
			.then((res: ChaiHttp.Response) => {
				expect(res.status).to.be.equals(HttpStatusCode.OK);
				expect(res.body).not.to.be.undefined;
				expect(res.body.code).to.be.equals(ResponseCode.OK);
			});
	});

	describe('returns status code BAD_REQUEST', () => {
		it('response code BAD_TOKEN if token is invalid', () => {
			return request(serverExpress).post(`/tasks/create/${invalidToken}`)
				.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_TOKEN));
		});

		describe('response code BAD_BODY', () => {
			it('if body is not defined', () => {
				return request(serverExpress).post(`/tasks/create/${userToken}`)
					.send(undefined)
					.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_BODY));
			});

			it('if title is not defined', () => {
				const taskData: Task = Task.createFromTask(task);
				taskData.title = undefined;

				return request(serverExpress).post(`/tasks/create/${userToken}`)
					.send(taskData.json())
					.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_BODY));
			});

			it('if description is not defined', () => {
				const taskData: Task = Task.createFromTask(task);
				taskData.description = undefined;

				return request(serverExpress).post(`/tasks/create/${userToken}`)
					.send(taskData.json())
					.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_BODY));
			});
		});
	});
});

describe('GET /tasks/not_done/:token', () => {
	it('returns status code BAD_REQUEST, response code BAD_TOKEN if token is invalid', () => {
		return request(serverExpress).get(`/tasks/not_done/${invalidToken}`)
			.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_TOKEN));
	});

	it('returns status code OK, response code OK if token is valid', () => {
		return request(serverExpress).get(`/tasks/not_done/${userToken}`)
			.then((res: ChaiHttp.Response) => {
				expect(res.status).to.be.equals(HttpStatusCode.OK);
				expect(res.body).not.to.be.undefined;
				expect(res.body.code).to.be.equals(ResponseCode.OK);
				const tasksInfo: Task[] = res.body.body;
				expect(tasksInfo.length).to.be.equals(1);
				const taskInfo: Task = tasksInfo[0];
				expect(taskInfo).not.to.be.undefined;
				expect(taskInfo.id).not.to.be.undefined;
				expect(taskInfo.title).to.be.equals(task.title);
				expect(taskInfo.description).to.be.equals(task.description);
				expect(taskInfo.creationDate).not.to.be.undefined;
				expect(taskInfo.deadline).to.be.equals(task.deadline);
				expect(!!taskInfo.isDone).to.be.equals(task.isDone);
				expect(!!taskInfo.isImportant).to.be.equals(task.isImportant);
				expect(taskInfo.userId).to.be.equals(user.id);
				task.id = taskInfo.id;
			});
	});
});

describe('PUT /tasks/edit/:id/:token', () => {
	it('returns status code OK, response code OK if token is valid', () => {
		return request(serverExpress).put(`/tasks/edit/${task.id}/${userToken}`)
			.send(Task.createFromTask(editedTask).json())
			.then((res: ChaiHttp.Response) => {
				expect(res.status).to.be.equals(HttpStatusCode.OK);
				expect(res.body).not.to.be.undefined;
				expect(res.body.code).to.be.equals(ResponseCode.OK);
				expect(res.body.body).to.be.undefined;
			});
	});

	describe('returns status code BAD_REQUEST', () => {
		it('response code BAD_TOKEN if token is invalid', () => {
			return request(serverExpress).put(`/tasks/edit/${task.id}/${invalidToken}`)
				.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_TOKEN));
		});

		it('response code WRONG_ID if task id is wrong', () => {
			return request(serverExpress).put(`/tasks/edit/${task.id + 1}/${userToken}`)
				.send(Task.createFromTask(editedTask).json())
				.catch((err: any) => checkBadRequest(err, ResponseCode.WRONG_ID));
		});

		describe('response code BAD_BODY', () => {
			it('if body is not defined', () => {
				return request(serverExpress).put(`/tasks/edit/${task.id}/${userToken}`)
					.send(undefined)
					.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_BODY));
			});

			it('if title is not defined', () => {
				const taskData: Task = Task.createFromTask(task);
				taskData.title = undefined;

				return request(serverExpress).put(`/tasks/edit/${task.id}/${userToken}`)
					.send(taskData.json())
					.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_BODY));
			});

			it('if description is not defined', () => {
				const taskData: Task = Task.createFromTask(task);
				taskData.description = undefined;

				return request(serverExpress).put(`/tasks/edit/${task.id}/${userToken}`)
					.send(taskData.json())
					.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_BODY));
			});
		});
	});
});

describe('PUT /tasks/set_done/:id/:token', () => {
	it('returns status code OK, response code OK if token is valid', () => {
		return request(serverExpress).put(`/tasks/set_done/${task.id}/${userToken}`)
			.send({
				isDone: true
			})
			.then((res: ChaiHttp.Response) => {
				expect(res.status).to.be.equals(HttpStatusCode.OK);
				expect(res.body).not.to.be.undefined;
				expect(res.body.code).to.be.equals(ResponseCode.OK);
				expect(res.body.body).to.be.undefined;
			});
	});

	describe('returns status code BAD_REQUEST', () => {
		it('response code BAD_TOKEN if token is invalid', () => {
			return request(serverExpress).put(`/tasks/set_done/${task.id}/${invalidToken}`)
				.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_TOKEN));
		});

		it('response code WRONG_ID if task id is wrong', () => {
			return request(serverExpress).put(`/tasks/set_done/${task.id + 1}/${userToken}`)
				.send({
					isDone: true
				})
				.catch((err: any) => checkBadRequest(err, ResponseCode.WRONG_ID));
		});

		describe('response code BAD_BODY', () => {
			it('if body is not defined', () => {
				return request(serverExpress).put(`/tasks/set_done/${task.id}/${userToken}`)
					.send(undefined)
					.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_BODY));
			});

			it('if isDone is not defined', () => {
				return request(serverExpress).put(`/tasks/set_done/${task.id}/${userToken}`)
					.send({})
					.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_BODY));
			});
		});
	});
});

describe('PUT /tasks/set_important/:id/:token', () => {
	it('returns status code OK, response code OK if token is valid', () => {
		return request(serverExpress).put(`/tasks/set_important/${task.id}/${userToken}`)
			.send({
				isImportant: true
			})
			.then((res: ChaiHttp.Response) => {
				expect(res.status).to.be.equals(HttpStatusCode.OK);
				expect(res.body).not.to.be.undefined;
				expect(res.body.code).to.be.equals(ResponseCode.OK);
				expect(res.body.body).to.be.undefined;
			});
	});

	describe('returns status code BAD_REQUEST', () => {
		it('response code BAD_TOKEN if token is invalid', () => {
			return request(serverExpress).put(`/tasks/set_important/${task.id}/${invalidToken}`)
				.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_TOKEN));
		});

		it('response code WRONG_ID if task id is wrong', () => {
			return request(serverExpress).put(`/tasks/set_important/${task.id + 1}/${userToken}`)
				.send({
					isImportant: true
				})
				.catch((err: any) => checkBadRequest(err, ResponseCode.WRONG_ID));
		});

		describe('response code BAD_BODY', () => {
			it('if body is not defined', () => {
				return request(serverExpress).put(`/tasks/set_important/${task.id}/${userToken}`)
					.send(undefined)
					.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_BODY));
			});

			it('if isImportant is not defined', () => {
				return request(serverExpress).put(`/tasks/set_important/${task.id}/${userToken}`)
					.send({})
					.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_BODY));
			});
		});
	});
});

describe('GET /tasks/done/:token', () => {
	it('returns status code BAD_REQUEST, response code BAD_TOKEN if token is invalid', () => {
		return request(serverExpress).get(`/tasks/done/${invalidToken}`)
			.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_TOKEN));
	});

	it('returns status code OK, response code OK if token is valid', () => {
		return request(serverExpress).get(`/tasks/done/${userToken}`)
			.then((res: ChaiHttp.Response) => {
				expect(res.status).to.be.equals(HttpStatusCode.OK);
				expect(res.body).not.to.be.undefined;
				expect(res.body.code).to.be.equals(ResponseCode.OK);
				const tasksInfo: Task[] = res.body.body;
				expect(tasksInfo.length).to.be.equals(1);
				const taskInfo: Task = tasksInfo[0];
				expect(taskInfo).not.to.be.undefined;
				expect(taskInfo.id).not.to.be.undefined;
				expect(taskInfo.title).to.be.equals(editedTask.title);
				expect(taskInfo.description).to.be.equals(editedTask.description);
				expect(taskInfo.creationDate).not.to.be.undefined;
				expect(taskInfo.deadline).to.be.equals(editedTask.deadline);
				expect(!!taskInfo.isDone).to.be.equals(editedTask.isDone);
				expect(!!taskInfo.isImportant).to.be.equals(editedTask.isImportant);
				expect(taskInfo.userId).to.be.equals(user.id);
				editedTask.id = taskInfo.id;
			});
	});
});

describe('DELETE /tasks/delete/:id/:token', () => {
	it('returns status code BAD_REQUEST and response code BAD_TOKEN if token is invalid', () => {
		return request(serverExpress).del(`/tasks/delete/${editedTask.id}/${invalidToken}`)
			.catch((err: any) => checkBadRequest(err, ResponseCode.BAD_TOKEN));
	});

	it('returns status code OK, response code OK if token is valid', () => {
		return request(serverExpress).del(`/tasks/delete/${task.id}/${userToken}`)
			.then((res: ChaiHttp.Response) => {
				expect(res.status).to.be.equals(HttpStatusCode.OK);
				expect(res.body).not.to.be.undefined;
				expect(res.body.code).to.be.equals(ResponseCode.OK);
			});
	});
});
