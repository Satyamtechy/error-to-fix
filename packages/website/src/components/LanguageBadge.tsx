export function LanguageBadge({ language }: { language: string }) {
  return (
    <span className="text-xs px-2 py-0.5 rounded-[4px] bg-input text-text-muted">
      {language}
    </span>
  );
}
