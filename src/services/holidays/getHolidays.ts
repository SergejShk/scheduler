import axios from "axios";

const BASE_URL = import.meta.env.VITE_DATE_BASE_URL;

export const getHolidaysApi = async (year: number) => {
	const { data } = await axios.get(BASE_URL + `/api/v3/PublicHolidays/${year}/UA`);
	return data;
};
