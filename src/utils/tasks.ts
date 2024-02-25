import { ICardDay, ITask } from "../interfaces/calendar";

export const addTaskToCard = (daysList: ICardDay[], task: ITask, dayId: string) =>
	daysList.map((day) => {
		if (day.id === dayId) {
			return {
				...day,
				tasks: [...day.tasks, task],
			};
		}
		return day;
	});

export const getTasksFromDaysList = (daysList: ICardDay[]) =>
	daysList.reduce((acc: ITask[], day: ICardDay) => {
		return [...acc, ...day.tasks];
	}, []);
