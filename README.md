# HRM --- Human Resource Management System

## 1. Giới thiệu

HRM là hệ thống quản lý nhân sự hướng đến quy mô MVP phục vụ đồ
án/project cá nhân. Hệ thống hỗ trợ quản lý hồ sơ nhân viên, ca làm,
chấm công, nghỉ phép, báo cáo và thông báo nội bộ.

Tài liệu này là điểm bắt đầu để người phát triển và AI coding assistant
hiểu phạm vi dự án trước khi thay đổi mã nguồn.

## 2. Trạng thái quyết định

-   **Đã xác nhận:** Web cho Admin/HR/Manager dùng Next.js; ứng dụng
    nhân viên dùng React Native trên iOS/Android; backend Node.js +
    Express; cơ sở dữ liệu MongoDB.
-   **Đã xác nhận:** Chấm công nhập từ file Excel `.xlsx`; HR phân ca;
    HR thiết lập hạn mức nghỉ phép năm cho từng nhân viên; yêu cầu nghỉ
    phép được Manager duyệt trước rồi HR duyệt; thông báo trong ứng
    dụng; có lịch sử kiểm toán.
-   **Đang chờ quyết định:** Quyền tạo/quản lý tài khoản giữa Admin và
    HR; quy tắc phép năm chi tiết; định dạng file Excel; quy tắc sửa dữ
    liệu chấm công; quan hệ quản lý--nhân viên; lịch chạy tự động.
-   **Lưu ý kỹ thuật:** Chưa chốt schema Prisma cuối cùng. Phải kiểm tra
    phiên bản Prisma hỗ trợ MongoDB và chiến lược transaction trước khi
    triển khai.

## 3. Ứng dụng và thành phần

-   **Web:** Next.js --- giao diện Admin, HR và Manager.
-   **Mobile:** React Native --- giao diện nhân viên, bao gồm xem lịch
    ca.
-   **API:** Node.js + Express --- xử lý nghiệp vụ và cung cấp REST API.
-   **Database:** MongoDB.
-   **ORM/data access:** Prisma là lựa chọn mong muốn nhưng cần xác minh
    tương thích trước khi chốt.

## 4. Cấu trúc tài liệu

  -----------------------------------------------------------------------
  File                                Mục đích
  ----------------------------------- -----------------------------------
  `docs/PROJECT_SPEC.md`              Phạm vi MVP, vai trò, nghiệp vụ,
                                      tiêu chí nghiệm thu

  `docs/ARCHITECTURE.md`              Kiến trúc tổng thể và ranh giới
                                      module

  `docs/DATABASE.md`                  Mô hình dữ liệu logic, quan hệ và
                                      ràng buộc

  `docs/API_SPEC.md`                  Quy ước và hợp đồng REST API dự
                                      kiến

  `docs/AUTHORIZATION.md`             Quyền truy cập, luồng phê duyệt và
                                      kiểm toán

  `docs/TEST_PLAN.md`                 Kế hoạch kiểm thử và tiêu chí đạt

  `docs/AI_RULES.md`                  Quy tắc dành cho AI coding
                                      assistant
  -----------------------------------------------------------------------

## 5. Nguyên tắc làm việc

1.  Đọc tài liệu liên quan trước khi lập kế hoạch hoặc sửa code.
2.  Không tự ý mở rộng MVP, đổi kiến trúc, đổi schema hoặc đổi API.
3.  Khi có điểm chưa rõ, nêu câu hỏi hoặc ghi giả định; không âm thầm
    biến giả định thành yêu cầu.
4.  Không đưa secret thật vào Git, tài liệu, log hoặc ví dụ.
5.  Chỉ ghi nhận test đã chạy thực tế; không tuyên bố pass nếu chưa
    chạy.
6.  Khi một quyết định được duyệt, cập nhật tài liệu liên quan và kiểm
    tra tính nhất quán giữa các file.

## 6. Thiết lập môi trường

Tạo file `.env` cục bộ từ mẫu do dự án cung cấp sau khi các biến môi
trường được chốt. Không commit `.env`. Các tên placeholder có thể dùng
trong tài liệu: `<MONGODB_URI>`, `<JWT_SECRET>`. Không dùng giá trị thật
trong tài liệu hoặc ví dụ.

## 7. Trạng thái

Đây là bộ tài liệu thiết kế ban đầu, chưa phải bằng chứng rằng ứng dụng
đã được triển khai hoặc kiểm thử. Các mục "đang chờ quyết định" trong
`PROJECT_SPEC.md` phải được xử lý trước khi triển khai nghiệp vụ phụ
thuộc vào chúng.    