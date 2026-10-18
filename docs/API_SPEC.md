# API Specification --- HRM

## 1. Trạng thái

Đây là hợp đồng API **dự kiến**, chưa phải API đã triển khai. Prefix đề
xuất: `/api/v1`. Giao tiếp đề xuất: REST + JSON, trừ upload file dùng
`multipart/form-data`.

Tên endpoint, payload và enum phải được đối chiếu với implementation
trước khi tuyên bố hoàn thành.

## 2. Quy ước chung

-   Base path: `/api/v1`.
-   Dữ liệu phản hồi JSON.
-   Endpoint cần đăng nhập yêu cầu session/token hợp lệ.
-   Quyền phải được kiểm tra ở server.
-   Dùng ISO 8601 cho thời điểm; quy tắc múi giờ cần chốt.
-   Dùng phân trang cho danh sách lớn; định dạng tham số thống nhất khi
    triển khai.
-   Không trả `passwordHash`, secret hoặc token của người khác.
-   Upload `.xlsx` phải giới hạn dung lượng và xác thực nội dung, không
    chỉ dựa vào phần mở rộng.

## 3. Phản hồi và lỗi dự kiến

Thành công: trả object hoặc danh sách theo contract endpoint cụ thể.

Lỗi chuẩn hóa đề xuất:

``` json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request data is invalid",
    "details": []
  }
}
```

Mã lỗi gợi ý: `VALIDATION_ERROR`, `UNAUTHENTICATED`, `FORBIDDEN`,
`NOT_FOUND`, `CONFLICT`, `FILE_INVALID`, `RATE_LIMITED`,
`INTERNAL_ERROR`.

Đây là định dạng đề xuất, cần được xác nhận khi triển khai. Không trả
stack trace trong production.

## 4. Endpoint dự kiến

### 4.1 Auth

  -----------------------------------------------------------------------------
  Method            Path                    Mục đích          Quyền
  ----------------- ----------------------- ----------------- -----------------
  `POST`            `/api/v1/auth/login`    Đăng nhập         Public, có rate
                                                              limit

  `POST`            `/api/v1/auth/logout`   Đăng xuất         Người dùng đã
                                                              đăng nhập

  `GET`             `/api/v1/auth/me`       Lấy người dùng    Người dùng đã
                                            hiện tại          đăng nhập
  -----------------------------------------------------------------------------

Payload đăng nhập và chiến lược cookie/token/session chưa chốt. Không
đưa mật khẩu thật vào ví dụ hoặc tài liệu.

### 4.2 Employees

  -------------------------------------------------------------------------------
  Method            Path                      Mục đích          Quyền dự kiến
  ----------------- ------------------------- ----------------- -----------------
  `GET`             `/api/v1/employees`       Danh sách nhân    Admin/HR; Manager
                                              viên              theo phạm vi

  `POST`            `/api/v1/employees`       Tạo hồ sơ nhân    HR/Admin theo
                                              viên              quyền cuối cùng

  `GET`             `/api/v1/employees/:id`   Chi tiết hồ sơ    Theo quyền và
                                                                phạm vi

  `PATCH`           `/api/v1/employees/:id`   Cập nhật hồ sơ    HR/Admin theo
                                                                quyền cuối cùng
  -------------------------------------------------------------------------------

Không trả toàn bộ hồ sơ cho mọi người dùng; Employee chỉ xem dữ liệu
được phép của chính mình.

### 4.3 Shifts

  ---------------------------------------------------------------------------------------
  Method            Path                              Mục đích          Quyền dự kiến
  ----------------- --------------------------------- ----------------- -----------------
  `GET`             `/api/v1/shifts`                  Danh sách định    Người dùng được
                                                      nghĩa ca          phép

  `POST`            `/api/v1/shifts`                  Tạo ca            HR

  `GET`             `/api/v1/shift-assignments`       Xem lịch phân ca  HR; Employee của
                                                                        mình; Manager
                                                                        theo phạm vi

  `POST`            `/api/v1/shift-assignments`       Phân ca           HR

  `PATCH`           `/api/v1/shift-assignments/:id`   Sửa phân ca       HR, theo quy tắc
                                                                        lịch sử đã chốt
  ---------------------------------------------------------------------------------------

### 4.4 Attendance

  ----------------------------------------------------------------------------------------
  Method            Path                               Mục đích          Quyền dự kiến
  ----------------- ---------------------------------- ----------------- -----------------
  `POST`            `/api/v1/attendance/imports`       Tải file `.xlsx`  HR
                                                       và bắt đầu import 

  `GET`             `/api/v1/attendance/imports`       Danh sách đợt     HR/Admin theo
                                                       import            quyền

  `GET`             `/api/v1/attendance/imports/:id`   Kết quả import    HR/Admin theo
                                                                         quyền

  `GET`             `/api/v1/attendance/records`       Tra cứu bản ghi   Theo vai trò và
                                                       chấm công         phạm vi

  `PATCH`           `/api/v1/attendance/records/:id`   Điều chỉnh bản    Chưa chốt; không
                                                       ghi               triển khai trước
                                                                         khi duyệt quy tắc
  ----------------------------------------------------------------------------------------

