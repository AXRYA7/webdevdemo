import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "../context/LocaleContext";

const HR_EMAIL = "hr@enkonix.in";

export default function ContactPage() {
  const { t } = useLocale();
  const cards = t("contact.cards");
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  function updateField(field, value) {
    setFormState((currentValue) => ({
      ...currentValue,
      [field]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const subject = formState.subject.trim() || t("contact.defaultSubject");
    const body = [
      `${t("contact.mailBodyName")} ${formState.fullName.trim()}`,
      `${t("contact.mailBodyEmail")} ${formState.email.trim()}`,
      "",
      formState.message.trim(),
    ].join("\n");

    if (typeof window !== "undefined") {
      window.location.href = `mailto:${HR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  }

  return (
    <section className="rounded-[2.25rem] border services-shell">
      <div className="grid gap-4 p-3 md:p-4 lg:grid-cols-[0.96fr_1.04fr] lg:items-start">
        <aside className="grid gap-4">
          <article className="service-feature">
            <div className="space-y-3">
              <span className="eyebrow-pill">{t("contact.eyebrow")}</span>
              <h1 className="text-3xl font-black leading-tight md:text-4xl">
                {t("contact.title")}
              </h1>
              <p className="service-copy">{t("contact.copy")}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
              {cards.map((card) => (
                <article key={card.title} className="service-card insight-card transform transition-transform duration-300 hover:scale-[1.05] hover:shadow-lg">
                  <span className="service-card-label">{t("contact.cardLabel")}</span>
                  <h2>{card.title}</h2>
                  <p>{card.summary}</p>
                </article>
              ))}
            </div>
          </article>
        </aside>
        <div className="grid gap-4 self-start">
          <article className="service-feature contact-form-panel self-start">
            <div className="space-y-3">
              <span className="eyebrow-pill">{t("contact.formLabel")}</span>
              <h2 className="text-3xl font-black leading-tight md:text-4xl">
                {t("contact.formTitle")}
              </h2>
              <p className="service-copy">{t("contact.formCopy")}</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="form-label mb-0 fw-semibold">
                    {t("contact.fields.fullName")}
                  </span>
                  <input
                    type="text"
                    className="form-control app-form-control px-3"
                    placeholder={t("contact.placeholders.fullName")}
                    value={formState.fullName}
                    onChange={(event) => updateField("fullName", event.target.value)}
                    required
                  />
                </label>

                <label className="space-y-2">
                  <span className="form-label mb-0 fw-semibold">
                    {t("contact.fields.email")}
                  </span>
                  <input
                    type="email"
                    className="form-control app-form-control px-3"
                    placeholder={t("contact.placeholders.email")}
                    value={formState.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    required
                  />
                </label>
              </div>

              <label className="space-y-2">
                <span className="form-label mb-0 fw-semibold">
                  {t("contact.fields.subject")}
                </span>
                <input
                  type="text"
                  className="form-control app-form-control px-3"
                  placeholder={t("contact.placeholders.subject")}
                  value={formState.subject}
                  onChange={(event) => updateField("subject", event.target.value)}
                />
              </label>

              <label className="space-y-2">
                <span className="form-label mb-0 fw-semibold">
                  {t("contact.fields.message")}
                </span>
                <textarea
                  className="form-control app-form-control contact-textarea px-3 py-3"
                  placeholder={t("contact.placeholders.message")}
                  value={formState.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  required
                />
              </label>

              <div className="d-flex flex-wrap gap-3">
                <button type="submit" className="btn app-btn-primary">
                  {t("contact.submit")}
                </button>
                <Link className="btn app-btn-ghost" to="/services">
                  {t("nav.services")}
                </Link>
              </div>

              <p className="contact-note mb-0">{t("contact.note")}</p>
            </form>
          </article>

          <article className="service-card insight-card">
            <span className="service-card-label">{t("contact.directLabel")}</span>
            <h2>
              <a className="contact-email-link" href={`mailto:${HR_EMAIL}`}>
                {HR_EMAIL}
              </a>
            </h2>
            <p>{t("contact.directCopy")}</p>
            <a className="btn app-btn-primary w-fit" href={`mailto:${HR_EMAIL}`}>
              {t("contact.directAction")}
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
