import html2canvas from "html2canvas";

export const generateImg = (calendarRef: React.MutableRefObject<null>) => {
	if (!calendarRef.current) return;

	html2canvas(calendarRef.current).then((canvas) => {
		const img = canvas.toDataURL("image/png");

		const link = document.createElement("a");
		link.href = img;
		link.download = "scheduler.png";

		link.click();
	});
};
