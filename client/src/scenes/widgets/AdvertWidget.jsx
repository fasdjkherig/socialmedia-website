import React from "react";
import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../Components/FlexBetween";
import WidgetWrapper from "../../Components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      {/* advertise image */}
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />

      <FlexBetween>
        <Typography color={main}>Cosmetics</Typography>
        <Typography color={medium}>cosmetics.com</Typography>
      </FlexBetween>

      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is clean skin.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
