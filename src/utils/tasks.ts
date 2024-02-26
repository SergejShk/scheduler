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

export const joinAllTasks = (tasksFromDaysList: ITask[], currentTasks: ITask[]) => {
	const allTasks = [...currentTasks, ...tasksFromDaysList];

	const updatedTasks = allTasks.reduce((acc: ITask[], task) => {
		const taskFromList = tasksFromDaysList.find((t) => t.id === task.id);
		const taskExistedInAcc = acc.find((t) => t.id === taskFromList?.id);

		if (taskExistedInAcc || taskFromList) {
			return [...acc];
		}

		return [...acc, task];
	}, []);

	return [...updatedTasks, ...tasksFromDaysList];
};
