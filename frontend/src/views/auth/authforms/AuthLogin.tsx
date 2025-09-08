import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { login } from "../../../api";

const AuthLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await login(email, password); // appel API
      localStorage.setItem("token", data.token); // stocke le JWT
      navigate("/ui/accueil"); // redirection après connexion
    } catch (err) {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            id="email"
            type="email"
            sizing="md"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control form-rounded-xl"
          />
        </div>

        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput
            id="password"
            type="password"
            sizing="md"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control form-rounded-xl"
          />
        </div>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <div className="flex justify-between my-5">
          <div className="flex items-center gap-2">
            <Checkbox id="accept" className="checkbox" />
            <Label
              htmlFor="accept"
              className="opacity-90 font-normal cursor-pointer"
            >
              Remember this Device
            </Label>
          </div>
          <Link to={"/"} className="text-primary text-sm font-medium">
            Forgot Password ?
          </Link>
        </div>

        <Button
          type="submit"
          color={"primary"}
          className="w-full bg-primary text-white rounded-xl"
        >
          Sign in
        </Button>
      </form>
    </>
  );
};

export default AuthLogin;
