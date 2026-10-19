"use client";

import { useState } from "react";
import Sidebar from "@/components/hrm/Sidebar";
import Header from "@/components/hrm/Header";

import EmployeeManagement from "@/components/hrm/EmployeeManagement";
import AttendanceManagement from "@/components/hrm/AttendanceManagement";
import ShiftManagement from "@/components/hrm/ShiftManagement";
import LeaveManagement from "@/components/hrm/LeaveManagement";
import ReportsManagement from "@/components/hrm/ReportsManagement";
import NotificationsManagement from "@/components/hrm/NotificationsManagement";
import SettingsManagement from "@/components/hrm/SettingsManagement";

type PageKey =
  | "dashboard"
  | "employees"
  | "attendance"
  | "shifts"
  | "leave"
  | "reports"
  | "notifications"
  | "settings";

const pageInfo: Record<PageKey, { title: string; description: string }> = {
  dashboard: {
    title: "Tổng quan",
    description: "Tổng quan tình hình nhân sự của doanh nghiệp.",
  },
  employees: {
    title: "Quản lý nhân viên",
    description: "Quản lý hồ sơ và thông tin nhân viên.",
  },
  attendance: {
    title: "Quản lý chấm công",
    description: "Theo dõi giờ làm và nhập dữ liệu chấm công.",
  },
  shifts: {
    title: "Quản lý ca làm việc",
    description: "Theo dõi và phân công ca làm việc cho nhân viên.",
  },
  leave: {
    title: "Quản lý nghỉ phép",
    description: "Theo dõi đơn nghỉ phép và quy trình phê duyệt.",
  },
  reports: {
    title: "Báo cáo nhân sự",
    description: "Tổng hợp dữ liệu nhân sự theo tuần và tháng.",
  },
  notifications: {
    title: "Thông báo",
    description: "Theo dõi các thông báo trong hệ thống HRM.",
  },
  settings: {
    title: "Cài đặt hệ thống",
    description: "Quản lý một số tùy chọn giao diện và hệ thống.",
  },
};

// Dữ liệu mẫu dùng cho Dashboard
const employees = [
  {
    id: "NV001",
    name: "Nguyễn Minh Anh",
    department: "Nhân sự",
    shift: "Ca sáng",
    time: "08:00 - 17:00",
    status: "Đang làm việc",
  },
  {
    id: "NV002",
    name: "Trần Hoàng Nam",
    department: "Kinh doanh",
    shift: "Ca sáng",
    time: "08:00 - 17:00",
    status: "Đang làm việc",
  },
  {
    id: "NV003",
    name: "Lê Thu Hà",
    department: "Kế toán",
    shift: "Ca chiều",
    time: "13:00 - 21:00",
    status: "Đang làm việc",
  },
  {
    id: "NV004",
    name: "Phạm Quốc Bảo",
    department: "Công nghệ thông tin",
    shift: "Ca sáng",
    time: "08:00 - 17:00",
    status: "Nghỉ phép",
  },
];

// Thẻ thống kê dùng trong Dashboard
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

// Tiêu đề các khu vực trong Dashboard
function SectionTitle({
  title,
  description,
  darkMode,
}: {
  title: string;
  description: string;
  darkMode: boolean;
}) {
  return (
    <div className="mb-5">
      <h2
        className={`text-lg font-bold ${darkMode ? "text-white" : "text-slate-800"
          }`}
      >
        {title}
      </h2>

      <p
        className={`mt-1 text-sm ${darkMode ? "text-slate-400" : "text-slate-500"
          }`}
      >
        {description}
      </p>
    </div>
  );
}

