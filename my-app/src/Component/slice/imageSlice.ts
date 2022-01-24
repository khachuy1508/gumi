import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IListImage } from "../../Interface/listImageData";
import { IItemElements, INasaData } from "../../Interface/nasaData";

export enum SELECTEDTAB {
  ALL = "ALL",
  LIKED = "LIKED",
  REMOVED = "REMOVED",
}

export enum SORT {
  A_TO_Z = "A_TO_Z",
  Z_TO_A = "Z_TO_A",
  NEWEST = "NEWEST",
  OLDEST = "OLDEST",
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
    },

    changeContent: (
      state,
      action: PayloadAction<{ id: string; content?: string }>
    ) => {
      const index = state.listImage.findIndex(
        (img) => img.nasa_id === action.payload.id
      );
      state.listImage[index].content = action.payload.content;
      localStorage.setItem("nasaData", JSON.stringify(state.listImage));
    },

    changeStatus: (state, action: PayloadAction<string>) => {
      state.selectedTab = action.payload;
    },
    changeSortType: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case SORT.A_TO_Z:
          state.listImage.sort((a, b) => {
            return a.title < b.title ? -1 : 1;
          });
          break;
        case SORT.Z_TO_A:
          state.listImage.sort((a, b) => {
            return a.title > b.title ? -1 : 1;
          });
          break;

        case SORT.NEWEST:
          state.listImage.sort((a, b) => {
            return a.dateCreated < b.dateCreated ? -1 : 1;
          });
          break;

        case SORT.OLDEST:
          state.listImage.sort((a, b) => {
            return a.dateCreated > b.dateCreated ? -1 : 1;
          });
          break;
      }
    },
  },
});

export const {
  setDataImage,
  setDataImageAPI,
  actionLike,
  changeStatus,
  actionRemove,
  changeSortType,
  changeContent,
} = imageSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export default imageSlice.reducer;
