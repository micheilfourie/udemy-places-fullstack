import { useState, useContext } from "react";
import Input from "../../shared/components/formElements/Input";
import Button from "../../shared/components/formElements/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/context/authContext";
import LoadingSpinner from "../../shared/components/ui/LoadingSpinner";
import ErrorModal from "../../shared/components/ui/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Auth = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [isRegister, setIsRegister] = useState(true);

  const [email, setEmail] = useState({
    value: "",
    isValid: false,
    isTouched: false,
  });
  const [password, setPassword] = useState({
    value: "",
    isValid: false,
    isTouched: false,
  });
  const [name, setName] = useState({
    value: "",
    isValid: false,
    isTouched: false,
  });

  const handleCloseModal = () => {
    clearError();
  };

  const handleToggleAuthState = () => {
    handleClearInputs();
    setIsRegister(!isRegister);
  };

  const handleClearInputs = () => {
    setEmail({ value: "", isValid: false, isTouched: false });
    setPassword({ value: "", isValid: false, isTouched: false });
    setName({ value: "", isValid: false, isTouched: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error || isLoading) {
      return;
    }

    if (!email.isValid || !password.isValid || (isRegister && !name.isValid)) {
      return;
    }

    const url = !isRegister
      ? "http://localhost:5000/api/users/login"
      : "http://localhost:5000/api/users/signup";

    try {
      const res = await sendRequest(
        url,
        "POST",
        JSON.stringify({
          email: email.value,
          password: password.value,
          name: name.value,
        }),
        {
          "Content-Type": "application/json",
        },
      );

      if (!res) {
        throw new Error();
      }

      login(res.userId);
      navigate("/");

      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return;
    }
  };

  return (
    <>
      {error && <ErrorModal error={error} handleCloseModal={handleCloseModal} />}

      <div className="flex min-h-screen items-center justify-center bg-gray-100 pt-[75px]">
        <div className="m-4 h-full w-full max-w-[500px] rounded-lg bg-white p-8 shadow-sm">
          <form
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col gap-4"
          >
            <h1 className="mb-4 text-center text-2xl font-semibold">
              {isRegister ? "Sign Up" : "Login"}
            </h1>

            {isRegister && (
              <Input
                isLoading={isLoading}
                type="text"
                id="name"
                label="Name"
                state={name}
                setState={setName}
                placeholder="Enter Name"
              />
            )}

            <Input
              isLoading={isLoading}
              type="email"
              id="email"
              label="Email"
              state={email}
              setState={setEmail}
              placeholder="Enter Email"
            />

            <Input
              isLoading={isLoading}
              type="password"
              id="password"
              label="Password"
              state={password}
              setState={setPassword}
              placeholder="Enter Password"
            />

            {!isRegister && (
              <p
                className={`cursor-pointer text-blue-500 hover:underline ${isLoading && "pointer-events-none"}`}
              >
                Forgot Password?
              </p>
            )}

            <br />

            {isLoading ? (
              <Button disabled>
                <LoadingSpinner />
              </Button>
            ) : (
              <Button type="submit">{isRegister ? "Sign Up" : "Login"}</Button>
            )}

            <p
              onClick={handleToggleAuthState}
              className={`cursor-pointer text-center ${isLoading && "pointer-events-none"} text-blue-500 hover:underline`}
            >
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Auth;
