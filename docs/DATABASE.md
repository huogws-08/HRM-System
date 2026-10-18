# Database Design --- HRM

## 1. Trạng thái

Đây là **mô hình dữ liệu logic đề xuất**, chưa phải schema Prisma cuối
cùng hay database đã triển khai. Các trường và ràng buộc bên dưới cần
được xác nhận khi xử lý các câu hỏi mở.

Database đã xác nhận là MongoDB. Prisma là lựa chọn mong muốn nhưng
phiên bản và mức hỗ trợ cần được xác minh trước khi tạo schema triển
khai.

## 2. Quy ước chung

-   Tên collection logic dùng `camelCase` số nhiều như bảng bên dưới.
-   Mỗi document có định danh duy nhất; kiểu ID thực tế cần thống nhất
    khi chốt schema.
-   Trường thời gian lưu theo một quy ước thống nhất, ưu tiên UTC; múi
    giờ hiển thị cần quyết định.
-   Không trả `passwordHash`, token hoặc trường nội bộ nhạy cảm qua API.
-   Tên collection logic không đảm bảo tự động trùng tên
    model/collection do ORM sinh ra; phải xác minh mapping thực tế.
-   Các quan hệ được mô tả bằng ID tham chiếu logic; MongoDB không tự
    tạo foreign key như cơ sở dữ liệu quan hệ.

## 3. Collections logic dự kiến

### 3.1 `users`

Mục đích: thông tin đăng nhập và vai trò. - `id` - `email` hoặc
`username` --- cần chốt định danh đăng nhập - `passwordHash` - `role`
--- giá trị dự kiến: `ADMIN`, `HR`, `MANAGER`, `EMPLOYEE` - `status` ---
dự kiến: `ACTIVE`, `SUSPENDED` - `employeeId` --- tham chiếu hồ sơ nhân
viên nếu tài khoản gắn với nhân viên - `createdAt`, `updatedAt`,
`lastLoginAt`

Câu hỏi mở: quy tắc duy nhất của email/username; Admin hay HR quản lý
tài khoản; có tài khoản dịch vụ hay không.

### 3.2 `employees`

Mục đích: hồ sơ nhân viên. - `id` - `employeeCode` --- cần xác nhận mã
định danh dùng để ghép file Excel - `firstName`, `lastName` hoặc
`fullName` --- cần chốt quy ước - `workEmail` - `departmentId` --- tùy
phạm vi được duyệt - `managerEmployeeId` --- tham chiếu Manager trực
tiếp, có thể chưa có - `employmentStatus` - `hireDate` - `createdAt`,
`updatedAt`

Không tự thêm các dữ liệu nhạy cảm như số định danh cá nhân, thông tin
sức khỏe hoặc tài khoản ngân hàng nếu không có yêu cầu rõ ràng.

### 3.3 `shifts`

Mục đích: định nghĩa loại ca. - `id`, `name` - `startTime`, `endTime` -
`breakMinutes` --- nếu có và được chốt - `isOvernight` hoặc quy tắc xác
định ca qua ngày --- chưa chốt - `createdAt`, `updatedAt`

### 3.4 `shiftAssignments`

Mục đích: gán ca cho nhân viên. - `id` - `employeeId` - `shiftId` -
`workDate` - `assignedByUserId` - `status` - `createdAt`, `updatedAt`

Cần xác định cách biểu diễn ca qua đêm, thay đổi ca, trùng lịch và lịch
sử chỉnh sửa.

### 3.5 `attendanceImports`

Mục đích: theo dõi từng lần import file. - `id` - `uploadedByUserId` -
`originalFileName` --- chỉ lưu nếu cần - `fileHash` --- tùy chiến lược
phát hiện import trùng - `status` - `totalRows`, `successRows`,
`skippedRows`, `errorRows` - `createdAt`, `completedAt`

Không lưu file gốc lâu dài nếu chưa xác định nhu cầu và chính sách lưu
trữ.

### 3.6 `attendanceRecords`

Mục đích: dữ liệu chấm công đã chuẩn hóa. - `id` - `employeeId` -
`eventAt` - `eventType` --- cần chốt theo định dạng file nguồn -
`sourceImportId` - `sourceRowNumber` - `status` hoặc cờ cần rà soát -
`createdAt`, `updatedAt` - `correctedByUserId`, `correctionReason` ---
chỉ khi tính năng sửa dữ liệu được duyệt

Chưa chốt một ngày công tổng hợp bằng một record hay lưu từng sự kiện
vào/ra. Cần giữ đủ thông tin nguồn để truy vết và xử lý trùng.

### 3.7 `leaveBalances`

Mục đích: hạn mức và số dư nghỉ phép theo nhân viên/năm/loại phép. -
`id` - `employeeId` - `year` - `leaveType` - `entitlement` - `used` -
`pending` --- nếu dùng để giữ chỗ khi yêu cầu đang chờ - `adjustments` -
`updatedByUserId` - `createdAt`, `updatedAt`

Quy tắc tính số dư, chuyển năm, nghỉ không lương và thời điểm trừ phép
vẫn là câu hỏi mở. Không dùng số dư do client gửi lên làm nguồn sự thật.

### 3.8 `leaveRequests`

