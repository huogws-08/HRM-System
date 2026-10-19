"use client";

type SidebarProps = {
    activePage: string;
    onNavigate: (page: string) => void;
};

const navigationGroups = [
    {
        title: "WORKSPACE",
        items: [
            { id: "dashboard", icon: "▦", label: "Tổng quan" },
            { id: "employees", icon: "♙", label: "Nhân viên" },
            { id: "attendance", icon: "◷", label: "Chấm công" },
            { id: "shifts", icon: "▣", label: "Ca làm việc" },
            { id: "leave", icon: "▤", label: "Nghỉ phép", badge: "8" },
            { id: "reports", icon: "▥", label: "Báo cáo" },
        ],
    },
    {
        title: "SYSTEM",
        items: [
            { id: "notifications", icon: "♧", label: "Thông báo" },
            { id: "settings", icon: "⚙", label: "Cài đặt" },
        ],
    },
];

export default function Sidebar({
    activePage,
    onNavigate,
}: SidebarProps) {
    return (
        <aside className="hidden min-h-screen w-64 shrink-0 flex-col bg-sidebar text-text-on-dark lg:flex">
            {/* Logo */}
            <div className="flex h-[76px] shrink-0 items-center gap-3 border-b border-white/10 px-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-xl font-bold text-white">
                    H
                </div>

                <div>
                    <h1 className="text-lg font-bold tracking-wide text-white">
                        HRM System
                    </h1>
                    <p className="text-xs text-white/60">
                        Human Resource Management
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-7">
                {navigationGroups.map((group) => (
                    <div key={group.title}>
                        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                            {group.title}
                        </p>

                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const isActive = activePage === item.id;

                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => onNavigate(item.id)}
                                        aria-current={isActive ? "page" : undefined}
                                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition ${isActive
                                            ? "bg-primary font-semibold text-white shadow-sm"
                                            : "text-white/75 hover:bg-white/10 hover:text-white"
                                            }`}
                                    >
                                        <span
                                            className="flex w-5 justify-center text-lg"
                                            aria-hidden="true"
                                        >
                                            {item.icon}
                                        </span>

                                        <span>{item.label}</span>

                                        {"badge" in item && item.badge && (
                                            <span className="ml-auto rounded-full bg-white/15 px-2 py-0.5 text-xs">
                                                {item.badge}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* User profile */}
            <div className="border-t border-white/10 p-4">
                <div className="flex items-center gap-3 rounded-xl p-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-white">
                        HR
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white">
                            Bộ phận nhân sự
                        </p>
                        <p className="truncate text-xs text-white/55">
                            HR Administrator
                        </p>
                    </div>

                    <span className="text-white/50" aria-hidden="true">
                        ⋯
                    </span>
                </div>
            </div>
        </aside>
    );
}