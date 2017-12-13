export class Config {
	public static readonly port: number = 1507;
	public static readonly dbName: string = 'ToDoList.db';
	public static readonly secret: string = 'ilovescotchyscotch';
	public static readonly tokenLifeTime: string = '24h';
	public static readonly encryptSaltLength: number = 64;
	public static readonly encryptIterations: number = 25000;
	public static readonly encryptKeyLength: number = 512;
}
