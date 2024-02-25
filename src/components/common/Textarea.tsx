import { useImperativeHandle, useRef } from "react";
import { FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import styled from "styled-components";

import useAutosizeTextArea from "../../hooks/useAutosizeTextArea";

type TextareaProps<TFormValues extends FieldValues> = {
	name: Path<TFormValues>;
	rules?: RegisterOptions;
	register: UseFormRegister<TFormValues>;
	value: string;
	placeholder?: string;
};

const Textarea = <TFormValues extends FieldValues>({
	name,
	rules,
	register,
	value,
	placeholder,
}: TextareaProps<TFormValues>) => {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const { ref, ...restRegister } = register(name, rules);
	useImperativeHandle(ref, () => textAreaRef.current);

	useAutosizeTextArea(textAreaRef.current, value, 10);

	return <TextareaStyled ref={textAreaRef} id={name} {...restRegister} rows={1} placeholder={placeholder} />;
};

export default Textarea;

export const TextareaStyled = styled.textarea`
	resize: none;
	width: calc(100% - 10px);
	padding: 5px;
	outline: none;
	border-radius: 4px;
	border: 1px solid #ccc;
	font-size: 16px;
	font-family: Inter;
`;
