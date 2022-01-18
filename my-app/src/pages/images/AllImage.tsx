import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../header/header";
import ImageCard from "../../Component/ImageCard";
import { ImageCardInterface } from "../../Component/ImageCard/interface";
import { IListImage } from "../../Interface/listImageData";
import { useAppDispatch, useAppSelector } from "../../reduxToolkit/hook";

const AllImage: React.FC = () => {
  const dispatch = useAppDispatch();
  const clickImage = (item: IListImage) => {
    // dispatch(likeImage(item));
  };
  const [listData, setListData] = useState<IListImage[]>([]);

  const data: string | null = localStorage.getItem("NasaData");

  useEffect(() => {
    console.log(1);
    if (data) {
      setListData(JSON.parse(data));
    }
  }, [data]);
  return (
    <Header>
      <Grid container>
        {listData.length
          ? listData.map((item: IListImage, index: number) => (
              <Grid item xs={4} key={index}>
                <ImageCard
                  title={item.title}
                  content={item.content}
                  alt={item.alt}
                  linkData={item.linkData}
                  like={item.like}
                  remove={item.remove}
                  onClickActionFavorite={() => clickImage(item)}
                  // onClickActionDelete={() => clickImage()}
                />
              </Grid>
            ))
          : null}
      </Grid>
    </Header>
  );
};

export default AllImage;
