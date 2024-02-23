import { FC } from "react";
import styled from "styled-components";

import { days, weekDays } from "../utils/constants";

const Calendar: FC = () => {
	const prevMonthClick = () => {
		console.log("prev month click");
	};

	const nextMonthClick = () => {
		console.log("next month click");
	};

	return (
		<CalendarStyled>
			<Heading>
				<PrevArrow type="button" onClick={prevMonthClick} />
				<NextArrow type="button" onClick={nextMonthClick} />
				<CurrentDate>September 2018</CurrentDate>
			</Heading>

			<CalendarBody>
				<WeekDaysList>
					{weekDays.map((day, idx) => (
						<WeekDaysItem key={idx}>{day}</WeekDaysItem>
					))}
				</WeekDaysList>
				<DaysList>
					{days.map((day, idx) => (
						<DaysItem key={idx}>{day}</DaysItem>
					))}
				</DaysList>
			</CalendarBody>
		</CalendarStyled>
	);
};

export default Calendar;

const CalendarStyled = styled.div`
	height: 100vh;
	background-color: #f4f3f3;
`;

const Heading = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 5px;
`;

const PrevArrow = styled.button`
	width: 30px;
	height: 30px;
	background-color: #e2e2e2;
	background-image: url("/icons/nav-arrow.svg");
	background-size: contain;
	background-position: center center;
	background-repeat: no-repeat;
	transform: rotate(90deg);
	transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);

	&:hover {
		background-color: #ccc;
	}
`;

const NextArrow = styled(PrevArrow)`
	transform: rotate(270deg);
	margin-left: 5px;
`;

const CurrentDate = styled.p`
	min-width: 250px;
	font-size: 24px;
	font-weight: 500;
	text-align: center;
`;

const CalendarBody = styled.div`
	padding: 0 15px;
`;

const CalendarList = styled.ul`
	display: flex;
	flex-wrap: wrap;
	text-align: center;
`;

const CalendarItem = styled.li`
	width: calc(100% / 7);
	cursor: grab;
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

const DaysItem = styled(CalendarItem)`
	height: 100px;
	width: calc(100% / 7 - 5px - 10px + 0.7px);
	background-color: #e2e2e2;
	padding: 5px;
`;
