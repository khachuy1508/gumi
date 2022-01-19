import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IListImage } from "../../Interface/listImageData";
import { IItemElements, INasaData } from "../../Interface/nasaData";

export enum SELECTEDTAB {
  ALL = "ALL",
  LIKED = "LIKED",
  REMOVED = "REMOVED",
}
interface ImageState {
  listImage: IListImage[];
  selectedTab: string;
}

const initialState: ImageState = {
  listImage: [],
  selectedTab: SELECTEDTAB.ALL,
};

export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setDataImageAPI: (state, action: PayloadAction<INasaData>) => {
      const temp: IListImage[] = [];
      action.payload.collection.items.map((item: IItemElements) => {
        return temp.push({
          title: item.data[0].title ?? "",
          nasa_id: item?.data[0].nasa_id,
          content: item.data[0].description,
          alt: item.data[0].description ?? "",
          linkData: item?.links ? item?.links[0].href : "",
          dateCreated: item.data[0].date_created ?? null,
          like: false,
          remove: false,
        });
      });
      state.listImage = temp;
      localStorage.setItem("nasaData", JSON.stringify(temp));
    },
    setDataImage: (state, action: PayloadAction<IListImage[]>) => {
      state.listImage = action.payload;
    },
    actionLike: (
      state,
      action: PayloadAction<{ id: string; status: boolean }>
    ) => {
      const index = state.listImage.findIndex(
        (img) => img.nasa_id === action.payload.id
      );
      state.listImage[index].like = action.payload.status ? false : true;
      localStorage.setItem("nasaData", JSON.stringify(state.listImage));
      // state.listImage = action.payload;
    },
    actionRemove: (
      state,
      action: PayloadAction<{ id: string; status: boolean }>
    ) => {
      const index = state.listImage.findIndex(
        (img) => img.nasa_id === action.payload.id
      );
      state.listImage[index].remove = action.payload.status ? false : true;
      localStorage.setItem("nasaData", JSON.stringify(state.listImage));
      // state.listImage = action.payload;
    },
    changeStatus: (state, action: PayloadAction<string>) => {
      state.selectedTab = action.payload;
    },
  },
});

export const {
  setDataImage,
  setDataImageAPI,
  actionLike,
  changeStatus,
  actionRemove,
} = imageSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export default imageSlice.reducer;
