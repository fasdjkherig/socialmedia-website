import React, { useState } from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../Components/FlexBetween";
import WidgetWrapper from "../../Components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";
import Friend from "../../Components/Friend";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  // Object.keys ====> convert object(likes) to array
  const likeCount = Object.keys(likes).length;
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  // patch request for likes to add or remove like
  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });

    // to translate request into json format(parsable format)
    const updatedPost = await response.json();

    dispatch(setPost({ post: updatedPost }));
  };
  return (
    <WidgetWrapper>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />

      {/* description of the user (any user) */}
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>

      {/* picture of the post */}
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            {/* like button */}
            <IconButton onClick={patchLike}>
              {isLiked ? (
                // active like
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                // non like
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            {/* like count */}
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              {/* comments icon */}
              <ChatBubbleOutlineOutlined />
            </IconButton>
            {/* comments number */}
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          {/* share icon */}
          <ShareOutlined />
        </IconButton>
      </FlexBetween>

      {/* to show comments */}
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />

              {/* comment itself */}
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
