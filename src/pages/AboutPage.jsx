import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLocale } from "../context/LocaleContext";

export default function AboutPage() {
  const { currentUser, isAdmin } = useAuth();
  const { t } = useLocale();
  const facts = t("about.facts");
  const storyCards = t("about.storyCards");
  const values = t("about.values");
  const locations = t("about.locations");
  const industries = t("about.industries");

  const primaryAction = isAdmin
    ? { to: "/admin/dashboard", label: t("home.openAdminDashboard") }
    : currentUser
      ? { to: "/services", label: t("home.exploreServices") }
      : { to: "/auth/signup", label: t("home.getStarted") };

  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-[2.25rem] border about-hero">
        <div className="grid gap-4 p-4 md:p-5 lg:grid-cols-[0.96fr_1.04fr] lg:p-6 xl:p-8">
          <div className="space-y-4 text-white">
            <span className="eyebrow-pill about-eyebrow">{t("about.eyebrow")}</span>
            <div className="space-y-3 ">
              <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-5xl">
                {t("about.titleLine1")}
                <br />
                {t("about.titleLine2")}
              </h1>
              <p className="max-w-2xl text-base text-white/78 md:text-lg ">
                {t("about.copy")}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link className="btn app-btn-primary" to={primaryAction.to}>
                {primaryAction.label}
              </Link>
              <Link className="btn home-two-secondary-btn" to="/home-2">
                {t("about.ctaSecondary")}
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {facts.map((fact) => (
              <article key={fact.label} className="marketing-stat-card transform transition-transform duration-300 hover:scale-[1.05] hover:shadow-2xl">
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        <article className="rounded-[2rem] border services-shell p-3 md:p-4">
          <div className="service-feature h-full">
            <div className="space-y-3">
              <span className="eyebrow-pill">{t("about.storyLabel")}</span>
              <h2 className="text-3xl font-black leading-tight md:text-4xl">
                {t("about.storyTitle")}
              </h2>
              <p className="service-copy">{t("about.storyCopy")}</p>
            </div>

            <div className="grid gap-3">
              {storyCards.map((card) => (
                <article key={card.title} className="service-card insight-card transform transition-transform duration-300 hover:scale-[1.05] hover:shadow-2xl">
                  <span className="service-card-label">{t("about.storyLabel")}</span>
                  <h3>{card.title}</h3>
                  <p>{card.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </article>

        <article className="rounded-[2rem] border services-shell p-3 md:p-4">
          <div className="space-y-4">
            <div className="space-y-3">
              <span className="eyebrow-pill">{t("about.valuesLabel")}</span>
              <h2 className="text-3xl font-black leading-tight md:text-4xl">
                {t("about.valuesTitle")}
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {values.map((value) => (
                <article key={value.title} className="service-card insight-card transform transition-transform duration-300 hover:scale-[1.05] hover:shadow-2xl">
                  <span className="service-card-label">{t("about.valuesLabel")}</span>
                  <h3>{value.title}</h3>
                  <p>{value.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="rounded-[2rem] border services-shell p-3 md:p-4">
        <div className="space-y-4">
          <div className="space-y-3">
            <span className="eyebrow-pill">{t("about.footprintLabel")}</span>
            <h2 className="text-3xl font-black leading-tight md:text-4xl">
              {t("about.footprintTitle")}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {locations.map((location) => (
              <article key={location.title} className="service-card insight-card transform transition-transform duration-300 hover:scale-[1.05] hover:shadow-2xl">
                <span className="service-card-label">{t("about.footprintLabel")}</span>
                <h3>{location.title}</h3>
                <p>{location.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border home-one-cta">
        <div className="grid gap-4 p-4 md:p-5 lg:grid-cols-[0.96fr_1.04fr] lg:p-6">
          <div className="space-y-3">
            <span className="eyebrow-pill home-one-cta-eyebrow">
              {t("about.expertiseLabel")}
            </span>
            <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">
              {t("about.expertiseTitle")}
            </h2>
            <p className="home-one-cta-copy">{t("about.ctaCopy")}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {industries.map((industry) => (
              <article key={industry.title} className="marketing-dark-card transform transition-transform duration-300 hover:scale-[1.05] hover:shadow-2xl">
                <strong>{industry.title}</strong>
                <p>{industry.summary}</p>
              </article>
            ))}
          </div>

          <div className="lg:col-span-2 flex flex-wrap gap-3">
            <Link className="btn app-btn-primary" to="/services">
              {t("about.ctaPrimary")}
            </Link>
            <Link className="btn home-two-secondary-btn" to="/home-2">
              {t("about.ctaSecondary")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