// Nhãn trạng thái nhân viên
function StatusBadge({ status }: { status: string }) {
  let color = "bg-slate-100 text-slate-600";

  if (
    status.includes("Đã duyệt") ||
    status.includes("Đang làm việc") ||
    status === "Đúng giờ"
  ) {
    color = "bg-emerald-50 text-emerald-700";
  } else if (status.includes("Chờ") || status === "Đi muộn") {
    color = "bg-amber-50 text-amber-700";
  } else if (status.includes("Từ chối") || status === "Vắng mặt") {
    color = "bg-red-50 text-red-700";
  }

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${color}`}
    >
      {status}
    </span>
  );
}

// Trang tổng quan
function Dashboard({
  darkMode,
  onNavigate,
}: {
  darkMode: boolean;
  onNavigate: (page: PageKey) => void;
}) {
  const panel = darkMode
    ? "border-slate-700 bg-slate-800"
    : "border-slate-200 bg-white";

  const heading = darkMode ? "text-white" : "text-slate-800";
  const muted = darkMode ? "text-slate-400" : "text-slate-500";

  return (
    <div className="space-y-6">
      {/* Các thẻ thống kê */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Tổng nhân viên"
          value="128"
          note="Nhân viên trong hệ thống"
          icon="♙"
          darkMode={darkMode}
        />

        <StatCard
          label="Có mặt hôm nay"
          value="112"
          note="87,5% tổng nhân sự"
          icon="✓"
          darkMode={darkMode}
        />

        <StatCard
          label="Đơn nghỉ phép chờ duyệt"
          value="08"
          note="Cần được xử lý"
          icon="◷"
          darkMode={darkMode}
        />

        <StatCard
          label="Ca làm hôm nay"
          value="12"
          note="Các ca đã được phân công"
          icon="▦"
          darkMode={darkMode}
        />
      </div>

      {/* Tình hình nhân sự và truy cập nhanh */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div
          className={`rounded-2xl border p-5 shadow-sm xl:col-span-2 ${panel}`}
        >
          <SectionTitle
            title="Tình hình nhân sự"
            description="Số liệu minh họa về trạng thái nhân viên."
            darkMode={darkMode}
          />

          <div className="space-y-5">
            {[
              {
                label: "Đang làm việc",
                value: 112,
                percent: 87.5,
                color: "bg-blue-500",
              },
              {
                label: "Nghỉ phép",
                value: 8,
                percent: 6.25,
                color: "bg-amber-400",
              },
              {
                label: "Vắng mặt / chưa có dữ liệu",
                value: 8,
                percent: 6.25,
                color: "bg-red-400",
              },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className={`text-sm ${heading}`}>
                    {item.label}
                  </span>

                  <span className={`text-sm font-semibold ${heading}`}>
                    {item.value} người
                  </span>
                </div>

                <div
                  className={`h-2.5 overflow-hidden rounded-full ${darkMode ? "bg-slate-700" : "bg-slate-100"
                    }`}
                >
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className={`mt-5 text-xs ${muted}`}>
            Đây là dữ liệu mẫu để hoàn thiện giao diện, chưa lấy từ cơ sở dữ
            liệu.
          </p>
        </div>

        <div className={`rounded-2xl border p-5 shadow-sm ${panel}`}>
          <SectionTitle
            title="Truy cập nhanh"
            description="Đi đến các nghiệp vụ thường dùng."
            darkMode={darkMode}
          />

          <div className="space-y-3">
            {[
              {
                key: "employees" as PageKey,
                icon: "♙",
                label: "Quản lý nhân viên",
                detail: "Hồ sơ nhân sự",
              },
              {
                key: "attendance" as PageKey,
                icon: "◷",
                label: "Chấm công",
                detail: "Nhập dữ liệu Excel",
              },
              {
                key: "shifts" as PageKey,
                icon: "▦",
                label: "Ca làm việc",
                detail: "Lịch phân công",
              },
              {
                key: "leave" as PageKey,
                icon: "▤",
                label: "Nghỉ phép",
                detail: "Theo dõi phê duyệt",
              },
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => onNavigate(item.key)}
                className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${darkMode
                  ? "border-slate-700 hover:bg-slate-700"
                  : "border-slate-200 hover:bg-blue-50"
                  }`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg text-blue-600">
                  {item.icon}
                </span>

                <span className="min-w-0 flex-1">
                  <span className={`block text-sm font-semibold ${heading}`}>
                    {item.label}
                  </span>

                  <span className={`mt-1 block text-xs ${muted}`}>
                    {item.detail}
                  </span>
                </span>

                <span className={muted}>›</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Danh sách nhân viên gần đây */}
      <div className={`rounded-2xl border p-5 shadow-sm ${panel}`}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className={`text-lg font-bold ${heading}`}>
              Nhân viên gần đây
            </h2>

            <p className={`mt-1 text-sm ${muted}`}>
              Một số nhân viên trong dữ liệu minh họa.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate("employees")}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Xem danh sách
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead>
              <tr
                className={`border-b ${darkMode
                  ? "border-slate-700 text-slate-400"
                  : "border-slate-200 text-slate-500"
                  }`}
              >
                <th className="px-3 py-3 font-medium">Mã nhân viên</th>
                <th className="px-3 py-3 font-medium">Họ và tên</th>
                <th className="px-3 py-3 font-medium">Phòng ban</th>
                <th className="px-3 py-3 font-medium">Trạng thái</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className={`border-b last:border-0 ${darkMode ? "border-slate-700" : "border-slate-100"
                    }`}
                >
                  <td className={`px-3 py-4 font-medium ${heading}`}>
                    {employee.id}
                  </td>

                  <td className={`px-3 py-4 ${heading}`}>
                    {employee.name}
                  </td>

                  <td className={`px-3 py-4 ${muted}`}>
                    {employee.department}
                  </td>

                  <td className="px-3 py-4">
                    <StatusBadge status={employee.status} />
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

