"use client";

type SettingItem = {
    label: string;
    value: string;
};

export default function SettingsManagement({
    darkMode = false,
    onToggleTheme,
}: {
    darkMode?: boolean;
    onToggleTheme?: () => void;
}) {
    const panel = darkMode
        ? "border-slate-700 bg-slate-800"
        : "border-slate-200 bg-white";

    const heading = darkMode ? "text-white" : "text-slate-800";
    const muted = darkMode ? "text-slate-400" : "text-slate-500";

    const settings: SettingItem[] = [
        { label: "Tên hệ thống", value: "HRM-System" },
        { label: "Phạm vi triển khai", value: "MVP" },
        {
            label: "Nguồn chấm công",
            value: "Nhập dữ liệu Excel từ thiết bị",
        },
        { label: "Thông báo", value: "Thông báo trong ứng dụng" },
        { label: "Trạng thái dữ liệu", value: "Dữ liệu mẫu ở frontend" },
    ];

    return (
        <div className="space-y-5">
            {/* Cài đặt giao diện */}
            <section className={`rounded-2xl border p-5 shadow-sm ${panel}`}>
                <h2 className={`text-lg font-bold ${heading}`}>Giao diện</h2>

                <p className={`mt-1 text-sm ${muted}`}>
                    Điều chỉnh chế độ hiển thị của trang quản lý.
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className={`font-medium ${heading}`}>
                            Chế độ {darkMode ? "tối" : "sáng"}
                        </p>

                        <p className={`mt-1 text-sm ${muted}`}>
                            Chuyển đổi giữa nền sáng và nền xanh xám đậm.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onToggleTheme}
                        disabled={!onToggleTheme}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Bật chế độ {darkMode ? "sáng" : "tối"}
                    </button>
                </div>
            </section>

            {/* Thông tin hệ thống */}
            <section className={`rounded-2xl border p-5 shadow-sm ${panel}`}>
                <h2 className={`text-lg font-bold ${heading}`}>
                    Thông tin hệ thống
                </h2>

                <div className="mt-4 space-y-4">
                    {settings.map((setting) => (
                        <div
                            key={setting.label}
                            className={`flex flex-col justify-between gap-1 border-b pb-3 sm:flex-row sm:gap-4 ${darkMode ? "border-slate-700" : "border-slate-100"
                                }`}
                        >
                            <span className={`text-sm ${muted}`}>
                                {setting.label}
                            </span>

                            <span className={`text-sm font-medium ${heading}`}>
                                {setting.value}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}