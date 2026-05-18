function ProviderIcon({ provider }) {
  if (provider === "Google") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="provider-icon">
        <path
          fill="#EA4335"
          d="M12 10.2v3.9h5.5c-.2 1.3-.8 2.4-1.8 3.2l3 2.3c1.8-1.6 2.8-4.1 2.8-7.1 0-.7-.1-1.5-.2-2.3H12Z"
        />
        <path
          fill="#34A853"
          d="M12 22c2.7 0 4.9-.9 6.6-2.4l-3-2.3c-.8.5-2 .9-3.6.9-2.7 0-5-1.8-5.8-4.3l-3.1 2.4C4.8 19.7 8.1 22 12 22Z"
        />
        <path
          fill="#4A90E2"
          d="M6.2 13.9A6 6 0 0 1 6 12c0-.7.1-1.3.2-1.9L3.1 7.7A10 10 0 0 0 2 12c0 1.6.4 3.2 1.1 4.6l3.1-2.7Z"
        />
        <path
          fill="#FBBC04"
          d="M12 5.8c1.5 0 2.8.5 3.8 1.5l2.8-2.8A9.6 9.6 0 0 0 12 2 10 10 0 0 0 3.1 7.7l3.1 2.4C7 7.6 9.3 5.8 12 5.8Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="provider-icon">
      <path
        fill="currentColor"
        d="M16.7 12.8c0-1.9 1.6-2.8 1.7-2.8-.9-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.7 0-1.7-.7-2.8-.7-1.5 0-2.9.9-3.6 2.2-1.5 2.5-.4 6.3 1.1 8.4.8 1 1.7 2.2 2.9 2.1 1.2 0 1.6-.7 3-.7 1.4 0 1.8.7 3 .7 1.3 0 2.1-1.1 2.9-2.2.8-1.1 1.1-2.2 1.1-2.2-.1 0-2.4-.9-2.4-3.9Zm-2-5.7c.6-.7 1-1.6.9-2.5-.9 0-1.9.6-2.6 1.2-.5.6-1 1.6-.9 2.5 1 .1 2-.5 2.6-1.2Z"
      />
    </svg>
  );
}

export default function SocialButtons() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {["Google", "Apple"].map((provider) => (
        <button
          key={provider}
          type="button"
          className="btn app-social-btn d-inline-flex align-items-center justify-content-center gap-2"
        >
          <ProviderIcon provider={provider} />
          <span>{provider}</span>
        </button>
      ))}
    </div>
  );
}
