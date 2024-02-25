import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { getTasksApi } from "../../../services/tasks/getTasks";

import { ApiError, ApiResult } from "../../../interfaces/api";
import { IUpdateTasksBody } from "../../../interfaces/calendar";

export const useGetTasks = () => {
	return useMutation<ApiResult<IUpdateTasksBody>, AxiosError<ApiError>>({
		mutationFn: async () => await getTasksApi(),
	});
};
