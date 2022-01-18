import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Input,
  Toolbar,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { getData } from "../../API/getData";
import { IListImage } from "../../Interface/listImageData";
import { IItemElements, INasaData } from "../../Interface/nasaData";
import { useAppDispatch } from "../../reduxToolkit/hook";
import useStyles from "./headerStyle";

interface HeaderProps {}
const Header: React.FC<HeaderProps> = (props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [inputData, setInputData] = useState<string>("");
  const [listData, setListData] = useState<INasaData | undefined>();

  const onChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    event?.persist && event.persist();
    setInputData(event.target?.value);
  };

  const getDataSearch = async () => {
    const resp = await getData(inputData);
    if (resp) {
      setListData(resp);
    }
  };

  useEffect(() => {
    if (listData && listData.collection && listData.collection.items.length) {
      const temp: IListImage[] = [];
      listData.collection.items.map((item: IItemElements) => {
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
      localStorage.setItem("NasaData", JSON.stringify(temp));
    }
  }, [listData, dispatch]);
  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <AppBar>
          <Toolbar>
            <Grid
              container
              justifyContent={"center"}
              spacing={1}
              alignItems={"center"}
              style={{ position: "fixed", zIndex: 100 }}
            >
              <Grid item xs={3}>
                <Input
                  endAdornment={
                    <IconButton onClick={getDataSearch}>
                      <SearchTwoToneIcon />
                    </IconButton>
                  }
                  fullWidth
                  className={classes.input}
                  value={inputData}
                  onChange={onChange}
                ></Input>
              </Grid>
              <Grid item xs={9}>
                <Grid container>
                  <Grid item xs={2}>
                    All Data
                  </Grid>
                  <Grid item xs={2}>
                    Liked
                  </Grid>
                  <Grid item xs={2}>
                    Removed
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </React.Fragment>
      <Container>
        <Box sx={{ my: 2 }}>{props.children}</Box>
      </Container>
    </>
  );
};
export default Header;
