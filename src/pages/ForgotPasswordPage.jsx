import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import { useAuth } from "../context/AuthContext";
import { useLocale } from "../context/LocaleContext";

export default function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const { t } = useLocale();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const result = requestPasswordReset(email);

    if (!result.ok) {
      setFeedback(result.message);
      return;
    }

    navigate("/auth/reset-password", {
      state: {
        email: result.email,
        feedback: result.message,
      },
    });
  }

  return (
    <AuthShell
      compact
      title={t("auth.forgot.title")}
      subtitle={t("auth.forgot.subtitle")}
      footer={
        <Link className="inline-link" to="/auth/login">
          {t("auth.forgot.footerCta")}
        </Link>
      }
    >
      {feedback ? <div className="form-alert">{feedback}</div> : null}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div>
          <label className="form-label " htmlFor="forgotEmail">
            {t("auth.fields.email")}
          </label>
          <input
            id="forgotEmail"
            className="form-control app-form-control"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setFeedback("");
            }}
            placeholder={t("auth.forgot.emailPlaceholder")}
          />
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn app-btn-primary px-4">
            {t("auth.forgot.submit")}
          </button>
        </div>
      </form>
    </AuthShell>
  );
}
