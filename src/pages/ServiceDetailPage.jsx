import { Link, Navigate, useParams } from "react-router-dom";
import { getServiceBySlug } from "../content/serviceCatalog";
import { useLocale } from "../context/LocaleContext";

export default function ServiceDetailPage() {
  const { serviceSlug } = useParams();
  const { locale, t } = useLocale();
  const service = getServiceBySlug(locale, serviceSlug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-[2.25rem] border service-detail-hero">
        <div className="grid gap-4 p-4 md:p-5 lg:grid-cols-[0.94fr_1.06fr] lg:p-6 xl:p-8">
          <div className="space-y-4 text-white">
            <Link className="service-back-link text-decoration-none" to="/services">
              {t("services.backToServices")}
            </Link>

            <div className="space-y-3">
              <span className="eyebrow-pill home-two-eyebrow">
                {t("services.detailEyebrow")}
              </span>
              <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-5xl">
                {service.title}
              </h1>
              <p className="max-w-2xl text-base text-white/78 md:text-lg">
                {service.hero}
              </p>
            </div>

            <div className="d-flex flex-wrap gap-2">
              {service.focus.map((item) => (
                <span key={item} className="service-detail-tag">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <article className="home-two-glass-card service-detail-summary-card">
            <span className="service-card-label text-white/72">
              {t("services.detailOverview")}
            </span>
            <h2 className="mt-3 mb-0 text-3xl font-black text-white md:text-4xl">
              {service.title}
            </h2>
            <p className="mt-3 mb-0 text-white/80">{service.summary}</p>
          </article>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="service-detail-panel">
          <span className="service-card-label">{t("services.detailFocus")}</span>
          <ul className="service-detail-list">
            {service.focus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="service-detail-panel">
          <span className="service-card-label">{t("services.detailScope")}</span>
          <ul className="service-detail-list">
            {service.scope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="service-detail-panel">
          <span className="service-card-label">{t("services.detailValue")}</span>
          <ul className="service-detail-list">
            {service.value.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="rounded-[2rem] border services-shell p-3 md:p-4">
        <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <article className="service-feature">
            <div className="space-y-3">
              <span className="eyebrow-pill">{t("services.detailCtaEyebrow")}</span>
              <h2 className="text-3xl font-black leading-tight md:text-4xl">
                {t("services.detailCtaTitle")}
              </h2>
              <p className="service-copy">{t("services.detailCtaCopy")}</p>
            </div>

            <div className="d-flex flex-wrap gap-3">
              <Link className="btn app-btn-primary" to="/contact">
                {t("services.detailCtaPrimary")}
              </Link>
              <Link className="btn app-btn-ghost" to="/services">
                {t("services.backToServices")}
              </Link>
            </div>
          </article>

          <div className="grid gap-4 md:grid-cols-3">
            {service.value.map((item) => (
              <article key={item} className="service-card insight-card">
                <span className="service-card-label">{t("services.detailValue")}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
