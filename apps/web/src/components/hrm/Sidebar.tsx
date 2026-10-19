
"use client";

type SidebarProps = {
    activePage: string;
    onNavigate: (page: string) => void;
    collapsed: boolean;
    onToggleCollapse: () => void;
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
    collapsed,
    onToggleCollapse,
}: SidebarProps) {
    return (
        <aside
            className={`sticky top-0 flex h-screen shrink-0 flex-col overflow-hidden border-r border-border bg-sidebar text-text-on-dark transition-[width,background-color] duration-300 ${collapsed ? "w-[76px]" : "w-64"
                }`}
        >
            {/* LOGO */}
            <div
                className={`flex h-[76px] shrink-0 items-center border-b border-border ${collapsed ? "justify-center px-2" : "gap-3 px-5"
                    }`}
            >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-xl font-bold text-white dark:text-black">
                    H
                </div>

                {!collapsed && (
                    <div className="min-w-0">
                        <p className="truncate text-base font-bold tracking-tight text-foreground">
                            HRM-System
                        </p>
                        <p className="mt-0.5 truncate text-xs text-text-secondary">
                            Human Resources
                        </p>
                    </div>
                )}
            </div>

            {/* NAVIGATION */}
            <nav className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-3 py-5">
                {navigationGroups.map((group) => (
                    <div key={group.title} className="mb-6">
                        {!collapsed ? (
                            <p className="mb-3 px-3 text-[10px] font-semibold tracking-[0.16em] text-text-secondary">
                                {group.title}
                            </p>
                        ) : (
                            <div className="mb-3 border-t border-border" />
                        )}

                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const isActive = activePage === item.id;

                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        title={collapsed ? item.label : undefined}
                                        aria-label={item.label}
                                        aria-current={isActive ? "page" : undefined}
                                        onClick={() => onNavigate(item.id)}
                                        className={`relative flex min-h-11 w-full items-center rounded-xl text-sm transition-colors duration-200 ${collapsed
                                            ? "justify-center px-2"
                                            : "justify-start gap-3 px-3"
                                            } ${isActive
                                                ? "bg-primary-soft font-semibold text-primary"
                                                : "text-text-secondary hover:bg-background hover:text-foreground"
                                            }`}
                                    >
                                        {isActive && (
                                            <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-primary" />
                                        )}

                                        <span
                                            className={`flex h-7 w-7 shrink-0 items-center justify-center text-xl ${isActive ? "text-primary" : ""
                                                }`}
                                            aria-hidden="true"
                                        >
                                            {item.icon}
                                        </span>

                                        {!collapsed && (
                                            <>
                                                <span className="min-w-0 flex-1 truncate text-left">
                                                    {item.label}
                                                </span>

                                                {"badge" in item && item.badge && (
                                                    <span className="rounded-full border border-border bg-neutral px-2 py-0.5 text-xs font-semibold text-neutral-foreground">
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* BOTTOM AREA */}
            <div className="shrink-0 border-t border-border p-3">
                <button
                    type="button"
                    onClick={onToggleCollapse}
                    title={collapsed ? "Mở rộng Sidebar" : "Thu gọn Sidebar"}
                    aria-label={collapsed ? "Mở rộng Sidebar" : "Thu gọn Sidebar"}
                    className={`flex min-h-11 w-full items-center rounded-xl text-sm text-text-secondary transition-colors hover:bg-primary-soft hover:text-primary ${collapsed ? "justify-center px-2" : "gap-3 px-3"
                        }`}
                >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center text-xl">
                        {collapsed ? "»" : "«"}
                    </span>

                    {!collapsed && <span>Thu gọn menu</span>}
                </button>

                {/* USER PROFILE */}
                <div
                    className={`mt-3 flex min-h-[60px] items-center rounded-xl border border-border bg-background ${collapsed ? "justify-center p-2" : "gap-3 px-3 py-2"
                        }`}
                    title={collapsed ? "Bộ phận nhân sự" : undefined}
                >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                        HR
                    </div>

                    {!collapsed && (
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-foreground">
                                Bộ phận nhân sự
                            </p>
                            <p className="mt-0.5 truncate text-xs text-text-secondary">
                                HR Manager
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
