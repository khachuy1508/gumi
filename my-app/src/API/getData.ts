import { callApi } from "./configAPI";
import { INasaData } from "../Interface/nasaData";

export const getData = (keySearch: string): Promise<INasaData | undefined> => {
  const uri = `/search?q=${keySearch}`;
  const resp = callApi("get", uri).then((resp: INasaData) => {
    if (resp) {
      return resp;
    }
  });
  return resp;
};
