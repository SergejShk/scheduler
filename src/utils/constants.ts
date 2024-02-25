import { ITask } from "../interfaces/calendar";

export const monthes = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const shortMonthes = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

export const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const days = [
	"28",
	"29",
	"30",
	"31",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"11",
	"12",
	"13",
	"14",
	"15",
	"16",
	"17",
	"18",
	"19",
	"20",
	"21",
	"22",
	"23",
	"24",
	"25",
	"26",
	"27",
	"28",
	"29",
	"30",
	"1",
];

export const labelColors = ["green", "yellow", "orange", "blue", "purple", "red"];

export const fakeTasks: ITask[] = [
	{ id: "1", date: "02/02/2024", description: "task 1", labels: ["green"] },
	{ id: "2", date: "04/02/2024", description: "task 2", labels: ["yellow", "red"] },
	{ id: "3", date: "05/02/2024", description: "task 3", labels: ["yellow", "red"] },
	{ id: "4", date: "05/02/2024", description: "task 4", labels: ["violet"] },
	{ id: "5", date: "05/02/2024", description: "task 5", labels: ["green"] },
	{ id: "6", date: "05/02/2024", description: "task 6", labels: ["blue"] },
	{ id: "7", date: "06/02/2024", description: "task 7", labels: ["yellow", "red", "orange", "blue"] },
];
