import { FC, useEffect, useState, MouseEvent, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

import Days from "./Days";

import TaskForm from "../tasks/TaskForm";

import Loader from "../common/Loader";
import Modal from "../common/Modal";

import { useAuthContext } from "../../context/AuthContext";

import { updateTasksApi } from "../../services/tasks/updateTasks";

import { useLogOut } from "../../hooks/mutations/auth/useLogout";
import { useGetTasks } from "../../hooks/mutations/tasks/useGetTasks";

import { getDaysList } from "../../utils/calendar";
import { addTaskToCard, findTaskFromCard, getTasksFromDaysList, updateTaskInCard } from "../../utils/tasks";
import { monthes } from "../../utils/constants";

import { ICardDay, ITask, ITaskFormValues } from "../../interfaces/calendar";

const Calendar: FC = () => {
	const { auth } = useAuthContext();

	const { mutate: logOut, isPending: isPendingLogOut } = useLogOut();
	const { mutate: getTasks, data: tasksData, isPending: isPendingTasks } = useGetTasks();

	const [tasks, setTasks] = useState<ITask[]>([]);
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
	const [daysList, setDaysList] = useState<ICardDay[]>([]);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [clickedCard, setClickedCard] = useState<ICardDay | null>(null);
	const [editTaskId, setEditTaskId] = useState("");

	useEffect(() => {
		getTasks();
	}, []);

	useEffect(() => {
		if (!tasksData?.data) return;

		setTasks(tasksData.data.tasks);
	}, [tasksData]);

	useEffect(() => {
		setDaysList(getDaysList({ currentYear, currentMonth, tasks }));
	}, [currentYear, currentMonth, tasks]);

	const taskToUpdate = useMemo(() => {
		if (!clickedCard) return;

		return findTaskFromCard(clickedCard, editTaskId);
	}, [clickedCard, editTaskId]);

	const handleLogOutClick = () => {
		logOut();
	};

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

	const onModalOpen = (e: MouseEvent<HTMLElement>, card: ICardDay) => {
		const target = e.target as HTMLElement;
		if (target.classList.contains("task")) {
			setEditTaskId(target.id);
		}

		setClickedCard(card);
		setIsOpenModal(true);
	};

	const onModalClose = () => {
		setEditTaskId("");
		setClickedCard(null);
		setIsOpenModal(false);
	};

	const updateTasksInDb = (updatedDaysList: ICardDay[]) => {
		if (!tasksData?.data.id) return;

		const tasks = getTasksFromDaysList(updatedDaysList);

		const payload = {
			id: tasksData?.data.id,
			userId: auth.id,
			tasks,
		};

		setIsLoading(true);
		updateTasksApi(payload)
			.then(() => {
				setDaysList(updatedDaysList);
				onModalClose();
			})
			.catch((err) => console.log(err))
			.finally(() => setIsLoading(false));
	};

	const createTask = (formValues: ITaskFormValues) => {
		if (!tasksData?.data.id || !clickedCard) return;

		const newTask = {
			id: uuidv4(),
			date: clickedCard.id,
			description: formValues.description,
			labels: formValues.labels,
		};

		const updatedDaysList = addTaskToCard(daysList, newTask, clickedCard.id);
		updateTasksInDb(updatedDaysList);
	};

	const editTask = (formValues: ITaskFormValues) => {
		if (!tasksData?.data.id || !clickedCard || !taskToUpdate) return;

		const updatedTask = {
			...taskToUpdate,
			...formValues,
		};

		const updatedDaysList = updateTaskInCard(daysList, updatedTask, clickedCard.id);
		updateTasksInDb(updatedDaysList);
	};

	if (isPendingTasks) {
		<Loader />;
	}

	return (
		<CalendarStyled>
			<Heading>
				<PrevArrow type="button" onClick={prevMonthClick} />
				<NextArrow type="button" onClick={nextMonthClick} />
				<CurrentDate>{`${monthes[currentMonth]} ${currentYear}`}</CurrentDate>

				<LogOutBtn type="button" onClick={handleLogOutClick} disabled={isPendingLogOut}>
					Log out
				</LogOutBtn>
			</Heading>

			<Days daysList={daysList} setTasks={setTasks} onModalOpen={onModalOpen} />

			{isOpenModal && (
				<Modal onModalClose={onModalClose}>
					<TaskForm
						onSaveClick={editTaskId ? editTask : createTask}
						initialTask={taskToUpdate}
						isLoading={isLoading}
					/>
				</Modal>
			)}
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
	padding: 5px 15px;
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

const LogOutBtn = styled.button`
	cursor: pointer;
	font-size: 18px;
	font-weight: 500;
	border-style: none;
	background-color: transparent;
	margin-left: auto;
	text-decoration: underline;

	&:disabled {
		cursor: auto;
	}
`;
