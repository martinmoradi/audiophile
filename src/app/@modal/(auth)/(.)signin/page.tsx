"use client";

import { AuthForm } from "~/app/(auth)/_components/auth-form";
import { Modal } from "~/app/(auth)/_components/modal";

const InterceptedSignInRoute = () => {
  return (
    <Modal>
      <AuthForm variant="signin" isModal />
    </Modal>
  );
};

export default InterceptedSignInRoute;
