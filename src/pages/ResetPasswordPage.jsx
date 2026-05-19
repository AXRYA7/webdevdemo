import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import PasswordField from "../components/PasswordField";
import { useAuth } from "../context/AuthContext";
import { useLocale } from "../context/LocaleContext";

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const { t } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();
  const resetEmail = location.state?.email ?? "";
  const [formState, setFormState] = useState({
    password: "",
    confirmPassword: "",
  });
  const [feedback, setFeedback] = useState(location.state?.feedback ?? "");

  if (!resetEmail) {
    return <Navigate to="/auth/forgot-password" replace />;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormState((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
    setFeedback("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const result = resetPassword({
      email: resetEmail,
      password: formState.password,
      confirmPassword: formState.confirmPassword,
    });

    if (!result.ok) {
      setFeedback(result.message);
      return;
    }

    navigate("/auth/login", {
      state: {
        email: result.email,
        feedback: result.message,
        mode: result.role === "admin" ? "admin" : "user",
      },
    });
  }

  return (
    <AuthShell
      compact
      title={t("auth.reset.title")}
      subtitle={t("auth.reset.subtitle")}
      footer={
        <Link className="inline-link" to="/auth/login">
          {t("auth.reset.footerCta")}
        </Link>
      }
    >
      {feedback ? <div className="form-alert">{feedback}</div> : null}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="space-y-3">
          <div>
            <label className="form-label" htmlFor="resetEmail">
              {t("auth.fields.email")}
            </label>
            <input
              id="resetEmail"
              className="form-control app-form-control"
              type="email"
              value={resetEmail}
              readOnly
            />
          </div>
          <div>
            <label className="form-label" htmlFor="resetPassword">
              {t("auth.fields.newPassword")}
            </label>
            <PasswordField
              id="resetPassword"
              name="password"
              className="form-control app-form-control"
              value={formState.password}
              onChange={handleChange}
              placeholder={t("auth.reset.passwordPlaceholder")}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="resetConfirmPassword">
              {t("auth.fields.confirmPassword")}
            </label>
            <PasswordField
              id="resetConfirmPassword"
              name="confirmPassword"
              className="form-control app-form-control"
              value={formState.confirmPassword}
              onChange={handleChange}
              placeholder={t("auth.reset.confirmPasswordPlaceholder")}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn app-btn-primary px-4">
            {t("auth.reset.submit")}
          </button>
        </div>
      </form>
    </AuthShell>
  );
}
