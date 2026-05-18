import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocale } from "../context/LocaleContext";

const INITIAL_CREATE_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  country: "United States",
  password: "",
};

function formatDate(value, locale, options) {
  return new Intl.DateTimeFormat(locale, options).format(new Date(value));
}

function formatDateTime(value, locale) {
  return formatDate(value, locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatShortDate(value, locale) {
  return formatDate(value, locale, {
    month: "short",
    day: "numeric",
  });
}

function getInitials(user) {
  return `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`;
}

function buildWeeklyActivity(users, locale) {
  const results = [];

  for (let index = 6; index >= 0; index -= 1) {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - index);

    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    const total = users.reduce(
      (count, user) =>
        count +
        user.loginHistory.filter((entry) => {
          const loginDate = new Date(entry);
          return loginDate >= start && loginDate < end;
        }).length,
      0,
    );

    results.push({
      label: start.toLocaleDateString(locale, { weekday: "short" }),
      total,
    });
  }

  return results;
}

function buildMonthlyGrowth(users, locale) {
  const results = [];

  for (let index = 5; index >= 0; index -= 1) {
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    start.setMonth(start.getMonth() - index);

    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    const total = users.filter((user) => {
      const createdAt = new Date(user.createdAt);
      return createdAt >= start && createdAt < end;
    }).length;

    results.push({
      label: start.toLocaleDateString(locale, { month: "short" }),
      total,
    });
  }

  return results;
}

export default function DashboardPage() {
  const {
    currentUser,
    users,
    notifications,
    createUser,
    updateUser,
    deleteUser,
    toggleUserBlock,
  } = useAuth();
  const { locale, t, formatNumber } = useLocale();
  const countryOptions = [
    { value: "United States", label: t("countries.unitedStates") },
    { value: "India", label: t("countries.india") },
    { value: "United Kingdom", label: t("countries.unitedKingdom") },
    { value: "Germany", label: t("countries.germany") },
    { value: "Brazil", label: t("countries.brazil") },
    { value: "United Arab Emirates", label: t("countries.unitedArabEmirates") },
  ];
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("user");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [createState, setCreateState] = useState(INITIAL_CREATE_STATE);
  const [editorState, setEditorState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    status: "active",
  });
  const [createMessage, setCreateMessage] = useState("");
  const [editorMessage, setEditorMessage] = useState("");

  const userAccounts = users.filter((user) => user.role === "user");
  const activeUsers = userAccounts.filter((user) => user.status === "active");
  const inactiveUsers = userAccounts.filter(
    (user) => user.status === "inactive",
  );
  const blockedUsers = userAccounts.filter((user) => user.status === "blocked");
  const totalLogins = userAccounts.reduce(
    (sum, user) => sum + user.loginCount,
    0,
  );
  const averageLogins = userAccounts.length
    ? formatNumber(totalLogins / userAccounts.length, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      })
    : formatNumber(0, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      });

  const weeklyActivity = buildWeeklyActivity(userAccounts, locale);
  const monthlyGrowth = buildMonthlyGrowth(userAccounts, locale);
  const topWeeklyValue = Math.max(
    1,
    ...weeklyActivity.map((entry) => entry.total),
  );
  const topMonthlyValue = Math.max(
    1,
    ...monthlyGrowth.map((entry) => entry.total),
  );

  const recentRegistrations = [...userAccounts]
    .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt))
    .slice(0, 5);

  function getStatusLabel(status) {
    return t(`status.${status}`);
  }

  function getRoleLabel(role) {
    return t(`roles.${role}`);
  }

  const filteredUsers = users.filter((user) => {
    const searchTarget = `${user.firstName} ${user.lastName} ${user.email} ${user.country}`
      .toLowerCase();
    const matchesQuery = searchTarget.includes(query.trim().toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : user.status === statusFilter;
    const matchesRole = roleFilter === "all" ? true : user.role === roleFilter;

    return matchesQuery && matchesStatus && matchesRole;
  });

  useEffect(() => {
    if (!filteredUsers.length) {
      setSelectedUserId("");
      return;
    }

    const hasSelectedUser = filteredUsers.some(
      (user) => user.id === selectedUserId,
    );

    if (!hasSelectedUser) {
      setSelectedUserId(filteredUsers[0].id);
    }
  }, [filteredUsers, selectedUserId]);

  const selectedUser =
    users.find((user) => user.id === selectedUserId) ?? filteredUsers[0] ?? null;

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setEditorState({
      firstName: selectedUser.firstName,
      lastName: selectedUser.lastName,
      email: selectedUser.email,
      country: selectedUser.country,
      status: selectedUser.status,
    });
    setEditorMessage("");
  }, [selectedUser]);

  function handleEditorChange(event) {
    const { name, value } = event.target;
    setEditorState((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  }

  function handleCreateChange(event) {
    const { name, value } = event.target;
    setCreateState((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  }

  function handleCreateUser(event) {
    event.preventDefault();

    const result = createUser(createState);
    setCreateMessage(result.message);

    if (!result.ok) {
      return;
    }

    setCreateState({ ...INITIAL_CREATE_STATE });
    setQuery("");
    setStatusFilter("all");
    setRoleFilter("user");
    setSelectedUserId(result.userId);
  }

  function handleCreateReset() {
    setCreateState({ ...INITIAL_CREATE_STATE });
    setCreateMessage("");
  }

  function handleUserSave(event) {
    event.preventDefault();

    if (!selectedUser) {
      return;
    }

    const result = updateUser(selectedUser.id, editorState);
    setEditorMessage(result.message);
  }

  function handleUserDelete(userId) {
    const confirmed = window.confirm(t("dashboard.confirmDelete"));

    if (!confirmed) {
      return;
    }

    const result = deleteUser(userId);
    setEditorMessage(result.message);
  }

  function handleBlockToggle(userId) {
    const result = toggleUserBlock(userId);
    setEditorMessage(result.message);
  }

  return (
    <section className="rounded-[2.25rem] border dashboard-shell">
      <div className="space-y-4 p-3 md:p-4 lg:p-5">
        <header className="admin-dashboard-head">
          <div>
            <span className="eyebrow-pill">{t("dashboard.adminControlCenter")}</span>
            <h1 className="mt-3 text-3xl font-black md:text-4xl">
              {t("dashboard.title")}
            </h1>
            <p className="admin-dashboard-copy">{t("dashboard.copy")}</p>
          </div>

          <div className="admin-dashboard-user">
            <span className="profile-avatar profile-avatar-lg">
              {getInitials(currentUser)}
            </span>
            <div>
              <strong>
                {currentUser.firstName} {currentUser.lastName}
              </strong>
              <small>{currentUser.email}</small>
            </div>
          </div>
        </header>

        <div className="admin-metric-grid">
          <article className="metric-card">
            <span>{t("dashboard.totalUsersCount")}</span>
            <div className="metric-card-body">
              <strong>{formatNumber(userAccounts.length)}</strong>
              <small>{t("dashboard.registeredUsers")}</small>
            </div>
          </article>
          <article className="metric-card">
            <span>{t("dashboard.activeVsInactive")}</span>
            <div className="metric-card-body">
              <strong>
                {formatNumber(activeUsers.length)}/{formatNumber(inactiveUsers.length)}
              </strong>
              <small>{t("dashboard.activeInactiveSummary")}</small>
            </div>
          </article>
          <article className="metric-card">
            <span>{t("dashboard.blockedAccounts")}</span>
            <div className="metric-card-body">
              <strong>{formatNumber(blockedUsers.length)}</strong>
              <small>{t("dashboard.registrationDisabled")}</small>
            </div>
          </article>
          <article className="metric-card">
            <span>{t("dashboard.userAnalytics")}</span>
            <div className="metric-card-body">
              <strong>{averageLogins}</strong>
              <small>{t("dashboard.averageLogins")}</small>
            </div>
          </article>
        </div>

        <div className="admin-grid-two">
          <article className="dashboard-panel admin-panel">
            <div className="dashboard-panel-head">
              <div>
                <span>{t("dashboard.userActivity")}</span>
                <strong>{t("dashboard.weeklyLogins")}</strong>
              </div>
              <small>{t("dashboard.totalSignInsTracked", { count: formatNumber(totalLogins) })}</small>
            </div>

            <div className="analytics-chart">
              {weeklyActivity.map((entry, index) => (
                <div key={entry.label} className="analytics-bar-wrap">
                  <div className="analytics-bar-track">
                    <div
                      className={`analytics-bar analytics-bar-${(index % 4) + 1}`}
                      style={{
                        height: `${Math.max(
                          16,
                          (entry.total / topWeeklyValue) * 112,
                        )}px`,
                      }}
                    />
                  </div>
                  <span>{entry.label}</span>
                  <small className="chart-value">{formatNumber(entry.total)}</small>
                </div>
              ))}
            </div>
          </article>

          <article className="dashboard-panel admin-panel">
            <div className="dashboard-panel-head">
              <div>
                <span>{t("dashboard.notifications")}</span>
                <strong>{t("dashboard.notificationsPanel")}</strong>
              </div>
              <small>{t("dashboard.recentEvents", { count: formatNumber(notifications.length) })}</small>
            </div>

            <div className="notification-list">
              {notifications.length ? (
                notifications.slice(0, 6).map((notification) => (
                  <article
                    key={notification.id}
                    className={`notification-item notification-${notification.tone}`}
                  >
                    <strong>{notification.title}</strong>
                    <p>{notification.message}</p>
                    <small>{formatDateTime(notification.createdAt, locale)}</small>
                  </article>
                ))
              ) : (
                <article className="notification-item notification-info">
                  <strong>{t("dashboard.notifications")}</strong>
                  <p>{t("dashboard.noNotifications")}</p>
                </article>
              )}
            </div>
          </article>
        </div>

        <div className="admin-grid-two">
          <article className="dashboard-panel admin-panel">
            <div className="dashboard-panel-head">
              <div>
                <span>{t("dashboard.monthlyGrowthReports")}</span>
                <strong>{t("dashboard.registrationGrowth")}</strong>
              </div>
              <small>
                {t("dashboard.recentSignupsShown", {
                  count: formatNumber(recentRegistrations.length),
                })}
              </small>
            </div>

            <div className="growth-bars">
              {monthlyGrowth.map((entry) => (
                <div key={entry.label} className="growth-row">
                  <span>{entry.label}</span>
                  <div className="growth-track">
                    <div
                      className="growth-fill"
                      style={{
                        width: `${Math.max(
                          10,
                          (entry.total / topMonthlyValue) * 100,
                        )}%`,
                      }}
                    />
                  </div>
                  <strong>{formatNumber(entry.total)}</strong>
                </div>
              ))}
            </div>
          </article>

          <article className="dashboard-panel admin-panel">
            <div className="dashboard-panel-head">
              <div>
                <span>{t("dashboard.recentRegistrations")}</span>
                <strong>{t("dashboard.newestAccounts")}</strong>
              </div>
              <small>{t("dashboard.sortedByRegistrationTime")}</small>
            </div>

            <div className="recent-user-list">
              {recentRegistrations.map((user) => (
                <article key={user.id} className="recent-user-item">
                  <span className="profile-avatar">{getInitials(user)}</span>
                  <div>
                    <strong>
                      {user.firstName} {user.lastName}
                    </strong>
                    <p>{user.email}</p>
                  </div>
                  <small>{formatShortDate(user.createdAt, locale)}</small>
                </article>
              ))}
            </div>
          </article>
        </div>

        <div className="admin-grid-two">
          <article className="dashboard-panel admin-panel">
            <div className="dashboard-panel-head">
              <div>
                <span>{t("dashboard.activeInactiveUsers")}</span>
                <strong>{t("dashboard.accountHealthSummary")}</strong>
              </div>
              <small>{t("dashboard.statusDistribution")}</small>
            </div>

            <div className="status-stack">
              <div className="status-card">
                <span>{t("status.active")}</span>
                <strong>{formatNumber(activeUsers.length)}</strong>
                <div className="status-progress">
                  <div
                    className="status-progress-fill is-active"
                    style={{
                      width: `${Math.max(
                        12,
                        (activeUsers.length / Math.max(userAccounts.length, 1)) * 100,
                      )}%`,
                    }}
                  />
                </div>
              </div>
              <div className="status-card">
                <span>{t("status.inactive")}</span>
                <strong>{formatNumber(inactiveUsers.length)}</strong>
                <div className="status-progress">
                  <div
                    className="status-progress-fill is-inactive"
                    style={{
                      width: `${Math.max(
                        12,
                        (inactiveUsers.length / Math.max(userAccounts.length, 1)) * 100,
                      )}%`,
                    }}
                  />
                </div>
              </div>
              <div className="status-card">
                <span>{t("status.blocked")}</span>
                <strong>{formatNumber(blockedUsers.length)}</strong>
                <div className="status-progress">
                  <div
                    className="status-progress-fill is-blocked"
                    style={{
                      width: `${Math.max(
                        12,
                        (blockedUsers.length / Math.max(userAccounts.length, 1)) * 100,
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </article>

          <article className="dashboard-panel admin-panel">
            <div className="dashboard-panel-head">
              <div>
                <span>{t("dashboard.searchFilters")}</span>
                <strong>{t("dashboard.refineUserList")}</strong>
              </div>
              <small>{t("dashboard.matchingAccounts", { count: formatNumber(filteredUsers.length) })}</small>
            </div>

            <div className="filter-grid">
              <input
                className="form-control app-form-control"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("dashboard.searchPlaceholder")}
              />
              <select
                className="form-select app-form-control"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="all">{t("dashboard.allStatuses")}</option>
                <option value="active">{t("status.active")}</option>
                <option value="inactive">{t("status.inactive")}</option>
                <option value="blocked">{t("status.blocked")}</option>
              </select>
              <select
                className="form-select app-form-control"
                value={roleFilter}
                onChange={(event) => setRoleFilter(event.target.value)}
              >
                <option value="user">{t("dashboard.usersOnly")}</option>
                <option value="all">{t("dashboard.allRoles")}</option>
                <option value="admin">{t("dashboard.adminsOnly")}</option>
              </select>
            </div>
          </article>
        </div>

        <section className="dashboard-panel admin-panel admin-create-user-section">
          <form className="admin-create-user-form" onSubmit={handleCreateUser}>
            <div className="dashboard-panel-head">
              <div>
                <span>{t("dashboard.addUser")}</span>
                <strong>{t("dashboard.createUserAccount")}</strong>
              </div>
              <small>{t("dashboard.usersOnly")}</small>
            </div>

            <p className="mb-0 text-sm text-white/75">
              {t("dashboard.createUserHint")}
            </p>

            {createMessage ? <div className="form-alert mt-3">{createMessage}</div> : null}

            <div className="row g-3 mt-1">
              <div className="col-md-6 col-xl-3">
                <label className="form-label" htmlFor="createFirstName">
                  {t("auth.fields.firstName")}
                </label>
                <input
                  id="createFirstName"
                  name="firstName"
                  className="form-control app-form-control"
                  type="text"
                  value={createState.firstName}
                  onChange={handleCreateChange}
                  placeholder={t("auth.signup.firstNamePlaceholder")}
                />
              </div>
              <div className="col-md-6 col-xl-3">
                <label className="form-label" htmlFor="createLastName">
                  {t("auth.fields.lastName")}
                </label>
                <input
                  id="createLastName"
                  name="lastName"
                  className="form-control app-form-control"
                  type="text"
                  value={createState.lastName}
                  onChange={handleCreateChange}
                  placeholder={t("auth.signup.lastNamePlaceholder")}
                />
              </div>
              <div className="col-xl-6">
                <label className="form-label" htmlFor="createEmail">
                  {t("auth.fields.email")}
                </label>
                <input
                  id="createEmail"
                  name="email"
                  className="form-control app-form-control"
                  type="email"
                  value={createState.email}
                  onChange={handleCreateChange}
                  placeholder={t("auth.signup.emailPlaceholder")}
                />
              </div>
              <div className="col-md-6 col-xl-3">
                <label className="form-label" htmlFor="createCountry">
                  {t("auth.fields.country")}
                </label>
                <select
                  id="createCountry"
                  name="country"
                  className="form-select app-form-control"
                  value={createState.country}
                  onChange={handleCreateChange}
                >
                  {countryOptions.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 col-xl-3">
                <label className="form-label" htmlFor="createPassword">
                  {t("auth.fields.password")}
                </label>
                <input
                  id="createPassword"
                  name="password"
                  className="form-control app-form-control"
                  type="password"
                  value={createState.password}
                  onChange={handleCreateChange}
                  placeholder={t("auth.signup.passwordPlaceholder")}
                />
              </div>
            </div>

            <div className="d-flex flex-wrap gap-3 mt-3">
              <button type="submit" className="btn app-btn-primary">
                {t("dashboard.addUser")}
              </button>
              <button
                type="button"
                className="btn app-btn-ghost"
                onClick={handleCreateReset}
              >
                {t("dashboard.clearForm")}
              </button>
            </div>
          </form>
        </section>

        <section className="dashboard-panel admin-panel">
          <div className="dashboard-panel-head">
            <div>
              <span>{t("dashboard.userManagement")}</span>
              <strong>{t("dashboard.editDeleteBlock")}</strong>
            </div>
            <small>{t("dashboard.adminOnly")}</small>
          </div>

          {editorMessage ? <div className="form-alert">{editorMessage}</div> : null}

          <div className="management-grid">
            <div className="user-table-wrap">
              <div className="user-table-head">
                <span>{t("dashboard.tableUser")}</span>
                <span>{t("dashboard.tableStatus")}</span>
                <span>{t("dashboard.tableLastLogin")}</span>
                <span>{t("dashboard.tableActions")}</span>
              </div>

              {filteredUsers.map((user) => (
                <article
                  key={user.id}
                  className={`user-row ${selectedUser?.id === user.id ? "is-selected" : ""}`}
                >
                  <button
                    type="button"
                    className="user-row-main"
                    onClick={() => setSelectedUserId(user.id)}
                  >
                    <span className="profile-avatar">{getInitials(user)}</span>
                    <div>
                      <strong>
                        {user.firstName} {user.lastName}
                      </strong>
                      <small>{`${user.email} | ${getRoleLabel(user.role)}`}</small>
                    </div>
                  </button>
                  <span className={`status-badge status-${user.status}`}>
                    {getStatusLabel(user.status)}
                  </span>
                  <small className="user-row-date">
                    {user.lastLoginAt
                      ? formatShortDate(user.lastLoginAt, locale)
                      : t("dashboard.never")}
                  </small>
                  <div className="user-row-actions">
                    <button
                      type="button"
                      className="btn app-btn-ghost btn-sm"
                      onClick={() => setSelectedUserId(user.id)}
                    >
                      {t("dashboard.edit")}
                    </button>
                    <button
                      type="button"
                      className="btn app-btn-ghost btn-sm"
                      disabled={user.role === "admin"}
                      onClick={() => handleBlockToggle(user.id)}
                    >
                      {user.status === "blocked"
                        ? t("dashboard.unblock")
                        : t("dashboard.block")}
                    </button>
                    <button
                      type="button"
                      className="btn app-btn-danger btn-sm"
                      disabled={user.role === "admin"}
                      onClick={() => handleUserDelete(user.id)}
                    >
                      {t("dashboard.delete")}
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <form className="user-editor-card" onSubmit={handleUserSave}>
                <div className="dashboard-panel-head">
                  <div>
                    <span>{t("dashboard.selectedUser")}</span>
                    <strong>
                      {selectedUser
                        ? `${selectedUser.firstName} ${selectedUser.lastName}`
                        : t("dashboard.noMatchingUser")}
                    </strong>
                  </div>
                  {selectedUser ? (
                    <small>
                      {selectedUser.role === "admin"
                        ? t("dashboard.protectedAdmin")
                        : t("dashboard.editableAccount")}
                    </small>
                  ) : null}
                </div>

                {selectedUser ? (
                  <>
                    <div className="row g-3">
                      <div className="col-sm-6">
                        <label className="form-label" htmlFor="editFirstName">
                          {t("auth.fields.firstName")}
                        </label>
                        <input
                          id="editFirstName"
                          name="firstName"
                          className="form-control app-form-control"
                          type="text"
                          value={editorState.firstName}
                          onChange={handleEditorChange}
                        />
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label" htmlFor="editLastName">
                          {t("auth.fields.lastName")}
                        </label>
                        <input
                          id="editLastName"
                          name="lastName"
                          className="form-control app-form-control"
                          type="text"
                          value={editorState.lastName}
                          onChange={handleEditorChange}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label" htmlFor="editEmail">
                          {t("auth.fields.email")}
                        </label>
                        <input
                          id="editEmail"
                          name="email"
                          className="form-control app-form-control"
                          type="email"
                          value={editorState.email}
                          onChange={handleEditorChange}
                        />
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label" htmlFor="editCountry">
                          {t("auth.fields.country")}
                        </label>
                        <input
                          id="editCountry"
                          name="country"
                          className="form-control app-form-control"
                          type="text"
                          value={editorState.country}
                          onChange={handleEditorChange}
                        />
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label" htmlFor="editStatus">
                          {t("dashboard.tableStatus")}
                        </label>
                        <select
                          id="editStatus"
                          name="status"
                          className="form-select app-form-control"
                          value={editorState.status}
                          onChange={handleEditorChange}
                          disabled={selectedUser.role === "admin"}
                        >
                          <option value="active">{t("status.active")}</option>
                          <option value="inactive">{t("status.inactive")}</option>
                          <option value="blocked">{t("status.blocked")}</option>
                        </select>
                      </div>
                    </div>

                    <div className="editor-meta">
                      <small>
                        {t("dashboard.registeredOn", {
                          date: formatDateTime(selectedUser.createdAt, locale),
                        })}
                      </small>
                      <small>
                        {selectedUser.lastLoginAt
                          ? t("dashboard.lastLoginOn", {
                              date: formatDateTime(selectedUser.lastLoginAt, locale),
                            })
                          : t("dashboard.lastLoginNever")}
                      </small>
                    </div>

                    <div className="d-flex flex-wrap gap-3">
                      <button type="submit" className="btn app-btn-primary">
                        {t("dashboard.saveChanges")}
                      </button>
                      <button
                        type="button"
                        className="btn app-btn-ghost"
                        disabled={selectedUser.role === "admin"}
                        onClick={() => handleBlockToggle(selectedUser.id)}
                      >
                        {selectedUser.status === "blocked"
                          ? t("dashboard.unblockUser")
                          : t("dashboard.blockUser")}
                      </button>
                      <button
                        type="button"
                        className="btn app-btn-danger"
                        disabled={selectedUser.role === "admin"}
                        onClick={() => handleUserDelete(selectedUser.id)}
                      >
                        {t("dashboard.deleteUser")}
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="user-editor-empty">
                    {t("dashboard.adjustSearch")}
                  </p>
                )}
            </form>
          </div>
        </section>
      </div>
    </section>
  );
}
