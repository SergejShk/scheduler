import { FC, ChangeEvent, useRef, useState } from "react";
import styled from "styled-components";

import FilterDropdown from "./FilterDropdown";

import { useLogOut } from "../../hooks/mutations/auth/useLogout";

import { filterItems } from "../../utils/constants";
import { getTasksFromDaysList } from "../../utils/tasks";
import { generateImg } from "../../utils/generateImg";

import { ICardDay } from "../../interfaces/calendar";

interface IProps {
	daysList: ICardDay[];
	currentDate: string;
	selectedFilter: string[];
	calendarRef: React.MutableRefObject<null>;
	prevMonthClick: () => void;
	nextMonthClick: () => void;
	updateSearchValue: (value: string) => void;
	handleFilter: (keys: string[]) => void;
}

const Heading: FC<IProps> = ({
	daysList,
	currentDate,
	selectedFilter,
	calendarRef,
	prevMonthClick,
	nextMonthClick,
	updateSearchValue,
	handleFilter,
}) => {
	const [isOpenDropdown, setIsOpenDropdown] = useState(false);
	const [isReset, setIsReset] = useState(false);

	const filterIconRef = useRef(null);

	const { mutate: logOut, isPending: isPendingLogOut } = useLogOut();

	const onIconClick = () => {
		if (isOpenDropdown) {
			setIsReset(true);
		}

		setIsOpenDropdown((prev) => !prev);
	};

	const handleLogOutClick = () => {
		logOut();
	};

	const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		updateSearchValue(e.target.value);
	};

	const exportData = () => {
		const data = getTasksFromDaysList(daysList);

		const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
		const link = document.createElement("a");
		link.href = jsonString;
		link.download = "data.json";

		link.click();
	};

	return (
		<HeadingStyled>
			<ActionBlock>
				<InputSearch type="text" placeholder="Search..." onChange={handleSearchInputChange} />

				<FilterBlock>
					<p>Filter by label</p>
					<Chevron ref={filterIconRef} $isOpenDropdown={isOpenDropdown} onClick={onIconClick} />
					<FilterDropdown
						iconRef={filterIconRef}
						filterItems={filterItems}
						isOpen={isOpenDropdown}
						setIsOpen={setIsOpenDropdown}
						defaultSelectedItems={selectedFilter}
						onFilter={handleFilter}
						isReset={isReset}
						setIsReset={setIsReset}
					/>
				</FilterBlock>

				<PrevArrow type="button" onClick={prevMonthClick} />
				<NextArrow type="button" onClick={nextMonthClick} />
			</ActionBlock>

			<CurrentDate>{currentDate}</CurrentDate>

			<ExportBlock>
				<ExportButton type="button" onClick={exportData}>
					Export JSON
				</ExportButton>
				<ExportButton type="button" onClick={() => generateImg(calendarRef)}>
					Save PNG
				</ExportButton>
			</ExportBlock>

			<LogOutBtn type="button" onClick={handleLogOutClick} disabled={isPendingLogOut}>
				Log out
			</LogOutBtn>
		</HeadingStyled>
	);
};

export default Heading;

const HeadingStyled = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 5px 15px;
`;

const ActionBlock = styled.div`
	display: flex;
	align-items: center;
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
	width: calc(100% - 845px);
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
	text-decoration: underline;
	margin-bottom: 4px;

	&:disabled {
		cursor: auto;
	}
`;

const InputSearch = styled.input`
	border-radius: 4px;
	border: 1px solid #ccc;
	background-color: #fff;
	font-size: 14px;
	letter-spacing: 0.72px;
	color: #484848;
	outline: none;
	padding: 6px;
	margin-right: 25px;

	&:hover,
	&:focus {
		border-color: #4c758b;
	}
`;

const FilterBlock = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	font-size: 18px;
	margin-right: 25px;
`;

const Chevron = styled.div<{ $isOpenDropdown: boolean }>`
	width: 30px;
	height: 30px;
	cursor: pointer;
	background-image: url("/icons/nav-arrow.svg");
	background-size: contain;
	background-position: center center;
	background-repeat: no-repeat;
	transform: ${({ $isOpenDropdown }) => ($isOpenDropdown ? "rotate(90deg)" : "rotate(-90deg)")};
`;

const ExportBlock = styled.div`
	margin-left: auto;
`;

const ExportButton = styled.button`
	font-size: 18px;
	margin-right: 25px;
`;
