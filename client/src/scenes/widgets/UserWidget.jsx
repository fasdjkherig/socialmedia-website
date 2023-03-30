import React, { useState, useEffect } from "react";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../../Components/UserImage";
import FlexBetween from "../../Components/FlexBetween";
import WidgetWrapper from "../../Components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import twitterImage from "../../assets/twitter.png";
import linkedinImage from "../../assets/linkedin.png";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  // get User informations by get request
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  // user object destructuring
  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      {/* first row */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          {/* user image */}
          <UserImage image={picturePath} />

          <Box>
            {/* first and last name of the user */}
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.main,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>

            {/* user friends */}
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>

        {/* icon */}
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* second row */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          {/* location icon */}
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />

          {/* user location */}
          <Typography color={medium}>{location}</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap="1rem">
          {/* work icon */}
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />

          {/* user occuation */}
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* third row */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          {/* number of people viewed your profile */}
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>

        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Impressions of your post</Typography>
          {/* number of impressions for your posts*/}
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* fourth row */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        {/* twitter */}
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            {/* twitter image icon */}
            <img src={twitterImage} alt="twitter" />

            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>

          {/* edit icon */}
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        {/* linkedin */}
        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            {/* linkedin image icon */}
            <img src={linkedinImage} alt="linkedin" />

            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>

          {/* edit icon */}
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
