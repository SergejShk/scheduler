import { FC } from "react";
import { useForm, useWatch } from "react-hook-form";
import styled from "styled-components";

import Checkbox from "../common/Checkbox";
import Textarea from "../common/Textarea";
import { Button } from "../common/Button";

import { labelColors } from "../../utils/constants";

import { ITaskFormValues } from "../../interfaces/calendar";

interface IProps {
	isLoading: boolean;
	onSaveClick: (values: ITaskFormValues) => void;
}

const TaskForm: FC<IProps> = ({ isLoading, onSaveClick }) => {
	const { control, register, handleSubmit } = useForm<ITaskFormValues>();

	const descriptionValue = useWatch({
		name: "description",
		control,
	});

	return (
		<FormStyled onSubmit={handleSubmit(onSaveClick)}>
			<BlockTitle>Labels</BlockTitle>
			<LabelsList>
				{labelColors.map((label) => (
					<LabelsItem key={label}>
						<Checkbox name="labels" value={label} register={register} />
						<LabelColor color={label} />
					</LabelsItem>
				))}
			</LabelsList>

			<BlockTitle>Description</BlockTitle>
			<Textarea name="description" register={register} value={descriptionValue} placeholder="Type..." />

			<ButtonWrapper>
				<Button disabled={isLoading}>Save</Button>
			</ButtonWrapper>
		</FormStyled>
	);
};

export default TaskForm;

const FormStyled = styled.form`
	width: 100%;
`;

const LabelsList = styled.ul`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	gap: 5px;
	margin-bottom: 15px;
`;

const LabelsItem = styled.li`
	width: 32%;
	display: flex;
	align-items: center;
	gap: 10px;
`;

const LabelColor = styled.div<{ color: string }>`
	width: 100px;
	height: 20px;
	background-color: ${({ color }) => color};
	border-radius: 4px;
`;

const BlockTitle = styled.p`
	font-weight: 600;
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
`;
