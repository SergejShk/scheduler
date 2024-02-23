import { FC } from "react";
import styled from "styled-components";

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
				<LeftArrow type="button" onClick={prevMonthClick} />
				<DateText>September 2018</DateText>
				<RightArrow type="button" onClick={nextMonthClick} />
			</Heading>
		</CalendarStyled>
	);
};

export default Calendar;

const CalendarStyled = styled.div``;

const Heading = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const LeftArrow = styled.button`
	width: 20px;
	height: 20px;
	background-image: url("/icons/nav-arrow.svg");
	background-size: auto;
	background-position: center center;
	background-repeat: no-repeat;
`;

const RightArrow = styled(LeftArrow)`
	transform: rotate(180deg);
`;

const DateText = styled.p`
	min-width: 250px;
	font-size: 24px;
	font-weight: 500;
	text-align: center;
`;
