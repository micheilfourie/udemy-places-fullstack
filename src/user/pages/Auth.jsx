import { useState,useContext } from "react";
import Input from "../../shared/components/formElements/Input";
import Button from "../../shared/components/formElements/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/context/authContext";

const Auth = () => {

  const {login} = useContext(AuthContext);

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
  const [isRegister, setIsRegister] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    email.isValid && password.isValid
      ? (console.log(email.value, password.value), navigate("/"), login())
      : alert("Please fill in all the fields before submitting.");
  };

  const handleToggleAuthState = () => {
    handleClearInputs();
    setIsRegister(!isRegister);
  };

  const handleClearInputs = () => {
    setEmail({ value: "", isValid: false, isTouched: false });
    setPassword({ value: "", isValid: false, isTouched: false });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 pt-[75px]">
      <div className="m-4 h-full w-full max-w-[500px] rounded-lg bg-white p-8 shadow-sm">
        <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
          <h1 className="mb-4 text-center text-2xl font-semibold">
            {isRegister ? "Sign Up" : "Login"}
          </h1>

          {isRegister && (
            <Input
              type="text"
              id="name"
              label="Name"
              state={name}
              setState={setName}
              placeholder="Enter Name"
            />
          )}

          <Input
            type="email"
            id="email"
            label="Email"
            state={email}
            setState={setEmail}
            placeholder="Enter Email"
          />

          <Input
            type="password"
            id="password"
            label="Password"
            state={password}
            setState={setPassword}
            placeholder="Enter Password"
          />

          {!isRegister && (
            <p className="cursor-pointer text-blue-500 hover:underline">
              Forgot Password?
            </p>
          )}

          <br />

          <Button type="submit">{isRegister ? "Sign Up" : "Login"}</Button>

          <p
            onClick={handleToggleAuthState}
            className="cursor-pointer text-center text-blue-500 hover:underline"
          >
            {isRegister ? "Already have an account?" : "Don't have an account?"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;
