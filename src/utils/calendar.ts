import { shortMonthes } from "./constants";

import { ICardDay, IGetCardDaysList, IHolday, ITask } from "../interfaces/calendar";

export const getDaysOfPrevMonth = (
	firstDayOfMonth: number,
	lastDateOfPrevMonth: number,
	prevMonth: number,
	currentYear: number,
	tasks: ITask[]
): ICardDay[] => {
	const days = [];

	for (let i = firstDayOfMonth; i > 0; i -= 1) {
		const day = lastDateOfPrevMonth - i + 1;
		const year = prevMonth === 11 ? currentYear - 1 : currentYear;
		const localeDate = new Date(year, prevMonth, day);
		const id = localeDate.toLocaleDateString();
		const title = i === 1 ? `${day} ${shortMonthes[prevMonth]}` : String(day);
		const filteredTasks = tasks.filter((task) => task.date === id);

		days.push({
			id,
			title,
			tasks: filteredTasks,
		});
	}

	return days;
};

export const getDaysOfCurrentMonth = (
	lastDateOfMonth: number,
	currentYear: number,
	currentMonth: number,
	tasks: ITask[]
): ICardDay[] => {
	const days = [];

	for (let i = 1; i <= lastDateOfMonth; i += 1) {
		const day = i;
		const localeDate = new Date(currentYear, currentMonth, day);
		const id = localeDate.toLocaleDateString();
		const title = i === 1 || i === lastDateOfMonth ? `${day} ${shortMonthes[currentMonth]}` : String(day);
		const filteredTasks = tasks.filter((task) => task.date === id);

		days.push({
			id,
			title,
			tasks: filteredTasks,
		});
	}

	return days;
};

export const getDaysOfNextMonth = (
	lastDayOfMonth: number,
	nextMonth: number,
	currentYear: number,
	tasks: ITask[]
): ICardDay[] => {
	const days = [];

	for (let i = lastDayOfMonth; i < 6; i += 1) {
		const day = i - lastDayOfMonth + 1;
		const year = nextMonth === 0 ? currentYear + 1 : currentYear;
		const localeDate = new Date(year, nextMonth, day);
		const id = localeDate.toLocaleDateString();
		const title =
			i === lastDayOfMonth
				? `${i - lastDayOfMonth + 1} ${shortMonthes[nextMonth]}`
				: String(i - lastDayOfMonth + 1);
		const filteredTasks = tasks.filter((task) => task.date === id);

		days.push({
			id,
			title,
			tasks: filteredTasks,
		});
	}

	return days;
};

export const getDaysList = ({ currentYear, currentMonth, tasks }: IGetCardDaysList): ICardDay[] => {
	const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
	const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
	const lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay();
	const lastDateOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
	const prevMonth = new Date(currentYear, currentMonth, 0).getMonth();
	const nextMonth = new Date(currentYear, currentMonth + 1, 1).getMonth();

	return [
		...getDaysOfPrevMonth(firstDayOfMonth, lastDateOfPrevMonth, prevMonth, currentYear, tasks),
		...getDaysOfCurrentMonth(lastDateOfMonth, currentYear, currentMonth, tasks),
		...getDaysOfNextMonth(lastDayOfMonth, nextMonth, currentYear, tasks),
	];
};

export const normalizeHolidays = (holidays: IHolday[]) => {
	return holidays.map((holiday) => ({
		...holiday,
		date: new Date(holiday.date).toLocaleDateString(),
	}));
};
