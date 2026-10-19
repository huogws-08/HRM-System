"use client";

type HeaderProps = {
    darkMode: boolean;
    onToggleTheme: () => void;
    title: string;
    description: string;
};

export default function Header({
    darkMode,
    onToggleTheme,
    title,
    description,
}: HeaderProps) {
    return (
        <header className="sticky top-0 z-20 border-b border-border bg-surface/95 backdrop-blur">
            <div className="flex min-h-[76px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
                {/* Page title */}
                <div className="min-w-0">
                    <h1 className="truncate text-xl font-bold text-foreground sm:text-2xl">
                        {title}
                    </h1>

                    <p className="mt-1 hidden text-sm text-text-secondary sm:block">
                        {description}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-3">
                    {/* Theme switch */}
                    <button
                        type="button"
                        role="switch"
                        aria-label="Chuyển đổi giao diện sáng và tối"
                        aria-checked={darkMode}
                        onClick={onToggleTheme}
                        className={`relative inline-flex h-8 w-[58px] shrink-0 items-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${darkMode ? "bg-primary" : "bg-gray-300"
                            }`}
                    >
                        <span
                            className={`absolute flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm shadow transition-transform duration-300 ${darkMode ? "translate-x-[29px]" : "translate-x-1"
                                }`}
                        >
                            {darkMode ? "🌙" : "☀️"}
                        </span>
                    </button>

                    {/* Notifications */}
                    <button
                        type="button"
                        aria-label="Thông báo"
                        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-lg text-foreground transition hover:bg-background"
                    >
                        ♧
                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" />
                    </button>

                    {/* Avatar */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                        HR
                    </div>
                </div>
            </div>
        </header>
    );
}