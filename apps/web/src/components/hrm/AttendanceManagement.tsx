
"use client";

import { useMemo, useRef, useState } from "react";
import * as XLSX from "xlsx";

type AttendanceStatus =
    | "Đúng giờ"
    | "Đi muộn"
    | "Vắng mặt"
    | "Thiếu dữ liệu";

type AttendanceRecord = {
    id: string;
    employeeId: string;
    employeeName: string;
    department: string;
    date: string;
    checkIn: string;
    checkOut: string;
    status: AttendanceStatus;
};

const initialRecords: AttendanceRecord[] = [
    {
        id: "ATT001",
        employeeId: "EMP001",
        employeeName: "Nguyễn Minh Anh",
        department: "Nhân sự",
        date: "2026-10-19",
        checkIn: "08:00",
        checkOut: "17:05",
        status: "Đúng giờ",
    },
    {
        id: "ATT002",
        employeeId: "EMP002",
        employeeName: "Trần Quốc Bảo",
        department: "Công nghệ thông tin",
        date: "2026-10-19",
        checkIn: "08:18",
        checkOut: "17:02",
        status: "Đi muộn",
    },
    {
        id: "ATT003",
        employeeId: "EMP003",
        employeeName: "Lê Hoàng Yến",
        department: "Kế toán",
        date: "2026-10-19",
        checkIn: "07:55",
        checkOut: "17:00",
        status: "Đúng giờ",
    },
    {
        id: "ATT004",
        employeeId: "EMP004",
        employeeName: "Phạm Gia Huy",
        department: "Kinh doanh",
        date: "2026-10-19",
        checkIn: "--",
        checkOut: "--",
        status: "Vắng mặt",
    },
    {
        id: "ATT005",
        employeeId: "EMP001",
        employeeName: "Nguyễn Minh Anh",
        department: "Nhân sự",
        date: "2026-10-16",
        checkIn: "08:04",
        checkOut: "17:10",
        status: "Đúng giờ",
    },
    {
        id: "ATT006",
        employeeId: "EMP002",
        employeeName: "Trần Quốc Bảo",
        department: "Công nghệ thông tin",
        date: "2026-10-16",
        checkIn: "08:22",
        checkOut: "17:00",
        status: "Đi muộn",
    },
];

const statusOptions = [
    "Tất cả trạng thái",
    "Đúng giờ",
    "Đi muộn",
    "Vắng mặt",
    "Thiếu dữ liệu",
];

function normalizeHeader(value: unknown) {
    return String(value ?? "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9]/g, "");
}


function getRawValue(
    row: Record<string, unknown>,
    candidates: string[],
): unknown {
    const keys = Object.keys(row);
    const foundKey = keys.find((key) =>
        candidates.includes(normalizeHeader(key)),
    );

    return foundKey ? row[foundKey] : "";
}

function getValue(
    row: Record<string, unknown>,
    candidates: string[],
): string {
    return String(getRawValue(row, candidates) ?? "").trim();
}


function formatDate(value: unknown): string {
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
        return [
            value.getFullYear(),
            String(value.getMonth() + 1).padStart(2, "0"),
            String(value.getDate()).padStart(2, "0"),
        ].join("-");
    }

    if (typeof value === "number") {
        const parsed = XLSX.SSF.parse_date_code(value);
        if (parsed) {
            return `${parsed.y}-${String(parsed.m).padStart(2, "0")}-${String(parsed.d).padStart(2, "0")}`;
        }
    }

    const text = String(value ?? "").trim();

    if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
        return text;
    }

    const match = text.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);

    if (match) {
        const [, first, second, year] = match;
        // Với ngày dạng dd/mm/yyyy, chuyển thành yyyy-mm-dd.
        return `${year}-${second.padStart(2, "0")}-${first.padStart(2, "0")}`;
    }

    return text;
}

function formatTime(value: unknown): string {
    if (typeof value === "number" && value >= 0 && value < 1) {
        const totalMinutes = Math.round(value * 24 * 60);
        const hours = Math.floor(totalMinutes / 60) % 24;
        const minutes = totalMinutes % 60;

        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    }

    const text = String(value ?? "").trim();

    if (!text) return "--";

    const match = text.match(/(\d{1,2}):(\d{2})/);

    if (match) {
        return `${match[1].padStart(2, "0")}:${match[2]}`;
    }

    return text;
}

