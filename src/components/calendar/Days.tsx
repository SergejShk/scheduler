import { FC, ReactNode } from "react";
import styled from "styled-components";

import { shortMonthes, weekDays } from "../../utils/constants";

interface IProps {
	currentYear: number;
	currentMonth: number;
}

const Days: FC<IProps> = ({ currentYear, currentMonth }) => {
	const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
	const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
	const lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay();
	const lastDateOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
	const prevMonth = new Date(currentYear, currentMonth, 0).getMonth();
	const nextMonth = new Date(currentYear, currentMonth + 1, 1).getMonth();

	const days: ReactNode[] = [];

	for (let i = firstDayOfMonth; i > 0; i -= 1) {
		days.push(
			<DaysItem key={"dayOfPrevMonth" + i} $isInactive>
				{i === 1 ? `${lastDateOfPrevMonth - i + 1} ${shortMonthes[prevMonth]}` : lastDateOfPrevMonth - i + 1}
			</DaysItem>
		);
	}

	for (let i = 1; i <= lastDateOfMonth; i += 1) {
		days.push(
			<DaysItem key={"dayOfMonth" + i}>
				{i === 1 || i === lastDateOfMonth ? `${i} ${shortMonthes[currentMonth]}` : i}
			</DaysItem>
		);
	}

	for (let i = lastDayOfMonth; i < 6; i += 1) {
		days.push(
			<DaysItem key={"dayOfNextMonth" + i} $isInactive>
				{i === lastDayOfMonth
					? `${i - lastDayOfMonth + 1} ${shortMonthes[nextMonth]}`
					: i - lastDayOfMonth + 1}
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
	font-size: 14px;
`;
