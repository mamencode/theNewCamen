import React, { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBoxOutlined";

import Dialog from "@mui/material/Dialog";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

export default function UploadScreen() {
  const [open, setOpen] = useState(false);

  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      getImage(readerEvent.target.result);
      setImage(readerEvent.target.result);
    };
  };

  const getImage = async (image) => {
    await window.localStorage.setItem("croppedImage", JSON.stringify(image));

    navigate("/image/post");
  };

  const handleClose = (close) => {
    setOpen(close);
    setImage(null);
    console.log(open, image);
  };

  return (
    <div>
      <div>
        <input
          id="attach-media"
          style={{ display: "none" }}
          accept="image/*"
          type="file"
          onChange={addImageToPost}
        />

        <label htmlFor="attach-media">
          <AddBoxIcon style={{ fontSize: 30, color: "#d1d3d2", cursor: "pointer" }} />
        </label>
      </div>

      <Dialog fullScreen open={open}>
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => handleClose(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => handleClose(false)}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
      </Dialog>
    </div>
  );
}
