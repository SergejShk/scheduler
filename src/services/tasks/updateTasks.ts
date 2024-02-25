import { apiInstance } from "../apiInstance";

import { ApiResult } from "../../interfaces/api";
import { IUpdateTasksBody } from "../../interfaces/calendar";

export const updateTasksApi = async (body: IUpdateTasksBody) => {
	const { data } = await apiInstance.put<Promise<ApiResult<IUpdateTasksBody>>>(`tasks/update`, body);

	return data;
};