Mục đích: yêu cầu nghỉ phép. - `id` - `employeeId` - `leaveType` -
`startAt`, `endAt` - `requestedUnits` --- ngày/giờ/nửa ngày tùy quy tắc
đã duyệt - `reason` --- nếu cần - `status` - `currentApprovalStage` -
`createdAt`, `updatedAt`, `cancelledAt`

Các trạng thái phải được chuẩn hóa trong API spec sau khi quy tắc hủy/từ
chối được chốt.

### 3.9 `leaveApprovals`

Mục đích: lịch sử từng bước duyệt. - `id` - `leaveRequestId` - `stage`
--- dự kiến `MANAGER`, `HR` - `approverUserId` - `decision` --- dự kiến
`APPROVED`, `REJECTED` - `comment` - `decidedAt` - `createdAt`

Giữ lịch sử quyết định; không chỉ ghi đè người duyệt trước đó.

### 3.10 `notifications`

Mục đích: thông báo trong ứng dụng. - `id` - `recipientUserId` -
`type` - `title`, `body` - `entityType`, `entityId` --- liên kết đối
tượng liên quan nếu có - `readAt` - `createdAt`

Không giả định push notification/email/SMS trong MVP.

### 3.11 `auditLogs`

Mục đích: dấu vết thao tác quan trọng. - `id` - `actorUserId` -
`action` - `entityType`, `entityId` - `occurredAt` - `before`, `after`
--- chỉ lưu dữ liệu cần thiết, đã loại bỏ trường nhạy cảm - `metadata`
--- giới hạn và làm sạch dữ liệu

Audit log không được chứa password, token, secret hoặc file nhị phân.

### 3.12 `automationJobs`

Mục đích: cấu hình/lịch chạy tác vụ tự động nếu cần lưu trong DB. -
`id` - `type` - `schedule` - `enabled` - `lastRunAt`, `nextRunAt` -
`lastStatus` - `createdAt`, `updatedAt`

Có thể dùng cấu hình ngoài database nếu phù hợp; chưa chốt thiết kế
scheduler.

## 4. Quan hệ logic

``` mermaid
erDiagram
    USERS ||--o| EMPLOYEES : linked_account
    EMPLOYEES ||--o{ SHIFT_ASSIGNMENTS : receives
    SHIFTS ||--o{ SHIFT_ASSIGNMENTS : assigned
    EMPLOYEES ||--o{ ATTENDANCE_RECORDS : has
    ATTENDANCE_IMPORTS ||--o{ ATTENDANCE_RECORDS : imports
    EMPLOYEES ||--o{ LEAVE_REQUESTS : submits
    LEAVE_REQUESTS ||--o{ LEAVE_APPROVALS : has_history
    EMPLOYEES ||--o{ LEAVE_BALANCES : owns
    USERS ||--o{ NOTIFICATIONS : receives
    USERS ||--o{ AUDIT_LOGS : acts
```

Sơ đồ là quan hệ logic; không cam kết cardinality hay ràng buộc được tự
động áp dụng bởi MongoDB/ORM.

## 5. Index và ràng buộc đề xuất

Chỉ áp dụng sau khi xác nhận quy tắc dữ liệu: - Unique index cho
`users.email` hoặc `users.username` theo định danh được chọn. - Unique
index cho `employees.employeeCode` nếu mã nhân viên bắt buộc duy nhất. -
Index cho `shiftAssignments.employeeId + workDate`. - Index cho
`attendanceRecords.employeeId + eventAt`. - Index cho
`attendanceRecords.sourceImportId`. - Index cho
`leaveRequests.employeeId + status`. - Index cho
`leaveApprovals.leaveRequestId + stage`. - Index cho
`notifications.recipientUserId + readAt + createdAt`. - Index cho
`auditLogs.entityType + entityId + occurredAt`.

Không dùng index gợi ý nếu chưa kiểm tra khả năng biểu diễn và cú pháp
của connector/driver được chọn.

## 6. Tính nhất quán và concurrency

-   Duyệt lặp hoặc request gửi lại không được trừ phép hai lần.
-   Import lại file không được tạo dữ liệu trùng theo quy tắc nhận diện
    đã duyệt.
-   Cập nhật số dư phép phải được thực hiện theo cách an toàn khi có
    nhiều request đồng thời.
-   Multi-document transaction phụ thuộc cấu hình MongoDB và hỗ trợ của
    lớp data access. Xác minh replica set và API transaction trước khi
    chọn phương án.
-   Nếu không có transaction phù hợp, phải thiết kế idempotency, trạng
    thái trung gian hoặc cơ chế bù trừ được duyệt; không giả vờ rằng
    nhiều thao tác ghi riêng lẻ là nguyên tử.

## 7. Cần chốt trước schema vật lý

1.  ID dùng ObjectId hay UUID.
2.  Quy ước tên model/collection.
3.  Phiên bản Prisma và mức hỗ trợ MongoDB; hoặc driver thay thế nếu
    được duyệt.
4.  Mã nhân viên và các trường Excel.
5.  Mô hình sự kiện chấm công.
6.  Quy tắc phép và trạng thái request.
7.  Múi giờ và cách lưu ngày/giờ.
8.  Chính sách lưu file import, audit log và dữ liệu cá nhân.
