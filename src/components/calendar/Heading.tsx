import { FC, ChangeEvent } from "react";
import styled from "styled-components";

import { useLogOut } from "../../hooks/mutations/auth/useLogout";

interface IProps {
	currentDate: string;
	prevMonthClick: () => void;
	nextMonthClick: () => void;
	updateSearchValue: (value: string) => void;
}

const Heading: FC<IProps> = ({ currentDate, prevMonthClick, nextMonthClick, updateSearchValue }) => {
	const { mutate: logOut, isPending: isPendingLogOut } = useLogOut();

	const handleLogOutClick = () => {
		logOut();
	};

	const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		updateSearchValue(e.target.value);
	};

	return (
		<HeadingStyled>
			<ActionBlock>
				<InputSearch type="text" placeholder="Search..." onChange={handleSearchInputChange} />

				<PrevArrow type="button" onClick={prevMonthClick} />
				<NextArrow type="button" onClick={nextMonthClick} />
			</ActionBlock>

			<CurrentDate>{currentDate}</CurrentDate>

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

const InputSearch = styled.input`
	border-radius: 4px;
	border: 1px solid #ccc;
	background-color: #fff;
	font-size: 14px;
	letter-spacing: 0.72px;
	color: #484848;
	outline: none;
	padding: 6px;
	margin-right: 10px;

	&:hover,
	&:focus {
		border-color: #4c758b;
	}
`;
