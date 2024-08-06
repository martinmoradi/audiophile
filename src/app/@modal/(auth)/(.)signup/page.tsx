import { AuthForm } from "~/app/(auth)/_components/auth-form";
import { Modal } from "~/app/(auth)/_components/modal";

const InterceptedSignUpRoute = () => {
  return (
    <Modal>
      <AuthForm variant="signup" isModal />
    </Modal>
  );
};

export default InterceptedSignUpRoute;
