import { useLocale } from "../context/LocaleContext";

export default function StatStrip() {
  const { t } = useLocale();
  const stats = t("stats.items");

  return (
    <section className="rounded-[2rem] border stats-strip">
      <div className="row g-0">
        {stats.map((stat) => (
          <div key={stat.label} className="col-6 col-lg-3">
            <article className="stat-card">
              <h2>{stat.value}</h2>
              <p>{stat.label}</p>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
