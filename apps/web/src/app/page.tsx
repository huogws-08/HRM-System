"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/hrm/Sidebar";
import Header from "@/components/hrm/Header";

// ============================================
// DỮ LIỆU MINH HỌA
// ============================================

const statistics = [
  {
    label: "Tổng nhân viên",
    value: "128",
    change: "+8.2%",
    description: "so với tháng trước",
    icon: "♙",
    color: "text-primary",
    background: "bg-primary-soft",
  },
  {
    label: "Đang làm việc",
    value: "116",
    change: "90.6%",
    description: "tổng số nhân viên",
    icon: "✓",
    color: "text-success",
    background: "bg-green-500/10",
  },
  {
    label: "Đơn nghỉ chờ duyệt",
    value: "08",
    change: "Cần xử lý",
    description: "đơn đang chờ phê duyệt",
    icon: "◷",
    color: "text-warning",
    background: "bg-amber-500/10",
  },
  {
    label: "Vắng mặt hôm nay",
    value: "04",
    change: "3.1%",
    description: "trên tổng nhân viên",
    icon: "!",
    color: "text-danger",
    background: "bg-red-500/10",
  },
];

const employees = [
  {
    initials: "NA",
    name: "Nguyễn An",
    id: "EMP001",
    department: "Nhân sự",
    position: "HR Specialist",
    status: "Đang làm việc",
  },
  {
    initials: "TM",
    name: "Trần Minh",
    id: "EMP002",
    department: "Công nghệ",
    position: "Software Engineer",
    status: "Đang làm việc",
  },
  {
    initials: "LH",
    name: "Lê Hoàng",
    id: "EMP003",
    department: "Kinh doanh",
    position: "Sales Executive",
    status: "Nghỉ phép",
  },
  {
    initials: "PT",
    name: "Phạm Thảo",
    id: "EMP004",
    department: "Kế toán",
    position: "Accountant",
    status: "Đang làm việc",
  },
];

const leaveRequests = [
  {
    name: "Lê Hoàng",
    initials: "LH",
    type: "Nghỉ phép năm",
    date: "20/10/2026 – 21/10/2026",
    days: "2 ngày",
    status: "Chờ duyệt",
  },
  {
    name: "Nguyễn Mai",
    initials: "NM",
    type: "Nghỉ việc riêng",
    date: "22/10/2026",
    days: "1 ngày",
    status: "Chờ duyệt",
  },
  {
    name: "Trần Phúc",
    initials: "TP",
    type: "Nghỉ phép năm",
    date: "24/10/2026 – 25/10/2026",
    days: "2 ngày",
    status: "Chờ duyệt",
  },
];

const attendanceData = [
  { day: "T2", present: 108, absent: 12 },
  { day: "T3", present: 113, absent: 7 },
  { day: "T4", present: 110, absent: 10 },
  { day: "T5", present: 116, absent: 4 },
  { day: "T6", present: 105, absent: 15 },
  { day: "T7", present: 72, absent: 8 },
  { day: "CN", present: 24, absent: 6 },
];

// ============================================
// COMPONENT: TRẠNG THÁI
// ============================================

