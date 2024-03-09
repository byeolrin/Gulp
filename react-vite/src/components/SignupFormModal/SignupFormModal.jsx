import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { closeModal } = useModal();

  const validate_email = (email) => {
    const regexEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regexEmailPattern.test(email)
  }

  useEffect(() => {
    const validationErrors = {}
    if (!firstName.length || firstName.length < 1) validationErrors.firstName = 'First Name is required'
    if (!lastName.length || lastName.length < 1) validationErrors.lastName = 'Last Name is required'
    if (!username.length || username.length < 4 || username.length > 16) validationErrors.username = 'Username is required to be at between 4 to 16 characters'
    if (!validate_email(email)) validationErrors.email = 'Email is invalid'
    if (password.length < 8 || password.length > 24) validationErrors.password = 'Password must be at least 8 characters'
    if (confirmPassword.length < 8 || confirmPassword.length > 24) validationErrors.confirmPassword = 'Confirm Password must be at least 8 characters'
    setErrors(validationErrors)
  }, [firstName, lastName, email, username, password, confirmPassword])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    if (Object.keys(errors).length) return

    const serverResponse = await dispatch(
      thunkSignup({
        first_name: firstName,
        last_name: lastName,
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="signup-modal-container">
      <h1>Sign up for Gulp</h1>
      {submitted && errors.server && <div className="form-error">{errors.server}</div>}
      <form
        className="signup-form"
        onSubmit={handleSubmit}>
        <div className="signup-form-labels-container">
          <input
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="signup-form-labels"
            required
          />
          {submitted && errors.firstName && <div className="form-error">{errors.firstName}</div>}
          <input
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="signup-form-labels"
            required
          />
          {submitted && errors.lastName && <div className="signup-form-errors">{errors.lastName}</div>}
          <input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-form-labels"
            required
          />
          {submitted && errors.email && <div className="form-error">{errors.email}</div>}
          <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="signup-form-labels"
            required
          />
          {submitted && errors.username && <div className="form-error">{errors.username}</div>}
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-form-labels"
            required
          />
          {submitted && errors.password && <div className="form-error">{errors.password}</div>}
          <input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="signup-form-labels"
            required
          />
          {submitted && errors.confirmPassword && <div className="form-error">{errors.confirmPassword}</div>}
          <button type="submit" className="signup-button">Sign Up</button>
        </div>
      </form>
    </div>
  );
}
export default SignupFormModal;
