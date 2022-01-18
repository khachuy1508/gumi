import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IListImage } from "../../Interface/listImageData";
import { IItemElements, INasaData } from "../../Interface/nasaData";
import { RootState } from "../../reduxToolkit/store";

interface ImageState {
  listImage: IListImage[];
  value: number;
  likedImage: IListImage;
}

const initialState: ImageState = {
  listImage: [],
  value: 0,
  likedImage: {},
};

export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setDataImage: (state, action: PayloadAction<INasaData>) => {
      const temp: IListImage[] = [];
      action.payload.collection.items.map((item: IItemElements) => {
        return temp.push({
          title: item.data[0].title ?? "",
          content: item.data[0].description,
          alt: item.data[0].description ?? "",
          linkData: item?.links ? item?.links[0].href : "",
          dateCreated: item.data[0].date_created ?? null,
          like: false,
          remove: false,
        });
      });
      state.listImage = temp;
    },
    getDataImage: (state, action: PayloadAction<INasaData>) => {
      const temp: IListImage[] = [];
      action.payload.collection.items.map((item: IItemElements) => {
        return temp.push({
          title: item.data[0].title ?? "",
          content: item.data[0].description,
          alt: item.data[0].description ?? "",
          linkData: item?.links ? item?.links[0].href : "",
          dateCreated: item.data[0].date_created ?? null,
          like: false,
          remove: false,
        });
      });
      state.listImage = temp;
    },
  },
});

export const { setDataImage } = imageSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.images.value;

export default imageSlice.reducer;
