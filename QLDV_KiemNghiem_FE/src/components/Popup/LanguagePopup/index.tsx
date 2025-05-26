import { Box, MenuItem, Typography } from "@mui/material";

interface LanguagePopupProps {
  openLanguage: boolean;
  language: {
    image: any;
    name: string;
  }[];
  handleChangeLang: (value: string) => void;
}

const LanguagePopup = (props: LanguagePopupProps) => {
  const { openLanguage, language, handleChangeLang } = props;

  return (
    <Box
      className={`${openLanguage ? "block" : "hidden"}`}
      onMouseDown={(e: any) => e.preventDefault()}
    >
      <Box className="bg-white border-[1px] absolute right-20 border-gray-100 shadow-[0px_4px_4px_rgba(0, 0, 0, 0.25)] rounded-md p-2">
        {language.map((item, index) => (
          <MenuItem key={index} onClick={() => handleChangeLang(item.image)}>
            <Box className="gap-2 flex items-center group">
              <Box>
                <img src={item.image} alt={item.name} className="w-5 !h-5" />
              </Box>
              <Box>
                <Typography className="text-black group-hover:text-blue-500">
                  {item.name}
                </Typography>
              </Box>
            </Box>
          </MenuItem>
        ))}
      </Box>
    </Box>
  );
};

export default LanguagePopup;
