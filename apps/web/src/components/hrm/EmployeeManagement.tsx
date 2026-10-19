
"use client";

import { useMemo, useState } from "react";

type EmployeeStatus = "Đang làm việc" | "Nghỉ phép" | "Tạm nghỉ";

type Employee = {
    id: string;
    name: string;
    email: string;
    phone: string;
    department: string;
    position: string;
    status: EmployeeStatus;
};

type EmployeeForm = Omit<Employee, "id">;

const initialEmployees: Employee[] = [
    {
        id: "EMP001",
        name: "Nguyễn An",
        email: "nguyen.an@hrm.vn",
        phone: "0901234567",
        department: "Nhân sự",
        position: "HR Specialist",
        status: "Đang làm việc",
    },
    {
        id: "EMP002",
        name: "Trần Minh",
        email: "tran.minh@hrm.vn",
        phone: "0902345678",
        department: "Công nghệ",
        position: "Software Engineer",
        status: "Đang làm việc",
    },
    {
        id: "EMP003",
        name: "Lê Hoàng",
        email: "le.hoang@hrm.vn",
        phone: "0903456789",
        department: "Kinh doanh",
        position: "Sales Executive",
        status: "Nghỉ phép",
    },
    {
        id: "EMP004",
        name: "Phạm Thảo",
        email: "pham.thao@hrm.vn",
        phone: "0904567890",
        department: "Kế toán",
        position: "Accountant",
        status: "Đang làm việc",
    },
];

const emptyForm: EmployeeForm = {
    name: "",
    email: "",
    phone: "",
    department: "Nhân sự",
    position: "",
    status: "Đang làm việc",
};

const departments = [
    "Nhân sự",
    "Công nghệ",
    "Kinh doanh",
    "Kế toán",
];

