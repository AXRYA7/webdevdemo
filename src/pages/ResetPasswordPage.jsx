import { Link } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import { useLocale } from "../context/LocaleContext";

export default function ResetPasswordPage() {
  const { t } = useLocale();

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
      <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
        <div className="space-y-3">
          <div>
            <label className="form-label" htmlFor="resetPassword">
              {t("auth.fields.newPassword")}
            </label>
            <input
              id="resetPassword"
              className="form-control app-form-control"
              type="password"
              placeholder={t("auth.reset.passwordPlaceholder")}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="resetConfirmPassword">
              {t("auth.fields.confirmPassword")}
            </label>
            <input
              id="resetConfirmPassword"
              className="form-control app-form-control"
              type="password"
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
