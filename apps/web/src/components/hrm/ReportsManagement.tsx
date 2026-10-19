"use client";

import { useState } from "react";

type ReportRow = {
    label: string;
    value: string;
    percent: string;
};

function StatCard({
    label,
    value,
    note,
    icon,
    darkMode,
}: {
    label: string;
    value: string;
    note: string;
    icon: string;
    darkMode: boolean;
}) {
    return (
        <div
            className={`rounded-2xl border p-5 shadow-sm ${darkMode
                    ? "border-slate-700 bg-slate-800"
                    : "border-slate-200 bg-white"
                }`}
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p
                        className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"
                            }`}
                    >
                        {label}
                    </p>

                    <p
                        className={`mt-3 text-3xl font-bold ${darkMode ? "text-white" : "text-slate-800"
                            }`}
                    >
                        {value}
                    </p>

                    <p
                        className={`mt-2 text-xs ${darkMode ? "text-slate-400" : "text-slate-500"
                            }`}
                    >
                        {note}
                    </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-600">
                    {icon}
                </div>
            </div>
        </div>
    );
}

export default function ReportsManagement({
    darkMode = false,
}: {
    darkMode?: boolean;
}) {
    const [period, setPeriod] = useState("Tháng này");

    const heading = darkMode ? "text-white" : "text-slate-800";
    const muted = darkMode ? "text-slate-400" : "text-slate-500";

    const panel = darkMode
        ? "border-slate-700 bg-slate-800"
        : "border-slate-200 bg-white";

    const rows: ReportRow[] = [
        { label: "Tổng nhân viên", value: "128", percent: "100%" },
        { label: "Tỷ lệ có mặt", value: "87,5%", percent: "87,5%" },
        {
            label: "Đơn nghỉ phép đã duyệt",
            value: "24",
            percent: "—",
        },
        {
            label: "Nhân viên đi muộn",
            value: "16",
            percent: "12,5%",
        },
    ];

    return (
        <div className="space-y-5">
            {/* Bộ lọc kỳ báo cáo */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <p className={`text-sm ${muted}`}>
                    Chọn kỳ báo cáo để xem giao diện thống kê.
                </p>

                <select
                    value={period}
                    onChange={(event) => setPeriod(event.target.value)}
                    className={`rounded-lg border px-3 py-2 text-sm outline-none ${darkMode
                            ? "border-slate-600 bg-slate-900 text-white"
                            : "border-slate-200 bg-white text-slate-700"
                        }`}
                >
                    <option value="Tuần này">Tuần này</option>
                    <option value="Tháng này">Tháng này</option>
                    <option value="Tháng trước">Tháng trước</option>
                </select>
            </div>

            {/* Thẻ thống kê */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <StatCard
                    label="Kỳ báo cáo"
                    value={period}
                    note="Khoảng thời gian đang chọn"
                    icon="▤"
                    darkMode={darkMode}
                />

                <StatCard
                    label="Tỷ lệ có mặt"
                    value="87,5%"
                    note="Số liệu minh họa"
                    icon="✓"
                    darkMode={darkMode}
                />

                <StatCard
                    label="Đơn nghỉ phép"
                    value="24"
                    note="Theo dữ liệu mẫu"
                    icon="◷"
                    darkMode={darkMode}
                />
            </div>

            {/* Bảng tổng hợp */}
            <div className={`rounded-2xl border p-5 shadow-sm ${panel}`}>
                <h2 className={`text-lg font-bold ${heading}`}>
                    Tổng hợp nhân sự — {period.toLowerCase()}
                </h2>

                <p className={`mt-1 text-sm ${muted}`}>
                    Các chỉ số dưới đây chưa được tính từ dữ liệu thực tế.
                </p>

                <div className="mt-5 overflow-x-auto">
                    <table className="w-full min-w-[500px] text-left text-sm">
                        <thead>
                            <tr
                                className={`border-b ${darkMode
                                        ? "border-slate-700 text-slate-400"
                                        : "border-slate-200 text-slate-500"
                                    }`}
                            >
                                <th className="px-3 py-3 font-medium">Chỉ số</th>
                                <th className="px-3 py-3 font-medium">Giá trị</th>
                                <th className="px-3 py-3 font-medium">Tỷ lệ</th>
                            </tr>
                        </thead>

                        <tbody>
                            {rows.map((row) => (
                                <tr
                                    key={row.label}
                                    className={`border-b last:border-0 ${darkMode ? "border-slate-700" : "border-slate-100"
                                        }`}
                                >
                                    <td className={`px-3 py-4 ${heading}`}>
                                        {row.label}
                                    </td>

                                    <td className={`px-3 py-4 font-semibold ${heading}`}>
                                        {row.value}
                                    </td>

                                    <td className={`px-3 py-4 ${muted}`}>
                                        {row.percent}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}