import { apiInstance } from "../apiInstance";

import { ApiResult } from "../../interfaces/api";
import { IUpdateTasksBody } from "../../interfaces/calendar";

export const getTasksApi = async () => {
	const { data } = await apiInstance.post<Promise<ApiResult<IUpdateTasksBody>>>(`tasks/all`);

	return data;
};