function StatusBadge({ status }: { status: string }) {
  let className = "status-warning";

  if (status === "Đang làm việc") {
    className = "status-success";
  } else if (status === "Nghỉ phép") {
    className = "status-danger";
  }

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${className}`}
    >
      {status}
    </span>
  );
}

// ============================================
// COMPONENT: TIÊU ĐỀ TỪNG KHU VỰC
// ============================================

function SectionHeading({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: string;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="text-base font-bold text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-text-secondary">{description}</p>
      </div>

      {action && (
        <button
          type="button"
          className="btn-secondary text-sm"
          onClick={() =>
            window.alert(
              "Chức năng này sẽ được phát triển ở bước tiếp theo.",
            )
          }
        >
          {action} <span aria-hidden="true">→</span>
        </button>
      )}
    </div>
  );
}

// ============================================
// TRANG DASHBOARD
// ============================================

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  // Điều hướng sidebar.
  // Những trang khác sẽ được xây dựng ở các bước tiếp theo.
  function handleNavigate(page: string) {
    if (page !== "dashboard") {
      window.alert("Trang này sẽ được xây dựng ở bước tiếp theo.");
      return;
    }

    setActivePage(page);
  }

  // Khôi phục chế độ giao diện đã chọn.
  useEffect(() => {
    const savedMode = window.localStorage.getItem("hrm-theme");
    const shouldUseDarkMode = savedMode === "dark";

    document.documentElement.classList.toggle(
      "dark",
      shouldUseDarkMode,
    );

    document.body.classList.toggle("dark", shouldUseDarkMode);

    setDarkMode(shouldUseDarkMode);
  }, []);

  // Chuyển đổi Light Mode / Dark Mode.
  function toggleTheme() {
    const nextMode = !darkMode;

    document.documentElement.classList.toggle("dark", nextMode);
    document.body.classList.toggle("dark", nextMode);

    window.localStorage.setItem(
      "hrm-theme",
      nextMode ? "dark" : "light",
    );

    setDarkMode(nextMode);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <Sidebar
          activePage={activePage}
          onNavigate={handleNavigate}
        />

        {/* NỘI DUNG CHÍNH */}
        <main className="min-w-0 flex-1">
          {/* HEADER */}
          <Header
            darkMode={darkMode}
            onToggleTheme={toggleTheme}
            title="Tổng quan"
            description="Workspace / Tổng quan"
          />

          {/* DASHBOARD */}
          <div className="mx-auto max-w-[1600px] space-y-7 p-4 sm:p-6 xl:p-8">
            {/* LỜI CHÀO */}
            <section className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-primary">
                  SUNDAY, OCTOBER 18, 2026
                </p>

                <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Chào buổi tối! 👋
                </h1>

                <p className="mt-2 text-sm text-text-secondary sm:text-base">
                  Đây là tình hình nhân sự tổng quan của doanh nghiệp hôm
                  nay.
                </p>
              </div>

              <button
                type="button"
                className="btn-primary"
                onClick={() =>
                  window.alert(
                    "Chức năng thêm nhân viên sẽ được phát triển ở bước tiếp theo.",
                  )
                }
              >
                <span className="text-lg" aria-hidden="true">
                  +
                </span>
                Thêm nhân viên
              </button>
            </section>

            {/* THỐNG KÊ NHÂN SỰ */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-bold text-foreground">
                  Tổng quan nhân sự
                </h2>

                <span className="text-xs text-text-secondary">
                  Dữ liệu minh họa
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {statistics.map((item) => (
                  <article
                    key={item.label}
                    className="card min-w-0 p-5 transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-medium text-text-secondary">
                        {item.label}
                      </p>

                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl font-semibold ${item.background} ${item.color}`}
                      >
                        {item.icon}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap items-baseline gap-2">
                      <p className="text-3xl font-bold tracking-tight text-foreground">
                        {item.value}
                      </p>

                      <span
                        className={`text-xs font-semibold ${item.color}`}
                      >
                        {item.change}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-text-secondary">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            {/* BIỂU ĐỒ CHẤM CÔNG VÀ PHÂN BỔ NHÂN SỰ */}
            <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              {/* BIỂU ĐỒ CHẤM CÔNG */}
              <article className="card min-w-0 p-5 sm:p-6 xl:col-span-2">
                <SectionHeading
                  title="Tình hình chấm công"
                  description="Tổng hợp nhân viên có mặt trong tuần"
                  action="Xem báo cáo"
                />

                <div className="mb-5 flex flex-wrap gap-5">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <span className="h-3 w-3 rounded-sm bg-chart-primary" />
                    Có mặt
                  </div>

                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <span className="h-3 w-3 rounded-sm bg-chart-secondary" />
                    Vắng mặt
                  </div>
                </div>

                <div className="flex h-56 items-end justify-between gap-2 border-b border-border pb-2 sm:gap-4">
                  {attendanceData.map((item) => {
                    const total = item.present + item.absent;

                    return (
                      <div
                        key={item.day}
                        className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                      >
                        <div className="flex h-full w-full max-w-12 items-end justify-center">
                          <div
                            className="flex w-full flex-col justify-end overflow-hidden rounded-t-md"
                            title={`${item.present} có mặt, ${item.absent} vắng mặt`}
                            style={{
                              height: `${(total / 130) * 100}%`,
                            }}
                          >
                            <div
                              className="w-full bg-chart-secondary"
                              style={{
                                height: `${(item.absent / total) * 100}%`,
                              }}
                            />

                            <div
                              className="w-full bg-chart-primary"
                              style={{
                                height: `${(item.present / total) * 100}%`,
                              }}
                            />
                          </div>
                        </div>

                        <span className="text-xs text-text-secondary">
                          {item.day}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex flex-wrap justify-between gap-2 text-xs text-text-secondary">
                  <span>Thống kê từ thứ Hai đến Chủ nhật</span>
                  <span>Đơn vị: nhân viên/ngày</span>
                </div>
              </article>

              {/* PHÂN BỔ NHÂN SỰ */}
              <article className="card min-w-0 p-5 sm:p-6">
                <SectionHeading
                  title="Phân bổ nhân sự"
                  description="Theo tình trạng làm việc"
                />

                <div className="flex flex-col items-center py-3">
                  <div
                    className="relative flex h-44 w-44 items-center justify-center rounded-full"
                    style={{
                      background:
                        "conic-gradient(var(--chart-primary) 0% 72%, var(--chart-secondary) 72% 91%, var(--border) 91% 100%)",
                    }}
                  >
                    <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-surface">
                      <span className="text-3xl font-bold text-foreground">
                        128
                      </span>

                      <span className="mt-1 text-xs text-text-secondary">
                        Nhân viên
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <span className="h-3 w-3 rounded-sm bg-chart-primary" />
                      Đang làm việc
                    </div>

                    <span className="text-sm font-semibold text-foreground">
                      92%
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <span className="h-3 w-3 rounded-sm bg-chart-secondary" />
                      Nghỉ phép
                    </div>

                    <span className="text-sm font-semibold text-foreground">
                      6%
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <span className="h-3 w-3 rounded-sm bg-border" />
                      Khác
                    </div>

                    <span className="text-sm font-semibold text-foreground">
                      2%
                    </span>
                  </div>
                </div>
              </article>
            </section>

            {/* BẢNG NHÂN VIÊN GẦN ĐÂY */}
            <section className="card min-w-0 overflow-hidden">
              <div className="p-5 sm:p-6">
                <SectionHeading
                  title="Nhân viên gần đây"
                  description="Danh sách nhân viên và trạng thái hiện tại"
                  action="Xem tất cả"
                />

                <div className="mb-4 flex flex-col gap-3 sm:flex-row">
                  <input
                    type="search"
                    placeholder="Tìm theo tên hoặc mã nhân viên..."
                    aria-label="Tìm kiếm nhân viên"
                    className="form-control sm:max-w-sm"
                    onChange={(event) => {
                      const keyword = event.target.value.toLowerCase();

                      document
                        .querySelectorAll<HTMLElement>(
                          "[data-employee-row]",
                        )
                        .forEach((row) => {
                          row.hidden =
                            !row.dataset.employeeRow?.includes(keyword);
                        });
                    }}
                  />

                  <select
                    aria-label="Lọc phòng ban"
                    className="form-control sm:ml-auto sm:max-w-48"
                    defaultValue="all"
                    onChange={(event) => {
                      const department = event.target.value;

                      document
                        .querySelectorAll<HTMLElement>(
                          "[data-employee-row]",
                        )
                        .forEach((row) => {
                          row.hidden =
                            department !== "all" &&
                            row.dataset.department !== department;
                        });
                    }}
                  >
                    <option value="all">Tất cả phòng ban</option>
                    <option value="Nhân sự">Nhân sự</option>
                    <option value="Công nghệ">Công nghệ</option>
                    <option value="Kinh doanh">Kinh doanh</option>
                    <option value="Kế toán">Kế toán</option>
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[650px] text-left text-sm">
                    <thead>
                      <tr className="border-y border-border bg-background text-xs uppercase tracking-wide text-text-secondary">
                        <th className="px-4 py-3 font-semibold">
                          Nhân viên
                        </th>
                        <th className="px-4 py-3 font-semibold">
                          Phòng ban
                        </th>
                        <th className="px-4 py-3 font-semibold">
                          Chức vụ
                        </th>
                        <th className="px-4 py-3 font-semibold">
                          Trạng thái
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-border">
                      {employees.map((employee) => (
                        <tr
                          key={employee.id}
                          data-employee-row={`${employee.name} ${employee.id} ${employee.department} ${employee.position}`.toLowerCase()}
                          data-department={employee.department}
                          className="transition hover:bg-background"
                        >
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                                {employee.initials}
                              </div>

                              <div>
                                <p className="font-semibold text-foreground">
                                  {employee.name}
                                </p>

                                <p className="mt-1 text-xs text-text-secondary">
                                  {employee.id}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-4 text-text-secondary">
                            {employee.department}
                          </td>

                          <td className="px-4 py-4 text-text-secondary">
                            {employee.position}
                          </td>

                          <td className="px-4 py-4">
                            <StatusBadge status={employee.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="mt-4 text-xs text-text-secondary">
                  Đang hiển thị dữ liệu minh họa. Chưa kết nối cơ sở dữ liệu.
                </p>
              </div>
            </section>

            {/* YÊU CẦU NGHỈ PHÉP */}
            <section className="card min-w-0 overflow-hidden">
              <div className="p-5 sm:p-6">
                <SectionHeading
                  title="Yêu cầu nghỉ phép"
                  description="Các đơn đang chờ xử lý"
                  action="Xem tất cả"
                />

                <div className="space-y-0">
                  {leaveRequests.map((request) => (
                    <div
                      key={`${request.name}-${request.date}`}
                      className="flex flex-col gap-4 border-b border-border py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-soft font-semibold text-primary">
                          {request.initials}
                        </div>

                        <div className="min-w-0">
                          <p className="font-semibold text-foreground">
                            {request.name}
                          </p>

                          <p className="mt-1 text-sm text-text-secondary">
                            {request.type}
                          </p>

                          <p className="mt-1 text-xs text-text-secondary">
                            {request.date} · {request.days}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                        <StatusBadge status={request.status} />

                        <button
                          type="button"
                          className="btn-secondary text-xs"
                          onClick={() =>
                            window.alert(
                              `Chi tiết đơn nghỉ phép của ${request.name} sẽ được phát triển ở bước tiếp theo.`,
                            )
                          }
                        >
                          Chi tiết
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CHÂN TRANG */}
            <footer className="flex flex-col justify-between gap-2 border-t border-border py-5 text-xs text-text-secondary sm:flex-row">
              <p>© 2026 HRM System. All rights reserved.</p>
              <p>Hệ thống quản lý nhân sự · MVP</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}