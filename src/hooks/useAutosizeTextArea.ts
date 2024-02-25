import { useEffect } from "react";

const useAutosizeTextArea = (textAreaRef: HTMLTextAreaElement | null, value: string, padding: number) => {
	useEffect(() => {
		if (textAreaRef) {
			textAreaRef.style.height = "0px";
			const scrollHeight = textAreaRef.scrollHeight;

			textAreaRef.style.height = scrollHeight - padding + "px";
		}
	}, [padding, textAreaRef, value]);
};

export default useAutosizeTextArea;
