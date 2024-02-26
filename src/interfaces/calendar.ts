export interface ITask {
	id: string;
	date: string;
	description: string;
	labels: string[];
}

export interface ICardDay {
	id: string;
	title: string;
	tasks: ITask[];
}

export interface IGetCardDaysList {
	currentYear: number;
	currentMonth: number;
	tasks: ITask[];
}

export interface ITaskFormValues {
	labels: string[];
	description: string;
}

export interface IUpdateTasksBody {
	id: number;
	tasks: ITask[];
	userId: number;
}

export interface IHolday {
	counties: string[] | null;
	countryCode: string | null;
	date: string;
	fixed: boolean;
	global: boolean;
	launchYear: number | null;
	localName: string | null;
	name: string | null;
	types: string[] | null;
}
