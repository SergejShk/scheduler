import { FC, ReactNode, useState } from "react";
import styled from "styled-components";

import { shortMonthes, weekDays } from "../../utils/constants";

import { ITask } from "../../interfaces/calendar";

interface IProps {
	currentYear: number;
	currentMonth: number;
}

const fakeTasks = [
	{ id: "1", date: "02/02/2024", description: "task 1", labels: ["green"] },
	{ id: "2", date: "04/02/2024", description: "task 2", labels: ["yellow", "red"] },
	{ id: "3", date: "05/02/2024", description: "task 3", labels: ["yellow", "red"] },
	{ id: "4", date: "05/02/2024", description: "task 3", labels: ["violet"] },
	{ id: "5", date: "05/02/2024", description: "task 3", labels: ["green"] },
	{ id: "6", date: "05/02/2024", description: "task 3", labels: ["blue"] },
	{ id: "7", date: "06/02/2024", description: "task 3", labels: ["yellow", "red", "orange", "blue"] },
];

const Days: FC<IProps> = ({ currentYear, currentMonth }) => {
	const [tasks, setTasks] = useState<ITask[]>(fakeTasks);

	const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
	const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
	const lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay();
	const lastDateOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
	const prevMonth = new Date(currentYear, currentMonth, 0).getMonth();
	const nextMonth = new Date(currentYear, currentMonth + 1, 1).getMonth();

	const days: ReactNode[] = [];

	for (let i = firstDayOfMonth; i > 0; i -= 1) {
		const day = lastDateOfPrevMonth - i + 1;
		const year = prevMonth === 11 ? currentYear - 1 : currentYear;
		const localeDate = new Date(year, prevMonth, day);
		const id = localeDate.toLocaleDateString();
		const title = i === 1 ? `${day} ${shortMonthes[prevMonth]}` : String(day);

		days.push(
			<DaysItem key={id} id={id} $isInactive>
				<p>{title}</p>
				<TaskList>
					{tasks.map((task) =>
						task.date === id ? (
							<TaskItem key={task.id} id={task.id}>
								{task.labels.length > 0 && (
									<LabelList>
										{task.labels.map((label) => (
											<LabelItem key={label} color={label} />
										))}
									</LabelList>
								)}
								<p>{task.description}</p>
							</TaskItem>
						) : null
					)}
				</TaskList>
			</DaysItem>
		);
	}

	for (let i = 1; i <= lastDateOfMonth; i += 1) {
		const day = i;
		const localeDate = new Date(currentYear, currentMonth, day);
		const id = localeDate.toLocaleDateString();
		const title = i === 1 || i === lastDateOfMonth ? `${day} ${shortMonthes[currentMonth]}` : String(day);

		days.push(
			<DaysItem key={id} id={id}>
				<p>{title}</p>
				<TaskList>
					{tasks.map((task) =>
						task.date === id ? (
							<TaskItem key={task.id} id={task.id}>
								{task.labels.length > 0 && (
									<LabelList>
										{task.labels.map((label) => (
											<LabelItem key={label} color={label} />
										))}
									</LabelList>
								)}
								<p>{task.description}</p>
							</TaskItem>
						) : null
					)}
				</TaskList>
			</DaysItem>
		);
	}

	for (let i = lastDayOfMonth; i < 6; i += 1) {
		const day = i - lastDayOfMonth + 1;
		const year = nextMonth === 0 ? currentYear + 1 : currentYear;
		const localeDate = new Date(year, nextMonth, day);
		const id = localeDate.toLocaleDateString();
		const title =
			i === lastDayOfMonth
				? `${i - lastDayOfMonth + 1} ${shortMonthes[nextMonth]}`
				: String(i - lastDayOfMonth + 1);

		days.push(
			<DaysItem key={id} id={id} $isInactive>
				<p>{title}</p>
				<TaskList>
					{tasks.map((task) =>
						task.date === id ? (
							<TaskItem key={task.id} id={task.id}>
								{task.labels.length > 0 && (
									<LabelList>
										{task.labels.map((label) => (
											<LabelItem key={label} color={label} />
										))}
									</LabelList>
								)}
								<p>{task.description}</p>
							</TaskItem>
						) : null
					)}
				</TaskList>
			</DaysItem>
		);
	}

	return (
		<DaysStyled>
			<WeekDaysList>
				{weekDays.map((day, idx) => (
					<WeekDaysItem key={idx}>{day}</WeekDaysItem>
				))}
			</WeekDaysList>
			<DaysList>{days.concat()}</DaysList>
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
