"use client";

import { useState } from "react";

type NotificationType = "warning" | "info" | "success";

type NotificationItem = {
    title: string;
    detail: string;
    time: string;
    type: NotificationType;
};

const notifications: NotificationItem[] = [
    {
        title: "Đơn nghỉ phép đang chờ duyệt",
        detail: "Có 2 đơn nghỉ phép cần được xử lý.",
        time: "10 phút trước",
        type: "warning",
    },
    {
        title: "Cập nhật dữ liệu chấm công",
        detail: "Hãy nhập dữ liệu từ thiết bị chấm công.",
        time: "30 phút trước",
        type: "info",
    },
    {
        title: "Báo cáo tháng",
        detail: "Báo cáo nhân sự tháng 10 đang được cập nhật.",
        time: "1 giờ trước",
        type: "success",
    },
];

export default function NotificationsManagement({
    darkMode = false,
}: {
    darkMode?: boolean;
}) {
    const [readItems, setReadItems] = useState<string[]>([]);

    const panel = darkMode
        ? "border-slate-700 bg-slate-800"
        : "border-slate-200 bg-white";

    const heading = darkMode ? "text-white" : "text-slate-800";
    const muted = darkMode ? "text-slate-400" : "text-slate-500";

    const unreadCount = notifications.filter(
        (item) => !readItems.includes(item.title)
    ).length;

    function markAsRead(title: string) {
        setReadItems((previous) =>
            previous.includes(title) ? previous : [...previous, title]
        );
    }

    function markAllAsRead() {
        setReadItems(notifications.map((item) => item.title));
    }

    return (
        <div className={`rounded-2xl border p-5 shadow-sm ${panel}`}>
            {/* Tiêu đề và thao tác */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className={`text-lg font-bold ${heading}`}>
                        Thông báo gần đây
                    </h2>

                    <p className={`mt-1 text-sm ${muted}`}>
                        Bạn còn {unreadCount} thông báo chưa đọc.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                    className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Đánh dấu tất cả đã đọc
                </button>
            </div>

            {/* Danh sách thông báo */}
            <div className="space-y-3">
                {notifications.map((item) => {
                    const isRead = readItems.includes(item.title);

                    const dotColor =
                        item.type === "warning"
                            ? "bg-amber-400"
                            : item.type === "success"
                                ? "bg-emerald-500"
                                : "bg-blue-500";

                    return (
                        <div
                            key={item.title}
                            className={`flex items-start gap-3 rounded-xl border p-4 transition ${darkMode ? "border-slate-700" : "border-slate-200"
                                } ${isRead ? "opacity-60" : ""}`}
                        >
                            <span
                                className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${dotColor}`}
                                aria-label={isRead ? "Đã đọc" : "Chưa đọc"}
                            />

                            <div className="min-w-0 flex-1">
                                <p className={`font-semibold ${heading}`}>
                                    {item.title}
                                </p>

                                <p className={`mt-1 text-sm ${muted}`}>
                                    {item.detail}
                                </p>

                                <p className={`mt-2 text-xs ${muted}`}>
                                    {item.time}
                                </p>

                                {isRead && (
                                    <span className="mt-2 inline-block text-xs text-emerald-600">
                                        ✓ Đã đọc
                                    </span>
                                )}
                            </div>

                            {!isRead && (
                                <button
                                    type="button"
                                    onClick={() => markAsRead(item.title)}
                                    className="shrink-0 text-xs font-medium text-blue-600 hover:underline"
                                >
                                    Đã đọc
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            <p className={`mt-4 text-xs ${muted}`}>
                Trạng thái đọc hiện được lưu tạm trong giao diện và sẽ được đặt lại
                khi tải lại trang.
            </p>
        </div>
    );
}