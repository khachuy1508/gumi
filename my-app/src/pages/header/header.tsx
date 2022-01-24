import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import {
  AppBar,
  Backdrop,
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Input,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { getData } from "../../API/getData";
import {
  changeStatus,
  SELECTEDTAB,
  setDataImageAPI,
} from "../../Component/slice/imageSlice";
import { INasaData } from "../../Interface/nasaData";
import { useAppDispatch } from "../../reduxToolkit/hook";
import useStyles from "./headerStyle";

interface HeaderProps {}
const Header: React.FC<HeaderProps> = (props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [inputData, setInputData] = useState<string>("");
  const [listData, setListData] = useState<INasaData | undefined>();
  const [selectedTab, setSelectedTab] = React.useState("web");

  const handleChangeTab = (
    event: React.MouseEvent<HTMLElement>,
    tabSelected: string
  ) => {
    setSelectedTab(tabSelected);
    dispatch(changeStatus(tabSelected));
  };

  const onChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    event?.persist && event.persist();
    setInputData(event.target?.value);
  };

  const [open, setOpen] = React.useState(false);

  const getDataSearch = async () => {
    setOpen(!open);
    const resp = await getData(inputData);
    if (resp) {
      setListData(resp);
      setOpen(false);
    }
  };

  useEffect(() => {
    if (listData && listData.collection && listData.collection.items.length) {
      dispatch(setDataImageAPI(listData));
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
              <Grid item xs={6}>
                <Grid container padding={1} justifyContent={"center"}>
                  <ToggleButtonGroup
                    value={selectedTab}
                    exclusive
                    onChange={handleChangeTab}
                  >
                    <ToggleButton
                      className={classes.ToggleButton}
                      value={SELECTEDTAB.ALL}
                    >
                      <Typography color={"white"}>All images</Typography>
                    </ToggleButton>
                    <ToggleButton
                      value={SELECTEDTAB.LIKED}
                      className={classes.ToggleButton}
                    >
                      <Typography color={"white"}>Liked images</Typography>
                    </ToggleButton>
                    <ToggleButton
                      value={SELECTEDTAB.REMOVED}
                      className={classes.ToggleButton}
                    >
                      <Typography color={"white"}>Removed images</Typography>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </React.Fragment>
      <Container>
        <Box sx={{ my: 2 }}>{props.children}</Box>
      </Container>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
export default Header;
