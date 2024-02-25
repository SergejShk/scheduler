import { FC, useEffect, useState } from "react";
import styled from "styled-components";

import Days from "./Days";

import Modal from "../common/Modal";

import { getDaysList } from "../../utils/calendar";
import { fakeTasks, monthes } from "../../utils/constants";

import { ICardDay, ITask } from "../../interfaces/calendar";

const Calendar: FC = () => {
	const [tasks, setTasks] = useState<ITask[]>(fakeTasks);
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
	const [daysList, setDaysList] = useState<ICardDay[]>([]);
	const [isOpenModal, setIsOpenModal] = useState(false);

	useEffect(() => {
		setDaysList(getDaysList({ currentYear, currentMonth, tasks }));
	}, [currentYear, currentMonth, tasks]);

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

	const onModalOpen = () => setIsOpenModal(true);
	const onModalClose = () => setIsOpenModal(false);

	return (
		<CalendarStyled>
			<Heading>
				<PrevArrow type="button" onClick={prevMonthClick} />
				<NextArrow type="button" onClick={nextMonthClick} />
				<CurrentDate>{`${monthes[currentMonth]} ${currentYear}`}</CurrentDate>
			</Heading>

			<Days daysList={daysList} setTasks={setTasks} onModalOpen={onModalOpen} />

			{isOpenModal && <Modal onModalClose={onModalClose}>hello modal</Modal>}
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
