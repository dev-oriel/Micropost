import { useState } from "react";
import { register, login } from "../services/authService";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (isLogin) {
      try {
        const response = await login({ email, password });
        setMessage(response.message);
        console.log("Logged in user:", response.user);
      } catch (err) {
        setError(err.response?.data?.message || "Login failed.");
      }
    } else {
      if (password !== confirmPassword) {
        return setError("Passwords do not match.");
      }

      try {
        const response = await register({
          name: email.split("@")[0],
          email,
          password,
        });
        setMessage(response.message);
      } catch (err) {
        setError(err.response?.data?.message || "Registration failed.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-theme mb-8">
          {isLogin ? "Login" : "Register"}
        </h2>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="border border-gray-300 p-2 w-full rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="border border-gray-300 p-2 w-full rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="border border-gray-300 p-2 w-full rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="bg-theme text-white p-2 rounded w-full hover:bg-theme-light focus:outline-none"
          >
            {isLogin ? "Login" : "Register"}
          </button>
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-theme hover:underline"
            >
              {isLogin
                ? "Don't have an account? Register here"
                : "Already have an account? Login here"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
