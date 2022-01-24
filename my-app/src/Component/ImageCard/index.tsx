import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
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
import React, { useState } from "react";
import ConfirmDialog from "../../pages/dialog/dialog";
import useStyles from "./imageCardStyle";
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
    nasa_id,
  } = props;

  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

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

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        display: "inline-block",
        textAlign: "left",
        minHeight: "550px",
      }}
    >
      <CardMedia component="img" height={300} image={linkData} alt={alt} />
      <CardContent className={classes.customStyleCardContent}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className={classes.customContent}
        >
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
          <Grid item>
            <Tooltip title="Edit">
              <IconButton color="success" onClick={handleOpenDialog}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <ConfirmDialog
              open={openDialog}
              setOpen={setOpenDialog}
              title={title}
              alt={alt}
              linkData={linkData}
              content={content}
              nasa_id={nasa_id}
            ></ConfirmDialog>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default React.memo(ImageCard);
