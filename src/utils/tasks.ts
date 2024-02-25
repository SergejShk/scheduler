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

export const findTaskFromCard = (card: ICardDay, taskId: string) =>
	card.tasks.find((task) => task.id === taskId);

export const updateTaskInCard = (daysList: ICardDay[], task: ITask, dayId: string) =>
	daysList.map((day) => {
		if (day.id === dayId) {
			return {
				...day,
				tasks: day.tasks.map((t) => {
					if (t.id === task.id) {
						return task;
					}
					return t;
				}),
			};
		}
		return day;
	});
