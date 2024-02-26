// @ts-nocheck
import html2pdf from "html2pdf.js";

export const generatePDF = (reportTemplateRef) => {
	const options = {
		margin: [15, 0, 20, 0],
		pagebreak: { mode: "avoid-all" },
		pagebreak: { mode: ["avoid-all", "css", "legacy"] },
	};

	const printElement = reportTemplateRef.current;
	html2pdf().set(options).from(printElement).save();
};
