import { Link } from "react-router-dom";
import StatStrip from "../components/StatStrip";
import { useAuth } from "../context/AuthContext";
import { useLocale } from "../context/LocaleContext";

export default function HomePage() {
  const { currentUser, isAdmin } = useAuth();
  const { t } = useLocale();
  const highlights = t("home.highlights");
  const storyCards = t("home.storyCards");
  const servicePillars = t("home.servicePillars");
  const deliverySteps = t("home.deliverySteps");
  const industryCards = t("home.industryCards");
  const proofStats = t("home.proofStats");

  const primaryAction = isAdmin
    ? { to: "/admin/dashboard", label: t("home.openAdminDashboard") }
    : currentUser
      ? { to: "/services", label: t("home.exploreServices") }
      : { to: "/auth/signup", label: t("home.getStarted") };

  return (
    <>
      <section className="overflow-hidden rounded-[2.25rem] border hero-panel ">
        <div className="grid lg:grid-cols-[1.08fr_0.92fr] ">
          <div className="p-4 md:p-5 lg:p-6 xl:p-8 ">
            <span className="eyebrow-pill ">{t("home.heroKicker")}</span>
            <h1 className="mt-4 max-w-xl text-4xl font-black leading-tight md:text-5xl">
              {t("home.heroTitleLine1")}
              <br />
              {t("home.heroTitleLine2")}
            </h1>
            <p className="mt-3 max-w-xl text-base md:text-lg hero-copy">
              {t("home.heroCopy")}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3 ">
              <Link className="btn app-btn-primary" to={primaryAction.to}>
                {primaryAction.label}
              </Link>
              <Link className="btn app-btn-ghost d-inline-flex align-items-center gap-2" to="/services">
                <span className="play-chip">
                  <span className="play-triangle" />
                </span>
                {t("home.viewServices")}
              </Link>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-4">
              {highlights.map((item) => (
                <article
                  key={item.label}
                  className={`preview-card transform transition-transform duration-300 hover:scale-[1.02] ${item.cta ? "preview-card-cta" : ""}`}
                >
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </article>
              ))}
            </div>
          </div>

          <div className="hero-visual-wrap p-4 md:p-5 lg:p-6 xl:p-8">
            <div className="hero-visual-stage">
              <div className="device-card device-card-back">
                <div className="device-screen screen-muted" />
              </div>

              <div className="device-card device-card-front">
                <div className="device-screen">
                  <div className="device-title">{t("home.projectBrief")}</div>
                  <div className="device-line w-75" />
                  <div className="device-line w-50" />
                  <div className="device-copy">{t("home.deviceCopy")}</div>
                  <div className="device-grid">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatStrip />

      <section className="rounded-[2rem] border services-shell p-3 md:p-4">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="service-feature h-full">
            <div className="space-y-3">
              <span className="eyebrow-pill">{t("home.storyLabel")}</span>
              <h2 className="text-3xl font-black leading-tight md:text-4xl">
                {t("home.storyTitle")}
              </h2>
              <p className="service-copy">{t("home.storyCopy")}</p>
            </div>

            <div className="d-flex flex-wrap gap-3">
              <Link className="btn app-btn-primary transform transition-transform duration-300 hover:scale-[1.05] hover:shadow-2xl" to="/home-2">
                {t("home.proofPrimary")}
              </Link>
              <Link className="btn app-btn-ghost transform transition-transform duration-300 hover:scale-[1.05] hover:shadow-2xl" to="/about">
                {t("home.proofSecondary")}
              </Link>
            </div>
          </article>

          <div className="grid gap-4 md:grid-cols-3">
            {storyCards.map((card) => (
              <article key={card.title} className="service-card insight-card transform transition-transform duration-300 hover:scale-[1.05] hover:shadow-2xl">
                <span className="service-card-label">{t("home.storyLabel")}</span>
                <h3>{card.title}</h3>
                <p>{card.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border services-shell p-3 md:p-4">
        <div className="space-y-4">
          <div className="space-y-3">
            <span className="eyebrow-pill">{t("home.pillarsLabel")}</span>
            <h2 className="text-3xl font-black leading-tight md:text-4xl">
              {t("home.pillarsTitle")}
            </h2>
            <p className="service-copy max-w-3xl">{t("home.pillarsCopy")}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {servicePillars.map((pillar) => (
              <article key={pillar.title} className="service-card insight-card transform transition-transform duration-300 hover:scale-[1.05] hover:shadow-2xl">
                <span className="service-card-label">{t("home.pillarsLabel")}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border services-shell p-3 md:p-4 ">
        <div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr] ">
          <article className="service-feature home-one-process-panel ">
            <div className="space-y-3 ">
              <span className="eyebrow-pill home-one-process-eyebrow ">
                {t("home.processLabel")}
              </span>
              <h2 className="text-3xl font-black leading-tight home-one-process-title md:text-4xl ">
                {t("home.processTitle")}
              </h2>
              <p className="home-one-process-copy">{t("home.processCopy")}</p>
            </div>
          </article>

          <div className="grid gap-4 md:grid-cols-2">
            {deliverySteps.map((step) => (
              <article key={step.step} className="home-one-step-card transform transition-transform duration-300 hover:scale-[1.05] hover:shadow-2xl">
                <span>{step.step}</span>
                <strong>{step.title}</strong>
                <p>{step.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border services-shell p-3 md:p-4">
        <div className="space-y-4">
          <div className="space-y-3">
            <span className="eyebrow-pill">{t("home.industriesLabel")}</span>
            <h2 className="text-3xl font-black leading-tight md:text-4xl">
              {t("home.industriesTitle")}
            </h2>
            <p className="service-copy max-w-3xl">{t("home.industriesCopy")}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {industryCards.map((industry) => (
              <article key={industry.title} className="service-card insight-card transform transition-transform duration-300 hover:scale-[1.05] hover:shadow-2xl">
                <span className="service-card-label">{t("home.industriesLabel")}</span>
                <h3>{industry.title}</h3>
                <p>{industry.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border home-one-cta">
        <div className="grid gap-4 p-4 md:p-5 lg:grid-cols-[0.88fr_1.12fr] lg:p-6">
          <div className="space-y-3">
            <span className="eyebrow-pill home-one-cta-eyebrow">
              {t("home.proofLabel")}
            </span>
            <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">
              {t("home.proofTitle")}
            </h2>
            <p className="home-one-cta-copy">{t("home.proofCopy")}</p>

            <div className="d-flex flex-wrap gap-3 pt-2">
              <Link className="btn app-btn-primary" to="/home-2">
                {t("home.proofPrimary")}
              </Link>
              <Link className="btn home-two-secondary-btn" to="/about">
                {t("home.proofSecondary")}
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {proofStats.map((stat) => (
              <article key={stat.label} className="marketing-dark-card transform transition-transform duration-300 hover:scale-[1.05] hover:shadow-2xl">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}