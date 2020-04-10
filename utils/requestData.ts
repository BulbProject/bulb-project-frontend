import axios, { AxiosRequestConfig } from 'axios';
import { RequestError } from '../types';

const requestData = async <Response>(
  requestConfig: AxiosRequestConfig
): Promise<{ data?: Response; error?: RequestError }> => {
  try {
    const { data } = await axios(requestConfig);

    return { data };
  } catch (error) {
    return { error: { message: error.message, statusCode: error.response.status } };
  }
};

export default requestData;
