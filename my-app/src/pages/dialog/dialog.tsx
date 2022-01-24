import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { useState } from "react";
import { changeContent } from "../../Component/slice/imageSlice";
import { useAppDispatch } from "../../reduxToolkit/hook";

export interface ConfirmDialogProps {
  open: boolean;
  setOpen(value: boolean): void;
  title: string;
  linkData: string;
  content?: string;
  nasa_id: string;
  alt?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
  const { open, setOpen, title, linkData, content, nasa_id, alt } = props;

  const dispatch = useAppDispatch();

  const [valueContent, setValueContent] = useState<string | undefined>(content);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueContent(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setValueContent(content);
  };

  const handleSaveInfo = (id: string, content?: string) => {
    dispatch(changeContent({ id: id, content: content }));
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle style={{ cursor: "move" }} id="dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <img
          src={linkData}
          alt={alt}
          width={"100%"}
          style={{ borderRadius: "5px" }}
        />
        <TextField
          variant="filled"
          color="primary"
          defaultValue={content}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChangeValue(e)
          }
          value={valueContent}
          multiline
          fullWidth
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={() => handleSaveInfo(nasa_id, valueContent)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(ConfirmDialog);
