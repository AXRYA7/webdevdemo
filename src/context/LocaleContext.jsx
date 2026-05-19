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
      blog: "Blog",
      contact: "Contact us",
      home: "Home",
      homeOne: "Home 1",
      homeTwo: "Home 2",
      about: "About us",
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
    contact: {
      eyebrow: "HR contact",
      title: "Reach Enkonix HR through one clear contact page",
      copy:
        "Use this page for hiring conversations, internship questions, resume sharing, or general HR outreach. The form below opens your default mail app with the message addressed to hr@enkonix.in.",
      cardLabel: "Contact use case",
      cards: [
        {
          title: "Hiring queries",
          summary:
            "Ask about open roles, internships, hiring steps, or whether your profile is a good fit for the team.",
        },
        {
          title: "Resume sharing",
          summary:
            "Send your resume, portfolio, LinkedIn profile, and a short note about the kind of role you are targeting.",
        },
        {
          title: "Clearer follow-up",
          summary:
            "Include your availability, location, and any relevant links so the HR team can respond with better context.",
        },
      ],
      directLabel: "Direct email",
      directCopy:
        "If your message is already ready, you can email the HR team directly here without using the form.",
      directAction: "Email HR now",
      formLabel: "Contact form",
      formTitle: "Create an HR email draft",
      formCopy:
        "Fill in your details below and we will open your email app with the subject and message prefilled for hr@enkonix.in.",
      fields: {
        fullName: "Full name",
        email: "Email",
        subject: "Subject",
        message: "Message",
      },
      placeholders: {
        fullName: "Alex Smith",
        email: "name@example.com",
        subject: "Internship application",
        message: "Tell the HR team who you are, what role you are interested in, and any details you want to share.",
      },
      submit: "Open email draft",
      note:
        "This opens your default email app and addresses the draft to hr@enkonix.in.",
      defaultSubject: "HR enquiry from website",
      mailBodyName: "Name:",
      mailBodyEmail: "Email:",
    },
    blog: {
      eyebrow: "Insights from Enkonix",
      comingSoon: "Coming soon",
      copy:
        "The Enkonix blog page is being prepared and will be available here soon.",
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
      storyLabel: "Connected delivery",
      storyTitle: "What Enkonix helps growing teams move faster on",
      storyCopy:
        "The official Enkonix positioning keeps pointing to one idea: strategy, design, engineering, and AI enablement should work as one connected system instead of fragmented handoffs.",
      storyCards: [
        {
          title: "From business idea to working product",
          summary:
            "The message fits teams that need help shaping the product direction, the user experience, and the technical path at the same time.",
        },
        {
          title: "AI used to reduce manual effort",
          summary:
            "Enkonix frames AI as practical leverage for operations, automation, and decision support rather than a surface-level feature drop.",
        },
        {
          title: "Software aligned to real workflows",
          summary:
            "The strongest parts of the story speak to bespoke platforms, apps, and systems built around how a business already works and where it wants to scale.",
        },
      ],
      pillarsLabel: "Core capabilities",
      pillarsTitle: "The service mix that gives Home 1 more structure",
      pillarsCopy:
        "This first homepage version now explains the offer more clearly through the services and execution patterns that show up repeatedly across Enkonix's public materials.",
      servicePillars: [
        {
          title: "Agentic AI implementation",
          summary:
            "Intelligent systems designed to automate complex work, act on live data, and create measurable operational efficiency.",
        },
        {
          title: "Custom software development",
          summary:
            "Tailored internal and external products built around the unique processes, constraints, and goals of each business.",
        },
        {
          title: "Custom mobile app development",
          summary:
            "Mobile experiences shaped for usability, clarity, and long-term product growth across customer and operational workflows.",
        },
        {
          title: "Web product engineering",
          summary:
            "Scalable web interfaces and dependable architecture that support launch speed, maintainability, and future expansion.",
        },
      ],
      processLabel: "Delivery structure",
      processTitle: "A homepage that reflects an end-to-end workflow",
      processCopy:
        "Official Enkonix copy describes a seamless workflow between strategy, design, and engineering. This section turns that idea into a clearer product-delivery sequence.",
      deliverySteps: [
        {
          step: "01",
          title: "Understand the business context",
          summary:
            "Clarify the business model, user friction, delivery expectations, and growth goals before defining the product scope.",
        },
        {
          step: "02",
          title: "Shape the experience and system",
          summary:
            "Translate requirements into product structure, user journeys, architecture choices, and interface direction.",
        },
        {
          step: "03",
          title: "Build across web, mobile, and AI",
          summary:
            "Deliver the right mix of product engineering, automation, and user-facing capability for the use case.",
        },
        {
          step: "04",
          title: "Optimize after launch",
          summary:
            "Improve performance, increase automation depth, and keep the product evolving with the business instead of stopping at release.",
        },
      ],
      industriesLabel: "Industry alignment",
      industriesTitle: "Where this message feels especially credible",
      industriesCopy:
        "The official Enkonix story becomes more convincing when it is anchored to the sectors the company publicly highlights across its work and expertise pages.",
      industryCards: [
        {
          title: "Supply chain and logistics",
          summary:
            "A strong fit for AI-led workflow improvement, operational visibility, coordination tools, and automation-heavy environments.",
        },
        {
          title: "Healthcare and e-learning",
          summary:
            "Useful for products that need dependable architecture, thoughtful user journeys, and a careful balance of clarity and complexity.",
        },
        {
          title: "Commerce and marketplaces",
          summary:
            "Well-suited to platforms where performance, trust, customer flow, and day-to-day conversion all matter at once.",
        },
        {
          title: "Finance and emerging products",
          summary:
            "Supports ambitious digital products with layered requirements that benefit from disciplined product and engineering execution.",
        },
      ],
      proofLabel: "Company proof",
      proofTitle: "Signals that make the first homepage feel more grounded",
      proofCopy:
        "Rather than staying abstract, this page now ends with a tighter proof layer drawn from Enkonix's public company story: established since 2016, more than 30 web and mobile products highlighted, and an offer spanning AI, custom software, and digital product delivery.",
      proofStats: [
        { value: "2016", label: "Founded" },
        { value: "30+", label: "Web and mobile products highlighted publicly" },
        { value: "AI + product", label: "Positioning built around software and automation" },
      ],
      proofPrimary: "Open Home 2",
      proofSecondary: "About us",
    },
    homeTwo: {
      eyebrow: "Enkonix perspective",
      titleLine1: "End-to-end product delivery,",
      titleLine2: "shaped around AI and scale",
      copy:
        "This alternate homepage leans into Enkonix's public positioning: integrated AI delivery, custom software execution, and web and mobile products built to move businesses forward with less manual work.",
      perspectiveNotes: [
        {
          title: "Strategy, design, and engineering stay connected",
          summary:
            "The value proposition works best when discovery, UX thinking, and implementation are presented as one continuous delivery chain instead of isolated services.",
        },
        {
          title: "AI is framed as operational leverage",
          summary:
            "Rather than treating AI like a decorative feature, the story emphasizes workflow automation, reduced manual effort, and systems that can take meaningful action.",
        },
        {
          title: "The homepage should feel credible for larger builds",
          summary:
            "That means clearer proof, stronger domain language, and content that shows Enkonix can support both product launch and post-launch growth.",
        },
      ],
      proofLabel: "Positioning snapshot",
      proofTitle: "Signals behind the Enkonix narrative",
      proofItems: [
        { value: "2016", label: "Founded" },
        { value: "30+", label: "Web and mobile products highlighted publicly" },
        { value: "AI-led", label: "Automation and agentic workflow focus" },
        { value: "End-to-end", label: "Strategy, design, and engineering in one flow" },
      ],
      spotlightLabel: "Why Enkonix",
      spotlightTitle: "A technical partner built around connected execution",
      spotlightCopy:
        "The Enkonix story is less about one-off builds and more about combining product thinking, design, and engineering into systems that can ship, evolve, and support operational growth.",
      spotlightFeatureTitle: "Built to connect business goals to working software",
      spotlightFeatureCopy:
        "This version of the homepage translates Enkonix's public messaging into a clearer narrative for buyers who care about AI integration, custom product delivery, and long-term technical partnership.",
      spotlightPoints: [
        {
          title: "AI implementation with business value",
          summary:
            "Focuses on automation, intelligent workflows, and systems that reduce repetitive operational effort.",
        },
        {
          title: "Custom product delivery",
          summary:
            "Frames web platforms, mobile apps, and bespoke software as products tailored to each client's real workflow.",
        },
        {
          title: "Partnership past launch",
          summary:
            "Keeps architecture, shipping, optimization, and next-phase growth in one connected delivery story.",
        },
      ],
      capabilitiesLabel: "Core services",
      capabilitiesTitle: "What this Home 2 page highlights",
      capabilities: [
        {
          title: "Agentic AI implementation",
          summary:
            "AI-enabled systems designed to act on business data instead of only surfacing dashboards.",
        },
        {
          title: "Custom software development",
          summary:
            "Business tools, internal systems, and client-facing products built around unique operating models.",
        },
        {
          title: "Mobile app delivery",
          summary:
            "High-clarity mobile experiences shaped for performance, usability, and long-term product evolution.",
        },
        {
          title: "Web product engineering",
          summary:
            "Scalable web interfaces and dependable back-end delivery aligned to speed, maintenance, and growth.",
        },
      ],
      sectorsLabel: "Industry fit",
      sectors: [
        {
          title: "Supply chain and logistics",
          summary:
            "A strong match for automation-heavy workflows, AI assistance, and operational visibility tools. This is especially relevant where teams need faster decisions across planning, movement, and coordination.",
        },
        {
          title: "Healthcare and e-learning",
          summary:
            "Useful for products that need clear journeys, dependable systems, and thoughtful user experience. These spaces benefit from products that balance usability, consistency, and reliable delivery under real-world constraints.",
        },
        {
          title: "Commerce and marketplaces",
          summary:
            "Supports customer-facing platforms where performance, trust, and conversion matter every day. The positioning fits digital products that need polished interfaces backed by scalable operations and strong technical foundations.",
        },
        {
          title: "Finance and emerging products",
          summary:
            "Fits ambitious products with complex requirements that benefit from structured technical execution. It also speaks well to companies that need product clarity without losing rigor around architecture and scale.",
        },
      ],
      processLabel: "Delivery model",
      processTitle: "How the Enkonix story can land on a homepage",
      processCopy:
        "The public brand narrative points to a workflow that starts with business understanding, moves through product design, and ships through disciplined engineering with room for scale after launch.",
      processSteps: [
        {
          step: "01",
          title: "Discover the business model",
          summary:
            "Define the customer flow, operating friction, and commercial goal before committing to features.",
        },
        {
          step: "02",
          title: "Design the system clearly",
          summary:
            "Turn requirements into architecture direction, product journeys, and focused interface decisions.",
        },
        {
          step: "03",
          title: "Build the working product",
          summary:
            "Deliver web, mobile, and AI-enabled functionality with quality and maintainability in mind.",
        },
        {
          step: "04",
          title: "Scale through iteration",
          summary:
            "Improve automation depth, performance, and capability range as the product matures.",
        },
      ],
      partnershipLabel: "Engagement model",
      partnershipTitle: "Three more sections that make Home 2 feel complete",
      partnershipCopy:
        "This second homepage works best when it explains not just what Enkonix builds, but how the engagement should feel for a company choosing a long-term technical partner.",
      partnershipCards: [
        {
          title: "Discovery before delivery",
          summary:
            "The message should reassure buyers that product context and workflow understanding come before code, automation, or interface polish.",
        },
        {
          title: "AI attached to real operations",
          summary:
            "The strongest version of the story ties agentic AI directly to repetitive workflows, faster execution, and systems that can actually act.",
        },
        {
          title: "Partnership after launch",
          summary:
            "Home 2 should suggest continuity: architecture, scaling, optimization, and product growth stay inside the relationship after the initial release.",
        },
      ],
      valuesLabel: "Operating values",
      valuesTitle: "The public company story is reinforced by its values",
      valuesCopy:
        "The official company page highlights a culture built around clear communication, motivation, customer focus, and long-term credibility. Bringing those values into Home 2 gives the page more human depth.",
      values: [
        {
          title: "Integrity",
          summary:
            "The official brand language emphasizes transparency, realistic commitments, and protecting long-term relationships over shortcuts.",
        },
        {
          title: "Openness",
          summary:
            "A strong fit for collaborative projects where ideas, iteration, and honest feedback need to move freely between teams.",
        },
        {
          title: "Customer orientation",
          summary:
            "The messaging consistently points back to understanding real business needs and building solutions that support measurable growth.",
        },
        {
          title: "Motivation",
          summary:
            "The team story is framed around involvement, shared goals, and the energy that comes from solving meaningful technology challenges.",
        },
      ],
      footprintLabel: "Company footprint",
      footprintTitle: "A broader Enkonix picture beyond individual services",
      footprintCopy:
        "Public Enkonix company pages describe a business founded in 2016 that has built more than 30 web and mobile apps while presenting a global footprint across cities like Lisbon, New York, Amsterdam, and Sydney.",
      footprintStats: [
        { value: "2016", label: "Founded" },
        { value: "30+", label: "Successful web and mobile apps called out publicly" },
        { value: "4 cities", label: "Global footprint highlighted on the company page" },
      ],
      footprintLocations: [
        "Lisbon",
        "New York",
        "Amsterdam",
        "Sydney",
      ],
      footprintPrimary: "About us",
      footprintSecondary: "Services",
      ctaLabel: "Home 2 concept",
      ctaTitle: "Use this second homepage when Enkonix should feel like the product partner",
      ctaCopy:
        "This version is better for a company-story angle: it leads with AI, custom software, and connected execution instead of the more generic launch-first messaging on Home 1.",
      ctaPrimary: "Explore services",
      ctaSecondary: "Open Home 1",
    },
    about: {
      eyebrow: "About Enkonix",
      titleLine1: "A technology consulting partner",
      titleLine2: "connecting strategy, design, and engineering",
      copy:
        "The official Enkonix company story presents the team as an end-to-end technology consulting organization focused on valuable products, connected workflows, and long-term technical partnership.",
      facts: [
        { value: "2016", label: "Founded" },
        { value: "30+", label: "Successful web and mobile apps highlighted publicly" },
        { value: "Global", label: "Presence across multiple cities and markets" },
        { value: "AI + product", label: "Delivery across software, mobile, web, and automation" },
      ],
      storyLabel: "Company story",
      storyTitle: "How Enkonix describes its role",
      storyCopy:
        "Across its public website, Enkonix positions itself as a consulting and delivery partner that supports clients from strategy through design and engineering. The emphasis is on building useful software, not just shipping features in isolation.",
      storyCards: [
        {
          title: "Founded by experienced builders",
          summary:
            "The company story traces back to 2016 and frames Enkonix as a business started by practitioners who wanted to build valuable digital products to their own standards.",
        },
        {
          title: "Built around full-cycle execution",
          summary:
            "Rather than specializing in only one stage, the public message consistently ties together discovery, product design, software engineering, and AI integration.",
        },
        {
          title: "Shaped by multi-industry exposure",
          summary:
            "Healthcare, e-learning, e-commerce, finance, advertising, augmented reality, and the sharing economy all appear across the official company narrative.",
        },
      ],
      valuesLabel: "Company values",
      valuesTitle: "Values highlighted on the official company page",
      values: [
        {
          title: "Integrity",
          summary:
            "The team emphasizes being transparent about capabilities and avoiding shortcuts that weaken trust over time.",
        },
        {
          title: "Openness",
          summary:
            "Open communication and the free exchange of ideas are presented as part of how bold solutions and healthier collaboration emerge.",
        },
        {
          title: "Customer orientation",
          summary:
            "Customer satisfaction, clear needs discovery, and building the right solution for business growth are central to the company narrative.",
        },
        {
          title: "Motivation",
          summary:
            "The company frames motivation as the energy that comes from working shoulder to shoulder with clients on meaningful goals.",
        },
      ],
      footprintLabel: "Global footprint",
      footprintTitle: "Cities and presence called out publicly",
      locations: [
        {
          title: "Lisbon",
          summary:
            "Presented as a major European base in the official company materials and part of the broader delivery footprint.",
        },
        {
          title: "New York",
          summary:
            "Included in the public company presence and reinforces the positioning around international client delivery.",
        },
        {
          title: "Amsterdam",
          summary:
            "Another city referenced on the public company page that supports the sense of global reach and access.",
        },
        {
          title: "Sydney",
          summary:
            "Rounds out the publicly highlighted footprint and signals cross-market collaboration rather than a single-region business.",
        },
      ],
      expertiseLabel: "Experience areas",
      expertiseTitle: "Where Enkonix says it has built products",
      industries: [
        {
          title: "E-learning and healthcare",
          summary:
            "Strong domains for products that need thoughtful journeys, stable architecture, and clarity for varied user groups.",
        },
        {
          title: "E-commerce and marketplaces",
          summary:
            "Good fit for revenue-facing platforms where speed, conversion, and customer trust shape product decisions every day.",
        },
        {
          title: "Finance and advertising",
          summary:
            "Useful where software needs a structured technical backbone without losing responsiveness and product usability.",
        },
        {
          title: "AR and sharing economy products",
          summary:
            "Helps show that the company story is not limited to one software category and can support more experimental digital models too.",
        },
      ],
      ctaLabel: "Explore further",
      ctaTitle: "Use this page when the company story needs its own space",
      ctaCopy:
        "The About Us page is where the Enkonix narrative can breathe: the company background, values, industry exposure, and global presence are clearer here than on a compact homepage.",
      ctaPrimary: "Explore services",
      ctaSecondary: "Open Home 2",
    },
    services: {
      eyebrow: "Service portfolio",
      title: "Technology services built for product delivery, AI adoption, and operational scale",
      copy:
        "Explore seven Enkonix service areas covering custom software, web and mobile delivery, AI and machine learning, analytics, blockchain, cloud operations, and ongoing technical consulting.",
      openAdminDashboard: "Open admin dashboard",
      returnHome: "Return home",
      startProject: "Start a project",
      cardLabel: "Service",
      directoryLabel: "Service structure",
      directoryCopy:
        "Each service page explains delivery focus, scope, and business value in a format that is easier to review with internal stakeholders.",
      directoryTitle: "Review all 7 service pages from one professional overview",
      directoryBody:
        "Use this section to compare the seven service lines, understand where each one fits, and move directly into the page that best matches your product, platform, or operational goals.",
      openService: "Open service page",
      backToServices: "Back to services",
      detailEyebrow: "Service overview",
      detailOverview: "Overview",
      detailFocus: "What we focus on",
      detailScope: "Typical scope",
      detailValue: "Business value",
      detailCtaEyebrow: "Next step",
      detailCtaTitle: "Need this service mapped to your business context?",
      detailCtaCopy:
        "Share your goals with the team and use the contact page to start the right conversation with Enkonix.",
      detailCtaPrimary: "Contact us",
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
      blog: "المدونة",
      contact: "اتصل بنا",
      home: "الرئيسية",
      homeOne: "الرئيسية 1",
      homeTwo: "الرئيسية 2",
      about: "من نحن",
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
    contact: {
      eyebrow: "التواصل مع الموارد البشرية",
      title: "تواصل مع فريق الموارد البشرية في Enkonix من صفحة واحدة واضحة",
      copy:
        "استخدم هذه الصفحة للاستفسارات الوظيفية، وأسئلة التدريب، وإرسال السيرة الذاتية، أو أي تواصل عام مع الموارد البشرية. يفتح النموذج أدناه تطبيق البريد الافتراضي لديك مع توجيه الرسالة إلى hr@enkonix.in.",
      cardLabel: "سبب التواصل",
      cards: [
        {
          title: "استفسارات التوظيف",
          summary:
            "اسأل عن الوظائف المفتوحة، أو فرص التدريب، أو خطوات التوظيف، أو مدى ملاءمة ملفك الشخصي للفريق.",
        },
        {
          title: "مشاركة السيرة الذاتية",
          summary:
            "أرسل سيرتك الذاتية، أو ملف أعمالك، أو حساب LinkedIn، مع نبذة قصيرة عن الدور الذي تستهدفه.",
        },
        {
          title: "متابعة أوضح",
          summary:
            "أضف مدى توافرك، وموقعك، وأي روابط مهمة حتى يتمكن فريق الموارد البشرية من الرد بسياق أفضل.",
        },
      ],
      directLabel: "البريد المباشر",
      directCopy:
        "إذا كانت رسالتك جاهزة بالفعل، يمكنك مراسلة فريق الموارد البشرية مباشرة من هنا دون استخدام النموذج.",
      directAction: "راسل الموارد البشرية الآن",
      formLabel: "نموذج التواصل",
      formTitle: "أنشئ مسودة بريد للموارد البشرية",
      formCopy:
        "املأ التفاصيل أدناه وسنفتح تطبيق البريد لديك مع تجهيز العنوان والرسالة لإرسالها إلى hr@enkonix.in.",
      fields: {
        fullName: "الاسم الكامل",
        email: "البريد الإلكتروني",
        subject: "الموضوع",
        message: "الرسالة",
      },
      placeholders: {
        fullName: "أليكس سميث",
        email: "name@example.com",
        subject: "طلب تدريب",
        message: "عرّف بنفسك، واذكر الدور الذي تهتم به، وأي تفاصيل ترغب في مشاركتها مع فريق الموارد البشرية.",
      },
      submit: "افتح مسودة البريد",
      note:
        "سيؤدي هذا إلى فتح تطبيق البريد الافتراضي لديك وتوجيه المسودة إلى hr@enkonix.in.",
      defaultSubject: "استفسار موارد بشرية من الموقع",
      mailBodyName: "الاسم:",
      mailBodyEmail: "البريد الإلكتروني:",
    },
    blog: {
      eyebrow: "رؤى من Enkonix",
      comingSoon: "قريبًا",
      copy:
        "يتم حاليًا إعداد صفحة مدونة Enkonix وستكون متاحة هنا قريبًا.",
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
      storyLabel: "تنفيذ مترابط",
      storyTitle: "كيف تساعد Enkonix الفرق النامية على التحرك أسرع",
      storyCopy:
        "تشير رسالة Enkonix الرسمية باستمرار إلى فكرة واحدة: يجب أن تعمل الاستراتيجية، والتصميم، والهندسة، وتمكين الذكاء الاصطناعي كنظام واحد مترابط بدلًا من تسليمات متفرقة.",
      storyCards: [
        {
          title: "من فكرة العمل إلى منتج فعلي",
          summary:
            "يناسب هذا الخطاب الفرق التي تحتاج إلى دعم في تشكيل اتجاه المنتج، وتجربة المستخدم، والمسار التقني في الوقت نفسه.",
        },
        {
          title: "الذكاء الاصطناعي لتقليل العمل اليدوي",
          summary:
            "تعرض Enkonix الذكاء الاصطناعي كوسيلة عملية للأتمتة، ودعم القرار، وتحسين العمليات بدلًا من كونه ميزة شكلية فقط.",
        },
        {
          title: "برمجيات منسجمة مع سير العمل الحقيقي",
          summary:
            "أقوى أجزاء الرسالة تتحدث عن منصات وأنظمة وتطبيقات مخصصة مبنية حول طريقة عمل الشركة الحالية والطريقة التي تريد أن تتوسع بها.",
        },
      ],
      pillarsLabel: "القدرات الأساسية",
      pillarsTitle: "مزيج الخدمات الذي يمنح الرئيسية 1 بنية أوضح",
      pillarsCopy:
        "يوضح هذا الإصدار الأول من الصفحة الرئيسية العرض بشكل أفضل من خلال الخدمات وأنماط التنفيذ التي تتكرر باستمرار في المواد العامة الخاصة بـ Enkonix.",
      servicePillars: [
        {
          title: "تنفيذ الذكاء الاصطناعي الوكيلي",
          summary:
            "أنظمة ذكية صممت لأتمتة الأعمال المعقدة، والتصرف بناءً على البيانات الحية، وخلق كفاءة تشغيلية قابلة للقياس.",
        },
        {
          title: "تطوير البرمجيات المخصصة",
          summary:
            "منتجات داخلية وخارجية مصممة خصيصًا حول العمليات، والقيود، والأهداف الفريدة لكل عمل.",
        },
        {
          title: "تطوير تطبيقات الجوال المخصصة",
          summary:
            "تجارب جوال واضحة ومريحة صُممت لسهولة الاستخدام، والوضوح، والنمو الطويل الأمد للمنتج.",
        },
        {
          title: "هندسة منتجات الويب",
          summary:
            "واجهات ويب قابلة للتوسع وبنية موثوقة تدعم سرعة الإطلاق، وسهولة الصيانة، والتوسع المستقبلي.",
        },
      ],
      processLabel: "هيكل التسليم",
      processTitle: "صفحة رئيسية تعكس سير عمل متكاملًا",
      processCopy:
        "تصف نصوص Enkonix الرسمية سيرًا سلسًا بين الاستراتيجية، والتصميم، والهندسة. وهذا القسم يحول تلك الفكرة إلى تسلسل أوضح لتسليم المنتجات.",
      deliverySteps: [
        {
          step: "01",
          title: "فهم سياق العمل",
          summary:
            "توضيح نموذج العمل، والاحتكاك لدى المستخدم، وتوقعات التسليم، وأهداف النمو قبل تحديد نطاق المنتج.",
        },
        {
          step: "02",
          title: "تشكيل التجربة والنظام",
          summary:
            "تحويل المتطلبات إلى بنية منتج، ومسارات مستخدم، واختيارات معمارية، واتجاه واضح للواجهة.",
        },
        {
          step: "03",
          title: "البناء عبر الويب والجوال والذكاء الاصطناعي",
          summary:
            "تسليم المزيج الصحيح من هندسة المنتج، والأتمتة، والقدرات المواجهة للمستخدم بحسب حالة الاستخدام.",
        },
        {
          step: "04",
          title: "التحسين بعد الإطلاق",
          summary:
            "رفع الأداء، وتعميق الأتمتة، والحفاظ على تطور المنتج مع تطور العمل بدلًا من التوقف عند الإطلاق.",
        },
      ],
      industriesLabel: "ملاءمة القطاعات",
      industriesTitle: "أين تبدو هذه الرسالة أكثر مصداقية",
      industriesCopy:
        "تصبح قصة Enkonix الرسمية أكثر إقناعًا عندما تُربط بالقطاعات التي تبرزها الشركة علنًا عبر أعمالها وصفحات خبراتها.",
      industryCards: [
        {
          title: "سلاسل الإمداد والخدمات اللوجستية",
          summary:
            "ملائمة قوية لتحسين سير العمل بالذكاء الاصطناعي، وأدوات الرؤية التشغيلية، والبيئات الغنية بالأتمتة.",
        },
        {
          title: "الرعاية الصحية والتعلّم الإلكتروني",
          summary:
            "مناسبة للمنتجات التي تحتاج إلى رحلات استخدام مدروسة، وبنية موثوقة، وتوازن دقيق بين الوضوح والتعقيد.",
        },
        {
          title: "التجارة والمنصات السوقية",
          summary:
            "مناسبة للمنصات التي تهم فيها السرعة، والتحويل، والثقة، وتدفق العميل يوميًا في الوقت نفسه.",
        },
        {
          title: "التمويل والمنتجات الناشئة",
          summary:
            "تدعم المنتجات الرقمية الطموحة ذات المتطلبات المتعددة التي تستفيد من تنفيذ منضبط على مستوى المنتج والهندسة.",
        },
      ],
      proofLabel: "إثبات الشركة",
      proofTitle: "إشارات تجعل الصفحة الرئيسية الأولى أكثر رسوخًا",
      proofCopy:
        "بدلًا من البقاء في مستوى عام، تنتهي هذه الصفحة الآن بطبقة إثبات أوضح مستمدة من قصة Enkonix العامة: التأسيس في 2016، وأكثر من 30 منتج ويب وجوال مذكور علنًا، وعرض يمتد من الذكاء الاصطناعي إلى البرمجيات المخصصة وتسليم المنتجات الرقمية.",
      proofStats: [
        { value: "2016", label: "سنة التأسيس" },
        { value: "30+", label: "منتجات ويب وجوال مذكورة علنًا" },
        { value: "الذكاء الاصطناعي + المنتج", label: "تموضع يجمع البرمجيات والأتمتة" },
      ],
      proofPrimary: "افتح الرئيسية 2",
      proofSecondary: "من نحن",
    },
    homeTwo: {
      eyebrow: "رؤية Enkonix",
      titleLine1: "تسليم منتجات من البداية إلى النهاية،",
      titleLine2: "مصاغ حول الذكاء الاصطناعي والتوسع",
      copy:
        "يميل هذا الإصدار البديل للصفحة الرئيسية إلى تموضع Enkonix العام: تسليم مدمج للذكاء الاصطناعي، وتنفيذ برمجي مخصص، ومنتجات ويب وجوال تدفع الأعمال إلى الأمام مع تقليل العمل اليدوي.",
      perspectiveNotes: [
        {
          title: "الاستراتيجية والتصميم والهندسة تبقى مترابطة",
          summary:
            "يعمل عرض القيمة بشكل أفضل عندما يُعرض الاكتشاف، والتفكير في تجربة المستخدم، والتنفيذ كسلسلة تسليم واحدة مستمرة بدلًا من خدمات معزولة.",
        },
        {
          title: "الذكاء الاصطناعي يُعرض كرافعة تشغيلية",
          summary:
            "بدلًا من التعامل معه كميزة شكلية، تبرز القصة الأتمتة، وتقليل الجهد اليدوي، والأنظمة القادرة على اتخاذ إجراءات ذات معنى.",
        },
        {
          title: "يجب أن تبدو الصفحة الرئيسية موثوقة للمشاريع الأكبر",
          summary:
            "وهذا يعني أدلة أوضح، ولغة أقوى مرتبطة بالمجالات، ومحتوى يُظهر قدرة Enkonix على دعم الإطلاق والنمو بعده.",
        },
      ],
      proofLabel: "لمحة عن التموضع",
      proofTitle: "إشارات وراء سردية Enkonix",
      proofItems: [
        { value: "2016", label: "سنة التأسيس" },
        { value: "30+", label: "منتجات ويب وجوال مذكورة علنًا" },
        { value: "مدفوع بالذكاء الاصطناعي", label: "تركيز على الأتمتة وسير العمل الوكيلي" },
        { value: "من البداية للنهاية", label: "الاستراتيجية والتصميم والهندسة في مسار واحد" },
      ],
      spotlightLabel: "لماذا Enkonix",
      spotlightTitle: "شريك تقني مبني حول تنفيذ مترابط",
      spotlightCopy:
        "قصة Enkonix ليست عن بناءات منفردة فقط، بل عن دمج التفكير المنتجّي، والتصميم، والهندسة في أنظمة يمكن إطلاقها وتطويرها ودعم النمو التشغيلي من خلالها.",
      spotlightFeatureTitle: "مبنية لربط أهداف العمل ببرمجيات تعمل فعليًا",
      spotlightFeatureCopy:
        "يترجم هذا الإصدار من الصفحة الرئيسية الرسائل العامة لـ Enkonix إلى سرد أوضح للمشترين الذين يهتمون بدمج الذكاء الاصطناعي، وتسليم المنتجات المخصصة، والشراكة التقنية طويلة المدى.",
      spotlightPoints: [
        {
          title: "تنفيذ ذكاء اصطناعي ذو قيمة تجارية",
          summary:
            "يركز على الأتمتة، وسير العمل الذكي، والأنظمة التي تقلل الجهد التشغيلي المتكرر.",
        },
        {
          title: "تسليم منتجات مخصصة",
          summary:
            "يعرض منصات الويب، وتطبيقات الجوال، والبرمجيات المفصلة كمنتجات مصممة حول سير العمل الحقيقي لكل عميل.",
        },
        {
          title: "شراكة تتجاوز الإطلاق",
          summary:
            "تبقي المعمارية، والتسليم، والتحسين، والنمو في المرحلة التالية ضمن قصة تنفيذ مترابطة واحدة.",
        },
      ],
      capabilitiesLabel: "الخدمات الأساسية",
      capabilitiesTitle: "ما الذي تبرزه صفحة الرئيسية 2 هذه",
      capabilities: [
        {
          title: "تنفيذ الذكاء الاصطناعي الوكيلي",
          summary:
            "أنظمة مدعومة بالذكاء الاصطناعي صُممت للتصرف بناءً على بيانات العمل بدلًا من الاكتفاء بعرض لوحات المعلومات.",
        },
        {
          title: "تطوير البرمجيات المخصصة",
          summary:
            "أدوات أعمال، وأنظمة داخلية، ومنتجات موجهة للعملاء مبنية حول نماذج التشغيل الفريدة.",
        },
        {
          title: "تسليم تطبيقات الجوال",
          summary:
            "تجارب جوال عالية الوضوح مصممة للأداء، وسهولة الاستخدام، وتطور المنتج على المدى الطويل.",
        },
        {
          title: "هندسة منتجات الويب",
          summary:
            "واجهات ويب قابلة للتوسع وتسليم خلفي موثوق يتماشى مع السرعة، والصيانة، والنمو.",
        },
      ],
      sectorsLabel: "ملاءمة القطاعات",
      sectors: [
        {
          title: "سلاسل الإمداد والخدمات اللوجستية",
          summary:
            "ملاءمة قوية لسير العمل الغني بالأتمتة، والمساعدة بالذكاء الاصطناعي، وأدوات الرؤية التشغيلية. وتزداد أهميته عندما تحتاج الفرق إلى قرارات أسرع في التخطيط والحركة والتنسيق.",
        },
        {
          title: "الرعاية الصحية والتعلّم الإلكتروني",
          summary:
            "مفيد للمنتجات التي تحتاج إلى مسارات واضحة، وأنظمة موثوقة، وتجربة مستخدم مدروسة. تستفيد هذه المجالات من منتجات توازن بين سهولة الاستخدام والاتساق والتسليم الموثوق ضمن قيود واقعية.",
        },
        {
          title: "التجارة والمنصات السوقية",
          summary:
            "يدعم المنصات الموجهة للعملاء حيث تهم السرعة والثقة والتحويل يوميًا. كما يناسب المنتجات الرقمية التي تحتاج إلى واجهات متقنة مدعومة بعمليات قابلة للتوسع وأسس تقنية قوية.",
        },
        {
          title: "التمويل والمنتجات الناشئة",
          summary:
            "يناسب المنتجات الطموحة ذات المتطلبات المعقدة التي تستفيد من تنفيذ تقني منظم. كما يخاطب الشركات التي تحتاج إلى وضوح في المنتج دون فقدان الصرامة في المعمارية والتوسع.",
        },
      ],
      processLabel: "نموذج التسليم",
      processTitle: "كيف يمكن لقصة Enkonix أن تستقر على صفحة رئيسية",
      processCopy:
        "تشير السردية العامة للعلامة إلى سير عمل يبدأ بفهم العمل، ويمر بتصميم المنتج، ثم يُطلق عبر هندسة منضبطة تترك مجالًا للتوسع بعد الإطلاق.",
      processSteps: [
        {
          step: "01",
          title: "اكتشاف نموذج العمل",
          summary:
            "تحديد تدفق العميل، والاحتكاك التشغيلي، والهدف التجاري قبل الالتزام بالميزات.",
        },
        {
          step: "02",
          title: "تصميم النظام بوضوح",
          summary:
            "تحويل المتطلبات إلى اتجاه معماري، ورحلات منتج، وقرارات مركزة للواجهة.",
        },
        {
          step: "03",
          title: "بناء المنتج العامل",
          summary:
            "تسليم وظائف الويب، والجوال، والذكاء الاصطناعي مع مراعاة الجودة وقابلية الصيانة.",
        },
        {
          step: "04",
          title: "التوسع عبر التحسين المستمر",
          summary:
            "تحسين عمق الأتمتة، والأداء، ومدى القدرات مع نضج المنتج.",
        },
      ],
      partnershipLabel: "نموذج الشراكة",
      partnershipTitle: "ثلاثة أقسام إضافية تجعل الرئيسية 2 أكثر اكتمالًا",
      partnershipCopy:
        "يعمل هذا الإصدار الثاني من الصفحة الرئيسية بأفضل شكل عندما يشرح ليس فقط ما الذي تبنيه Enkonix، بل كيف ينبغي أن تبدو التجربة لشركة تختار شريكًا تقنيًا طويل المدى.",
      partnershipCards: [
        {
          title: "الاكتشاف قبل التسليم",
          summary:
            "ينبغي أن تطمئن الرسالة المشترين بأن فهم سياق المنتج وسير العمل يأتي قبل البرمجة أو الأتمتة أو اللمسات البصرية.",
        },
        {
          title: "الذكاء الاصطناعي مرتبط بالعمليات الحقيقية",
          summary:
            "أقوى نسخة من القصة تربط الذكاء الاصطناعي الوكيلي مباشرة بسير العمل المتكرر، والتنفيذ الأسرع، والأنظمة القادرة على التصرف فعليًا.",
        },
        {
          title: "شراكة بعد الإطلاق",
          summary:
            "يجب أن توحي الرئيسية 2 بالاستمرارية: فالمعمارية، والتوسع، والتحسين، ونمو المنتج تبقى داخل العلاقة بعد الإصدار الأولي.",
        },
      ],
      valuesLabel: "القيم التشغيلية",
      valuesTitle: "القيم تعزز قصة الشركة العامة",
      valuesCopy:
        "تسلط صفحة الشركة الرسمية الضوء على ثقافة مبنية حول التواصل الواضح، والتحفيز، والتركيز على العميل، والمصداقية الطويلة المدى. وإدخال هذه القيم إلى الرئيسية 2 يمنح الصفحة عمقًا إنسانيًا أكبر.",
      values: [
        {
          title: "النزاهة",
          summary:
            "تؤكد لغة العلامة الرسمية على الشفافية، والالتزامات الواقعية، وحماية العلاقات طويلة المدى بدلًا من الحلول السريعة.",
        },
        {
          title: "الانفتاح",
          summary:
            "ملائمة قوية للمشاريع التعاونية التي تحتاج إلى انتقال الأفكار، والتكرار، والتغذية الراجعة الصادقة بحرية بين الفرق.",
        },
        {
          title: "التركيز على العميل",
          summary:
            "تشير الرسائل باستمرار إلى فهم احتياجات العمل الحقيقية وبناء حلول تدعم نموًا قابلًا للقياس.",
        },
        {
          title: "التحفيز",
          summary:
            "تُعرض قصة الفريق على أنها مبنية على المشاركة، والأهداف المشتركة، والطاقة الناتجة عن حل تحديات تقنية ذات معنى.",
        },
      ],
      footprintLabel: "حضور الشركة",
      footprintTitle: "صورة أوسع لـ Enkonix تتجاوز الخدمات الفردية",
      footprintCopy:
        "تصف صفحات الشركة العامة في Enkonix نشاطًا تأسس في 2016 وبنى أكثر من 30 تطبيق ويب وجوال، مع حضور عالمي عبر مدن مثل لشبونة، ونيويورك، وأمستردام، وسيدني.",
      footprintStats: [
        { value: "2016", label: "سنة التأسيس" },
        { value: "30+", label: "تطبيقات ويب وجوال ناجحة مذكورة علنًا" },
        { value: "4 مدن", label: "حضور عالمي مذكور في صفحة الشركة" },
      ],
      footprintLocations: ["لشبونة", "نيويورك", "أمستردام", "سيدني"],
      footprintPrimary: "من نحن",
      footprintSecondary: "الخدمات",
      ctaLabel: "فكرة الرئيسية 2",
      ctaTitle: "استخدم هذه الصفحة الرئيسية الثانية عندما يجب أن تبدو Enkonix كشريك المنتج",
      ctaCopy:
        "هذا الإصدار أفضل لزاوية تركز على قصة الشركة: فهو يبدأ بالذكاء الاصطناعي، والبرمجيات المخصصة، والتنفيذ المترابط بدلًا من الرسائل العامة الأكثر تركيزًا على الإطلاق الموجودة في الرئيسية 1.",
      ctaPrimary: "استكشف الخدمات",
      ctaSecondary: "افتح الرئيسية 1",
    },
    about: {
      eyebrow: "عن Enkonix",
      titleLine1: "شريك استشارات تقنية",
      titleLine2: "يربط بين الاستراتيجية والتصميم والهندسة",
      copy:
        "تعرض قصة الشركة الرسمية في Enkonix الفريق كمنظمة استشارات تقنية متكاملة تركز على المنتجات القيّمة، وسير العمل المترابط، والشراكة التقنية طويلة المدى.",
      facts: [
        { value: "2016", label: "سنة التأسيس" },
        { value: "30+", label: "تطبيقات ويب وجوال ناجحة مذكورة علنًا" },
        { value: "عالمي", label: "حضور عبر مدن وأسواق متعددة" },
        { value: "الذكاء الاصطناعي + المنتج", label: "تسليم عبر البرمجيات والجوال والويب والأتمتة" },
      ],
      storyLabel: "قصة الشركة",
      storyTitle: "كيف تصف Enkonix دورها",
      storyCopy:
        "عبر موقعها العام، تضع Enkonix نفسها كشريك استشاري وتنفيذي يدعم العملاء من الاستراتيجية مرورًا بالتصميم ووصولًا إلى الهندسة. ويتركز التأكيد على بناء برمجيات مفيدة لا مجرد شحن ميزات معزولة.",
      storyCards: [
        {
          title: "تأسست على يد صناع ذوي خبرة",
          summary:
            "تعود قصة الشركة إلى 2016 وتعرض Enkonix كعمل بدأه ممارسون أرادوا بناء منتجات رقمية قيّمة وفق معاييرهم الخاصة.",
        },
        {
          title: "مبنية حول التنفيذ الكامل للدورة",
          summary:
            "بدلًا من التخصص في مرحلة واحدة فقط، تربط الرسالة العامة باستمرار بين الاكتشاف، وتصميم المنتج، وهندسة البرمجيات، ودمج الذكاء الاصطناعي.",
        },
        {
          title: "مشكّلة بخبرة متعددة القطاعات",
          summary:
            "تظهر الرعاية الصحية، والتعلّم الإلكتروني، والتجارة الإلكترونية، والتمويل، والإعلان، والواقع المعزز، واقتصاد المشاركة عبر السردية الرسمية للشركة.",
        },
      ],
      valuesLabel: "قيم الشركة",
      valuesTitle: "القيم التي تبرزها صفحة الشركة الرسمية",
      values: [
        {
          title: "النزاهة",
          summary:
            "يؤكد الفريق على الشفافية بشأن القدرات وتجنب الاختصارات التي تضعف الثقة مع الوقت.",
        },
        {
          title: "الانفتاح",
          summary:
            "يُعرض التواصل المفتوح وتبادل الأفكار بحرية كجزء من كيفية ظهور الحلول الجريئة والتعاون الصحي.",
        },
        {
          title: "التركيز على العميل",
          summary:
            "يُعد رضا العميل، وفهم الاحتياجات بوضوح، وبناء الحل الصحيح للنمو التجاري عناصر مركزية في سردية الشركة.",
        },
        {
          title: "التحفيز",
          summary:
            "تصف الشركة التحفيز بأنه الطاقة التي تنشأ من العمل جنبًا إلى جنب مع العملاء على أهداف ذات معنى.",
        },
      ],
      footprintLabel: "الحضور العالمي",
      footprintTitle: "المدن والحضور المذكوران علنًا",
      locations: [
        {
          title: "لشبونة",
          summary:
            "تُعرض كقاعدة أوروبية رئيسية في المواد الرسمية وكجزء من الحضور الأوسع للتسليم.",
        },
        {
          title: "نيويورك",
          summary:
            "تظهر ضمن الحضور العام للشركة وتعزز التموضع المرتبط بالتسليم للعملاء على المستوى الدولي.",
        },
        {
          title: "أمستردام",
          summary:
            "مدينة أخرى مذكورة في صفحة الشركة العامة تدعم الإحساس بالوصول العالمي والحضور المتعدد.",
        },
        {
          title: "سيدني",
          summary:
            "تكمل الحضور المعلن وتوحي بتعاون عابر للأسواق بدلًا من شركة محصورة في منطقة واحدة.",
        },
      ],
      expertiseLabel: "مجالات الخبرة",
      expertiseTitle: "أين تقول Enkonix إنها بنت منتجات",
      industries: [
        {
          title: "التعلّم الإلكتروني والرعاية الصحية",
          summary:
            "مجالات قوية للمنتجات التي تحتاج إلى رحلات مدروسة، وبنية مستقرة، ووضوح لشرائح مستخدمين متنوعة.",
        },
        {
          title: "التجارة الإلكترونية والمنصات السوقية",
          summary:
            "مناسبة للمنصات الموجهة للإيرادات حيث تشكّل السرعة والتحويل وثقة العميل قرارات المنتج يوميًا.",
        },
        {
          title: "التمويل والإعلان",
          summary:
            "مفيدة عندما تحتاج البرمجيات إلى عمود تقني منظم دون خسارة المرونة وسهولة الاستخدام.",
        },
        {
          title: "الواقع المعزز ومنتجات اقتصاد المشاركة",
          summary:
            "تساعد على إظهار أن قصة الشركة لا تقتصر على فئة برمجية واحدة ويمكنها دعم نماذج رقمية أكثر تجريبية أيضًا.",
        },
      ],
      ctaLabel: "استكشف أكثر",
      ctaTitle: "استخدم هذه الصفحة عندما تحتاج قصة الشركة إلى مساحة خاصة بها",
      ctaCopy:
        "صفحة من نحن هي المكان الذي يمكن أن تتنفس فيه سردية Enkonix: الخلفية، والقيم، والخبرة القطاعية، والحضور العالمي تصبح أوضح هنا من أي صفحة رئيسية مختصرة.",
      ctaPrimary: "استكشف الخدمات",
      ctaSecondary: "افتح الرئيسية 2",
    },
    services: {
      eyebrow: "محفظة الخدمات",
      title: "خدمات تقنية مبنية لتسليم المنتجات وتبني الذكاء الاصطناعي والتوسع التشغيلي",
      copy:
        "استعرض سبعة مجالات خدمية من Enkonix تغطي البرمجيات المخصصة، وتسليم الويب والجوال، والذكاء الاصطناعي وتعلم الآلة، والتحليلات، والبلوك تشين، وعمليات السحابة، والاستشارات التقنية المستمرة.",
      openAdminDashboard: "افتح لوحة المسؤول",
      returnHome: "العودة للرئيسية",
      startProject: "ابدأ مشروعًا",
      cardLabel: "خدمة",
      directoryLabel: "هيكل الخدمات",
      directoryCopy:
        "تشرح كل صفحة خدمة محور التنفيذ والنطاق والقيمة التجارية بصياغة أسهل للمراجعة مع أصحاب المصلحة الداخليين.",
      directoryTitle: "راجع صفحات الخدمات السبع من نظرة مهنية واحدة",
      directoryBody:
        "استخدم هذا القسم لمقارنة خطوط الخدمات السبعة وفهم موضع كل منها ثم الانتقال مباشرة إلى الصفحة الأكثر ملاءمة لأهداف منتجك أو منصتك أو عملياتك.",
      openService: "افتح صفحة الخدمة",
      backToServices: "العودة إلى الخدمات",
      detailEyebrow: "نظرة على الخدمة",
      detailOverview: "نظرة عامة",
      detailFocus: "ما الذي نركز عليه",
      detailScope: "النطاق المعتاد",
      detailValue: "القيمة التجارية",
      detailCtaEyebrow: "الخطوة التالية",
      detailCtaTitle: "هل تريد مواءمة هذه الخدمة مع سياق عملك؟",
      detailCtaCopy:
        "شارك أهدافك مع الفريق واستخدم صفحة التواصل لبدء المحادثة المناسبة مع Enkonix.",
      detailCtaPrimary: "اتصل بنا",
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
        userCreatedSuccessfully: "تم إنشاء حساب المستخدم بنجاح.",
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
      addUser: "إضافة مستخدم",
      createUserAccount: "إنشاء حساب مستخدم",
      createUserHint:
        "حدد بيانات الاعتماد أدناه. سيتمكن المستخدم الجديد من تسجيل الدخول بهذا البريد الإلكتروني وكلمة المرور مباشرة.",
      clearForm: "مسح النموذج",
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
      userCreatedTitle: "تم إنشاء مستخدم",
      userCreatedMessage: "تمت إضافة {{name}} بواسطة المسؤول.",
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
      blog: "בלוג",
      contact: "צור קשר",
      home: "בית",
      homeOne: "בית 1",
      homeTwo: "בית 2",
      about: "אודותינו",
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
    contact: {
      eyebrow: "יצירת קשר עם משאבי אנוש",
      title: "צרו קשר עם צוות משאבי האנוש של Enkonix מדף אחד ברור",
      copy:
        "השתמשו בעמוד הזה לפניות גיוס, שאלות על התמחות, שליחת קורות חיים או פנייה כללית למשאבי אנוש. הטופס למטה יפתח את אפליקציית המייל שלכם עם הודעה שממוענת ל-hr@enkonix.in.",
      cardLabel: "סיבת פנייה",
      cards: [
        {
          title: "שאלות גיוס",
          summary:
            "שאלו על משרות פתוחות, התמחויות, שלבי הגיוס או התאמה ראשונית של הפרופיל שלכם לצוות.",
        },
        {
          title: "שליחת קורות חיים",
          summary:
            "שלחו קורות חיים, תיק עבודות, פרופיל LinkedIn והסבר קצר על סוג התפקיד שמעניין אתכם.",
        },
        {
          title: "המשך מדויק יותר",
          summary:
            "הוסיפו זמינות, מיקום וקישורים רלוונטיים כדי שלצוות משאבי האנוש יהיה קל יותר לחזור אליכם עם הקשר טוב יותר.",
        },
      ],
      directLabel: "אימייל ישיר",
      directCopy:
        "אם ההודעה שלכם כבר מוכנה, אפשר לשלוח אותה ישירות לצוות משאבי האנוש מכאן בלי להשתמש בטופס.",
      directAction: "שלחו מייל ל-HR",
      formLabel: "טופס יצירת קשר",
      formTitle: "צרו טיוטת מייל ל-HR",
      formCopy:
        "מלאו את הפרטים למטה ונפתח את אפליקציית המייל שלכם עם נושא ותוכן מוכנים ל-hr@enkonix.in.",
      fields: {
        fullName: "שם מלא",
        email: "אימייל",
        subject: "נושא",
        message: "הודעה",
      },
      placeholders: {
        fullName: "Alex Smith",
        email: "name@example.com",
        subject: "פנייה לגבי התמחות",
        message: "ספרו בקצרה מי אתם, לאיזה תפקיד אתם פונים, וכל פרט נוסף שתרצו לשתף עם צוות משאבי האנוש.",
      },
      submit: "פתחו טיוטת מייל",
      note:
        "זה יפתח את אפליקציית המייל ברירת המחדל שלכם וימען את הטיוטה ל-hr@enkonix.in.",
      defaultSubject: "פניית משאבי אנוש מהאתר",
      mailBodyName: "שם:",
      mailBodyEmail: "אימייל:",
    },
    blog: {
      eyebrow: "תובנות מ-Enkonix",
      comingSoon: "בקרוב",
      copy:
        "עמוד הבלוג של Enkonix נמצא כעת בהכנה ויהיה זמין כאן בקרוב.",
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
      storyLabel: "מסירה מחוברת",
      storyTitle: "מה Enkonix עוזרת לצוותים צומחים להאיץ",
      storyCopy:
        "המסר הרשמי של Enkonix חוזר לרעיון אחד: אסטרטגיה, עיצוב, הנדסה והפעלת AI צריכים לעבוד כמערכת מחוברת אחת ולא כמסירות מפוצלות.",
      storyCards: [
        {
          title: "מרעיון עסקי למוצר עובד",
          summary:
            "המסר מתאים לצוותים שצריכים תמיכה בכיוון המוצר, בחוויית המשתמש ובנתיב הטכני באותו זמן.",
        },
        {
          title: "AI להפחתת עבודה ידנית",
          summary:
            "Enkonix מציגה AI כמנוף מעשי לאוטומציה, תמיכה בהחלטות ושיפור תפעולי ולא כתוספת קוסמטית בלבד.",
        },
        {
          title: "תוכנה שמותאמת לזרימת העבודה האמיתית",
          summary:
            "החלקים החזקים ביותר בסיפור מדברים על פלטפורמות, אפליקציות ומערכות מותאמות שנבנות סביב הדרך שבה העסק עובד היום והדרך שבה הוא רוצה לצמוח.",
        },
      ],
      pillarsLabel: "יכולות ליבה",
      pillarsTitle: "תמהיל השירותים שנותן ל-בית 1 מבנה ברור יותר",
      pillarsCopy:
        "הגרסה הראשונה של דף הבית מסבירה כעת את ההצעה בצורה ברורה יותר דרך השירותים ודפוסי הביצוע שחוזרים שוב ושוב בחומרים הציבוריים של Enkonix.",
      servicePillars: [
        {
          title: "יישום AI סוכני",
          summary:
            "מערכות חכמות שתוכננו לאוטומציה של עבודה מורכבת, לפעול על נתונים חיים וליצור יעילות תפעולית מדידה.",
        },
        {
          title: "פיתוח תוכנה מותאמת אישית",
          summary:
            "מוצרים פנימיים וחיצוניים שנבנים סביב התהליכים, המגבלות והיעדים הייחודיים של כל עסק.",
        },
        {
          title: "פיתוח אפליקציות מובייל מותאמות",
          summary:
            "חוויות מובייל ברורות ונוחות שתוכננו לשימושיות, בהירות וצמיחה ארוכת טווח של המוצר.",
        },
        {
          title: "הנדסת מוצרי ווב",
          summary:
            "ממשקי ווב ניתנים להרחבה וארכיטקטורה אמינה שתומכים במהירות השקה, תחזוקה והתרחבות עתידית.",
        },
      ],
      processLabel: "מבנה המסירה",
      processTitle: "דף בית שמשקף תהליך מקצה לקצה",
      processCopy:
        "הטקסטים הרשמיים של Enkonix מתארים זרימה חלקה בין אסטרטגיה, עיצוב והנדסה. החלק הזה הופך את הרעיון הזה לרצף ברור יותר של מסירת מוצר.",
      deliverySteps: [
        {
          step: "01",
          title: "להבין את ההקשר העסקי",
          summary:
            "להבהיר את מודל העסק, החיכוך למשתמש, ציפיות המסירה ויעדי הצמיחה לפני שמגדירים את היקף המוצר.",
        },
        {
          step: "02",
          title: "לעצב את החוויה והמערכת",
          summary:
            "לתרגם דרישות למבנה מוצר, מסלולי משתמש, בחירות ארכיטקטורה וכיוון ברור לממשק.",
        },
        {
          step: "03",
          title: "לבנות לווב, למובייל ול-AI",
          summary:
            "לספק את השילוב הנכון של הנדסת מוצר, אוטומציה ויכולות מול המשתמש לפי מקרה השימוש.",
        },
        {
          step: "04",
          title: "לשפר לאחר ההשקה",
          summary:
            "להעלות ביצועים, להעמיק אוטומציה ולהמשיך לפתח את המוצר יחד עם התפתחות העסק במקום לעצור בהשקה.",
        },
      ],
      industriesLabel: "התאמת ענפים",
      industriesTitle: "איפה המסר הזה נשמע הכי אמין",
      industriesCopy:
        "הסיפור הרשמי של Enkonix נהיה משכנע יותר כשהוא מחובר לענפים שהחברה מדגישה בפומבי דרך עבודותיה ודפי המומחיות שלה.",
      industryCards: [
        {
          title: "שרשרת אספקה ולוגיסטיקה",
          summary:
            "התאמה חזקה לשיפור תהליכים בעזרת AI, לכלי נראות תפעולית ולסביבות עשירות באוטומציה.",
        },
        {
          title: "בריאות ולמידה דיגיטלית",
          summary:
            "מתאים למוצרים שצריכים מסלולי שימוש מחושבים, ארכיטקטורה אמינה ואיזון עדין בין בהירות למורכבות.",
        },
        {
          title: "מסחר ומרקטפלייסים",
          summary:
            "מתאים לפלטפורמות שבהן מהירות, המרה, אמון וזרימת לקוח חשובים בכל יום ובאותו זמן.",
        },
        {
          title: "פיננסים ומוצרים מתפתחים",
          summary:
            "תומך במוצרים דיגיטליים שאפתניים עם דרישות שכבתיות שמרוויחים מביצוע ממושמע ברמת המוצר וההנדסה.",
        },
      ],
      proofLabel: "הוכחת חברה",
      proofTitle: "איתותים שהופכים את דף הבית הראשון למבוסס יותר",
      proofCopy:
        "במקום להישאר מופשט, הדף הזה מסתיים כעת בשכבת הוכחה ברורה יותר שמבוססת על הסיפור הציבורי של Enkonix: נוסדה ב-2016, יותר מ-30 מוצרי ווב ומובייל שמודגשים בפומבי, והצעה שמשלבת AI, תוכנה מותאמת ומסירת מוצרים דיגיטליים.",
      proofStats: [
        { value: "2016", label: "שנת הקמה" },
        { value: "30+", label: "מוצרי ווב ומובייל שמודגשים בפומבי" },
        { value: "AI + מוצר", label: "מיצוב שמחבר תוכנה ואוטומציה" },
      ],
      proofPrimary: "פתח את בית 2",
      proofSecondary: "אודותינו",
    },
    homeTwo: {
      eyebrow: "הזווית של Enkonix",
      titleLine1: "מסירת מוצרים מקצה לקצה,",
      titleLine2: "מעוצבת סביב AI והתרחבות",
      copy:
        "הגרסה החלופית הזו של דף הבית נשענת על המיצוב הציבורי של Enkonix: מסירת AI משולבת, ביצוע תוכנה מותאמת ומוצרי ווב ומובייל שמקדמים עסקים עם פחות עבודה ידנית.",
      perspectiveNotes: [
        {
          title: "אסטרטגיה, עיצוב והנדסה נשארים מחוברים",
          summary:
            "הצעת הערך עובדת טוב יותר כשהמחקר, החשיבה על חוויית המשתמש והביצוע מוצגים כשרשרת מסירה אחת רציפה ולא כשירותים נפרדים.",
        },
        {
          title: "AI מוצג כמנוף תפעולי",
          summary:
            "במקום להציג אותו כתכונה קוסמטית, הסיפור מדגיש אוטומציה, הפחתת מאמץ ידני ומערכות שיכולות לבצע פעולה בעלת ערך.",
        },
        {
          title: "דף הבית צריך להרגיש אמין גם לפרויקטים גדולים",
          summary:
            "זה אומר הוכחות ברורות יותר, שפה תחומית חזקה יותר ותוכן שמראה כיצד Enkonix יכולה לתמוך גם בהשקה וגם בצמיחה שאחריה.",
        },
      ],
      proofLabel: "תמונת מיצוב",
      proofTitle: "האותות שמאחורי הסיפור של Enkonix",
      proofItems: [
        { value: "2016", label: "שנת הקמה" },
        { value: "30+", label: "מוצרי ווב ומובייל שמודגשים בפומבי" },
        { value: "מונע AI", label: "מיקוד באוטומציה ובזרימות עבודה סוכניות" },
        { value: "מקצה לקצה", label: "אסטרטגיה, עיצוב והנדסה במסלול אחד" },
      ],
      spotlightLabel: "למה Enkonix",
      spotlightTitle: "שותף טכנולוגי שבנוי סביב ביצוע מחובר",
      spotlightCopy:
        "הסיפור של Enkonix אינו רק על בנייה חד-פעמית, אלא על חיבור חשיבת מוצר, עיצוב והנדסה למערכות שאפשר להשיק, לשפר ולצמוח איתן תפעולית.",
      spotlightFeatureTitle: "בנוי כדי לחבר מטרות עסקיות לתוכנה שעובדת באמת",
      spotlightFeatureCopy:
        "הגרסה הזו של דף הבית מתרגמת את המסרים הציבוריים של Enkonix לנרטיב ברור יותר עבור קונים שאכפת להם משילוב AI, ממסירת מוצרים מותאמים ומשותפות טכנולוגית ארוכת טווח.",
      spotlightPoints: [
        {
          title: "יישום AI עם ערך עסקי",
          summary:
            "מתמקד באוטומציה, בזרימות עבודה חכמות ובמערכות שמפחיתות מאמץ תפעולי חוזר.",
        },
        {
          title: "מסירת מוצרים מותאמים",
          summary:
            "מציג פלטפורמות ווב, אפליקציות מובייל ותוכנה מותאמת כמוצרים שנבנים סביב זרימת העבודה האמיתית של כל לקוח.",
        },
        {
          title: "שותפות מעבר להשקה",
          summary:
            "משאירה את הארכיטקטורה, המסירה, השיפור והצמיחה בשלב הבא בתוך סיפור ביצוע מחובר אחד.",
        },
      ],
      capabilitiesLabel: "שירותי ליבה",
      capabilitiesTitle: "מה דף בית 2 הזה מדגיש",
      capabilities: [
        {
          title: "יישום AI סוכני",
          summary:
            "מערכות מבוססות AI שתוכננו לפעול על נתוני העסק ולא רק להציג לוחות מחוונים.",
        },
        {
          title: "פיתוח תוכנה מותאמת אישית",
          summary:
            "כלי עבודה, מערכות פנימיות ומוצרים ללקוחות שנבנים סביב מודלי הפעלה ייחודיים.",
        },
        {
          title: "מסירת אפליקציות מובייל",
          summary:
            "חוויות מובייל ברורות שתוכננו לביצועים, שימושיות והתפתחות מוצר ארוכת טווח.",
        },
        {
          title: "הנדסת מוצרי ווב",
          summary:
            "ממשקי ווב ניתנים להרחבה ומסירה אחורית אמינה שמתיישרים עם מהירות, תחזוקה וצמיחה.",
        },
      ],
      sectorsLabel: "התאמת ענפים",
      sectors: [
        {
          title: "שרשרת אספקה ולוגיסטיקה",
          summary:
            "התאמה חזקה לזרימות עבודה עשירות באוטומציה, לסיוע מבוסס AI ולכלי נראות תפעולית. זה רלוונטי במיוחד כשצוותים צריכים החלטות מהירות יותר בתכנון, תנועה ותיאום.",
        },
        {
          title: "בריאות ולמידה דיגיטלית",
          summary:
            "מועיל למוצרים שצריכים מסלולים ברורים, מערכות אמינות וחוויית משתמש מחושבת. תחומים אלה נהנים ממוצרים שמאזנים בין שימושיות, עקביות ומסירה אמינה תחת מגבלות אמיתיות.",
        },
        {
          title: "מסחר ומרקטפלייסים",
          summary:
            "תומך בפלטפורמות מול לקוח שבהן ביצועים, אמון והמרה חשובים בכל יום. המיצוב מתאים למוצרים דיגיטליים שצריכים ממשקים מלוטשים יחד עם תפעול ניתן להרחבה ויסודות טכניים חזקים.",
        },
        {
          title: "פיננסים ומוצרים מתפתחים",
          summary:
            "מתאים למוצרים שאפתניים עם דרישות מורכבות שמרוויחים מביצוע טכני מסודר. הוא גם מדבר היטב לחברות שצריכות בהירות מוצר מבלי לאבד קפדנות סביב ארכיטקטורה והתרחבות.",
        },
      ],
      processLabel: "מודל המסירה",
      processTitle: "איך הסיפור של Enkonix יכול לנחות על דף בית",
      processCopy:
        "הנרטיב הציבורי של המותג מצביע על תהליך שמתחיל בהבנת העסק, עובר דרך עיצוב המוצר ונשלח לדרך באמצעות הנדסה ממושמעת שמשאירה מקום להתרחבות אחרי ההשקה.",
      processSteps: [
        {
          step: "01",
          title: "לגלות את מודל העסק",
          summary:
            "להגדיר את זרימת הלקוח, החיכוך התפעולי והמטרה המסחרית לפני שמתחייבים לפיצ'רים.",
        },
        {
          step: "02",
          title: "לעצב את המערכת בבהירות",
          summary:
            "לתרגם דרישות לכיוון ארכיטקטוני, מסלולי מוצר והחלטות ממוקדות לממשק.",
        },
        {
          step: "03",
          title: "לבנות את המוצר העובד",
          summary:
            "לספק פונקציונליות לווב, למובייל ול-AI תוך שמירה על איכות ותחזוקתיות.",
        },
        {
          step: "04",
          title: "להתרחב דרך שיפור מתמשך",
          summary:
            "לשפר את עומק האוטומציה, את הביצועים ואת היקף היכולות ככל שהמוצר מתבגר.",
        },
      ],
      partnershipLabel: "מודל ההתקשרות",
      partnershipTitle: "שלושה חלקים נוספים שהופכים את בית 2 לשלם יותר",
      partnershipCopy:
        "הגרסה השנייה הזו של דף הבית עובדת טוב יותר כשהיא מסבירה לא רק מה Enkonix בונה, אלא גם איך ההתקשרות אמורה להרגיש עבור חברה שבוחרת שותף טכנולוגי לטווח ארוך.",
      partnershipCards: [
        {
          title: "גילוי לפני מסירה",
          summary:
            "המסר צריך להרגיע קונים שהבנת הקשר המוצר וזרימת העבודה קודמת לקוד, לאוטומציה או לליטוש ממשק.",
        },
        {
          title: "AI שמחובר לפעילות אמיתית",
          summary:
            "הגרסה החזקה ביותר של הסיפור קושרת AI סוכני ישירות לזרימות עבודה חוזרות, לביצוע מהיר יותר ולמערכות שיכולות באמת לפעול.",
        },
        {
          title: "שותפות אחרי ההשקה",
          summary:
            "בית 2 צריך לרמוז על המשכיות: ארכיטקטורה, התרחבות, אופטימיזציה וצמיחת המוצר נשארים בתוך הקשר גם אחרי המסירה הראשונית.",
        },
      ],
      valuesLabel: "ערכים תפעוליים",
      valuesTitle: "הסיפור הציבורי של החברה מתחזק דרך הערכים שלה",
      valuesCopy:
        "דף החברה הרשמי מדגיש תרבות שמבוססת על תקשורת ברורה, מוטיבציה, מיקוד בלקוח ואמינות ארוכת טווח. הכנסת הערכים האלה ל-בית 2 נותנת לעמוד עומק אנושי יותר.",
      values: [
        {
          title: "יושרה",
          summary:
            "שפת המותג הרשמית מדגישה שקיפות, התחייבויות מציאותיות והגנה על קשרים ארוכי טווח במקום קיצורי דרך.",
        },
        {
          title: "פתיחות",
          summary:
            "התאמה חזקה לפרויקטים שיתופיים שבהם רעיונות, איטרציה ומשוב כן צריכים לנוע בחופשיות בין צוותים.",
        },
        {
          title: "מיקוד בלקוח",
          summary:
            "המסרים חוזרים שוב ושוב להבנת הצרכים העסקיים האמיתיים ולבניית פתרונות שתומכים בצמיחה מדידה.",
        },
        {
          title: "מוטיבציה",
          summary:
            "סיפור הצוות מוצג ככזה שנבנה ממעורבות, מטרות משותפות והאנרגיה שנובעת מפתרון אתגרים טכנולוגיים בעלי משמעות.",
        },
      ],
      footprintLabel: "טביעת רגל של החברה",
      footprintTitle: "תמונה רחבה יותר של Enkonix מעבר לשירותים בודדים",
      footprintCopy:
        "דפי החברה הציבוריים של Enkonix מתארים עסק שנוסד ב-2016 ובנה יותר מ-30 אפליקציות ווב ומובייל, תוך הצגת נוכחות גלובלית בערים כמו ליסבון, ניו יורק, אמסטרדם וסידני.",
      footprintStats: [
        { value: "2016", label: "שנת הקמה" },
        { value: "30+", label: "אפליקציות ווב ומובייל מצליחות שמוזכרות בפומבי" },
        { value: "4 ערים", label: "נוכחות גלובלית שמודגשת בדף החברה" },
      ],
      footprintLocations: ["ליסבון", "ניו יורק", "אמסטרדם", "סידני"],
      footprintPrimary: "אודותינו",
      footprintSecondary: "שירותים",
      ctaLabel: "רעיון בית 2",
      ctaTitle: "השתמשו בדף הבית השני כש-Enkonix צריכה להרגיש כמו שותפת המוצר",
      ctaCopy:
        "הגרסה הזו טובה יותר לזווית של סיפור חברה: היא מתחילה ב-AI, בתוכנה מותאמת ובביצוע מחובר במקום במסרי השקה כלליים יותר שקיימים ב-בית 1.",
      ctaPrimary: "גלו שירותים",
      ctaSecondary: "פתחו את בית 1",
    },
    about: {
      eyebrow: "אודות Enkonix",
      titleLine1: "שותפה לייעוץ טכנולוגי",
      titleLine2: "שמחברת בין אסטרטגיה, עיצוב והנדסה",
      copy:
        "הסיפור הרשמי של Enkonix מציג את הצוות כארגון ייעוץ טכנולוגי מקצה לקצה שמתמקד במוצרים בעלי ערך, בזרימות עבודה מחוברות ובשותפות טכנולוגית ארוכת טווח.",
      facts: [
        { value: "2016", label: "שנת הקמה" },
        { value: "30+", label: "אפליקציות ווב ומובייל מצליחות שמודגשות בפומבי" },
        { value: "גלובלי", label: "נוכחות בערים ובשווקים שונים" },
        { value: "AI + מוצר", label: "מסירה שמשלבת תוכנה, מובייל, ווב ואוטומציה" },
      ],
      storyLabel: "סיפור החברה",
      storyTitle: "איך Enkonix מתארת את התפקיד שלה",
      storyCopy:
        "באתר הציבורי שלה Enkonix מציגה את עצמה כשותפת ייעוץ ומסירה שתומכת בלקוחות מאסטרטגיה דרך עיצוב ועד הנדסה. הדגש הוא על בניית תוכנה מועילה, לא רק על שחרור פיצ'רים מבודדים.",
      storyCards: [
        {
          title: "נוסדה על ידי בונים מנוסים",
          summary:
            "סיפור החברה חוזר ל-2016 ומציג את Enkonix כעסק שהוקם על ידי אנשי מקצוע שרצו לבנות מוצרים דיגיטליים בעלי ערך לפי הסטנדרטים שלהם.",
        },
        {
          title: "בנויה סביב ביצוע מלא של המחזור",
          summary:
            "במקום להתמחות רק בשלב אחד, המסר הציבורי מחבר בעקביות בין גילוי, עיצוב מוצר, הנדסת תוכנה ושילוב AI.",
        },
        {
          title: "מעוצבת מחשיפה למספר ענפים",
          summary:
            "בריאות, למידה דיגיטלית, מסחר אלקטרוני, פיננסים, פרסום, מציאות רבודה וכלכלת השיתוף מופיעים לאורך הנרטיב הרשמי של החברה.",
        },
      ],
      valuesLabel: "ערכי החברה",
      valuesTitle: "ערכים שמודגשים בדף החברה הרשמי",
      values: [
        {
          title: "יושרה",
          summary:
            "הצוות מדגיש שקיפות לגבי יכולות והימנעות מקיצורי דרך שפוגעים באמון לאורך זמן.",
        },
        {
          title: "פתיחות",
          summary:
            "תקשורת פתוחה והחלפת רעיונות חופשית מוצגות כחלק מהדרך שבה פתרונות נועזים ושיתופי פעולה בריאים נוצרים.",
        },
        {
          title: "מיקוד בלקוח",
          summary:
            "שביעות רצון לקוחות, גילוי צרכים ברור ובניית הפתרון הנכון לצמיחה עסקית הם חלק מרכזי מהנרטיב של החברה.",
        },
        {
          title: "מוטיבציה",
          summary:
            "החברה מתארת מוטיבציה כאנרגיה שנובעת מעבודה כתף אל כתף עם לקוחות על מטרות בעלות משמעות.",
        },
      ],
      footprintLabel: "טביעת רגל גלובלית",
      footprintTitle: "ערים ונוכחות שמוזכרות בפומבי",
      locations: [
        {
          title: "ליסבון",
          summary:
            "מוצגת כבסיס אירופי מרכזי בחומרים הרשמיים וכחלק מטביעת הרגל הרחבה יותר של המסירה.",
        },
        {
          title: "ניו יורק",
          summary:
            "נכללת בנוכחות הציבורית של החברה ומחזקת את המיצוב סביב מסירה ללקוחות ברמה בינלאומית.",
        },
        {
          title: "אמסטרדם",
          summary:
            "עיר נוספת שמוזכרת בדף החברה הציבורי ותומכת בתחושת ההגעה והנוכחות הגלובלית.",
        },
        {
          title: "סידני",
          summary:
            "משלימה את טביעת הרגל המוצהרת ומרמזת על שיתוף פעולה חוצה שווקים ולא על עסק שמוגבל לאזור אחד.",
        },
      ],
      expertiseLabel: "תחומי ניסיון",
      expertiseTitle: "איפה Enkonix אומרת שבנתה מוצרים",
      industries: [
        {
          title: "למידה דיגיטלית ובריאות",
          summary:
            "תחומים חזקים למוצרים שצריכים מסלולים מחושבים, ארכיטקטורה יציבה ובהירות לקבוצות משתמשים מגוונות.",
        },
        {
          title: "מסחר אלקטרוני ומרקטפלייסים",
          summary:
            "מתאים לפלטפורמות מבוססות הכנסה שבהן מהירות, המרה ואמון לקוח מעצבים את החלטות המוצר בכל יום.",
        },
        {
          title: "פיננסים ופרסום",
          summary:
            "מועיל כאשר תוכנה צריכה עמוד שדרה טכני מסודר מבלי לאבד גמישות ושימושיות.",
        },
        {
          title: "מציאות רבודה ומוצרי כלכלת השיתוף",
          summary:
            "עוזר להראות שסיפור החברה אינו מוגבל לקטגוריית תוכנה אחת ויכול לתמוך גם במודלים דיגיטליים ניסיוניים יותר.",
        },
      ],
      ctaLabel: "המשיכו לחקור",
      ctaTitle: "השתמשו בעמוד הזה כשהסיפור של החברה צריך מקום משלו",
      ctaCopy:
        "עמוד האודות הוא המקום שבו הנרטיב של Enkonix יכול לנשום: הרקע, הערכים, החשיפה הענפית והנוכחות הגלובלית ברורים כאן יותר מאשר בדף בית קצר.",
      ctaPrimary: "גלו שירותים",
      ctaSecondary: "פתחו את בית 2",
    },
    services: {
      eyebrow: "פורטפוליו שירותים",
      title: "שירותי טכנולוגיה שנבנו למסירת מוצרים, אימוץ AI והתרחבות תפעולית",
      copy:
        "עיינו בשבעה תחומי שירות של Enkonix המכסים תוכנה מותאמת, מסירת ווב ומובייל, בינה מלאכותית ולמידת מכונה, אנליטיקה, בלוקצ'יין, תפעול ענן וייעוץ טכני שוטף.",
      openAdminDashboard: "פתח לוח ניהול",
      returnHome: "חזרה לבית",
      startProject: "התחל פרויקט",
      cardLabel: "שירות",
      directoryLabel: "מבנה השירותים",
      directoryCopy:
        "כל עמוד שירות מסביר את מוקד המסירה, ההיקף והערך העסקי בצורה שקל יותר לסקור עם בעלי עניין פנימיים.",
      directoryTitle: "עברו על כל 7 עמודי השירות מתוך סקירה מקצועית אחת",
      directoryBody:
        "השתמשו בחלק הזה כדי להשוות בין שבעת קווי השירות, להבין איפה כל אחד מתאים, ולעבור ישירות לעמוד שהכי רלוונטי למוצר, לפלטפורמה או ליעדים התפעוליים שלכם.",
      openService: "פתחו את עמוד השירות",
      backToServices: "חזרה לשירותים",
      detailEyebrow: "סקירת שירות",
      detailOverview: "סקירה כללית",
      detailFocus: "במה אנחנו מתמקדים",
      detailScope: "היקף טיפוסי",
      detailValue: "ערך עסקי",
      detailCtaEyebrow: "הצעד הבא",
      detailCtaTitle: "רוצים להתאים את השירות הזה להקשר העסקי שלכם?",
      detailCtaCopy:
        "שתפו את המטרות שלכם עם הצוות והשתמשו בעמוד יצירת הקשר כדי להתחיל את השיחה הנכונה עם Enkonix.",
      detailCtaPrimary: "צרו קשר",
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
        userCreatedSuccessfully: "חשבון המשתמש נוצר בהצלחה.",
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
      addUser: "הוסף משתמש",
      createUserAccount: "צור חשבון משתמש",
      createUserHint:
        "הגדר את פרטי ההתחברות למטה. המשתמש החדש יוכל להתחבר עם האימייל והסיסמה האלה מיד.",
      clearForm: "נקה טופס",
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
      userCreatedTitle: "המשתמש נוצר",
      userCreatedMessage: "{{name}} נוסף על ידי המנהל.",
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
