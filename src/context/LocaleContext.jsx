import { createContext, useContext, useEffect, useState } from "react";

const LOCALE_KEY = "enkonix-locale";

const LOCALE_OPTIONS = [
  { value: "en", label: "English", dir: "ltr" },
  { value: "ar", label: "العربية", dir: "rtl" },
  { value: "he", label: "עברית", dir: "rtl" },
];

const translations = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      login: "Login",
      signUp: "Sign up",
      administrator: "Administrator",
      userAccount: "User account",
      adminDashboard: "Admin Dashboard",
      logout: "Logout",
      language: "Language",
      toggleNavigation: "Toggle navigation",
    },
    theme: {
      light: "Light",
      dark: "Dark",
      switchTo: "Switch to {{theme}} mode",
    },
    authShell: {
      kicker: "Secure access",
      headline: "Crafting digital solutions that makes life easier",
      note: "Clean onboarding, faster approvals, and dependable account workflows.",
    },
    stats: {
      items: [
        { value: "5k+", label: "Happy Customers" },
        { value: "6.5k+", label: "Projects Completed" },
        { value: "205+", label: "Awards Winning" },
        { value: "4k+", label: "Partners" },
      ],
    },
    home: {
      highlights: [
        { label: "Kickoff", value: "Get in touch", cta: true },
        { label: "Stack", value: "Tailwind + Bootstrap" },
        { label: "Delivery", value: "Launch-ready sprints" },
        { label: "Pricing", value: "Flexible project plans" },
      ],
      heroKicker: "Launch smarter",
      heroTitleLine1: "Full-stack solutions,",
      heroTitleLine2: "Built right",
      heroCopy:
        "Scalable product engineering, cloud-native delivery, and modern product experiences tailored for teams that need momentum fast.",
      openAdminDashboard: "Open admin dashboard",
      exploreServices: "Explore services",
      getStarted: "Get started",
      viewServices: "View services",
      projectBrief: "Project brief",
      deviceCopy: "Clear scope, aligned delivery, and launch-ready execution.",
    },
    services: {
      eyebrow: "Built for scale",
      title: "Crafting digital solutions that makes life easier",
      copy:
        "Cross-functional delivery across product strategy, cloud architecture, AI enablement, and polished customer-facing interfaces.",
      openAdminDashboard: "Open admin dashboard",
      returnHome: "Return home",
      startProject: "Start a project",
      cardLabel: "Service",
      items: [
        {
          title: "AI & Data Science",
          summary:
            "Applied intelligence for forecasting, workflow automation, and better decision-making.",
        },
        {
          title: "Cloud Solutions",
          summary:
            "Reliable infrastructure, scalable deployment pipelines, and production-grade architecture.",
        },
        {
          title: "App Development",
          summary:
            "Clean product experiences for internal tools, customer platforms, and mobile-ready workflows.",
        },
        {
          title: "Web Development",
          summary:
            "Fast, accessible interfaces with maintainable systems and polished front-end delivery.",
        },
      ],
    },
    auth: {
      fields: {
        email: "Email",
        password: "Password",
        firstName: "First name",
        lastName: "Last name",
        country: "Country",
        newPassword: "New password",
        confirmPassword: "Confirm password",
      },
      login: {
        title: "Log in to your account",
        subtitle: "Welcome back. Sign in as a user or switch to the admin access flow.",
        footerPrefix: "Don't have an account?",
        footerCta: "Create account",
        userTab: "User Login",
        adminTab: "Admin Login",
        divider: "sign in with your email",
        emailPlaceholder: "name@example.com",
        passwordPlaceholder: "Enter your password",
        rememberMe: "Remember me",
        forgotPassword: "Forgot password?",
        submit: "Login",
      },
      signup: {
        title: "Create an account",
        subtitle: "Create a user account. Admin access is managed separately from the login screen.",
        footerPrefix: "Already have an account?",
        footerCta: "Log in",
        firstNamePlaceholder: "Alex",
        lastNamePlaceholder: "Smith",
        emailPlaceholder: "name@example.com",
        passwordPlaceholder: "Enter your password",
        terms: "I agree to the privacy policy and product updates.",
        submit: "Create account",
      },
      forgot: {
        title: "Forgot your password?",
        subtitle: "Enter the email associated with your account.",
        footerCta: "Try another way?",
        emailPlaceholder: "Enter email address",
        submit: "Send",
      },
      reset: {
        title: "Reset your password",
        subtitle: "Enter your new credential and confirm your account.",
        footerCta: "Try another way?",
        passwordPlaceholder: "Enter your new password",
        confirmPasswordPlaceholder: "Confirm your password",
        submit: "Save",
      },
      modes: {
        admin: "admin",
        user: "user",
      },
      feedback: {
        enterCredentials: "Enter both your email and password to continue.",
        accountNotFound: "We couldn't find an account with that email.",
        blockedAccount: "This account is blocked. Please contact the administrator.",
        useUserLogin: "Use the user login tab for standard user accounts.",
        useAdminLogin: "Use the admin login tab for administrator access.",
        invalidPassword: "The password you entered is incorrect.",
        loginSuccessful: "Login successful.",
        completeRegistration: "Complete all registration fields before creating an account.",
        shortPassword: "Use a password with at least 6 characters.",
        blockedRegistration:
          "This email is blocked and cannot be used for registration until it is unblocked.",
        accountExists: "An account with that email already exists.",
        accountCreated: "Account created successfully.",
        userNotFound: "That user could not be found.",
        allFieldsRequired: "All user fields are required before saving changes.",
        emailConflict: "Another account is already using that email.",
        userDetailsUpdated: "User details updated.",
        userCreatedSuccessfully: "User account created successfully.",
        adminCannotBeBlocked: "Primary admin accounts cannot be blocked.",
        userBlockedSuccessfully: "User blocked successfully.",
        userUnblockedSuccessfully: "User unblocked successfully.",
        adminCannotBeDeleted: "Primary admin accounts cannot be deleted.",
        userRemovedPermanently: "User removed permanently.",
      },
    },
    dashboard: {
      confirmDelete: "Delete this user permanently? This action cannot be undone.",
      adminControlCenter: "Admin control center",
      title: "ENKONIX admin dashboard",
      copy: "Manage registrations, user access, account health, and growth from one responsive workspace.",
      totalUsersCount: "Total Users Count",
      registeredUsers: "Registered users",
      activeVsInactive: "Active vs Inactive",
      activeInactiveSummary: "Active / Inactive",
      blockedAccounts: "Blocked Accounts",
      registrationDisabled: "Registration disabled",
      userAnalytics: "User Analytics",
      averageLogins: "Average logins per user",
      userActivity: "User activity",
      weeklyLogins: "Bar graph for weekly logins",
      totalSignInsTracked: "{{count}} total sign-ins tracked",
      notifications: "Notifications",
      notificationsPanel: "Notifications panel",
      recentEvents: "{{count}} recent events",
      noNotifications: "No notifications yet.",
      monthlyGrowthReports: "Monthly growth reports",
      registrationGrowth: "Registration growth over six months",
      recentSignupsShown: "{{count}} most recent signups shown",
      recentRegistrations: "Recent registrations",
      newestAccounts: "Newest user accounts",
      sortedByRegistrationTime: "Sorted by registration time",
      activeInactiveUsers: "Active vs inactive users",
      accountHealthSummary: "Account health summary",
      statusDistribution: "Status distribution",
      searchFilters: "Search & filters",
      refineUserList: "Refine the user list",
      matchingAccounts: "{{count}} matching accounts",
      searchPlaceholder: "Search by name, email, or country",
      allStatuses: "All statuses",
      usersOnly: "Users only",
      allRoles: "All roles",
      adminsOnly: "Admins only",
      userManagement: "User management",
      editDeleteBlock: "Edit, delete, and block accounts",
      addUser: "Add user",
      createUserAccount: "Create a user account",
      createUserHint:
        "Set the credentials below. The new user can sign in with this email and password right away.",
      clearForm: "Clear form",
      adminOnly: "Dashboard only for admin",
      tableUser: "User",
      tableStatus: "Status",
      tableLastLogin: "Last login",
      tableActions: "Actions",
      never: "Never",
      edit: "Edit",
      block: "Block",
      unblock: "Unblock",
      delete: "Delete",
      selectedUser: "Selected user",
      noMatchingUser: "No matching user",
      protectedAdmin: "Protected admin",
      editableAccount: "Editable account",
      registeredOn: "Registered {{date}}",
      lastLoginOn: "Last login {{date}}",
      lastLoginNever: "Last login never",
      saveChanges: "Save Changes",
      blockUser: "Block User",
      unblockUser: "Unblock User",
      deleteUser: "Delete User",
      adjustSearch:
        "Adjust your search or filter settings to manage a user account.",
    },
    roles: {
      admin: "Admin",
      user: "User",
    },
    status: {
      active: "Active",
      inactive: "Inactive",
      blocked: "Blocked",
    },
    countries: {
      unitedStates: "United States",
      india: "India",
      unitedKingdom: "United Kingdom",
      germany: "Germany",
      brazil: "Brazil",
      unitedArabEmirates: "United Arab Emirates",
    },
    notifications: {
      successfulLoginTitle: "Successful login",
      successfulLoginMessage: "{{name}} signed in via {{mode}} login.",
      newRegistrationTitle: "New registration",
      newRegistrationMessage: "{{name}} registered a new user account.",
      userCreatedTitle: "User created",
      userCreatedMessage: "{{name}} was added by the admin.",
      userUpdatedTitle: "User updated",
      userUpdatedMessage: "{{name}} was updated by the admin.",
      userBlockedTitle: "User blocked",
      userUnblockedTitle: "User unblocked",
      userStatusMessage: "{{name}} is now {{status}}.",
      userDeletedTitle: "User deleted",
      userDeletedMessage: "{{name}} was permanently deleted.",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      services: "الخدمات",
      login: "تسجيل الدخول",
      signUp: "إنشاء حساب",
      administrator: "مسؤول",
      userAccount: "حساب مستخدم",
      adminDashboard: "لوحة تحكم المسؤول",
      logout: "تسجيل الخروج",
      language: "اللغة",
      toggleNavigation: "تبديل التنقل",
    },
    theme: {
      light: "فاتح",
      dark: "داكن",
      switchTo: "التبديل إلى الوضع {{theme}}",
    },
    authShell: {
      kicker: "وصول آمن",
      headline: "نصنع حلولًا رقمية تجعل الحياة أسهل",
      note: "تهيئة نظيفة، موافقات أسرع، وسير عمل حسابات موثوق.",
    },
    stats: {
      items: [
        { value: "5k+", label: "عملاء سعداء" },
        { value: "6.5k+", label: "مشاريع مكتملة" },
        { value: "205+", label: "جوائز محققة" },
        { value: "4k+", label: "شركاء" },
      ],
    },
    home: {
      highlights: [
        { label: "الانطلاق", value: "تواصل معنا", cta: true },
        { label: "التقنية", value: "Tailwind + Bootstrap" },
        { label: "التسليم", value: "سباقات جاهزة للإطلاق" },
        { label: "الأسعار", value: "خطط مشاريع مرنة" },
      ],
      heroKicker: "أطلق بذكاء",
      heroTitleLine1: "حلول متكاملة،",
      heroTitleLine2: "مبنية بإتقان",
      heroCopy:
        "هندسة منتجات قابلة للتوسع، وتسليم سحابي حديث، وتجارب رقمية عصرية للفرق التي تحتاج إلى سرعة وانطلاقة قوية.",
      openAdminDashboard: "افتح لوحة المسؤول",
      exploreServices: "استكشف الخدمات",
      getStarted: "ابدأ الآن",
      viewServices: "عرض الخدمات",
      projectBrief: "ملخص المشروع",
      deviceCopy: "نطاق واضح، تنفيذ منسق، وإطلاق جاهز.",
    },
    services: {
      eyebrow: "مصممة للتوسع",
      title: "نصنع حلولًا رقمية تجعل الحياة أسهل",
      copy:
        "تنفيذ متكامل يشمل استراتيجية المنتج، وبنية السحابة، وتمكين الذكاء الاصطناعي، وواجهات مميزة موجهة للعملاء.",
      openAdminDashboard: "افتح لوحة المسؤول",
      returnHome: "العودة للرئيسية",
      startProject: "ابدأ مشروعًا",
      cardLabel: "خدمة",
      items: [
        {
          title: "الذكاء الاصطناعي وعلوم البيانات",
          summary: "ذكاء تطبيقي للتنبؤ، وأتمتة سير العمل، وتحسين اتخاذ القرار.",
        },
        {
          title: "حلول سحابية",
          summary: "بنية موثوقة، ومسارات نشر قابلة للتوسع، وهندسة جاهزة للإنتاج.",
        },
        {
          title: "تطوير التطبيقات",
          summary: "تجارب منتج نظيفة للأدوات الداخلية، ومنصات العملاء، وسير العمل الجاهز للجوال.",
        },
        {
          title: "تطوير الويب",
          summary: "واجهات سريعة وسهلة الوصول مع أنظمة قابلة للصيانة وتسليم أمامي متقن.",
        },
      ],
    },
    auth: {
      fields: {
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        firstName: "الاسم الأول",
        lastName: "اسم العائلة",
        country: "الدولة",
        newPassword: "كلمة المرور الجديدة",
        confirmPassword: "تأكيد كلمة المرور",
      },
      login: {
        title: "سجل الدخول إلى حسابك",
        subtitle: "مرحبًا بعودتك. سجّل الدخول كمستخدم أو انتقل إلى مسار وصول المسؤول.",
        footerPrefix: "ليس لديك حساب؟",
        footerCta: "أنشئ حسابًا",
        userTab: "دخول المستخدم",
        adminTab: "دخول المسؤول",
        divider: "سجل الدخول باستخدام بريدك الإلكتروني",
        emailPlaceholder: "name@example.com",
        passwordPlaceholder: "أدخل كلمة المرور",
        rememberMe: "تذكرني",
        forgotPassword: "هل نسيت كلمة المرور؟",
        submit: "تسجيل الدخول",
      },
      signup: {
        title: "إنشاء حساب",
        subtitle: "أنشئ حساب مستخدم. وصول المسؤول يُدار بشكل منفصل من شاشة تسجيل الدخول.",
        footerPrefix: "لديك حساب بالفعل؟",
        footerCta: "سجل الدخول",
        firstNamePlaceholder: "أليكس",
        lastNamePlaceholder: "سميث",
        emailPlaceholder: "name@example.com",
        passwordPlaceholder: "أدخل كلمة المرور",
        terms: "أوافق على سياسة الخصوصية وتحديثات المنتج.",
        submit: "إنشاء حساب",
      },
      forgot: {
        title: "هل نسيت كلمة المرور؟",
        subtitle: "أدخل البريد الإلكتروني المرتبط بحسابك.",
        footerCta: "جرّب طريقة أخرى؟",
        emailPlaceholder: "أدخل عنوان البريد الإلكتروني",
        submit: "إرسال",
      },
      reset: {
        title: "أعد تعيين كلمة المرور",
        subtitle: "أدخل كلمة المرور الجديدة وأكد الحساب.",
        footerCta: "جرّب طريقة أخرى؟",
        passwordPlaceholder: "أدخل كلمة المرور الجديدة",
        confirmPasswordPlaceholder: "أكد كلمة المرور",
        submit: "حفظ",
      },
      modes: {
        admin: "المسؤول",
        user: "المستخدم",
      },
      feedback: {
        enterCredentials: "أدخل البريد الإلكتروني وكلمة المرور للمتابعة.",
        accountNotFound: "لم نتمكن من العثور على حساب بهذا البريد الإلكتروني.",
        blockedAccount: "هذا الحساب محظور. يرجى التواصل مع المسؤول.",
        useUserLogin: "استخدم تبويب دخول المستخدم للحسابات العادية.",
        useAdminLogin: "استخدم تبويب دخول المسؤول للوصول الإداري.",
        invalidPassword: "كلمة المرور التي أدخلتها غير صحيحة.",
        loginSuccessful: "تم تسجيل الدخول بنجاح.",
        completeRegistration: "أكمل جميع حقول التسجيل قبل إنشاء الحساب.",
        shortPassword: "استخدم كلمة مرور لا تقل عن 6 أحرف.",
        blockedRegistration: "هذا البريد الإلكتروني محظور ولا يمكن استخدامه للتسجيل حتى يتم إلغاء الحظر.",
        accountExists: "يوجد حساب بالفعل بهذا البريد الإلكتروني.",
        accountCreated: "تم إنشاء الحساب بنجاح.",
        userNotFound: "تعذر العثور على هذا المستخدم.",
        allFieldsRequired: "جميع حقول المستخدم مطلوبة قبل حفظ التغييرات.",
        emailConflict: "يوجد حساب آخر يستخدم هذا البريد الإلكتروني.",
        userDetailsUpdated: "تم تحديث بيانات المستخدم.",
        adminCannotBeBlocked: "لا يمكن حظر حساب المسؤول الأساسي.",
        userBlockedSuccessfully: "تم حظر المستخدم بنجاح.",
        userUnblockedSuccessfully: "تم إلغاء حظر المستخدم بنجاح.",
        adminCannotBeDeleted: "لا يمكن حذف حساب المسؤول الأساسي.",
        userRemovedPermanently: "تم حذف المستخدم نهائيًا.",
      },
    },
    dashboard: {
      confirmDelete: "هل تريد حذف هذا المستخدم نهائيًا؟ لا يمكن التراجع عن هذا الإجراء.",
      adminControlCenter: "مركز تحكم المسؤول",
      title: "لوحة تحكم ENKONIX",
      copy: "أدر التسجيلات، ووصول المستخدمين، وصحة الحسابات، والنمو من مساحة عمل واحدة متجاوبة.",
      totalUsersCount: "إجمالي عدد المستخدمين",
      registeredUsers: "المستخدمون المسجلون",
      activeVsInactive: "النشط مقابل غير النشط",
      activeInactiveSummary: "نشط / غير نشط",
      blockedAccounts: "الحسابات المحظورة",
      registrationDisabled: "التسجيل معطل",
      userAnalytics: "تحليلات المستخدم",
      averageLogins: "متوسط تسجيلات الدخول لكل مستخدم",
      userActivity: "نشاط المستخدم",
      weeklyLogins: "رسم بياني لتسجيلات الدخول الأسبوعية",
      totalSignInsTracked: "تم تتبع {{count}} عملية تسجيل دخول",
      notifications: "الإشعارات",
      notificationsPanel: "لوحة الإشعارات",
      recentEvents: "{{count}} أحداث حديثة",
      noNotifications: "لا توجد إشعارات حتى الآن.",
      monthlyGrowthReports: "تقارير النمو الشهرية",
      registrationGrowth: "نمو التسجيل خلال ستة أشهر",
      recentSignupsShown: "عرض {{count}} من أحدث التسجيلات",
      recentRegistrations: "التسجيلات الحديثة",
      newestAccounts: "أحدث حسابات المستخدمين",
      sortedByRegistrationTime: "مرتبة حسب وقت التسجيل",
      activeInactiveUsers: "المستخدمون النشطون وغير النشطين",
      accountHealthSummary: "ملخص صحة الحسابات",
      statusDistribution: "توزيع الحالات",
      searchFilters: "البحث والفلاتر",
      refineUserList: "حسّن قائمة المستخدمين",
      matchingAccounts: "{{count}} حسابات مطابقة",
      searchPlaceholder: "ابحث بالاسم أو البريد الإلكتروني أو الدولة",
      allStatuses: "كل الحالات",
      usersOnly: "المستخدمون فقط",
      allRoles: "كل الأدوار",
      adminsOnly: "المسؤولون فقط",
      userManagement: "إدارة المستخدمين",
      editDeleteBlock: "تعديل الحسابات وحظرها وحذفها",
      adminOnly: "اللوحة للمسؤول فقط",
      tableUser: "المستخدم",
      tableStatus: "الحالة",
      tableLastLogin: "آخر دخول",
      tableActions: "الإجراءات",
      never: "أبدًا",
      edit: "تعديل",
      block: "حظر",
      unblock: "إلغاء الحظر",
      delete: "حذف",
      selectedUser: "المستخدم المحدد",
      noMatchingUser: "لا يوجد مستخدم مطابق",
      protectedAdmin: "مسؤول محمي",
      editableAccount: "حساب قابل للتعديل",
      registeredOn: "تم التسجيل {{date}}",
      lastLoginOn: "آخر دخول {{date}}",
      lastLoginNever: "لم يسجل الدخول مطلقًا",
      saveChanges: "حفظ التغييرات",
      blockUser: "حظر المستخدم",
      unblockUser: "إلغاء حظر المستخدم",
      deleteUser: "حذف المستخدم",
      adjustSearch: "عدّل إعدادات البحث أو الفلاتر لإدارة حساب مستخدم.",
    },
    roles: {
      admin: "مسؤول",
      user: "مستخدم",
    },
    status: {
      active: "نشط",
      inactive: "غير نشط",
      blocked: "محظور",
    },
    countries: {
      unitedStates: "الولايات المتحدة",
      india: "الهند",
      unitedKingdom: "المملكة المتحدة",
      germany: "ألمانيا",
      brazil: "البرازيل",
      unitedArabEmirates: "الإمارات العربية المتحدة",
    },
    notifications: {
      successfulLoginTitle: "تسجيل دخول ناجح",
      successfulLoginMessage: "سجّل {{name}} الدخول عبر وضع {{mode}}.",
      newRegistrationTitle: "تسجيل جديد",
      newRegistrationMessage: "قام {{name}} بتسجيل حساب مستخدم جديد.",
      userUpdatedTitle: "تم تحديث المستخدم",
      userUpdatedMessage: "تم تحديث {{name}} بواسطة المسؤول.",
      userBlockedTitle: "تم حظر المستخدم",
      userUnblockedTitle: "تم إلغاء حظر المستخدم",
      userStatusMessage: "حالة {{name}} الآن {{status}}.",
      userDeletedTitle: "تم حذف المستخدم",
      userDeletedMessage: "تم حذف {{name}} نهائيًا.",
    },
  },
  he: {
    nav: {
      home: "בית",
      services: "שירותים",
      login: "התחברות",
      signUp: "הרשמה",
      administrator: "מנהל מערכת",
      userAccount: "חשבון משתמש",
      adminDashboard: "לוח ניהול",
      logout: "התנתקות",
      language: "שפה",
      toggleNavigation: "החלפת ניווט",
    },
    theme: {
      light: "בהיר",
      dark: "כהה",
      switchTo: "מעבר למצב {{theme}}",
    },
    authShell: {
      kicker: "גישה מאובטחת",
      headline: "יוצרים פתרונות דיגיטליים שהופכים את החיים לקלים יותר",
      note: "קליטה נקייה, אישורים מהירים ותהליכי חשבון אמינים.",
    },
    stats: {
      items: [
        { value: "5k+", label: "לקוחות מרוצים" },
        { value: "6.5k+", label: "פרויקטים שהושלמו" },
        { value: "205+", label: "פרסים" },
        { value: "4k+", label: "שותפים" },
      ],
    },
    home: {
      highlights: [
        { label: "פתיחה", value: "צרו קשר", cta: true },
        { label: "סטאק", value: "Tailwind + Bootstrap" },
        { label: "מסירה", value: "ספרינטים מוכנים להשקה" },
        { label: "תמחור", value: "תוכניות פרויקט גמישות" },
      ],
      heroKicker: "משיקים חכם יותר",
      heroTitleLine1: "פתרונות מקצה לקצה,",
      heroTitleLine2: "בנויים נכון",
      heroCopy:
        "הנדסת מוצר ניתנת להרחבה, אספקה עננית מודרנית וחוויות דיגיטליות עדכניות לצוותים שצריכים תנופה מהירה.",
      openAdminDashboard: "פתח לוח ניהול",
      exploreServices: "גלה שירותים",
      getStarted: "התחל",
      viewServices: "צפה בשירותים",
      projectBrief: "תקציר הפרויקט",
      deviceCopy: "היקף ברור, ביצוע מתואם והשקה מוכנה.",
    },
    services: {
      eyebrow: "בנוי להתרחבות",
      title: "יוצרים פתרונות דיגיטליים שהופכים את החיים לקלים יותר",
      copy:
        "ביצוע רב-תחומי הכולל אסטרטגיית מוצר, ארכיטקטורת ענן, הפעלת AI וממשקים מלוטשים ללקוחות.",
      openAdminDashboard: "פתח לוח ניהול",
      returnHome: "חזרה לבית",
      startProject: "התחל פרויקט",
      cardLabel: "שירות",
      items: [
        {
          title: "AI ומדעי הנתונים",
          summary: "בינה יישומית לחיזוי, אוטומציית תהליכים וקבלת החלטות טובה יותר.",
        },
        {
          title: "פתרונות ענן",
          summary: "תשתית אמינה, צינורות פריסה ניתנים להרחבה וארכיטקטורה מוכנה לייצור.",
        },
        {
          title: "פיתוח אפליקציות",
          summary: "חוויות מוצר נקיות לכלים פנימיים, פלטפורמות לקוחות ותהליכים מותאמי מובייל.",
        },
        {
          title: "פיתוח אתרים",
          summary: "ממשקים מהירים ונגישים עם מערכות ניתנות לתחזוקה ומסירה קדמית מוקפדת.",
        },
      ],
    },
    auth: {
      fields: {
        email: "אימייל",
        password: "סיסמה",
        firstName: "שם פרטי",
        lastName: "שם משפחה",
        country: "מדינה",
        newPassword: "סיסמה חדשה",
        confirmPassword: "אימות סיסמה",
      },
      login: {
        title: "התחבר לחשבון שלך",
        subtitle: "ברוך שובך. התחבר כמשתמש או עבור לזרימת הגישה של המנהל.",
        footerPrefix: "אין לך חשבון?",
        footerCta: "צור חשבון",
        userTab: "כניסת משתמש",
        adminTab: "כניסת מנהל",
        divider: "התחבר עם האימייל שלך",
        emailPlaceholder: "name@example.com",
        passwordPlaceholder: "הזן את הסיסמה שלך",
        rememberMe: "זכור אותי",
        forgotPassword: "שכחת סיסמה?",
        submit: "התחבר",
      },
      signup: {
        title: "צור חשבון",
        subtitle: "צור חשבון משתמש. גישת מנהל מנוהלת בנפרד ממסך ההתחברות.",
        footerPrefix: "כבר יש לך חשבון?",
        footerCta: "התחבר",
        firstNamePlaceholder: "אלכס",
        lastNamePlaceholder: "סמית",
        emailPlaceholder: "name@example.com",
        passwordPlaceholder: "הזן את הסיסמה שלך",
        terms: "אני מסכים למדיניות הפרטיות ולעדכוני המוצר.",
        submit: "צור חשבון",
      },
      forgot: {
        title: "שכחת את הסיסמה?",
        subtitle: "הזן את האימייל המשויך לחשבון שלך.",
        footerCta: "נסה דרך אחרת?",
        emailPlaceholder: "הזן כתובת אימייל",
        submit: "שלח",
      },
      reset: {
        title: "אפס את הסיסמה שלך",
        subtitle: "הזן את הסיסמה החדשה ואשר את החשבון.",
        footerCta: "נסה דרך אחרת?",
        passwordPlaceholder: "הזן את הסיסמה החדשה",
        confirmPasswordPlaceholder: "אשר את הסיסמה",
        submit: "שמור",
      },
      modes: {
        admin: "מנהל",
        user: "משתמש",
      },
      feedback: {
        enterCredentials: "הזן גם אימייל וגם סיסמה כדי להמשיך.",
        accountNotFound: "לא מצאנו חשבון עם כתובת האימייל הזו.",
        blockedAccount: "החשבון הזה חסום. נא לפנות למנהל המערכת.",
        useUserLogin: "השתמש בלשונית המשתמש עבור חשבונות רגילים.",
        useAdminLogin: "השתמש בלשונית המנהל עבור גישת ניהול.",
        invalidPassword: "הסיסמה שהזנת שגויה.",
        loginSuccessful: "ההתחברות הצליחה.",
        completeRegistration: "השלם את כל שדות ההרשמה לפני יצירת החשבון.",
        shortPassword: "השתמש בסיסמה באורך של לפחות 6 תווים.",
        blockedRegistration: "האימייל הזה חסום ולא ניתן להשתמש בו להרשמה עד להסרת החסימה.",
        accountExists: "כבר קיים חשבון עם האימייל הזה.",
        accountCreated: "החשבון נוצר בהצלחה.",
        userNotFound: "לא ניתן למצוא את המשתמש הזה.",
        allFieldsRequired: "כל שדות המשתמש נדרשים לפני שמירת השינויים.",
        emailConflict: "חשבון אחר כבר משתמש באימייל הזה.",
        userDetailsUpdated: "פרטי המשתמש עודכנו.",
        adminCannotBeBlocked: "לא ניתן לחסום את חשבון המנהל הראשי.",
        userBlockedSuccessfully: "המשתמש נחסם בהצלחה.",
        userUnblockedSuccessfully: "החסימה הוסרה בהצלחה.",
        adminCannotBeDeleted: "לא ניתן למחוק את חשבון המנהל הראשי.",
        userRemovedPermanently: "המשתמש הוסר לצמיתות.",
      },
    },
    dashboard: {
      confirmDelete: "למחוק את המשתמש לצמיתות? לא ניתן לבטל פעולה זו.",
      adminControlCenter: "מרכז הבקרה של המנהל",
      title: "לוח הניהול של ENKONIX",
      copy: "נהל הרשמות, גישת משתמשים, בריאות חשבונות וצמיחה מתוך סביבת עבודה אחת רספונסיבית.",
      totalUsersCount: "סה״כ משתמשים",
      registeredUsers: "משתמשים רשומים",
      activeVsInactive: "פעילים מול לא פעילים",
      activeInactiveSummary: "פעיל / לא פעיל",
      blockedAccounts: "חשבונות חסומים",
      registrationDisabled: "ההרשמה מושבתת",
      userAnalytics: "ניתוח משתמשים",
      averageLogins: "ממוצע התחברויות למשתמש",
      userActivity: "פעילות משתמשים",
      weeklyLogins: "גרף עמודות להתחברויות שבועיות",
      totalSignInsTracked: "{{count}} התחברויות במעקב",
      notifications: "התראות",
      notificationsPanel: "לוח התראות",
      recentEvents: "{{count}} אירועים אחרונים",
      noNotifications: "עדיין אין התראות.",
      monthlyGrowthReports: "דוחות צמיחה חודשיים",
      registrationGrowth: "צמיחת הרשמה לאורך שישה חודשים",
      recentSignupsShown: "{{count}} הרשמות אחרונות מוצגות",
      recentRegistrations: "הרשמות אחרונות",
      newestAccounts: "חשבונות המשתמש החדשים ביותר",
      sortedByRegistrationTime: "ממויין לפי זמן הרשמה",
      activeInactiveUsers: "משתמשים פעילים ולא פעילים",
      accountHealthSummary: "סיכום בריאות החשבון",
      statusDistribution: "התפלגות סטטוסים",
      searchFilters: "חיפוש וסינון",
      refineUserList: "דייק את רשימת המשתמשים",
      matchingAccounts: "{{count}} חשבונות תואמים",
      searchPlaceholder: "חפש לפי שם, אימייל או מדינה",
      allStatuses: "כל הסטטוסים",
      usersOnly: "משתמשים בלבד",
      allRoles: "כל התפקידים",
      adminsOnly: "מנהלים בלבד",
      userManagement: "ניהול משתמשים",
      editDeleteBlock: "עריכה, חסימה ומחיקה של חשבונות",
      adminOnly: "הלוח מיועד למנהל בלבד",
      tableUser: "משתמש",
      tableStatus: "סטטוס",
      tableLastLogin: "התחברות אחרונה",
      tableActions: "פעולות",
      never: "אף פעם",
      edit: "ערוך",
      block: "חסום",
      unblock: "בטל חסימה",
      delete: "מחק",
      selectedUser: "משתמש נבחר",
      noMatchingUser: "אין משתמש תואם",
      protectedAdmin: "מנהל מוגן",
      editableAccount: "חשבון ניתן לעריכה",
      registeredOn: "נרשם {{date}}",
      lastLoginOn: "התחברות אחרונה {{date}}",
      lastLoginNever: "לא התחבר מעולם",
      saveChanges: "שמור שינויים",
      blockUser: "חסום משתמש",
      unblockUser: "בטל חסימת משתמש",
      deleteUser: "מחק משתמש",
      adjustSearch: "שנה את הגדרות החיפוש או הסינון כדי לנהל חשבון משתמש.",
    },
    roles: {
      admin: "מנהל",
      user: "משתמש",
    },
    status: {
      active: "פעיל",
      inactive: "לא פעיל",
      blocked: "חסום",
    },
    countries: {
      unitedStates: "ארצות הברית",
      india: "הודו",
      unitedKingdom: "בריטניה",
      germany: "גרמניה",
      brazil: "ברזיל",
      unitedArabEmirates: "איחוד האמירויות",
    },
    notifications: {
      successfulLoginTitle: "התחברות הצליחה",
      successfulLoginMessage: "{{name}} התחבר דרך מצב {{mode}}.",
      newRegistrationTitle: "הרשמה חדשה",
      newRegistrationMessage: "{{name}} רשם חשבון משתמש חדש.",
      userUpdatedTitle: "המשתמש עודכן",
      userUpdatedMessage: "{{name}} עודכן על ידי המנהל.",
      userBlockedTitle: "המשתמש נחסם",
      userUnblockedTitle: "חסימת המשתמש הוסרה",
      userStatusMessage: "{{name}} כעת במצב {{status}}.",
      userDeletedTitle: "המשתמש נמחק",
      userDeletedMessage: "{{name}} נמחק לצמיתות.",
    },
  },
};

