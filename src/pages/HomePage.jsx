import { Link } from "react-router-dom";
import StatStrip from "../components/StatStrip";
import { useAuth } from "../context/AuthContext";
import { useLocale } from "../context/LocaleContext";

export default function HomePage() {
  const { currentUser, isAdmin } = useAuth();
  const { t } = useLocale();
  const highlights = t("home.highlights");

  const primaryAction = isAdmin
    ? { to: "/admin/dashboard", label: t("home.openAdminDashboard") }
    : currentUser
      ? { to: "/services", label: t("home.exploreServices") }
      : { to: "/auth/signup", label: t("home.getStarted") };

  return (
    <>
      <section className="overflow-hidden rounded-[2.25rem] border hero-panel">
        <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
          <div className="p-4 md:p-5 lg:p-6 xl:p-8">
            <span className="eyebrow-pill">{t("home.heroKicker")}</span>
            <h1 className="mt-4 max-w-xl text-4xl font-black leading-tight md:text-5xl">
              {t("home.heroTitleLine1")}
              <br />
              {t("home.heroTitleLine2")}
            </h1>
            <p className="mt-3 max-w-xl text-base md:text-lg hero-copy">
              {t("home.heroCopy")}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
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
                  className={`preview-card ${item.cta ? "preview-card-cta" : ""}`}
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
    </>
  );
}
