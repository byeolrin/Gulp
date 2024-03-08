import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import SignupFormModal from "../SignupFormModal";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const demoUserLogin = async (e) => {
    e.preventDefault()

    await dispatch(thunkLogin({ email: 'demo@aa.io', password: 'password' })).then(closeModal)

  }

  return (
    <div className="login-modal-container">
      <h1>Sign in to Gulp</h1>
      <form
        className="login-form"
        onSubmit={handleSubmit}>
        <div className="login-form-labels-container">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-form-labels"
            required
          />
          {errors.email && <p className="form-error">{errors.email}</p>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-form-labels"
            required
          />
          {errors.password && <p className="form-error">{errors.password}</p>}
          <button className='login-button' type="submit">Log In</button>
        </div>
      </form>
      <hr className="horizontal-line"></hr>
      <button className='demo-login' onClick={demoUserLogin}>Continue as Demo User</button>
      <div className="register-link">
        <div className="register-link-text">Don&apos;t have an account?</div>
        <OpenModalMenuItem
                  itemText="Sign up for Gulp."
                  modalComponent={<SignupFormModal />}
                />
      </div>
    </div>
  );
}

export default LoginFormModal;
