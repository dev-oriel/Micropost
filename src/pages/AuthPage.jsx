import { useState } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Login submitted", { email, password });
    } else {
      console.log("Register submitted", { email, password, confirmPassword });
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Simulate sending reset password email
    console.log("Password reset requested for:", resetEmail);
    alert(`Password reset link sent to ${resetEmail}`);
    setIsForgotPassword(false); // Close the reset form after submission
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        {/* Main Form (Login/Register) */}
        {!isForgotPassword ? (
          <>
            <h2 className="text-3xl font-bold text-center text-theme mb-8">
              {isLogin ? "Login" : "Register"}
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Email Input */}
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

              {/* Password Input */}
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

              {/* Confirm Password Input (only for Register form) */}
              {!isLogin && (
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="border border-gray-300 p-2 w-full rounded"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-theme text-white p-2 rounded w-full hover:bg-theme-light focus:outline-none"
              >
                {isLogin ? "Login" : "Register"}
              </button>

              {/* Toggle between Login and Register */}
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={toggleForm}
                  className="text-theme hover:underline"
                >
                  {isLogin
                    ? "Don't have an account? Register here"
                    : "Already have an account? Login here"}
                </button>
              </div>
            </form>

            {/* Forgot Password Link */}
            <div className="text-center mt-4">
              <button
                onClick={() => setIsForgotPassword(true)}
                className="text-theme hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          </>
        ) : (
          // Forgot Password Form
          <>
            <h2 className="text-3xl font-bold text-center text-theme mb-8">
              Reset Password
            </h2>

            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                <label className="block text-gray-700">Enter your email</label>
                <input
                  type="email"
                  className="border border-gray-300 p-2 w-full rounded"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-theme text-white p-2 rounded w-full hover:bg-theme-light focus:outline-none"
              >
                Send Reset Link
              </button>

              <div className="text-center mt-4">
                <button
                  onClick={() => setIsForgotPassword(false)}
                  className="text-theme hover:underline"
                >
                  Back to Login
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
