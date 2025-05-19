import { useState } from "react";
import RepasswordForm from "./RepasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";

interface Props {
  btnLogin: () => void;
}

const Repassword = (props: Props) => {
  const { btnLogin } = props;
  const [isAccount, setIsAccount] = useState(false);

  return (
    <>
      {isAccount ? (
        <ResetPasswordForm btnLogin={btnLogin} />
      ) : (
        <RepasswordForm
          btnLogin={btnLogin}
          isAccount={() => setIsAccount(true)}
        />
      )}
    </>
  );
};

export default Repassword;
