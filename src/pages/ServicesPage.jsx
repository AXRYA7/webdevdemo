import { Link } from "react-router-dom";
import { getServiceList } from "../content/serviceCatalog";
import { useAuth } from "../context/AuthContext";
import { useLocale } from "../context/LocaleContext";

export default function ServicesPage() {
  const { currentUser, isAdmin } = useAuth();
  const { locale, t } = useLocale();
  const services = getServiceList(locale);

  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-[2.25rem] border services-hero-shell">
        <div className="p-4 md:p-5 lg:p-6 xl:p-8">
          <article className="services-hero-panel">
            <div className="space-y-3">
              <span className="eyebrow-pill services-eyebrow transform transition-transform duration-300 hover:scale-[1.05] hover:shadow-2xl">{t("services.eyebrow")}</span>
              <h1 className="max-w-4xl text-4xl font-black leading-tight text-white md:text-5xl">
                {t("services.title")}
              </h1>
              <p className="service-copy services-hero-copy max-w-3xl">{t("services.copy")}</p>
            </div>

            <div className="d-flex flex-wrap gap-3">
              <Link
                className="btn app-btn-primary "
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
              <Link className="btn home-two-secondary-btn" to="/contact">
                {t("services.detailCtaPrimary")}
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="rounded-[2rem] border services-shell p-3 md:p-4">
        <div className="space-y-4">
          <div className="service-directory-note">
            <span className="service-card-label ">{t("services.directoryLabel")}</span>
            <p className="mb-0">{t("services.directoryCopy")}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                className="service-card service-directory-card text-decoration-none "
                to={`/services/${service.slug}`}
              >
                <span className="service-card-label">{t("services.cardLabel")}</span>
                <h2>{service.title}</h2>
                <p>{service.summary}</p>
                <span className="service-directory-link">{t("services.openService")}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border services-shell p-3 md:p-4">
        <div className="space-y-4">
          <div className="space-y-3">
            <span className="eyebrow-pill transform transition-transform duration-300 hover:scale-[1.05] hover:shadow-2xl">{t("services.detailEyebrow")}</span>
            <h2 className="text-3xl font-black leading-tight md:text-4xl">
              {t("services.directoryTitle")}
            </h2>
            <p className="service-copy max-w-3xl">{t("services.directoryBody")}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => (
              <article key={service.slug} className="service-card insight-card transform transition-transform duration-300 hover:scale-[1.05] hover:shadow-2xl">
                <span className="service-card-label">
                  {`${String(index + 1).padStart(2, "0")} / 07`}
                </span>
                <h2>{service.title}</h2>
                <p>{service.focus[0]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