const LocaleContext = createContext(null);

function getValue(object, key) {
  return key.split(".").reduce((value, segment) => value?.[segment], object);
}

function interpolate(template, values) {
  if (!values) {
    return template;
  }

  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{{${key}}}`, `${value}`),
    template,
  );
}

function getInitialLocale() {
  if (typeof window === "undefined") {
    return "en";
  }

  const storedLocale = window.localStorage.getItem(LOCALE_KEY);

  if (LOCALE_OPTIONS.some((option) => option.value === storedLocale)) {
    return storedLocale;
  }

  const browserLocale = window.navigator.language.slice(0, 2).toLowerCase();

  if (LOCALE_OPTIONS.some((option) => option.value === browserLocale)) {
    return browserLocale;
  }

  return "en";
}

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(getInitialLocale);
  const localeMeta =
    LOCALE_OPTIONS.find((option) => option.value === locale) ?? LOCALE_OPTIONS[0];
  const dir = localeMeta.dir;

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.documentElement.dataset.locale = locale;
    window.localStorage.setItem(LOCALE_KEY, locale);
  }, [dir, locale]);

  function t(key, values) {
    const localizedValue =
      getValue(translations[locale], key) ?? getValue(translations.en, key) ?? key;

    return typeof localizedValue === "string"
      ? interpolate(localizedValue, values)
      : localizedValue;
  }

  function formatNumber(value, options) {
    return new Intl.NumberFormat(locale, options).format(value);
  }

  return (
    <LocaleContext.Provider
      value={{
        locale,
        setLocale,
        dir,
        isRtl: dir === "rtl",
        localeOptions: LOCALE_OPTIONS,
        t,
        formatNumber,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }

  return context;
}
