import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import PasswordField from "../components/PasswordField";
import { useAuth } from "../context/AuthContext";
import { useLocale } from "../context/LocaleContext";

export default function LoginPage() {
  const { currentUser, isAdmin, login } = useAuth();
  const { t } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState(location.state?.mode === "admin" ? "admin" : "user");
  const [formState, setFormState] = useState({
    email: location.state?.email ?? "",
    password: "",
  });
  const [feedback, setFeedback] = useState(location.state?.feedback ?? "");

  if (currentUser) {
    return <Navigate to={isAdmin ? "/admin/dashboard" : "/"} replace />;
  }

  function handleModeChange(nextMode) {
    setMode(nextMode);
    setFeedback("");
    setFormState({
      email: "",
      password: "",
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormState((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const result = login({
      email: formState.email,
      password: formState.password,
      mode,
    });

    if (!result.ok) {
      setFeedback(result.message);
      return;
    }

    navigate(result.role === "admin" ? "/admin/dashboard" : "/");
  }

  return (
    <AuthShell
      title={t("auth.login.title")}
      subtitle={t("auth.login.subtitle")}
      footer={
        <>
          {t("auth.login.footerPrefix")}{" "}
          <Link className="inline-link" to="/auth/signup">
            {t("auth.login.footerCta")}
          </Link>
        </>
      }
    >
      <div className="auth-segment" role="tablist" aria-label={t("auth.login.title")}>
        <button
          type="button"
          className={`auth-segment-btn ${mode === "user" ? "is-active" : ""}`}
          onClick={() => handleModeChange("user")}
        >
          {t("auth.login.userTab")}
        </button>
        <button
          type="button"
          className={`auth-segment-btn ${mode === "admin" ? "is-active" : ""}`}
          onClick={() => handleModeChange("admin")}
        >
          {t("auth.login.adminTab")}
        </button>
      </div>

      {feedback ? <div className="form-alert">{feedback}</div> : null}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-divider">
          <span>{t("auth.login.divider")}</span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="form-label" htmlFor="loginEmail">
              {t("auth.fields.email")}
            </label>
            <input
              id="loginEmail" 
              name="email"
              className="form-control app-form-control"
              type="email"
              value={formState.email}
              onChange={handleChange}
              placeholder={t("auth.login.emailPlaceholder")}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="loginPassword">
              {t("auth.fields.password")}
            </label>
            <PasswordField
              id="loginPassword"
              name="password"
              className="form-control app-form-control"
              value={formState.password}
              onChange={handleChange}
              placeholder={t("auth.login.passwordPlaceholder")}
            />
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between gap-2">
          <div className="form-check auth-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              {t("auth.login.rememberMe")}
            </label>
          </div>

          <Link className="inline-link" to="/auth/forgot-password">
            {t("auth.login.forgotPassword")}
          </Link>
        </div>

        <button type="submit" className="btn app-btn-primary w-100">
          {t("auth.login.submit")}
        </button>
      </form>
    </AuthShell>
  );
}
