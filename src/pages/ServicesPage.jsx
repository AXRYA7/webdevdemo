import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLocale } from "../context/LocaleContext";

export default function ServicesPage() {
  const { currentUser, isAdmin } = useAuth();
  const { t } = useLocale();
  const services = t("services.items");

  return (
    <section className="rounded-[2.25rem] border services-shell">
      <div className="grid gap-4 p-3 md:p-4 lg:grid-cols-[0.86fr_1.14fr]">
        <aside className="service-feature">
          <div className="space-y-3">
            <span className="eyebrow-pill">{t("services.eyebrow")}</span>
            <h1 className="text-3xl font-black leading-tight md:text-4xl">
              {t("services.title")}
            </h1>
            <p className="service-copy">{t("services.copy")}</p>
          </div>
          <div className="d-flex flex-wrap gap-3">
            <Link
              className="btn app-btn-primary"
              to={
                isAdmin
                  ? "/admin/dashboard"
                  : currentUser
                    ? "/"
                    : "/auth/signup"
              }
            >
              {isAdmin
                ? t("services.openAdminDashboard")
                : currentUser
                  ? t("services.returnHome")
                  : t("services.startProject")}
            </Link>
            <Link className="btn app-btn-ghost" to="/auth/signup">
              {t("services.startProject")}
            </Link>
          </div>
        </aside>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.title} className="service-card">
              <span className="service-card-label">{t("services.cardLabel")}</span>
              <h2>{service.title}</h2>
              <p>{service.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
