import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { image } from "../../constants/image";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../constants/routers";
import { motion } from "motion/react";

const XacMinhEmail = () => {
  const navigate = useNavigate();
  return (
    <Container className="pt-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: [0.8, 1.2, 1],
        }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
        className="py-5 flex justify-center"
      >
        <Card
          sx={{
            width: 518,
            borderRadius: "10px",
            border: "2px solid oklch(45% 0.085 224.283)",
            boxShadow: "0px 6px 6px rgba(0,0,0,0.25)",
          }}
        >
          <CardContent className="!p-8">
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
                <Typography className="text-base/6 font-medium text-cyan-900">
                  Xác Thực thành công!
                </Typography>

                <Typography className="text-base/6 font-medium text-cyan-900">
                  Vui lòng nhấp vào Quay lại Đăng nhập để tiếp tục Đăng nhập!
                </Typography>
              </Box>
              <Box className="flex justify-center">
                <Button
                  variant="contained"
                  onClick={() => navigate(APP_ROUTES.TUNA_CUSTOMER.HOME.to)}
                >
                  Quay lại Đăng Nhập
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default XacMinhEmail;
