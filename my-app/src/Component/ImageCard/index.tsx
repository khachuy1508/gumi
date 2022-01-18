import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { ImageCardInterface } from "./interface";

const ImageCard: React.FC<ImageCardInterface> = (props) => {
  const {
    like,
    onClickActionDelete,
    onClickActionFavorite,
    remove,
    title,
    content,
    alt,
    linkData,
  } = props;

  const handleClickRemove = () => {
    if (onClickActionDelete) {
      onClickActionDelete();
    }
  };
  const handleClickFavorite = () => {
    if (onClickActionFavorite) {
      onClickActionFavorite();
    }
  };
  return (
    <Card
      sx={{
        maxWidth: 345,
        display: "inline-block",
        textAlign: "left",
      }}
    >
      <CardMedia component="img" height={300} image={linkData} alt={alt} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container justifyContent={"flex-end"}>
          <Grid item>
            <Tooltip title="Delete">
              <IconButton color="inherit" onClick={handleClickRemove}>
                {remove ? <DeleteIcon /> : <DeleteOutlineIcon />}
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Like">
              <IconButton color="error" onClick={handleClickFavorite}>
                {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default React.memo(ImageCard);
