"use client";

import { useState } from "react";

type LeaveStatus =
    | "Chờ quản lý duyệt"
    | "Chờ HR duyệt"
    | "Đã duyệt"
    | "Từ chối";

type LeaveRequest = {
    id: string;
    name: string;
    department: string;
    type: string;
    from: string;
    to: string;
    status: LeaveStatus;
};

const leaveRequests: LeaveRequest[] = [
    {
        id: "NP001",
        name: "Phạm Quốc Bảo",
        department: "Công nghệ thông tin",
        type: "Nghỉ phép năm",
        from: "20/10/2026",
        to: "21/10/2026",
        status: "Chờ quản lý duyệt",
    },
    {
        id: "NP002",
        name: "Nguyễn Minh Anh",
        department: "Nhân sự",
        type: "Nghỉ việc riêng",
        from: "22/10/2026",
        to: "22/10/2026",
        status: "Chờ HR duyệt",
    },
    {
        id: "NP003",
        name: "Lê Thu Hà",
        department: "Kế toán",
        type: "Nghỉ phép năm",
        from: "15/10/2026",
        to: "16/10/2026",
        status: "Đã duyệt",
    },
    {
        id: "NP004",
        name: "Trần Hoàng Nam",
        department: "Kinh doanh",
        type: "Nghỉ ốm",
        from: "12/10/2026",
        to: "12/10/2026",
        status: "Từ chối",
    },
];

const filters = [
    "Tất cả",
    "Chờ quản lý duyệt",
    "Chờ HR duyệt",
    "Đã duyệt",
    "Từ chối",
];

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

function StatusBadge({ status }: { status: LeaveStatus }) {
    let color = "bg-slate-100 text-slate-600";

    if (status === "Đã duyệt") {
        color = "bg-emerald-50 text-emerald-700";
    } else if (
        status === "Chờ quản lý duyệt" ||
        status === "Chờ HR duyệt"
    ) {
        color = "bg-amber-50 text-amber-700";
    } else if (status === "Từ chối") {
        color = "bg-red-50 text-red-700";
    }

    return (
        <span
            className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${color}`}
        >
            {status}
        </span>
    );
}

export default function LeaveManagement({
    darkMode = false,
}: {
    darkMode?: boolean;
}) {
    const [filter, setFilter] = useState("Tất cả");

    const heading = darkMode ? "text-white" : "text-slate-800";
    const muted = darkMode ? "text-slate-400" : "text-slate-500";

    const panel = darkMode
        ? "border-slate-700 bg-slate-800"
        : "border-slate-200 bg-white";

    const visibleRequests =
        filter === "Tất cả"
            ? leaveRequests
            : leaveRequests.filter((request) => request.status === filter);

    const pendingCount = leaveRequests.filter(
        (request) =>
            request.status === "Chờ quản lý duyệt" ||
            request.status === "Chờ HR duyệt"
    ).length;

    const approvedCount = leaveRequests.filter(
        (request) => request.status === "Đã duyệt"
    ).length;

    return (
        <div className="space-y-5">
            {/* Thống kê đơn nghỉ phép */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <StatCard
                    label="Tổng đơn trong danh sách"
                    value={String(leaveRequests.length).padStart(2, "0")}
                    note="Dữ liệu mẫu"
                    icon="▤"
                    darkMode={darkMode}
                />

                <StatCard
                    label="Đang chờ duyệt"
                    value={String(pendingCount).padStart(2, "0")}
                    note="Cần quản lý hoặc HR xử lý"
                    icon="◷"
                    darkMode={darkMode}
                />

                <StatCard
                    label="Đã duyệt"
                    value={String(approvedCount).padStart(2, "0")}
                    note="Đơn đã hoàn tất phê duyệt"
                    icon="✓"
                    darkMode={darkMode}
                />
            </div>

            {/* Danh sách đơn nghỉ phép */}
            <div className={`rounded-2xl border p-5 shadow-sm ${panel}`}>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className={`text-lg font-bold ${heading}`}>
                            Danh sách đơn nghỉ phép
                        </h2>

                        <p className={`mt-1 text-sm ${muted}`}>
                            Theo dõi trạng thái xử lý từng đơn.
                        </p>
                    </div>

                    <select
                        value={filter}
                        onChange={(event) => setFilter(event.target.value)}
                        className={`rounded-lg border px-3 py-2 text-sm outline-none ${darkMode
                                ? "border-slate-600 bg-slate-900 text-white"
                                : "border-slate-200 bg-white text-slate-700"
                            }`}
                    >
                        {filters.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px] text-left text-sm">
                        <thead>
                            <tr
                                className={`border-b ${darkMode
                                        ? "border-slate-700 text-slate-400"
                                        : "border-slate-200 text-slate-500"
                                    }`}
                            >
                                <th className="px-3 py-3 font-medium">Mã đơn</th>
                                <th className="px-3 py-3 font-medium">Nhân viên</th>
                                <th className="px-3 py-3 font-medium">Loại nghỉ</th>
                                <th className="px-3 py-3 font-medium">Từ ngày</th>
                                <th className="px-3 py-3 font-medium">Đến ngày</th>
                                <th className="px-3 py-3 font-medium">Trạng thái</th>
                            </tr>
                        </thead>

                        <tbody>
                            {visibleRequests.map((request) => (
                                <tr
                                    key={request.id}
                                    className={`border-b last:border-0 ${darkMode ? "border-slate-700" : "border-slate-100"
                                        }`}
                                >
                                    <td className={`px-3 py-4 font-medium ${heading}`}>
                                        {request.id}
                                    </td>

                                    <td className="px-3 py-4">
                                        <p className={`font-semibold ${heading}`}>
                                            {request.name}
                                        </p>

                                        <p className={`mt-1 text-xs ${muted}`}>
                                            {request.department}
                                        </p>
                                    </td>

                                    <td className={`px-3 py-4 ${heading}`}>
                                        {request.type}
                                    </td>

                                    <td className={`px-3 py-4 ${muted}`}>
                                        {request.from}
                                    </td>

                                    <td className={`px-3 py-4 ${muted}`}>
                                        {request.to}
                                    </td>

                                    <td className="px-3 py-4">
                                        <StatusBadge status={request.status} />
                                    </td>
                                </tr>
                            ))}

                            {visibleRequests.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className={`px-3 py-8 text-center ${muted}`}
                                    >
                                        Không có đơn nghỉ phép phù hợp.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <p className={`mt-4 text-xs ${muted}`}>
                    Đây là dữ liệu mẫu ở frontend. Quy trình duyệt tuần tự qua quản lý
                    và HR sẽ được kết nối ở bước triển khai nghiệp vụ.
                </p>
            </div>
        </div>
    );
}