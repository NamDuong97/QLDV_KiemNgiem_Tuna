import { Box } from "@mui/material";

interface Props {}

const HeaderLoginForgot = (props: Props) => {
  const {} = props;
  return (
    <header className="bg-white px-6 flex py-2 fixed z-50 w-full border-b-[1px] border-solid border-gray-300">
      <Box className="flex items-center gap-2">
        <p className={`text-3xl text-blue-900 !font-bold`}>Tuna</p>
      </Box>
    </header>
  );
};

export default HeaderLoginForgot;