// Component chính: điều hướng giữa các trang HRM
export default function HomePage() {
  const [activePage, setActivePage] = useState<PageKey>("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const currentPage = pageInfo[activePage];

  function navigate(page: string) {
    if (page in pageInfo) {
      setActivePage(page as PageKey);
    }
  }

  return (
    <div
      className={
        darkMode
          ? "dark min-h-screen bg-slate-950"
          : "min-h-screen bg-[#F3F5F8]"
      }
    >
      <div className="flex h-screen min-h-0 overflow-hidden">
        <Sidebar
          activePage={activePage}
          onNavigate={navigate}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((value) => !value)}
        />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Header
            darkMode={darkMode}
            onToggleTheme={() => setDarkMode((value) => !value)}
            title={currentPage.title}
            description={currentPage.description}
          />

          <main
            className={`min-h-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 ${darkMode ? "bg-slate-950" : "bg-[#F3F5F8]"
              }`}
          >
            <div className="mx-auto w-full max-w-[1600px]">
              {/* Tổng quan */}
              {activePage === "dashboard" && (
                <Dashboard
                  darkMode={darkMode}
                  onNavigate={setActivePage}
                />
              )}

              {/* Các component nghiệp vụ đã được tách riêng */}
              {activePage === "employees" && <EmployeeManagement />}

              {activePage === "attendance" && <AttendanceManagement />}

              {activePage === "shifts" && (
                <ShiftManagement darkMode={darkMode} />
              )}

              {activePage === "leave" && (
                <LeaveManagement darkMode={darkMode} />
              )}

              {activePage === "reports" && (
                <ReportsManagement darkMode={darkMode} />
              )}

              {activePage === "notifications" && (
                <NotificationsManagement darkMode={darkMode} />
              )}

              {activePage === "settings" && (
                <SettingsManagement
                  darkMode={darkMode}
                  onToggleTheme={() =>
                    setDarkMode((value) => !value)
                  }
                />
              )}

              <footer
                className={`mt-8 border-t py-5 text-center text-xs ${darkMode
                  ? "border-slate-800 text-slate-500"
                  : "border-slate-200 text-slate-500"
                  }`}
              >
                HRM-System · Human Resource Management · MVP
              </footer>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}