import axios, { AxiosError, AxiosResponse } from "axios";

const getResource = async ({
    onError,
    onSuccess,
    url,
} : { 
    onError: (e: AxiosError | unknown) => void,
    onSuccess: (res: AxiosResponse) => void,
    url: string,
}) => {
    try {
        const res = await axios.get(url);
        onSuccess(res)
    } catch (e: unknown) {
        onError(e)
    }
};

export default getResource;
