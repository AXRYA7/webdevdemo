import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLocale } from "../context/LocaleContext";
import ThemeToggle from "./ThemeToggle";

const links = [
  { key: "nav.home", to: "/" },
  { key: "nav.services", to: "/services" },
];

export default function AppNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, isAdmin, logout } = useAuth();
  const { locale, localeOptions, setLocale, t } = useLocale();

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const initials = currentUser
    ? `${currentUser.firstName[0] ?? ""}${currentUser.lastName[0] ?? ""}`
    : "";
  const displayName = currentUser
    ? [currentUser.firstName, currentUser.lastName].filter(Boolean).join(" ")
    : "";
  const navLinks = isAdmin
    ? [...links, { label: "Dashboard", to: "/admin/dashboard" }]
    : links;

  function handleLogout() {
    logout();
    setProfileOpen(false);
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 md:px-4 lg:px-6">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 rounded-full border px-4 py-3 app-nav-shell">
        <Link className="brand-mark text-decoration-none" to="/">
          ENKONIX
        </Link>

        <button
          type="button"
          className="menu-trigger d-flex d-md-none align-items-center justify-content-center"
          aria-expanded={menuOpen}
          aria-label={t("nav.toggleNavigation")}
          onClick={() => setMenuOpen((currentValue) => !currentValue)}
        >
          <span />
          <span />
          <span />
        </button>

        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } nav-flyout absolute left-3 right-3 top-[calc(100%+0.75rem)] flex-col gap-4 rounded-[2rem] border p-4 shadow-2xl md:static md:flex md:min-w-0 md:flex-1 md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          <nav className="nav-primary flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `nav-link-custom text-decoration-none ${isActive ? "is-active" : ""}`
                }
              >
                {"label" in link ? link.label : t(link.key)}
              </NavLink>
            ))}
          </nav>

          <div
            className={`nav-actions flex flex-col gap-3 md:flex-row md:items-center ${
              currentUser ? "" : "nav-actions-guest"
            }`}
          >
            <div className="locale-switcher">
              <label className="sr-only" htmlFor="locale-switcher">
                {t("nav.language")}
              </label>
              <select
                id="locale-switcher"
                className="form-select app-form-control locale-select"
                value={locale}
                onChange={(event) => setLocale(event.target.value)}
                aria-label={t("nav.language")}
              >
                {localeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <ThemeToggle />
            {currentUser ? (
              <div className="profile-menu">
                <button
                  type="button"
                  className="profile-trigger"
                  aria-expanded={profileOpen}
                  onClick={() => setProfileOpen((currentValue) => !currentValue)}
                >
                  <span className="profile-avatar">{initials}</span>
                  <span className="profile-copy">
                    <strong>{displayName}</strong>
                    <small>{isAdmin ? t("nav.administrator") : t("nav.userAccount")}</small>
                  </span>
                </button>

                {profileOpen ? (
                  <div className="profile-dropdown">
                    <div className="profile-dropdown-head">
                      <strong>{displayName}</strong>
                      <small>{currentUser.email}</small>
                    </div>
                    {isAdmin ? (
                      <Link className="profile-link" to="/admin/dashboard">
                        {t("nav.adminDashboard")}
                      </Link>
                    ) : null}
                    <Link className="profile-link" to="/">
                      {t("nav.home")}
                    </Link>
                    <Link className="profile-link" to="/services">
                      {t("nav.services")}
                    </Link>
                    <button
                      type="button"
                      className="profile-link profile-link-danger"
                      onClick={handleLogout}
                    >
                      {t("nav.logout")}
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="nav-auth-links">
                <Link className="btn app-btn-ghost nav-login-btn" to="/auth/login">
                  {t("nav.login")}
                </Link>
                <Link className="btn app-btn-primary nav-signup-btn" to="/auth/signup">
                  {t("nav.signUp")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
