"use client";

import { useState } from "react";

type Shift = {
    name: string;
    time: string;
    breakTime: string;
    count: number;
    type: "Hành chính" | "Linh hoạt";
};

const shifts: Shift[] = [
    {
        name: "Ca sáng",
        time: "08:00 - 17:00",
        breakTime: "12:00 - 13:00",
        count: 58,
        type: "Hành chính",
    },
    {
        name: "Ca chiều",
        time: "13:00 - 21:00",
        breakTime: "17:00 - 18:00",
        count: 24,
        type: "Linh hoạt",
    },
    {
        name: "Ca tối",
        time: "21:00 - 06:00",
        breakTime: "01:00 - 02:00",
        count: 12,
        type: "Linh hoạt",
    },
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

export default function ShiftManagement({
    darkMode = false,
}: {
    darkMode?: boolean;
}) {
    const [filter, setFilter] = useState("Tất cả");

    const heading = darkMode ? "text-white" : "text-slate-800";
    const muted = darkMode ? "text-slate-400" : "text-slate-500";

    const visibleShifts =
        filter === "Tất cả"
            ? shifts
            : shifts.filter((shift) => shift.type === filter);

    return (
        <div className="space-y-5">
            {/* Thống kê ca làm việc */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <StatCard
                    label="Loại ca làm việc"
                    value="03"
                    note="Ca đang được sử dụng"
                    icon="▦"
                    darkMode={darkMode}
                />

                <StatCard
                    label="Nhân viên đã phân ca"
                    value="94"
                    note="Theo dữ liệu mẫu"
                    icon="♙"
                    darkMode={darkMode}
                />

                <StatCard
                    label="Chưa phân ca"
                    value="06"
                    note="Cần HR kiểm tra"
                    icon="◷"
                    darkMode={darkMode}
                />
            </div>

            {/* Danh sách ca làm việc */}
            <div
                className={`rounded-2xl border p-5 shadow-sm ${darkMode
                        ? "border-slate-700 bg-slate-800"
                        : "border-slate-200 bg-white"
                    }`}
            >
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className={`text-lg font-bold ${heading}`}>
                            Danh sách ca làm việc
                        </h2>

                        <p className={`mt-1 text-sm ${muted}`}>
                            Thông tin ca và số lượng nhân viên minh họa.
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
                        <option value="Tất cả">Tất cả ca</option>
                        <option value="Hành chính">Hành chính</option>
                        <option value="Linh hoạt">Linh hoạt</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {visibleShifts.map((shift) => (
                        <div
                            key={shift.name}
                            className={`rounded-xl border p-5 ${darkMode ? "border-slate-700" : "border-slate-200"
                                }`}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className={`font-bold ${heading}`}>{shift.name}</h3>

                                    <p className={`mt-2 text-sm ${muted}`}>{shift.type}</p>
                                </div>

                                <span className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
                                    {shift.count} nhân viên
                                </span>
                            </div>

                            <div className={`mt-5 space-y-3 text-sm ${muted}`}>
                                <p>
                                    ◷ Giờ làm:{" "}
                                    <span className={heading}>{shift.time}</span>
                                </p>

                                <p>
                                    ☕ Giờ nghỉ:{" "}
                                    <span className={heading}>{shift.breakTime}</span>
                                </p>
                            </div>

                            <p className={`mt-4 text-xs ${muted}`}>
                                Phân ca thực tế sẽ được bổ sung khi kết nối dữ liệu.
                            </p>
                        </div>
                    ))}

                    {visibleShifts.length === 0 && (
                        <p className={`py-8 text-center text-sm ${muted}`}>
                            Không có ca làm việc phù hợp.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}