import { Link } from "react-router-dom";
import { useLocale } from "../context/LocaleContext";

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
  compact = false,
}) {
  const { t } = useLocale();

  return (
    <section className="rounded-[2rem] border auth-shell">
      <div
        className={`grid gap-4 p-3 md:p-4 ${
          compact ? "lg:grid-cols-1" : "lg:grid-cols-[0.85fr_1.15fr]"
        }`}
      >
        {!compact && (
          <aside className="auth-showcase">
            <div className="auth-showcase-brand">
              <Link className="brand-mark text-decoration-none" to="/">
                ENKONIX
              </Link>
            </div>
            <div className="auth-showcase-content">
              <span className="auth-showcase-kicker">{t("authShell.kicker")}</span>
              <p>{t("authShell.headline")}</p>
              <span className="auth-showcase-note">
                {t("authShell.note")}
              </span>
            </div>
          </aside>
        )}

        <div className={`auth-card ${compact ? "auth-card-compact" : ""}`}>
          <div className="auth-card-header">
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          {children}
          {footer ? <div className="auth-footer-note">{footer}</div> : null}
        </div>
      </div>
    </section>
  );
}
