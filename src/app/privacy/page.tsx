export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-[var(--line)] bg-white/90 p-8 prose-copy">
        <h1 className="text-4xl font-black tracking-tight text-[var(--ink)]">Privacy</h1>
        <p>
          We store account details, saved product records, saved labels, and lead-capture emails so the application can provide dashboard history and follow-up communication. External delivery providers are optional and disabled unless credentials are configured.
        </p>
      </div>
    </div>
  );
}
