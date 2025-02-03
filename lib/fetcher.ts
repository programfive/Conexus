import axios, { AxiosError } from 'axios';

export const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const customError = new Error('An error occurred while fetching the data.');
      customError.message = error.response?.data || error.message;
      throw customError;
    }
    throw error;
  }
};