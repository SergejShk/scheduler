import { FC, useState } from "react";
import styled from "styled-components";

import Days from "./Days";

import { monthes } from "../../utils/constants";

const Calendar: FC = () => {
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

	const prevMonthClick = () => {
		setCurrentMonth((prev) => {
			if (prev === 0) {
				setCurrentYear((prevYear) => prevYear - 1);
				return 11;
			}
			return prev - 1;
		});
	};

	const nextMonthClick = () => {
		setCurrentMonth((prev) => {
			if (prev === 11) {
				setCurrentYear((prevYear) => prevYear + 1);
				return 0;
			}
			return prev + 1;
		});
	};

	return (
		<CalendarStyled>
			<Heading>
				<PrevArrow type="button" onClick={prevMonthClick} />
				<NextArrow type="button" onClick={nextMonthClick} />
				<CurrentDate>{`${monthes[currentMonth]} ${currentYear}`}</CurrentDate>
			</Heading>
			<Days currentYear={currentYear} currentMonth={currentMonth} />
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
