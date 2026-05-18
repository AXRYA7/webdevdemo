import { Link } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import { useLocale } from "../context/LocaleContext";

export default function ForgotPasswordPage() {
  const { t } = useLocale();

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
      <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
        <div>
          <label className="form-label" htmlFor="forgotEmail">
            {t("auth.fields.email")}
          </label>
          <input
            id="forgotEmail"
            className="form-control app-form-control"
            type="email"
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
