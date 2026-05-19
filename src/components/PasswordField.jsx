import { useState } from "react";
import { useLocale } from "../context/LocaleContext";

export default function PasswordField({ className = "", ...props }) {
  const { t } = useLocale();
  const [isVisible, setIsVisible] = useState(false);
  const visibilityLabel = isVisible
    ? t("auth.actions.hidePassword")
    : t("auth.actions.showPassword");

  return (
    <div className="password-field">
      <input
        {...props}
        className={[className, "password-input"].filter(Boolean).join(" ")}
        type={isVisible ? "text" : "password"}
      />
      <button
        type="button"
        className="password-field-toggle"
        aria-label={visibilityLabel}
        aria-pressed={isVisible}
        onClick={() => setIsVisible((currentValue) => !currentValue)}
      >
        {visibilityLabel}
      </button>
    </div>
  );
}
