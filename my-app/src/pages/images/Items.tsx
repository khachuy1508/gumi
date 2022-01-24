import { Grid } from "@mui/material";
import React from "react";
import ImageCard from "../../Component/ImageCard";
import { IListImage } from "../../Interface/listImageData";
import Header from "../header/header";

interface ItemsProps {
  items: IListImage[];
  clickImage: (id: string, status: boolean) => void;
  clickRemove: (id: string, status: boolean) => void;
}
const Items: React.FC<ItemsProps> = (props) => {
  return (
    <Header>
      <Grid container>
        {props.items.length
          ? props.items.map((item: IListImage, index: number) => (
              <Grid item xs={4} key={index}>
                <ImageCard
                  title={item.title}
                  content={item.content}
                  alt={item.alt}
                  linkData={item.linkData}
                  like={item.like}
                  remove={item.remove}
                  onClickActionFavorite={() =>
                    props.clickImage(item.nasa_id, item.like)
                  }
                  onClickActionDelete={() =>
                    props.clickRemove(item.nasa_id, item.remove)
                  }
                  nasa_id={item.nasa_id}
                  dateCreated={item.dateCreated}
                />
              </Grid>
            ))
          : null}
      </Grid>
    </Header>
  );
};

export default Items;
