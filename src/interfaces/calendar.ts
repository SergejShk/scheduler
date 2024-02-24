export interface ITask {
	id: string;
	date: string;
	description: string;
	labels: string[];
}

export interface ICardDay {
	id: string;
	title: string;
	tasks?: ITask[];
}