function determineStatus(
    checkIn: string,
    checkOut: string,
): AttendanceStatus {
    if (checkIn === "--" && checkOut === "--") {
        return "Vắng mặt";
    }

    if (checkIn === "--" || checkOut === "--") {
        return "Thiếu dữ liệu";
    }

    // Quy ước demo: đi muộn sau 08:05.
    const [hours, minutes] = checkIn.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;

    return totalMinutes > 8 * 60 + 5 ? "Đi muộn" : "Đúng giờ";
}

function calculateHours(record: AttendanceRecord) {
    if (record.checkIn === "--" || record.checkOut === "--") {
        return "--";
    }

    const [inHour, inMinute] = record.checkIn.split(":").map(Number);
    const [outHour, outMinute] = record.checkOut.split(":").map(Number);

    const minutes =
        outHour * 60 + outMinute - (inHour * 60 + inMinute);

    if (minutes < 0) return "--";

    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

function StatusBadge({ status }: { status: AttendanceStatus }) {
    const styles: Record<AttendanceStatus, string> = {
        "Đúng giờ": "status-success",
        "Đi muộn": "status-warning",
        "Vắng mặt": "status-danger",
        "Thiếu dữ liệu": "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200",
    };

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
        >
            {status}
        </span>
    );
}

export default function AttendanceManagement() {
    const [records, setRecords] =
        useState<AttendanceRecord[]>(initialRecords);
    const [search, setSearch] = useState("");
    const [selectedDate, setSelectedDate] = useState("2026-10-19");
    const [statusFilter, setStatusFilter] = useState("Tất cả trạng thái");
    const [notice, setNotice] = useState("");
    const [error, setError] = useState("");
    const [isImporting, setIsImporting] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const filteredRecords = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        return records.filter((record) => {
            const matchesSearch =
                record.employeeName.toLowerCase().includes(keyword) ||
                record.employeeId.toLowerCase().includes(keyword);

            const matchesDate =
                !selectedDate || record.date === selectedDate;

            const matchesStatus =
                statusFilter === "Tất cả trạng thái" ||
                record.status === statusFilter;

            return matchesSearch && matchesDate && matchesStatus;
        });
    }, [records, search, selectedDate, statusFilter]);

    const summary = useMemo(
        () => ({
            total: filteredRecords.length,
            onTime: filteredRecords.filter(
                (record) => record.status === "Đúng giờ",
            ).length,
            late: filteredRecords.filter(
                (record) => record.status === "Đi muộn",
            ).length,
            absent: filteredRecords.filter(
                (record) => record.status === "Vắng mặt",
            ).length,
        }),
        [filteredRecords],
    );

    async function handleImport(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {
        const file = event.target.files?.[0];

        setNotice("");
        setError("");

        if (!file) return;

        if (!/\.(xlsx|xls)$/i.test(file.name)) {
            setError("Vui lòng chọn file Excel có đuôi .xlsx hoặc .xls.");
            event.target.value = "";
            return;
        }

        setIsImporting(true);

        try {
            const buffer = await file.arrayBuffer();
            const workbook = XLSX.read(buffer, { cellDates: true });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

            if (!firstSheet) {
                throw new Error("File Excel không có sheet dữ liệu.");
            }

            const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(
                firstSheet,
                { defval: "" },
            );

            if (rows.length === 0) {
                throw new Error("Sheet Excel không có dữ liệu.");
            }

            const imported: AttendanceRecord[] = rows.map((row, index) => {
                const employeeId = getValue(row, [
                    "employeeid",
                    "manhanvien",
                    "employee_code",
                    "employeecode",
                    "idnhanvien",
                ]);

                const employeeName = getValue(row, [
                    "employeename",
                    "tennhanvien",
                    "hoten",
                    "name",
                ]);



                const rawDate = getRawValue(row, [
                    "date",
                    "ngay",
                    "ngaychamcong",
                ]);

                const rawCheckIn = getRawValue(row, [
                    "checkin",
                    "giovao",
                    "timein",
                    "giovao1",
                ]);

                const rawCheckOut = getRawValue(row, [
                    "checkout",
                    "giora",
                    "timeout",
                    "giora1",
                ]);

                const date = formatDate(rawDate);
                const checkIn = formatTime(rawCheckIn);
                const checkOut = formatTime(rawCheckOut);

                if (!employeeId || !employeeName || !date) {
                    throw new Error(
                        `Dòng dữ liệu ${index + 2} thiếu mã nhân viên, họ tên hoặc ngày chấm công.`,
                    );
                }

                return {
                    id: `IMP-${Date.now()}-${index}`,
                    employeeId,
                    employeeName,
                    department:
                        getValue(row, ["department", "phongban"]) || "Chưa xác định",
                    date,
                    checkIn,
                    checkOut,
                    status: determineStatus(checkIn, checkOut),
                };
            });

            // Không ghi đè dữ liệu cũ nếu file có lỗi.
            setRecords((current) => {
                const merged = [...current];

                for (const item of imported) {
                    const existingIndex = merged.findIndex(
                        (record) =>
                            record.employeeId === item.employeeId &&
                            record.date === item.date,
                    );

                    if (existingIndex >= 0) {
                        merged[existingIndex] = item;
                    } else {
                        merged.push(item);
                    }
                }

                return merged;
            });

            setNotice(`Đã nhập ${imported.length} dòng dữ liệu từ file Excel.`);
        } catch (importError) {
            setError(
                importError instanceof Error
                    ? importError.message
                    : "Không thể đọc file Excel.",
            );
        } finally {
            setIsImporting(false);
            event.target.value = "";
        }
    }

    function handleExport() {
        const csvRows = [
            [
                "Mã nhân viên",
                "Họ tên",
                "Phòng ban",
                "Ngày",
                "Giờ vào",
                "Giờ ra",
                "Tổng giờ",
                "Trạng thái",
            ],
            ...filteredRecords.map((record) => [
                record.employeeId,
                record.employeeName,
                record.department,
                record.date,
                record.checkIn,
                record.checkOut,
                calculateHours(record),
                record.status,
            ]),
        ];

        const csv = "\uFEFF" + csvRows
            .map((row) =>
                row
                    .map((value) => `"${String(value).replace(/"/g, '""')}"`)
                    .join(","),
            )
            .join("\r\n");

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = `bang-cham-cong-${selectedDate || "tat-ca"}.csv`;
        link.click();

        URL.revokeObjectURL(url);
        setNotice("Đã xuất bảng chấm công thành file CSV.");
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">
                        Quản lý chấm công
                    </h1>
                    <p className="mt-1 text-sm text-text-secondary">
                        Theo dõi giờ làm và nhập dữ liệu từ thiết bị chấm công.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={handleExport}
                        className="btn-secondary"
                    >
                        <span aria-hidden="true">↓ </span>
                        Xuất CSV
                    </button>

                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isImporting}
                        className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <span aria-hidden="true">↑ </span>
                        {isImporting ? "Đang nhập..." : "Nhập Excel"}
                    </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={handleImport}
                        className="hidden"
                    />
                </div>
            </div>

            {notice && (
                <div
                    role="status"
                    className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200"
                >
                    {notice}
                </div>
            )}

            {error && (
                <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
                >
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                    {
                        label: "Tổng bản ghi",
                        value: summary.total,
                        icon: "▤",
                        color: "text-primary",
                    },
                    {
                        label: "Đúng giờ",
                        value: summary.onTime,
                        icon: "✓",
                        color: "text-green-600",
                    },
                    {
                        label: "Đi muộn",
                        value: summary.late,
                        icon: "◷",
                        color: "text-amber-600",
                    },
                    {
                        label: "Vắng mặt",
                        value: summary.absent,
                        icon: "×",
                        color: "text-red-600",
                    },
                ].map((item) => (
                    <div key={item.label} className="card p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-text-secondary">{item.label}</p>
                            <span className={`text-xl font-bold ${item.color}`}>
                                {item.icon}
                            </span>
                        </div>
                        <p className="mt-3 text-3xl font-bold text-foreground">
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>

            <section className="card overflow-hidden">
                <div className="border-b border-[var(--border)] p-5">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-foreground">
                                Bảng chấm công
                            </h2>
                            <p className="mt-1 text-sm text-text-secondary">
                                Dữ liệu mẫu hoặc dữ liệu vừa nhập từ Excel.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Tìm tên hoặc mã nhân viên"
                                className="form-control min-w-0"
                                aria-label="Tìm nhân viên"
                            />

                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(event) => setSelectedDate(event.target.value)}
                                className="form-control"
                                aria-label="Lọc theo ngày"
                            />

                            <select
                                value={statusFilter}
                                onChange={(event) => setStatusFilter(event.target.value)}
                                className="form-control"
                                aria-label="Lọc theo trạng thái"
                            >
                                {statusOptions.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-left text-sm">
                        <thead className="bg-background text-xs uppercase text-text-secondary">
                            <tr>
                                <th className="px-5 py-4 font-semibold">Nhân viên</th>
                                <th className="px-5 py-4 font-semibold">Phòng ban</th>
                                <th className="px-5 py-4 font-semibold">Ngày</th>
                                <th className="px-5 py-4 font-semibold">Giờ vào</th>
                                <th className="px-5 py-4 font-semibold">Giờ ra</th>
                                <th className="px-5 py-4 font-semibold">Tổng giờ</th>
                                <th className="px-5 py-4 font-semibold">Trạng thái</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[var(--border)]">
                            {filteredRecords.map((record) => (
                                <tr
                                    key={record.id}
                                    className="transition-colors hover:bg-background"
                                >
                                    <td className="px-5 py-4">
                                        <p className="font-semibold text-foreground">
                                            {record.employeeName}
                                        </p>
                                        <p className="mt-1 text-xs text-text-secondary">
                                            {record.employeeId}
                                        </p>
                                    </td>
                                    <td className="px-5 py-4 text-foreground">
                                        {record.department}
                                    </td>
                                    <td className="px-5 py-4 text-foreground">
                                        {record.date}
                                    </td>
                                    <td className="px-5 py-4 font-medium text-foreground">
                                        {record.checkIn}
                                    </td>
                                    <td className="px-5 py-4 font-medium text-foreground">
                                        {record.checkOut}
                                    </td>
                                    <td className="px-5 py-4 text-foreground">
                                        {calculateHours(record)}
                                    </td>
                                    <td className="px-5 py-4">
                                        <StatusBadge status={record.status} />
                                    </td>
                                </tr>
                            ))}

                            {filteredRecords.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-5 py-12 text-center text-text-secondary"
                                    >
                                        Không tìm thấy dữ liệu chấm công phù hợp.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="border-t border-[var(--border)] px-5 py-4 text-sm text-text-secondary">
                    Hiển thị {filteredRecords.length} / {records.length} bản ghi
                </div>
            </section>

            <section className="rounded-xl border border-[var(--border)] bg-surface p-5">
                <h2 className="font-semibold text-foreground">
                    Quy ước file Excel
                </h2>
                <p className="mt-2 text-sm text-text-secondary">
                    Sheet đầu tiên cần có các cột mã nhân viên, họ tên, ngày chấm công,
                    giờ vào và giờ ra. Có thể dùng tên cột tiếng Việt hoặc tiếng Anh
                    tương ứng. Ví dụ:
                </p>

                <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[650px] text-left text-xs">
                        <thead className="text-text-secondary">
                            <tr>
                                {[
                                    "Mã nhân viên",
                                    "Họ tên",
                                    "Ngày",
                                    "Giờ vào",
                                    "Giờ ra",
                                    "Phòng ban",
                                ].map((heading) => (
                                    <th key={heading} className="border border-[var(--border)] p-2">
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-foreground">
                                {[
                                    "EMP001",
                                    "Nguyễn Minh Anh",
                                    "2026-10-19",
                                    "08:00",
                                    "17:05",
                                    "Nhân sự",
                                ].map((value) => (
                                    <td key={value} className="border border-[var(--border)] p-2">
                                        {value}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p className="mt-3 text-xs text-text-secondary">
                    Lưu ý: đây là bản Frontend dùng dữ liệu trong bộ nhớ. Tải lại trang
                    sẽ khôi phục dữ liệu mẫu; chưa ghi dữ liệu vào Database.
                </p>
            </section>
        </div>
    );
}
