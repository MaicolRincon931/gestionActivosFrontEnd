import NewPasswordToken from "@/components/auth/NewPasswordToken";
import { useState } from "react"
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { ConfirmToken } from "@/types/index";

export default function NewPasswordView() {

    const [token, setToken] = useState<ConfirmToken['token']>("")

    const [isValidToken, setIsValidToken] = useState<boolean>(false);

  return (
    <>
      {!isValidToken ? (
        <NewPasswordToken
          token={token}
          setToken={setToken}
          setIsValidToken={setIsValidToken}
        />
      ) : (
        <NewPasswordForm token={token} />
      )}
    </>
  );

}