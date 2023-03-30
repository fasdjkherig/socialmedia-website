import React, { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "../../Components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "../../Components/UserImage";
import WidgetWrapper from "../../Components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "../../state";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  // send a post request to send userPost to database
  const handlePost = async () => {
    const formData = new FormData();

    // post id
    formData.append("userId", _id);

    // post description
    formData.append("description", post);

    if (image) {
      // if image in the post
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    // to translate request into json format(parsable format)
    const posts = await response.json();

    // send post to  array of posts in redux
    dispatch(setPosts({ posts }));

    setImage(null);

    setPost("");
  };
  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        {/* user image */}
        <UserImage image={picturePath} />
        {/* post description */}
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>

      {/* image dropzone */}
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />

                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>

                {/* this logic for delete image if exist */}
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    {/* delete icon */}
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        {/* div for activate or deactivate image dropzone */}
        <FlexBetween
          gap="0.25rem"
          color={mediumMain}
          sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          onClick={() => setIsImage(!isImage)}
        >
          {/* image icon */}
          <ImageOutlined />

          <Typography>Image</Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              {/* clip icon */}
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              {/* attachment icon */}
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              {/* audio icon */}
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            {/* three dots icon (...) */}
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        {/* sending post button */}
        <Button
          type="submit"
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            ml: "1rem",
          }}
        >
          Post
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
