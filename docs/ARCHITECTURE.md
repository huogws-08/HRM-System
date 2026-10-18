# Architecture --- HRM

## 1. Trạng thái

-   **ĐÃ XÁC NHẬN:** Next.js Web, React Native Mobile, Node.js + Express
    backend, MongoDB.
-   **GIẢ ĐỊNH TẠM THỜI:** kiến trúc modular monolith; REST/JSON;
    backend là nguồn thực thi quy tắc nghiệp vụ.
-   **CÂU HỎI MỞ:** phiên bản Prisma/cách truy cập MongoDB, triển khai
    hosting, cơ chế session cụ thể.

## 2. Sơ đồ logic

``` mermaid
flowchart TD
    AdminHRManager[Next.js Web: Admin / HR / Manager]
    EmployeeApp[React Native Mobile: Employee]
    API[Express REST API]
    Auth[Auth and Authorization]
    Modules[Business Modules]
    DB[(MongoDB)]
    Scheduler[Automation Scheduler]
    Audit[Audit Log]

    AdminHRManager --> API
    EmployeeApp --> API
    API --> Auth
    Auth --> Modules
    Modules --> DB
    Modules --> Audit
    Scheduler --> Modules
```

Sơ đồ thể hiện luồng logic dự kiến, không phải sơ đồ triển khai đã chạy
thực tế.

## 3. Nguyên tắc kiến trúc

1.  **Modular monolith:** một backend Express, chia module theo nghiệp
    vụ; không tách microservices nếu chưa được duyệt.
2.  **Server là nơi kiểm soát nghiệp vụ:** client không tự quyết định
    quyền, trạng thái duyệt hoặc số dư phép cuối cùng.
3.  **API contract trước:** thay đổi endpoint/DTO cần cập nhật
    `API_SPEC.md`.
4.  **Dữ liệu có thể truy vết:** import, duyệt nghỉ phép và chỉnh sửa
    nhạy cảm cần audit.
5.  **Tách giao diện theo nền tảng:** Next.js cho Admin/HR/Manager;
    React Native cho Employee.
6.  **Không lưu secret trong source control:** dùng biến môi trường và
    secret manager phù hợp với môi trường triển khai.

## 4. Module và trách nhiệm

  Module              Trách nhiệm
  ------------------- -----------------------------------------------------
  `Auth`              Đăng nhập, xác thực phiên/token, đăng xuất
  `Employee`          Hồ sơ nhân viên và tra cứu theo quyền
  `ShiftManagement`   Định nghĩa ca và phân ca
  `Attendance`        Import `.xlsx`, kiểm tra dữ liệu, bản ghi chấm công
  `Leave`             Hạn mức phép, yêu cầu nghỉ, chuỗi duyệt
  `Reporting`         Báo cáo tuần/tháng
  `Notifications`     Hộp thông báo trong ứng dụng và trạng thái đã đọc
  `Automation`        Lập lịch nhắc/báo cáo theo cấu hình đã duyệt
  `AuditLog`          Lưu dấu vết thao tác quan trọng
  `SystemAdmin`       Cấu hình và quản trị tài khoản theo quyền đã chốt
  `Monitoring`        Health check và ghi log vận hành không chứa secret

## 5. Ranh giới client/backend

### Web và Mobile

-   Hiển thị dữ liệu được API trả về.
-   Kiểm tra dữ liệu đầu vào cơ bản để cải thiện trải nghiệm.
-   Không được xem việc ẩn nút là biện pháp phân quyền đủ.
-   Không được tự quyết định kết quả duyệt, số dư phép hoặc bản ghi chấm
    công hợp lệ.

### Backend

-   Xác thực người gọi và kiểm tra quyền trên từng thao tác.
-   Kiểm tra dữ liệu và thực thi quy tắc nghiệp vụ.
-   Lưu dữ liệu và audit log.
-   Trả lỗi theo cấu trúc thống nhất.
-   Xử lý import theo từng dòng và trả kết quả rõ ràng.

## 6. Luồng dữ liệu chính

### 6.1 Import chấm công

1.  HR tải `.xlsx` lên API.
2.  API xác thực quyền và giới hạn file.
3.  Attendance kiểm tra định dạng, header và dữ liệu từng dòng.
4.  Hệ thống ghi nhận đợt import, các dòng hợp lệ và lỗi.
5.  Hệ thống áp dụng chiến lược chống trùng đã được duyệt.
6.  Trả về tổng số dòng, số thành công, số bỏ qua và số lỗi.
7.  Ghi audit log về đợt import; không ghi nội dung nhạy cảm không cần
    thiết.

### 6.2 Duyệt nghỉ phép

1.  Employee gửi yêu cầu.
2.  Backend kiểm tra điều kiện và lưu trạng thái chờ Manager.
3.  Manager được phân công duyệt hoặc từ chối.
4.  Nếu Manager duyệt, yêu cầu chuyển sang chờ HR.
5.  HR duyệt hoặc từ chối.
6.  Chỉ tại thời điểm được quy định trong `PROJECT_SPEC.md`, hệ thống
    mới cập nhật số dư phép.
7.  Gửi thông báo trong ứng dụng và ghi audit log.

### 6.3 Thông báo và báo cáo

Automation tạo sự kiện theo lịch cấu hình; Reporting tổng hợp dữ liệu;
Notifications lưu thông báo trong ứng dụng. Không giả định có
push/email/SMS.

## 7. Lỗi, logging và an toàn

-   Dùng mã lỗi ổn định, không trả stack trace cho client ở production.
-   Không log mật khẩu, access token, refresh token, secret hoặc toàn bộ
    file import nếu không cần.
-   Hạn chế file import theo dung lượng, loại file và quyền truy cập.
-   Kiểm tra quyền trên server với mọi tài nguyên theo employee/manager
    scope.
-   Có health endpoint chỉ tiết lộ trạng thái tối thiểu.
-   Dùng UTC trong lưu trữ thời điểm nếu phù hợp; hiển thị theo múi giờ
    đã được chốt. Múi giờ nghiệp vụ hiện là câu hỏi mở.

## 8. Prisma và MongoDB --- cổng xác minh bắt buộc

Không chốt implementation trước khi kiểm tra tài liệu chính thức cho
đúng phiên bản: - MongoDB connector có được hỗ trợ trong phiên bản dự
kiến không? - Các tính năng schema/index/relationship cần dùng có giới
hạn gì? - Multi-document transaction có được hỗ trợ trực tiếp không? -
Nếu cần transaction, MongoDB deployment có replica set hay không? - Có
cần dùng MongoDB Node.js Driver cho một số thao tác không?

Nếu Prisma không đáp ứng yêu cầu, dừng và trình bày phương án thay thế
để người dùng duyệt; không tự đổi ORM.
