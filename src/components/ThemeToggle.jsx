import { useTheme } from "../context/ThemeContext";
import { useLocale } from "../context/LocaleContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLocale();
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      className="theme-switch"
      onClick={toggleTheme}
      aria-label={t("theme.switchTo", { theme: t(`theme.${nextTheme}`) })}
    >
      <span className="theme-switch-track">
        <span
          className={`theme-switch-thumb ${theme === "dark" ? "is-dark" : ""}`}
        />
      </span>
      <span className="theme-switch-label">
        {t(`theme.${theme}`)}
      </span>
    </button>
  );
}
