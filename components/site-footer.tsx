export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-8 font-mono text-xs uppercase tracking-wide text-muted-foreground sm:flex-row sm:items-center">
        <span>Muhammad Pandji Ar Rizky Munib — SMK Telkom (2024 – 2028)</span>
        <span>&copy; {new Date().getFullYear()} — Built from scratch</span>
      </div>
    </footer>
  )
}
