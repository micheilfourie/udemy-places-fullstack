import { useState, useContext } from "react";
import Input from "../../shared/components/formElements/Input";
import Button from "../../shared/components/formElements/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/context/authContext";
import LoadingSpinner from "../../shared/components/ui/LoadingSpinner";
import ErrorModal from "../../shared/components/ui/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(true);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const authForm = useForm(["email", "password", "name"]);

  const handleCloseModal = () => {
    clearError();
  };

  const handleToggleAuthState = () => {
    handleClearInputs();
    setIsRegister(!isRegister);
  };

  const handleClearInputs = () => {
    authForm.resetFields(["email", "password", "name"]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formState = authForm.formState;

    if (error || isLoading) {
      return;
    }

    if (
      !formState.email.isValid ||
      !formState.password.isValid ||
      (isRegister && !formState.name.isValid)
    ) {
      return;
    }

    const url = !isRegister
      ? `${import.meta.env.VITE_API_URL}/api/users/login`
      : `${import.meta.env.VITE_API_URL}/api/users/signup`;

    try {
      const res = await sendRequest(
        url,
        "POST",
        JSON.stringify({
          email: formState.email.value,
          password: formState.password.value,
          name: formState.name.value,
        }),
        {
          "Content-Type": "application/json",
        },
      );

      if (!res) {
        throw new Error();
      }

      const { id, name, image, places, token } = res.user;

      login(id, name, image, places, token);
      navigate("/");

      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return;
    }
  };

  return (
    <>
      {error && (
        <ErrorModal error={error} handleCloseModal={handleCloseModal} />
      )}

      <div className="flex min-h-screen items-center justify-center bg-gray-200 pt-[75px]">
        <div className="m-4 h-full w-full max-w-[500px] rounded-lg bg-white p-8 shadow-sm">
          <form
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col gap-6"
          >
            <h1 className="mb-4 text-center text-2xl font-semibold ">
              {isRegister ? "Sign Up" : "Login"}
            </h1>

            {isRegister && (
              <Input
                isLoading={isLoading}
                type="text"
                id="name"
                label="Name"
                form={authForm}
                placeholder="Enter Name"
              />
            )}

            <Input
              isLoading={isLoading}
              type="email"
              id="email"
              label="Email"
              form={authForm}
              placeholder="Enter Email"
            />

            <Input
              isLoading={isLoading}
              type="password"
              id="password"
              label="Password"
              form={authForm}
              placeholder="Enter Password"
            />

            {/* {!isRegister && (
              <div>
                <span
                  className={`cursor-pointer text-center ${isLoading && "pointer-events-none"} text-blue-500 hover:underline`}
                >
                  Forgot Password?
                </span>
              </div>
            )} */}

            {isLoading ? (
              <Button disabled className={"mt-4"}>
                <LoadingSpinner />
              </Button>
            ) : (
              <Button type="submit" className={"mt-4"}>{isRegister ? "Sign Up" : "Login"}</Button>
            )}

            <div className="flex items-center justify-center">
              <span
                onClick={handleToggleAuthState}
                className={`cursor-pointer text-center ${isLoading && "pointer-events-none"} text-blue-500 hover:underline`}
              >
                {isRegister
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Auth;
