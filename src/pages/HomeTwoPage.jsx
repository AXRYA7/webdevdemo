import { useLocale } from "../context/LocaleContext";

export default function HomeTwoPage() {
  const { t } = useLocale();
  const perspectiveNotes = t("homeTwo.perspectiveNotes");
  const proofItems = t("homeTwo.proofItems");
  const spotlightPoints = t("homeTwo.spotlightPoints");
  const capabilities = t("homeTwo.capabilities");
  const sectors = t("homeTwo.sectors");
  const processSteps = t("homeTwo.processSteps");
  const partnershipCards = t("homeTwo.partnershipCards");
  const values = t("homeTwo.values");

  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-[2.25rem] border home-two-hero">
        <div className="grid gap-4 p-4 md:p-5 lg:grid-cols-[1.02fr_0.98fr] lg:p-6 xl:p-8">
          <div className="space-y-4 text-white">
            <span className="eyebrow-pill home-two-eyebrow">
              {t("homeTwo.eyebrow")}
            </span>
            <div className="space-y-3">
              <h1 className="max-w-2xl text-4xl font-black leading-tight md:text-5xl">
                {t("homeTwo.titleLine1")}
                <br />
                {t("homeTwo.titleLine2")}
              </h1>
              <p className="max-w-2xl text-base text-white/78 md:text-lg">
                {t("homeTwo.copy")}
              </p>
            </div>

            <div className="home-two-hero-notes">
              {perspectiveNotes.map((note) => (
                <article key={note.title} className="home-two-hero-note">
                  <strong>{note.title}</strong>
                  <p>{note.summary}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <article className="home-two-glass-card">
              <div className="dashboard-panel-head mb-0">
                <div>
                  <span className="text-white/72">{t("homeTwo.proofLabel")}</span>
                  <strong className="text-white">{t("homeTwo.proofTitle")}</strong>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {proofItems.map((item) => (
                  <article key={item.label} className="home-two-proof-card">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </article>
                ))}
              </div>
            </article>

            <article className="home-two-glass-card">
              <div className="dashboard-panel-head mb-0">
                <div>
                  <span className="text-white/72">{t("homeTwo.spotlightLabel")}</span>
                  <strong className="text-white">{t("homeTwo.spotlightTitle")}</strong>
                </div>
              </div>
              <p className="mt-3 mb-0 text-white/78">
                {t("homeTwo.spotlightCopy")}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
        <article className="rounded-[2rem] border services-shell p-3 md:p-4">
          <div className="service-feature h-full">
            <div className="space-y-3">
              <span className="eyebrow-pill">{t("homeTwo.spotlightLabel")}</span>
              <h2 className="text-3xl font-black leading-tight md:text-4xl">
                {t("homeTwo.spotlightFeatureTitle")}
              </h2>
              <p className="service-copy">{t("homeTwo.spotlightFeatureCopy")}</p>
            </div>

            <div className="grid gap-3">
              {spotlightPoints.map((point) => (
                <article key={point.title} className="preview-card preview-card-cta">
                  <span>{point.title}</span>
                  <strong>{point.summary}</strong>
                </article>
              ))}
            </div>
          </div>
        </article>

        <article className="rounded-[2rem] border services-shell p-3 md:p-4">
          <div className="space-y-4">
            <div className="space-y-3">
              <span className="eyebrow-pill">{t("homeTwo.capabilitiesLabel")}</span>
              <h2 className="text-3xl font-black leading-tight md:text-4xl">
                {t("homeTwo.capabilitiesTitle")}
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {capabilities.map((capability) => (
                <article key={capability.title} className="service-card home-two-service-card">
                  <span className="service-card-label">{t("services.cardLabel")}</span>
                  <h3>{capability.title}</h3>
                  <p>{capability.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="rounded-[2rem] border services-shell p-3 md:p-4">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="service-feature home-two-dark-panel">
            <div className="space-y-3">
              <span className="eyebrow-pill home-two-eyebrow-dark">
                {t("homeTwo.processLabel")}
              </span>
              <h2 className="text-3xl font-black leading-tight home-two-process-title md:text-4xl">
                {t("homeTwo.processTitle")}
              </h2>
              <p className="mb-0 home-two-process-copy">{t("homeTwo.processCopy")}</p>
            </div>

            <div className="grid gap-3">
              {processSteps.map((step) => (
                <article key={step.step} className="home-two-process-card">
                  <span>{step.step}</span>
                  <strong>{step.title}</strong>
                  <p>{step.summary}</p>
                </article>
              ))}
            </div>
          </article>

          <div className="grid gap-4 md:grid-cols-2">
            {sectors.map((sector) => (
              <article key={sector.title} className="service-card home-two-sector-card">
                <span className="service-card-label">{t("homeTwo.sectorsLabel")}</span>
                <h3>{sector.title}</h3>
                <p>{sector.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border services-shell p-3 md:p-4">
        <div className="space-y-4">
          <div className="space-y-3">
            <span className="eyebrow-pill">{t("homeTwo.partnershipLabel")}</span>
            <h2 className="text-3xl font-black leading-tight md:text-4xl">
              {t("homeTwo.partnershipTitle")}
            </h2>
            <p className="service-copy max-w-3xl">{t("homeTwo.partnershipCopy")}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {partnershipCards.map((card) => (
              <article key={card.title} className="service-card insight-card">
                <span className="service-card-label">{t("homeTwo.partnershipLabel")}</span>
                <h3>{card.title}</h3>
                <p>{card.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
        <article className="rounded-[2rem] border services-shell p-3 md:p-4">
          <div className="service-feature h-full">
            <div className="space-y-3">
              <span className="eyebrow-pill">{t("homeTwo.valuesLabel")}</span>
              <h2 className="text-3xl font-black leading-tight md:text-4xl">
                {t("homeTwo.valuesTitle")}
              </h2>
              <p className="service-copy">{t("homeTwo.valuesCopy")}</p>
            </div>
          </div>
        </article>

        <div className="grid gap-4 md:grid-cols-2">
          {values.map((value) => (
            <article key={value.title} className="service-card insight-card">
              <span className="service-card-label">{t("homeTwo.valuesLabel")}</span>
              <h3>{value.title}</h3>
              <p>{value.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
