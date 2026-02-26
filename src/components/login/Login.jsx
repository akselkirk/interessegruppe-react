import style from "./Login.module.css";

const Login = ({ onLogin }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    await onLogin(email, password);
  };

  return (
    <div className={style.loginContainer}>
      <div className={style.loginBox}>
        <h2>Logg inn</h2>
        <form onSubmit={handleSubmit}>
          <div className={style.inputGroup}>
            <input type="email" name="email" placeholder="E-post" required />
          </div>
          <div className={style.inputGroup}>
            <input
              type="password"
              name="password"
              placeholder="Passord"
              required
            />
          </div>
          <button type="submit" className={style.loginButton}>
            Logg inn
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