function getInitials(name: string) {
    const parts = name.trim().split(/\s+/);

    if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase();
    }

    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function StatusBadge({ status }: { status: EmployeeStatus }) {
    const statusClass =
        status === "Đang làm việc"
            ? "status-success"
            : status === "Nghỉ phép"
                ? "status-warning"
                : "status-danger";

    return (
        <span
            className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${statusClass}`}
        >
            {status}
        </span>
    );
}

export default function EmployeeManagement() {
    const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
    const [search, setSearch] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<EmployeeForm>(emptyForm);
    const [formError, setFormError] = useState("");

    const filteredEmployees = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        return employees.filter((employee) => {
            const matchesSearch =
                employee.name.toLowerCase().includes(keyword) ||
                employee.id.toLowerCase().includes(keyword);

            const matchesDepartment =
                departmentFilter === "all" ||
                employee.department === departmentFilter;

            const matchesStatus =
                statusFilter === "all" || employee.status === statusFilter;

            return matchesSearch && matchesDepartment && matchesStatus;
        });
    }, [employees, search, departmentFilter, statusFilter]);

    const workingCount = employees.filter(
        (employee) => employee.status === "Đang làm việc",
    ).length;

    function openAddForm() {
        setEditingId(null);
        setForm({ ...emptyForm });
        setFormError("");
        setIsFormOpen(true);
    }

    function openEditForm(employee: Employee) {
        setEditingId(employee.id);

        setForm({
            name: employee.name,
            email: employee.email,
            phone: employee.phone,
            department: employee.department,
            position: employee.position,
            status: employee.status,
        });

        setFormError("");
        setIsFormOpen(true);
    }

    function closeForm() {
        setIsFormOpen(false);
        setEditingId(null);
        setForm({ ...emptyForm });
        setFormError("");
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const normalizedName = form.name.trim();
        const normalizedEmail = form.email.trim();
        const normalizedPhone = form.phone.trim();
        const normalizedPosition = form.position.trim();

        if (
            !normalizedName ||
            !normalizedEmail ||
            !normalizedPhone ||
            !normalizedPosition
        ) {
            setFormError("Vui lòng điền đầy đủ các trường bắt buộc.");
            return;
        }

        const duplicateEmail = employees.some(
            (employee) =>
                employee.email.toLowerCase() === normalizedEmail.toLowerCase() &&
                employee.id !== editingId,
        );

        if (duplicateEmail) {
            setFormError("Email này đã được sử dụng cho nhân viên khác.");
            return;
        }

        const normalizedForm: EmployeeForm = {
            name: normalizedName,
            email: normalizedEmail,
            phone: normalizedPhone,
            department: form.department,
            position: normalizedPosition,
            status: form.status,
        };

        if (editingId) {
            setEmployees((currentEmployees) =>
                currentEmployees.map((employee) =>
                    employee.id === editingId
                        ? { ...employee, ...normalizedForm }
                        : employee,
                ),
            );
        } else {
            const maxId = employees.reduce((max, employee) => {
                const number = Number(employee.id.replace("EMP", ""));
                return Number.isNaN(number) ? max : Math.max(max, number);
            }, 0);

            const newEmployee: Employee = {
                id: `EMP${String(maxId + 1).padStart(3, "0")}`,
                ...normalizedForm,
            };

            setEmployees((currentEmployees) => [
                newEmployee,
                ...currentEmployees,
            ]);
        }

        closeForm();
    }

    function handleDelete(employee: Employee) {
        const confirmed = window.confirm(
            `Bạn có chắc muốn xóa nhân viên ${employee.name} (${employee.id}) không?`,
        );

        if (!confirmed) {
            return;
        }

        setEmployees((currentEmployees) =>
            currentEmployees.filter((item) => item.id !== employee.id),
        );
    }

    return (
        <div className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 xl:p-8">
            {/* Tiêu đề trang */}
            <section className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        Quản lý nhân viên
                    </h1>
                    <p className="mt-2 text-sm text-text-secondary">
                        Quản lý hồ sơ, phòng ban, chức vụ và trạng thái nhân viên.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn-primary"
                    onClick={openAddForm}
                >
                    <span aria-hidden="true" className="mr-2 text-lg">
                        +
                    </span>
                    Thêm nhân viên
                </button>
            </section>

            {/* Các thẻ thống kê */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <article className="card p-5">
                    <p className="text-sm text-text-secondary">Tổng nhân viên</p>
                    <p className="mt-3 text-3xl font-bold text-foreground">
                        {employees.length}
                    </p>
                </article>

                <article className="card p-5">
                    <p className="text-sm text-text-secondary">Đang làm việc</p>
                    <p className="mt-3 text-3xl font-bold text-success">
                        {workingCount}
                    </p>
                </article>

                <article className="card p-5">
                    <p className="text-sm text-text-secondary">Kết quả lọc hiện tại</p>
                    <p className="mt-3 text-3xl font-bold text-primary">
                        {filteredEmployees.length}
                    </p>
                </article>
            </section>

            {/* Bảng danh sách */}
            <section className="card min-w-0 overflow-hidden">
                <div className="border-b border-border p-5 sm:p-6">
                    <h2 className="text-base font-bold text-foreground">
                        Danh sách nhân viên
                    </h2>
                    <p className="mt-1 text-sm text-text-secondary">
                        Dữ liệu mẫu dùng để kiểm tra các thao tác quản lý.
                    </p>

                    <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Tìm theo tên hoặc mã nhân viên..."
                            aria-label="Tìm theo tên hoặc mã nhân viên"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />

                        <select
                            className="form-control"
                            aria-label="Lọc theo phòng ban"
                            value={departmentFilter}
                            onChange={(event) => setDepartmentFilter(event.target.value)}
                        >
                            <option value="all">Tất cả phòng ban</option>
                            {departments.map((department) => (
                                <option key={department} value={department}>
                                    {department}
                                </option>
                            ))}
                        </select>

                        <select
                            className="form-control"
                            aria-label="Lọc theo trạng thái"
                            value={statusFilter}
                            onChange={(event) => setStatusFilter(event.target.value)}
                        >
                            <option value="all">Tất cả trạng thái</option>
                            <option value="Đang làm việc">Đang làm việc</option>
                            <option value="Nghỉ phép">Nghỉ phép</option>
                            <option value="Tạm nghỉ">Tạm nghỉ</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-left text-sm">
                        <thead>
                            <tr className="border-b border-border bg-background text-xs uppercase tracking-wide text-text-secondary">
                                <th className="px-5 py-4 font-semibold">Nhân viên</th>
                                <th className="px-5 py-4 font-semibold">Phòng ban</th>
                                <th className="px-5 py-4 font-semibold">Chức vụ</th>
                                <th className="px-5 py-4 font-semibold">Trạng thái</th>
                                <th className="px-5 py-4 font-semibold">Thao tác</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border">
                            {filteredEmployees.map((employee) => (
                                <tr
                                    key={employee.id}
                                    className="transition hover:bg-background"
                                >
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                                                {getInitials(employee.name)}
                                            </div>

                                            <div>
                                                <p className="font-semibold text-foreground">
                                                    {employee.name}
                                                </p>
                                                <p className="mt-1 text-xs text-text-secondary">
                                                    {employee.id}
                                                </p>
                                                <p className="mt-1 text-xs text-text-secondary">
                                                    {employee.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4 text-text-secondary">
                                        {employee.department}
                                    </td>

                                    <td className="px-5 py-4 text-text-secondary">
                                        {employee.position}
                                    </td>

                                    <td className="px-5 py-4">
                                        <StatusBadge status={employee.status} />
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                className="btn-secondary text-xs"
                                                onClick={() => openEditForm(employee)}
                                                aria-label={`Sửa ${employee.name}`}
                                            >
                                                Sửa
                                            </button>

                                            <button
                                                type="button"
                                                className="rounded-lg border border-red-300 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950"
                                                onClick={() => handleDelete(employee)}
                                                aria-label={`Xóa ${employee.name}`}
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredEmployees.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-5 py-12 text-center text-text-secondary"
                                    >
                                        <p className="font-medium">
                                            Không tìm thấy nhân viên phù hợp.
                                        </p>
                                        <p className="mt-1 text-xs">
                                            Thử thay đổi từ khóa hoặc điều kiện lọc.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="border-t border-border px-5 py-4 text-xs text-text-secondary">
                    Hiển thị {filteredEmployees.length} / {employees.length} nhân viên.
                    Dữ liệu chỉ được lưu trong trạng thái của trang hiện tại.
                </div>
            </section>

            {/* Biểu mẫu thêm và sửa */}
            {isFormOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            closeForm();
                        }
                    }}
                >
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="employee-form-title"
                        className="my-auto w-full max-w-2xl rounded-2xl border border-border bg-surface p-5 shadow-xl sm:p-7"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2
                                    id="employee-form-title"
                                    className="text-xl font-bold text-foreground"
                                >
                                    {editingId ? "Chỉnh sửa nhân viên" : "Thêm nhân viên mới"}
                                </h2>
                                <p className="mt-1 text-sm text-text-secondary">
                                    Các trường có dấu * là bắt buộc.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="rounded-lg px-3 py-2 text-text-secondary hover:bg-background"
                                onClick={closeForm}
                                aria-label="Đóng biểu mẫu"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="employee-name"
                                        className="mb-2 block text-sm font-medium text-foreground"
                                    >
                                        Họ và tên *
                                    </label>
                                    <input
                                        id="employee-name"
                                        className="form-control"
                                        value={form.name}
                                        onChange={(event) =>
                                            setForm({ ...form, name: event.target.value })
                                        }
                                        placeholder="Ví dụ: Nguyễn Văn An"
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="employee-email"
                                        className="mb-2 block text-sm font-medium text-foreground"
                                    >
                                        Email *
                                    </label>
                                    <input
                                        id="employee-email"
                                        type="email"
                                        className="form-control"
                                        value={form.email}
                                        onChange={(event) =>
                                            setForm({ ...form, email: event.target.value })
                                        }
                                        placeholder="ten@hrm.vn"
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="employee-phone"
                                        className="mb-2 block text-sm font-medium text-foreground"
                                    >
                                        Số điện thoại *
                                    </label>
                                    <input
                                        id="employee-phone"
                                        type="tel"
                                        className="form-control"
                                        value={form.phone}
                                        onChange={(event) =>
                                            setForm({ ...form, phone: event.target.value })
                                        }
                                        placeholder="09xxxxxxxx"
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="employee-department"
                                        className="mb-2 block text-sm font-medium text-foreground"
                                    >
                                        Phòng ban *
                                    </label>
                                    <select
                                        id="employee-department"
                                        className="form-control"
                                        value={form.department}
                                        onChange={(event) =>
                                            setForm({ ...form, department: event.target.value })
                                        }
                                        required
                                    >
                                        {departments.map((department) => (
                                            <option key={department} value={department}>
                                                {department}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="employee-position"
                                        className="mb-2 block text-sm font-medium text-foreground"
                                    >
                                        Chức vụ *
                                    </label>
                                    <input
                                        id="employee-position"
                                        className="form-control"
                                        value={form.position}
                                        onChange={(event) =>
                                            setForm({ ...form, position: event.target.value })
                                        }
                                        placeholder="Ví dụ: HR Specialist"
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="employee-status"
                                        className="mb-2 block text-sm font-medium text-foreground"
                                    >
                                        Trạng thái *
                                    </label>
                                    <select
                                        id="employee-status"
                                        className="form-control"
                                        value={form.status}
                                        onChange={(event) =>
                                            setForm({
                                                ...form,
                                                status: event.target.value as EmployeeStatus,
                                            })
                                        }
                                        required
                                    >
                                        <option value="Đang làm việc">Đang làm việc</option>
                                        <option value="Nghỉ phép">Nghỉ phép</option>
                                        <option value="Tạm nghỉ">Tạm nghỉ</option>
                                    </select>
                                </div>
                            </div>

                            {formError && (
                                <p
                                    role="alert"
                                    className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
                                >
                                    {formError}
                                </p>
                            )}

                            <div className="flex flex-wrap justify-end gap-3 border-t border-border pt-5">
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={closeForm}
                                >
                                    Hủy
                                </button>

                                <button type="submit" className="btn-primary">
                                    {editingId ? "Lưu thay đổi" : "Thêm nhân viên"}
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            )}
        </div>
    );
}
