import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import PasswordField from "../components/PasswordField";
import { useAuth } from "../context/AuthContext";
import { useLocale } from "../context/LocaleContext";

export default function SignupPage() {
  const { currentUser, isAdmin, register } = useAuth();
  const { t } = useLocale();
  const navigate = useNavigate();
  const countryOptions = [
    { value: "United States", label: t("countries.unitedStates") },
    { value: "India", label: t("countries.india") },
    { value: "United Kingdom", label: t("countries.unitedKingdom") },
    { value: "Germany", label: t("countries.germany") },
  ];
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "United States",
    password: "",
  });
  const [feedback, setFeedback] = useState("");

  if (currentUser) {
    return <Navigate to={isAdmin ? "/admin/dashboard" : "/"} replace />;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormState((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const result = register(formState);

    if (!result.ok) {
      setFeedback(result.message);
      return;
    }

    navigate("/auth/login", {
      state: {
        email: result.email,
        feedback: result.message,
        mode: "user",
      },
    });
  }

  return (
    <AuthShell
      title={t("auth.signup.title")}
      subtitle={t("auth.signup.subtitle")}
      footer={
        <>
          {t("auth.signup.footerPrefix")}{" "}
          <Link className="inline-link" to="/auth/login">
            {t("auth.signup.footerCta")}
          </Link>
        </>
      }
    >
      {feedback ? <div className="form-alert">{feedback}</div> : null}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-sm-6">
            <label className="form-label" htmlFor="firstName">
              {t("auth.fields.firstName")}
            </label>
            <input
              id="firstName"
              name="firstName"
              className="form-control app-form-control"
              type="text"
              value={formState.firstName}
              onChange={handleChange}
              placeholder={t("auth.signup.firstNamePlaceholder")}
            />
          </div>
          <div className="col-sm-6">
            <label className="form-label" htmlFor="lastName">
              {t("auth.fields.lastName")}
            </label>
            <input
              id="lastName"
              name="lastName"
              className="form-control app-form-control"
              type="text"
              value={formState.lastName}
              onChange={handleChange}
              placeholder={t("auth.signup.lastNamePlaceholder")}
            />
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="signupEmail">
              {t("auth.fields.email")}
            </label>
            <input
              id="signupEmail"
              name="email"
              className="form-control app-form-control"
              type="email"
              value={formState.email}
              onChange={handleChange}
              placeholder={t("auth.signup.emailPlaceholder")}
            />
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="signupCountry">
              {t("auth.fields.country")}
            </label>
            <select
              id="signupCountry"
              name="country"
              className="form-select app-form-control"
              value={formState.country}
              onChange={handleChange}
            >
              {countryOptions.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="signupPassword">
              {t("auth.fields.password")}
            </label>
            <PasswordField
              id="signupPassword"
              name="password"
              className="form-control app-form-control"
              value={formState.password}
              onChange={handleChange}
              placeholder={t("auth.signup.passwordPlaceholder")}
            />
          </div>
        </div>

        <div className="form-check auth-check">
          <input className="form-check-input" type="checkbox" id="terms" />
          <label className="form-check-label" htmlFor="terms">
            {t("auth.signup.terms")}
          </label>
        </div>

        <button type="submit" className="btn app-btn-primary w-100">
          {t("auth.signup.submit")}
        </button>
      </form>
    </AuthShell>
  );
}
