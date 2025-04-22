"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { image } from "../../../constants/image";

interface VerifyYourEmailProps {
  tabPage: boolean;
  dataEmail: string;
  handleRedirectLogin: () => void;
}

const VerifyYourEmail = (props: VerifyYourEmailProps) => {
  const { tabPage, dataEmail, handleRedirectLogin } = props;
  return (
    <Container className="pt-32">
      <Box className="py-5 flex justify-center">
        <Card sx={{ width: 518, borderRadius: "10px" }}>
          <CardContent className="!p-8">
            <Box className="flex gap-10 mb-10">
              <Box
                className={`${
                  tabPage ? "bg-cyan-700" : "bg-gray-400"
                } h-1 w-full rounded-r-full`}
              ></Box>
              <Box
                className={`${
                  !tabPage ? "bg-cyan-700" : "bg-gray-400"
                } h-1 w-full rounded-l-full`}
              ></Box>
            </Box>
            <Box className="gap-7 grid">
              <Box className="flex justify-center">
                <img
                  src={image.imageClick}
                  alt="imageClick"
                  width={168}
                  height={126}
                  className=""
                />
              </Box>
              <Box className="text-center gap-2 grid">
                <h1 className="text-3xl font-bold">Verify your email</h1>
                <Typography className="text-base/6 font-medium text-gray-400">
                  We've sent a link to your email address:
                </Typography>
                <p className="text-base/6 font-bold text-black">{dataEmail}</p>
                <Typography className="text-base/6 font-medium text-gray-400">
                  Please click Back Login to continue Login
                </Typography>
              </Box>
              <Box className="flex justify-center">
                <Button variant="contained" onClick={handleRedirectLogin}>
                  Back Login
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default VerifyYourEmail;
