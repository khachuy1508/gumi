import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import {
  actionLike,
  actionRemove,
  changeSortType,
  SELECTEDTAB,
  setDataImage,
  SORT,
} from "../Component/slice/imageSlice";
import { IListImage } from "../Interface/listImageData";
import { useAppDispatch, useAppSelector } from "../reduxToolkit/hook";
import Header from "./header/header";
import Items from "./images/Items";

const NasaImage = () => {
  const dispatch = useAppDispatch();
  const [size, setSize] = useState<string>("5");
  const [sort, setSort] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [listItem, setListItem] = useState<IListImage[]>([]);
  const [listItemPaging, setListItemPaging] = useState<IListImage[]>([]);
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

  const filterImages = () => {
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

  useEffect(() => {
    setListItem(filterImages());
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listImages, selectedTab]);

  const pagingDataImage = (page: number, sizePage: number) => {
    return listItem.slice((page - 1) * sizePage, page * sizePage);
  };

  useEffect(() => {
    setListItemPaging(pagingDataImage(page, parseInt(size, 10)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size, listItem]);

  const handleChangePageSize = (event: SelectChangeEvent) => {
    setSize(event.target.value);
  };
  const handleChangeSortType = (event: SelectChangeEvent) => {
    dispatch(changeSortType(event.target.value));
    setSort(event.target.value);
  };

  const countPageSize = (totalData: number, sizePage: number) => {
    if (totalData > 0) {
      return Math.ceil(totalData / sizePage);
    }
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Header>
      <Items
        items={listItemPaging}
        clickImage={clickImage}
        clickRemove={clickRemove}
      />
      {listItemPaging.length ? (
        <Grid
          container
          justifyContent={"flex-end"}
          alignItems={"center"}
          spacing={3}
        >
          <Grid item>
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
              size="small"
            >
              <InputLabel id="demo-simple-select-filled-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={sort}
                onChange={handleChangeSortType}
              >
                <MenuItem value={SORT.A_TO_Z}>A-Z</MenuItem>
                <MenuItem value={SORT.Z_TO_A}>Z-A</MenuItem>
                <MenuItem value={SORT.NEWEST}>Newest</MenuItem>
                <MenuItem value={SORT.OLDEST}>Oldest</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
              size="small"
            >
              <InputLabel id="demo-simple-select-filled-label">
                Images per page
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={size}
                onChange={handleChangePageSize}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Pagination
              count={countPageSize(listItem.length, parseInt(size, 10))}
              variant="outlined"
              color="primary"
              page={page}
              onChange={handleChangePage}
            />
          </Grid>
        </Grid>
      ) : (
        <Typography>There are no data</Typography>
      )}
    </Header>
  );
};
export default NasaImage;
