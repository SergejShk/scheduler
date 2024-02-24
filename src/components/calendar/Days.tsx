import { FC, useState } from "react";
import styled from "styled-components";

import { weekDays } from "../../utils/constants";

import { ICardDay, ITask } from "../../interfaces/calendar";

interface IProps {
	daysList: ICardDay[];
	setDaysList: React.Dispatch<React.SetStateAction<ICardDay[]>>;
}

const Days: FC<IProps> = ({ daysList, setDaysList }) => {
	const [currentTaskList, setCurrentTaskList] = useState<ICardDay | null>(null);
	const [currentTask, setCurrentTask] = useState<ITask | null>(null);

	const updateItemsListOnSameCard = (taskList: ITask[], task: ITask) => {
		return taskList.map((item) => {
			if (currentTask && item.id === task.id) {
				return currentTask;
			}

			if (currentTask && item.id === currentTask.id) {
				return task;
			}

			return item;
		});
	};

	const replaceItems = (taskList: ITask[], itemAdd: ITask, itemDelete: ITask) => {
		return taskList.map((item) => {
			if (item.id === itemDelete.id) {
				return { ...itemAdd, date: itemDelete.date };
			}

			return item;
		});
	};

	const handleDragStart = (currentDayTaskList: ICardDay, task: ITask) => {
		setCurrentTaskList(currentDayTaskList);
		setCurrentTask(task);
	};

	const handleDropItem = (e: React.DragEvent<HTMLLIElement>, taskList: ICardDay, task: ITask) => {
		e.preventDefault();
		if (!currentTaskList || !currentTask) return;

		setDaysList((prev) =>
			prev.map((list) => {
				if (list.id === taskList.id && list.id === currentTaskList.id) {
					const updatedItems = updateItemsListOnSameCard(list.tasks, task);
					return { ...list, tasks: updatedItems };
				}

				if (list.id === taskList.id && list.id !== currentTaskList.id) {
					const updatedItems = replaceItems(list.tasks, currentTask, task);
					return { ...list, tasks: updatedItems };
				}

				if (list.id !== taskList.id && list.id === currentTaskList.id) {
					const updatedItems = replaceItems(list.tasks, task, currentTask);
					return { ...list, tasks: updatedItems };
				}

				return list;
			})
		);
	};

	const handleDropBoard = (e: React.DragEvent<HTMLLIElement>, taskList: ICardDay) => {
		e.preventDefault();

		if (!currentTaskList || !currentTask) return;

		const target = e.target as HTMLElement;
		if (target.classList.contains("task")) return;

		const updatedTask = { ...currentTask, date: taskList.id };

		taskList.tasks.push(updatedTask);
		const currentItemIndex = currentTaskList.tasks.indexOf(currentTask);
		currentTaskList.tasks.splice(currentItemIndex, 1);

		setDaysList((prev) =>
			prev.map((list) => {
				if (list.id === taskList.id) {
					return taskList;
				}
				if (list.id === currentTaskList.id) {
					return currentTaskList;
				}

				return list;
			})
		);
	};

	const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
		e.preventDefault();
	};

	return (
		<DaysStyled>
			<WeekDaysList>
				{weekDays.map((day, idx) => (
					<WeekDaysItem key={idx}>{day}</WeekDaysItem>
				))}
			</WeekDaysList>
			<DaysList>
				{daysList.map(({ id, title, tasks }) => (
					<DaysItem
						key={id}
						id={id}
						onDrop={(e) => handleDropBoard(e, { id, title, tasks })}
						onDragOver={handleDragOver}
					>
						<p>{title}</p>

						<TaskList>
							{tasks.map((task) => (
								<TaskItem
									key={task.id}
									id={task.id}
									className="task"
									draggable={true}
									onDragStart={() => handleDragStart({ id, title, tasks }, task)}
									onDrop={(e) => handleDropItem(e, { id, title, tasks }, task)}
									onDragOver={handleDragOver}
								>
									{task.labels.length > 0 && (
										<LabelList>
											{task.labels.map((label) => (
												<LabelItem key={label} className="task" color={label} />
											))}
										</LabelList>
									)}
									<p className="task">{task.description}</p>
								</TaskItem>
							))}
						</TaskList>
					</DaysItem>
				))}
			</DaysList>
		</DaysStyled>
	);
};

export default Days;

const DaysStyled = styled.div`
	padding: 0 15px;
`;

const CalendarList = styled.ul`
	display: flex;
	flex-wrap: wrap;
	text-align: center;
`;

const CalendarItem = styled.li`
	width: calc(100% / 7);
`;

const WeekDaysList = styled(CalendarList)``;

const WeekDaysItem = styled(CalendarItem)`
	font-weight: 500;
`;

const DaysList = styled(CalendarList)`
	margin-top: 15px;
	gap: 5px;
	text-align: left;
`;

const DaysItem = styled(CalendarItem)<{ $isInactive?: boolean }>`
	height: 100px;
	width: calc(100% / 7 - 5px - 10px + 0.7px);
	background-color: #d7d6d6;
	padding: 5px;
	opacity: ${({ $isInactive }) => ($isInactive ? "0.4" : "1")};
	font-size: 12px;
	line-height: 1;
`;

const TaskList = styled.ul`
	display: flex;
	flex-direction: column;
	height: 88px;
	overflow: auto;

	&::-webkit-scrollbar {
		display: none;
	}
`;

const TaskItem = styled.li`
	cursor: grab;
	background-color: #fff;
	padding: 3px;
	border-radius: 4px;
	margin-top: 5px;
`;

const LabelList = styled.ul`
	display: flex;
	align-items: center;
	gap: 5px;
	margin-bottom: 5px;
`;

const LabelItem = styled.li<{ color: string }>`
	width: 30px;
	height: 5px;
	border-radius: 4px;
	background-color: ${({ color }) => color};
`;
