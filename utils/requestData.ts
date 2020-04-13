import axios, { AxiosRequestConfig } from 'axios';
import { RequestError } from '../types';

const requestData = async <Response>(
  requestConfig: AxiosRequestConfig
): Promise<{ data: Response | null; error: RequestError | null }> => {
  try {
    const { data } = await axios(requestConfig);

    return { data, error: null };
  } catch (error) {
    return { data: null, error: { message: error.message, statusCode: error.response.status } };
  }
};

export default requestData;
