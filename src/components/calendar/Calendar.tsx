import { FC, useEffect, useState, MouseEvent, useMemo, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import debounce from "lodash.debounce";
import styled from "styled-components";

import Heading from "./Heading";
import Days from "./Days";

import TaskForm from "../tasks/TaskForm";

import Loader from "../common/Loader";
import Modal from "../common/Modal";

import { useAuthContext } from "../../context/AuthContext";

import { updateTasksApi } from "../../services/tasks/updateTasks";

import { useGetTasks } from "../../hooks/mutations/tasks/useGetTasks";

import { getDaysList } from "../../utils/calendar";
import { addTaskToCard, findTaskFromCard, getTasksFromDaysList, updateTaskInCard } from "../../utils/tasks";
import { labelColors, monthes } from "../../utils/constants";

import { ICardDay, ITask, ITaskFormValues } from "../../interfaces/calendar";

const Calendar: FC = () => {
	const { auth } = useAuthContext();

	const { mutate: getTasks, data: tasksData, isPending: isPendingTasks } = useGetTasks();

	const [searchValue, setSearchValue] = useState("");
	const [selectedFilter, setSelectedFilter] = useState<string[]>(labelColors);
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

	const updateSearchValue = useCallback(
		debounce((value: string) => {
			setSearchValue(value);
		}, 500),
		[]
	);

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

	const handleFilter = (keys: string[]) => {
		setSelectedFilter(keys);
	};

	useEffect(() => {
		if (!tasksData?.data) return;

		const searchedTasks = tasksData.data.tasks.filter((task) => task.description.includes(searchValue));
		setTasks(searchedTasks);
	}, [searchValue, tasksData]);

	useEffect(() => {
		if (!tasksData?.data) return;

		const searchedTasks = tasksData.data.tasks.filter((task) => {
			let updTask = [];
			selectedFilter.forEach((filter) => {
				if (task.labels.includes(filter)) {
					updTask.push(task);
				}
			});
			return updTask.length > 0;
		});
		setTasks(searchedTasks);
	}, [selectedFilter, tasksData]);

	if (isPendingTasks) {
		<Loader />;
	}

	return (
		<CalendarStyled>
			<Heading
				daysList={daysList}
				currentDate={`${monthes[currentMonth]} ${currentYear}`}
				prevMonthClick={prevMonthClick}
				nextMonthClick={nextMonthClick}
				updateSearchValue={updateSearchValue}
				selectedFilter={selectedFilter}
				handleFilter={handleFilter}
			/>

			<Days daysList={daysList} onModalOpen={onModalOpen} updateTasksInDb={updateTasksInDb} />

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
