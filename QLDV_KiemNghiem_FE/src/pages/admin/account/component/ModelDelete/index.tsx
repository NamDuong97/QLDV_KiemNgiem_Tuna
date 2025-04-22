import { Box, Dialog } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { IoReload } from "react-icons/io5";
import { motion } from "framer-motion";

interface ModelCreateProps {
  openDelete: boolean;
  handleCloseDelete: () => void;
}

const ModelDelete = (props: ModelCreateProps) => {
  const { openDelete, handleCloseDelete } = props;

  const [textRandom, setTextRandom] = useState("");
  const [isError, setIsError] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleCloseModelDelete = () => {
    handleCloseDelete();
    setIsAccept(false);
    setIsError(false);
  };

  const handleRandomTextCheck = () => {
    var text = "";
    var char_list =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 8; i++) {
      text += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }
    return setTextRandom(text);
  };

  const handleAccept = () => {
    const textInput = inputRef.current?.value;
    if (textInput === textRandom) return handleCloseDelete();
    else return setIsError(true);
  };

  const handleChangeZero = () => {
    const textInput = inputRef.current?.value;
    if (!textInput || textInput === textRandom) return setIsError(false);
  };

  useEffect(() => {
    handleRandomTextCheck();
  }, [openDelete]);

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Dialog
        open={openDelete}
        maxWidth="lg"
        onClose={handleCloseModelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box className="p-9 grid gap-9 w-lg">
          <Box className="flex justify-center items-center">
            <Box>
              <p className="font-bold text-2xl/6">
                Bạn Có Chắc Chắn Xóa Không ?
              </p>
            </Box>
          </Box>
          {isAccept && (
            <Box className="grid gap-3">
              <Box className="gap-6 flex justify-center items-center">
                <Box className="gap-3 flex items-center justify-center">
                  <p
                    className={`py-4 px-4 bg-amber-200 rounded-lg text-base/6 font-medium !font-[Qwitcher Grypen,cursive] `}
                    style={{
                      fontFamily: "Inspiration, cursive",
                    }}
                  >
                    {textRandom}
                  </p>
                  <button
                    className="!p-1 cursor-pointer hover:bg-gray-200 rounded-full"
                    onClick={handleRandomTextCheck}
                  >
                    <IoReload className="text-gray-800 w-6 h-6" />
                  </button>
                </Box>

                <input
                  type="text"
                  name="checkInput"
                  id="checkInput"
                  ref={inputRef}
                  className="text-xl/6 w-52 h-10 px-2 py-1 border-[2px] border-solid border-gray-800 rounded-lg focus:focus:outline-none focus-within:border-blue-800"
                  onChange={handleChangeZero}
                />
              </Box>
              {isError && (
                <Box className="text-center">
                  <p className="text-red-500 text-base/6 font-medium">
                    Sai Ký Tự Yêu Cầu Nhập Lại!
                  </p>
                </Box>
              )}
            </Box>
          )}

          <Box className="flex gap-4 justify-center items-center">
            <button
              className="!px-6 py-2 rounded-md cursor-pointer !text-white !font-semibold !normal-case !bg-blue-500 hover:!bg-blue-600 !shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)]"
              onClick={handleCloseModelDelete}
            >
              {isAccept ? "Hủy" : "Không"}
            </button>
            {isAccept ? (
              <button
                className="!px-6 py-2 rounded-md cursor-pointer !text-white !font-semibold !normal-case !bg-green-500 hover:!bg-green-600 !shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)]"
                onClick={handleAccept}
              >
                Xác Nhận
              </button>
            ) : (
              <button
                className="!px-6 py-2 rounded-md cursor-pointer !text-white !font-semibold !normal-case !bg-green-500 hover:!bg-green-600 !shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)]"
                onClick={() => setIsAccept(true)}
              >
                Có
              </button>
            )}
          </Box>
        </Box>
      </Dialog>
    </motion.div>
  );
};

export default ModelDelete;
