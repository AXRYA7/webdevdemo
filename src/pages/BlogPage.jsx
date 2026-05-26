import { useLocale } from "../context/LocaleContext";

export default function BlogPage() {
  const { t } = useLocale();

  return (
    <section className="overflow-hidden rounded-[2.25rem] border about-hero">
      <div className="p-4 text-center md:p-5 lg:p-6 xl:p-8">
        <div className="mx-auto flex min-h-[22rem] max-w-3xl flex-col items-center justify-center gap-4 text-white">
          <span className="eyebrow-pill about-eyebrow">{t("blog.eyebrow")}</span>
          <h1 className="text-4xl font-black leading-tight md:text-5xl">
            {t("blog.comingSoon")}
          </h1>
          <p className="max-w-2xl text-base  text-white/78 md:text-lg">
            {t("blog.copy")}
          </p>
        </div>
      </div>
    </section>
  );
}
