import { createContext, useContext, useEffect, useState } from "react";
import { useLocale } from "./LocaleContext";

const STORE_KEY = "enkonix-admin-store-v2";
const SESSION_KEY = "enkonix-current-user-id-v2";
const STORE_VERSION = 3;
const ADMIN_EMAIL = "admin@aarya.enkonix.com";
const DUMMY_USER_IDS = new Set([
  "user-james",
  "user-priya",
  "user-mateo",
  "user-lena",
  "user-omar",
  "user-nina",
]);
const DUMMY_USER_EMAILS = new Set([
  "james@enkonix.com",
  "priya@enkonix.com",
  "mateo@enkonix.com",
  "lena@enkonix.com",
  "omar@enkonix.com",
  "nina@enkonix.com",
]);

const AuthContext = createContext(null);

function createId(prefix) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function isoDate({ daysAgo = 0, monthsAgo = 0, hoursAgo = 0 }) {
  const date = new Date();

  if (monthsAgo) {
    date.setMonth(date.getMonth() - monthsAgo);
  }

  if (daysAgo) {
    date.setDate(date.getDate() - daysAgo);
  }

  if (hoursAgo) {
    date.setHours(date.getHours() - hoursAgo);
  }

  return date.toISOString();
}

function historyFromOffsets(offsets) {
  return offsets.map((offset) => isoDate({ daysAgo: offset }));
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function canonicalizeEmail(email) {
  const normalizedEmail = normalizeEmail(email);

  if (
    normalizedEmail === ADMIN_EMAIL ||
    normalizedEmail === "admin@enkonix.com"
  ) {
    return ADMIN_EMAIL;
  }

  return normalizedEmail;
}

function sanitizeUser(user) {
  if (!user) {
    return null;
  }

  const { password, ...safeUser } = user;

  return safeUser;
}

function sortUsers(users) {
  return [...users].sort(
    (left, right) => new Date(right.createdAt) - new Date(left.createdAt),
  );
}

function buildDisplayName(firstName, lastName) {
  return [firstName, lastName].filter(Boolean).join(" ");
}

function isLegacyRemovedUser(user) {
  if (!user) {
    return false;
  }

  const normalizedEmail = normalizeEmail(user.email ?? "");
  const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`
    .trim()
    .toLowerCase();

  return (
    user.id === "user-sara" ||
    normalizedEmail === "hibu@enkonix.com" ||
    normalizedEmail === "sara@enkonix.com" ||
    normalizedEmail === "divyesh@enkonix.com" ||
    fullName === "hibu" ||
    fullName === "sara khan" ||
    fullName === "divyesh v"
  );
}

function isDummySeededUser(user) {
  if (!user) {
    return false;
  }

  return (
    DUMMY_USER_IDS.has(user.id) ||
    DUMMY_USER_EMAILS.has(normalizeEmail(user.email ?? ""))
  );
}

function migrateUser(user) {
  if (!user) {
    return user;
  }

  const normalizedEmail = canonicalizeEmail(user.email ?? "");

  if (user.id === "admin-primary" || normalizedEmail === ADMIN_EMAIL) {
    return {
      ...user,
      firstName: "Aarya",
      lastName: "Bharadwaj P",
      email: ADMIN_EMAIL,
    };
  }

  return user;
}

function migrateStore(store) {
  return {
    ...store,
    version: STORE_VERSION,
    users: store.users
      .filter((user) => !isLegacyRemovedUser(user) && !isDummySeededUser(user))
      .map(migrateUser),
    notifications: store.version === STORE_VERSION ? store.notifications : [],
  };
}

function createInitialStore() {
  const users = [
    {
      id: "admin-primary",
      firstName: "Aarya",
      lastName: "Bharadwaj P",
      email: ADMIN_EMAIL,
      password: "Admin@123",
      country: "India",
      role: "admin",
      status: "active",
      createdAt: isoDate({ monthsAgo: 8, daysAgo: 4 }),
      updatedAt: isoDate({ daysAgo: 1 }),
      lastLoginAt: isoDate({ hoursAgo: 3 }),
      loginCount: 58,
      loginHistory: historyFromOffsets([0, 1, 2, 4, 6, 9, 12, 18]),
    },
  ];

  return {
    version: STORE_VERSION,
    users,
    notifications: [],
  };
}

function loadStore() {
  if (typeof window === "undefined") {
    return createInitialStore();
  }

  try {
    const rawStore = window.localStorage.getItem(STORE_KEY);

    if (!rawStore) {
      return createInitialStore();
    }

    const parsedStore = JSON.parse(rawStore);

    if (!parsedStore?.users || !parsedStore?.notifications) {
      return createInitialStore();
    }

    return migrateStore(parsedStore);
  } catch {
    return createInitialStore();
  }
}

function loadSession() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(SESSION_KEY);
}

function createNotification(title, message, tone = "neutral") {
  return {
    id: createId("note"),
    title,
    message,
    tone,
    createdAt: new Date().toISOString(),
  };
}

export function AuthProvider({ children }) {
  const { t } = useLocale();
  const [store, setStore] = useState(loadStore);
  const [currentUserId, setCurrentUserId] = useState(loadSession);

  const currentUserRecord =
    store.users.find((user) => user.id === currentUserId) ?? null;

  useEffect(() => {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(store));
  }, [store]);

  useEffect(() => {
    if (currentUserId) {
      window.localStorage.setItem(SESSION_KEY, currentUserId);
    } else {
      window.localStorage.removeItem(SESSION_KEY);
    }
  }, [currentUserId]);

  useEffect(() => {
    if (!currentUserId) {
      return;
    }

    if (!currentUserRecord || currentUserRecord.status === "blocked") {
      setCurrentUserId(null);
    }
  }, [currentUserId, currentUserRecord]);

  function login({ email, password, mode }) {
    if (!email.trim() || !password.trim()) {
      return {
        ok: false,
        message: t("auth.feedback.enterCredentials"),
      };
    }

    const normalizedEmail = canonicalizeEmail(email);
    const matchedUser = store.users.find(
      (user) => canonicalizeEmail(user.email) === normalizedEmail,
    );

    if (!matchedUser) {
      return {
        ok: false,
        message: t("auth.feedback.accountNotFound"),
      };
    }

    if (matchedUser.status === "blocked") {
      return {
        ok: false,
        message: t("auth.feedback.blockedAccount"),
      };
    }

    if (mode === "admin" && matchedUser.role !== "admin") {
      return {
        ok: false,
        message: t("auth.feedback.useUserLogin"),
      };
    }

    if (mode === "user" && matchedUser.role === "admin") {
      return {
        ok: false,
        message: t("auth.feedback.useAdminLogin"),
      };
    }

    if (matchedUser.password !== password) {
      return {
        ok: false,
        message: t("auth.feedback.invalidPassword"),
      };
    }

    const now = new Date().toISOString();
    const fullName = buildDisplayName(matchedUser.firstName, matchedUser.lastName);

    setStore((previousStore) => ({
      ...previousStore,
      users: previousStore.users.map((user) =>
        user.id === matchedUser.id
          ? {
              ...user,
              status: user.status === "inactive" ? "active" : user.status,
              updatedAt: now,
              lastLoginAt: now,
              loginCount: user.loginCount + 1,
              loginHistory: [now, ...user.loginHistory].slice(0, 24),
            }
          : user,
      ),
      notifications: [
        createNotification(
          t("notifications.successfulLoginTitle"),
          t("notifications.successfulLoginMessage", {
            name: fullName,
            mode: t(`auth.modes.${mode}`),
          }),
          "info",
        ),
        ...previousStore.notifications,
      ].slice(0, 18),
    }));

    setCurrentUserId(matchedUser.id);

    return {
      ok: true,
      message: t("auth.feedback.loginSuccessful"),
      role: matchedUser.role,
    };
  }

  function register(payload) {
    if (
      !payload.firstName.trim() ||
      !payload.lastName.trim() ||
      !payload.email.trim() ||
      !payload.country.trim() ||
      !payload.password.trim()
    ) {
      return {
        ok: false,
        message: t("auth.feedback.completeRegistration"),
      };
    }

    if (payload.password.trim().length < 6) {
      return {
        ok: false,
        message: t("auth.feedback.shortPassword"),
      };
    }

    const normalizedEmail = canonicalizeEmail(payload.email);
    const matchingUser = store.users.find(
      (user) => canonicalizeEmail(user.email) === normalizedEmail,
    );

    if (matchingUser?.status === "blocked") {
      return {
        ok: false,
        message: t("auth.feedback.blockedRegistration"),
      };
    }

    if (matchingUser) {
      return {
        ok: false,
        message: t("auth.feedback.accountExists"),
      };
    }

    const now = new Date().toISOString();
    const newUser = {
      id: createId("user"),
      firstName: payload.firstName.trim(),
      lastName: payload.lastName.trim(),
      email: normalizedEmail,
      password: payload.password,
      country: payload.country.trim(),
      role: "user",
      status: "active",
      createdAt: now,
      updatedAt: now,
      lastLoginAt: null,
      loginCount: 0,
      loginHistory: [],
    };
    const fullName = buildDisplayName(newUser.firstName, newUser.lastName);

    setStore((previousStore) => ({
      ...previousStore,
      users: sortUsers([newUser, ...previousStore.users]),
      notifications: [
        createNotification(
          t("notifications.newRegistrationTitle"),
          t("notifications.newRegistrationMessage", { name: fullName }),
          "info",
        ),
        ...previousStore.notifications,
      ].slice(0, 18),
    }));

    return {
      ok: true,
      message: t("auth.feedback.accountCreated"),
      role: "user",
      email: newUser.email,
    };
  }

  function createUser(payload) {
    if (
      !payload.firstName.trim() ||
      !payload.lastName.trim() ||
      !payload.email.trim() ||
      !payload.country.trim() ||
      !payload.password.trim()
    ) {
      return {
        ok: false,
        message: t("auth.feedback.completeRegistration"),
      };
    }

    if (payload.password.trim().length < 6) {
      return {
        ok: false,
        message: t("auth.feedback.shortPassword"),
      };
    }

    const normalizedEmail = canonicalizeEmail(payload.email);
    const matchingUser = store.users.find(
      (user) => canonicalizeEmail(user.email) === normalizedEmail,
    );

    if (matchingUser?.status === "blocked") {
      return {
        ok: false,
        message: t("auth.feedback.blockedRegistration"),
      };
    }

    if (matchingUser) {
      return {
        ok: false,
        message: t("auth.feedback.accountExists"),
      };
    }

    const now = new Date().toISOString();
    const newUser = {
      id: createId("user"),
      firstName: payload.firstName.trim(),
      lastName: payload.lastName.trim(),
      email: normalizedEmail,
      password: payload.password,
      country: payload.country.trim(),
      role: "user",
      status: "active",
      createdAt: now,
      updatedAt: now,
      lastLoginAt: null,
      loginCount: 0,
      loginHistory: [],
    };
    const fullName = buildDisplayName(newUser.firstName, newUser.lastName);

    setStore((previousStore) => ({
      ...previousStore,
      users: sortUsers([newUser, ...previousStore.users]),
      notifications: [
        createNotification(
          t("notifications.userCreatedTitle"),
          t("notifications.userCreatedMessage", { name: fullName }),
          "info",
        ),
        ...previousStore.notifications,
      ].slice(0, 18),
    }));

    return {
      ok: true,
      message: t("auth.feedback.userCreatedSuccessfully"),
      role: "user",
      userId: newUser.id,
    };
  }

  function requestPasswordReset(email) {
    if (!email.trim()) {
      return {
        ok: false,
        message: t("auth.feedback.forgotEmailRequired"),
      };
    }

    const normalizedEmail = canonicalizeEmail(email);
    const matchedUser = store.users.find(
      (user) => canonicalizeEmail(user.email) === normalizedEmail,
    );

    if (!matchedUser) {
      return {
        ok: false,
        message: t("auth.feedback.accountNotFound"),
      };
    }

    if (matchedUser.status === "blocked") {
      return {
        ok: false,
        message: t("auth.feedback.blockedAccount"),
      };
    }

    return {
      ok: true,
      email: matchedUser.email,
      message: t("auth.feedback.resetRequestAccepted"),
    };
  }

  function resetPassword({ email, password, confirmPassword }) {
    if (!email.trim()) {
      return {
        ok: false,
        message: t("auth.feedback.resetRequestExpired"),
      };
    }

    if (!password.trim() || !confirmPassword.trim()) {
      return {
        ok: false,
        message: t("auth.feedback.completePasswordReset"),
      };
    }

    if (password !== confirmPassword) {
      return {
        ok: false,
        message: t("auth.feedback.passwordsDoNotMatch"),
      };
    }

    if (password.trim().length < 6) {
      return {
        ok: false,
        message: t("auth.feedback.shortPassword"),
      };
    }

    const normalizedEmail = canonicalizeEmail(email);
    const matchedUser = store.users.find(
      (user) => canonicalizeEmail(user.email) === normalizedEmail,
    );

    if (!matchedUser) {
      return {
        ok: false,
        message: t("auth.feedback.accountNotFound"),
      };
    }

    if (matchedUser.status === "blocked") {
      return {
        ok: false,
        message: t("auth.feedback.blockedAccount"),
      };
    }

    const now = new Date().toISOString();

    setStore((previousStore) => ({
      ...previousStore,
      users: previousStore.users.map((user) =>
        user.id === matchedUser.id
          ? {
              ...user,
              password,
              updatedAt: now,
            }
          : user,
      ),
    }));

    return {
      ok: true,
      email: matchedUser.email,
      role: matchedUser.role,
      message: t("auth.feedback.passwordResetSuccessful"),
    };
  }

  function logout() {
    setCurrentUserId(null);
  }

  function updateUser(userId, updates) {
    const existingUser = store.users.find((user) => user.id === userId);

    if (!existingUser) {
      return {
        ok: false,
        message: t("auth.feedback.userNotFound"),
      };
    }

    if (
      !updates.firstName.trim() ||
      !updates.lastName.trim() ||
      !updates.email.trim() ||
      !updates.country.trim()
    ) {
      return {
        ok: false,
        message: t("auth.feedback.allFieldsRequired"),
      };
    }

    const nextEmail = canonicalizeEmail(updates.email ?? existingUser.email);
    const emailConflict = store.users.find(
      (user) =>
        user.id !== userId && canonicalizeEmail(user.email) === nextEmail,
    );

    if (emailConflict) {
      return {
        ok: false,
        message: t("auth.feedback.emailConflict"),
      };
    }

    const now = new Date().toISOString();
    const fullName = buildDisplayName(updates.firstName.trim(), updates.lastName.trim());

    setStore((previousStore) => ({
      ...previousStore,
      users: previousStore.users.map((user) =>
        user.id === userId
          ? {
              ...user,
              firstName: updates.firstName.trim(),
              lastName: updates.lastName.trim(),
              email: nextEmail,
              country: updates.country,
              status: updates.status,
              updatedAt: now,
            }
          : user,
      ),
      notifications: [
        createNotification(
          t("notifications.userUpdatedTitle"),
          t("notifications.userUpdatedMessage", { name: fullName }),
          "neutral",
        ),
        ...previousStore.notifications,
      ].slice(0, 18),
    }));

    return {
      ok: true,
      message: t("auth.feedback.userDetailsUpdated"),
    };
  }

  function toggleUserBlock(userId) {
    const targetUser = store.users.find((user) => user.id === userId);

    if (!targetUser) {
      return {
        ok: false,
        message: t("auth.feedback.userNotFound"),
      };
    }

    if (targetUser.role === "admin") {
      return {
        ok: false,
        message: t("auth.feedback.adminCannotBeBlocked"),
      };
    }

    const nextStatus = targetUser.status === "blocked" ? "active" : "blocked";
    const now = new Date().toISOString();
    const fullName = buildDisplayName(targetUser.firstName, targetUser.lastName);

    setStore((previousStore) => ({
      ...previousStore,
      users: previousStore.users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: nextStatus,
              updatedAt: now,
            }
          : user,
      ),
      notifications: [
        createNotification(
          t(
            nextStatus === "blocked"
              ? "notifications.userBlockedTitle"
              : "notifications.userUnblockedTitle",
          ),
          t("notifications.userStatusMessage", {
            name: fullName,
            status: t(`status.${nextStatus}`),
          }),
          nextStatus === "blocked" ? "warning" : "info",
        ),
        ...previousStore.notifications,
      ].slice(0, 18),
    }));

    if (userId === currentUserId && nextStatus === "blocked") {
      setCurrentUserId(null);
    }

    return {
      ok: true,
      message:
        nextStatus === "blocked"
          ? t("auth.feedback.userBlockedSuccessfully")
          : t("auth.feedback.userUnblockedSuccessfully"),
    };
  }

  function deleteUser(userId) {
    const targetUser = store.users.find((user) => user.id === userId);

    if (!targetUser) {
      return {
        ok: false,
        message: t("auth.feedback.userNotFound"),
      };
    }

    if (targetUser.role === "admin") {
      return {
        ok: false,
        message: t("auth.feedback.adminCannotBeDeleted"),
      };
    }
    const fullName = buildDisplayName(targetUser.firstName, targetUser.lastName);

    setStore((previousStore) => ({
      ...previousStore,
      users: previousStore.users.filter((user) => user.id !== userId),
      notifications: [
        createNotification(
          t("notifications.userDeletedTitle"),
          t("notifications.userDeletedMessage", { name: fullName }),
          "warning",
        ),
        ...previousStore.notifications,
      ].slice(0, 18),
    }));

    if (userId === currentUserId) {
      setCurrentUserId(null);
    }

    return {
      ok: true,
      message: t("auth.feedback.userRemovedPermanently"),
    };
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser: sanitizeUser(currentUserRecord),
        isAuthenticated: Boolean(currentUserRecord),
        isAdmin: currentUserRecord?.role === "admin",
        users: sortUsers(store.users).map(sanitizeUser),
        notifications: [...store.notifications].sort(
          (left, right) => new Date(right.createdAt) - new Date(left.createdAt),
        ),
        login,
        register,
        createUser,
        requestPasswordReset,
        resetPassword,
        logout,
        updateUser,
        deleteUser,
        toggleUserBlock,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