Upload dự kiến dùng `multipart/form-data`, trường file tạm đề xuất là
`file`. Kết quả import nên có `totalRows`, `successRows`, `skippedRows`,
`errorRows` và lỗi theo dòng, không bao gồm dữ liệu nhạy cảm không cần
thiết.

### 4.5 Leave

  -----------------------------------------------------------------------------------------------------
  Method            Path                                            Mục đích          Quyền dự kiến
  ----------------- ----------------------------------------------- ----------------- -----------------
  `GET`             `/api/v1/leave/balances/me`                     Xem số dư phép    Employee
                                                                    của mình          

  `GET`             `/api/v1/leave/balances`                        Tra cứu số dư     HR/Admin theo
                                                                                      quyền

  `PUT`             `/api/v1/leave/balances/:employeeId/:year`      HR thiết lập hạn  HR
                                                                    mức               

  `POST`            `/api/v1/leave/requests`                        Tạo yêu cầu nghỉ  Employee

  `GET`             `/api/v1/leave/requests`                        Danh sách yêu cầu Theo vai trò
                                                                    theo phạm vi      

  `GET`             `/api/v1/leave/requests/:id`                    Chi tiết yêu cầu  Chủ yêu cầu/người
                                                                                      duyệt/HR theo
                                                                                      quyền

  `POST`            `/api/v1/leave/requests/:id/manager-decision`   Manager duyệt/từ  Manager được phân
                                                                    chối              công

  `POST`            `/api/v1/leave/requests/:id/hr-decision`        HR duyệt/từ chối  HR

  `POST`            `/api/v1/leave/requests/:id/cancel`             Hủy yêu cầu       Chưa chốt điều
                                                                                      kiện hủy
  -----------------------------------------------------------------------------------------------------

Tên trạng thái dự kiến: `PENDING_MANAGER`, `PENDING_HR`, `APPROVED`,
`REJECTED`, `CANCELLED`. Đây là enum đề xuất, phải thống nhất sau khi
chốt nghiệp vụ. Không cho phép HR duyệt bước cuối nếu Manager chưa
duyệt, trừ khi có quy tắc ngoại lệ được phê duyệt.

### 4.6 Reporting

  ------------------------------------------------------------------------------------
  Method            Path                           Mục đích          Quyền dự kiến
  ----------------- ------------------------------ ----------------- -----------------
  `GET`             `/api/v1/reports/attendance`   Báo cáo chấm công HR/Admin; Manager
                                                                     theo phạm vi

  `GET`             `/api/v1/reports/leave`        Báo cáo nghỉ phép HR/Admin; Manager
                                                                     theo phạm vi

  `GET`             `/api/v1/reports/weekly`       Báo cáo tuần      Theo quyền

  `GET`             `/api/v1/reports/monthly`      Báo cáo tháng     Theo quyền
  ------------------------------------------------------------------------------------

Các bộ lọc và cột báo cáo phải chốt theo yêu cầu thực tế. Không suy đoán
công thức tính công/đi trễ khi chưa có quy tắc.

### 4.7 Notifications

  ----------------------------------------------------------------------------------------
  Method            Path                               Mục đích          Quyền
  ----------------- ---------------------------------- ----------------- -----------------
  `GET`             `/api/v1/notifications`            Xem thông báo của Người dùng đăng
                                                       mình              nhập

  `PATCH`           `/api/v1/notifications/:id/read`   Đánh dấu đã đọc   Người nhận

  `PATCH`           `/api/v1/notifications/read-all`   Đánh dấu tất cả   Người dùng đăng
                                                       đã đọc            nhập
  ----------------------------------------------------------------------------------------

MVP chỉ yêu cầu thông báo trong ứng dụng. Không giả định có endpoint
push/email/SMS.

### 4.8 System admin và audit

Các endpoint quản lý tài khoản, vai trò, cấu hình và audit log chưa được
chốt vì còn câu hỏi về ranh giới quyền Admin/HR. Không tự tạo endpoint
phá vỡ nguyên tắc phân quyền.

## 5. Các yêu cầu xuyên suốt

-   Kiểm tra quyền và phạm vi dữ liệu ở server.
-   Validate payload, query và file.
-   Dùng idempotency/unique constraints phù hợp cho thao tác có thể gửi
    lại.
-   Thao tác thay đổi quan trọng phải tạo audit log.
-   Phân trang, lọc và sắp xếp phải có giới hạn.
-   Không để client tự truyền `actorUserId` để quyết định người thực
    hiện; lấy từ danh tính đã xác thực.
-   Các API liên quan số dư phép cần an toàn khi xử lý đồng thời.
-   Khi endpoint thay đổi, cập nhật file này và kiểm thử hợp đồng API.
