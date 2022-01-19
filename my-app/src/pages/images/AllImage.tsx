import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import ImageCard from "../../Component/ImageCard";
import {
  actionLike,
  actionRemove,
  SELECTEDTAB,
  setDataImage,
} from "../../Component/slice/imageSlice";
import { IListImage } from "../../Interface/listImageData";
import { useAppDispatch, useAppSelector } from "../../reduxToolkit/hook";
import Header from "../header/header";

const AllImage: React.FC = () => {
  const dispatch = useAppDispatch();
  const clickImage = (id: string, status: boolean) => {
    dispatch(actionLike({ id, status }));
  };
  const clickRemove = (id: string, status: boolean) => {
    dispatch(actionRemove({ id, status }));
  };
  const listImages = useAppSelector((state) => state.images.listImage);
  const selectedTab = useAppSelector((state) => state.images.selectedTab);

  const data: string | null = localStorage.getItem("nasaData");
  useEffect(() => {
    if (data) {
      dispatch(setDataImage(JSON.parse(data)));
    }
  }, [dispatch, data]);

  const renderImages = () => {
    switch (selectedTab) {
      case SELECTEDTAB.ALL:
        return listImages.filter((image) => image.remove === false);
      case SELECTEDTAB.LIKED:
        return listImages.filter((image) => image.like === true);
      case SELECTEDTAB.REMOVED:
        return listImages.filter((image) => image.remove === true);
      default:
        return listImages.filter((image) => image.remove === false);
    }
  };

  return (
    <Header>
      <Grid container>
        {renderImages().length
          ? renderImages().map((item: IListImage, index: number) => (
              <Grid item xs={4} key={index}>
                <ImageCard
                  title={item.title}
                  content={item.content}
                  alt={item.alt}
                  linkData={item.linkData}
                  like={item.like}
                  remove={item.remove}
                  onClickActionFavorite={() =>
                    clickImage(item.nasa_id, item.like)
                  }
                  onClickActionDelete={() =>
                    clickRemove(item.nasa_id, item.remove)
                  }
                  nasa_id={item.nasa_id}
                />
              </Grid>
            ))
          : null}
      </Grid>
    </Header>
  );
};

export default AllImage;
