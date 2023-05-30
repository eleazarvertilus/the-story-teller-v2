import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../Css/ForgotPassword.css"
import { BsArrowBarLeft } from 'react-icons/bs'
const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "/auth/forgotpassword",
        { email }
      );

      setSuccess(data.message);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="Inclusive-forgotPassword-page">

      <div className="forgotPassword-big-wrapper">
        <Link to="/" className="back_home">
          <BsArrowBarLeft />
        </Link>
        <form
          onSubmit={forgotPasswordHandler}
        >
          <div className="top-forgotpassword-explain">
            <h3 >Mot de passe oublié</h3>
            <p >
            Veuillez entrer l'adresse e-mail avec laquelle vous avez enregistré votre compte. Nous vous enverrons une confirmation de réinitialisation de mot de passe à cette adresse e-mail.
            </p>
          </div>

          {error && <div className="error_message">{error}</div>}
          {success && <div className="success_message  ">{success}  -
            <Link to="/" className="ml-3">Go home</Link></div>}

          <div className="input-wrapper">

            <input
              type="email"
              required
              id="email"
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">E-mail</label>

          </div>

          <button type="submit">
            Envoyer un e-mail
          </button>

        </form>

      </div>

    </div>

  );
};

export default ForgotPasswordScreen;