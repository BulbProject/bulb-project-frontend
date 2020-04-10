import axios, { AxiosRequestConfig } from 'axios';

const requestData = async <Response>(
  requestConfig: AxiosRequestConfig
): Promise<{ data?: Response; error?: string }> => {
  try {
    const { data } = await axios(requestConfig);

    return { data };
  } catch (error) {
    return { error: error.message };
  }
};

export default requestData;
