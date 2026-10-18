# Project Specification --- HRM

## 1. Mục tiêu

Xây dựng MVP quản lý nhân sự có thể dùng để trình bày và phát triển dần.
Hệ thống tập trung vào hồ sơ nhân viên, ca làm, chấm công từ file Excel,
nghỉ phép, báo cáo, thông báo nội bộ và lịch sử kiểm toán.

## 2. Quy ước trạng thái thông tin

-   **ĐÃ XÁC NHẬN:** người dùng đã quyết định.
-   **GIẢ ĐỊNH TẠM THỜI:** đề xuất để có thể thiết kế tiếp; chưa phải
    yêu cầu đã duyệt.
-   **CÂU HỎI MỞ:** cần người dùng quyết định trước khi chốt thiết kế
    hoặc triển khai liên quan.

AI và người phát triển không được trình bày giả định/câu hỏi mở như
quyết định cuối cùng.

## 3. Phạm vi MVP

### 3.1 Bao gồm

1.  Đăng nhập và kiểm soát truy cập theo vai trò.
2.  Quản lý hồ sơ nhân viên.
3.  Quản lý ca làm và phân ca.
4.  Nhập dữ liệu chấm công từ `.xlsx`.
5.  Quản lý hạn mức nghỉ phép năm và yêu cầu nghỉ phép.
6.  Luồng duyệt nghỉ phép theo thứ tự Manager → HR.
7.  Báo cáo tuần/tháng.
8.  Thông báo trong ứng dụng về nghỉ phép, ca làm và báo cáo.
9.  Audit log cho các thao tác quan trọng.
10. Quản trị tài khoản và cấu hình hệ thống, với phân quyền cuối cùng
    cần xác nhận.

### 3.2 Chưa xác nhận / không mặc định thuộc MVP

-   Tích hợp trực tiếp máy chấm công hoặc API nhà cung cấp.
-   Gửi push notification, email, SMS.
-   Tính lương, thuế, bảo hiểm hoặc tuyển dụng.
-   Tích hợp SSO/LDAP.
-   Nhiều công ty/tenant.
-   Tự động chấm công bằng GPS/biometrics.
-   Tự động sửa hoặc suy đoán dữ liệu chấm công thiếu.

Không triển khai các mục trên nếu chưa có phê duyệt.

## 4. Nền tảng và công nghệ

  -----------------------------------------------------------------------
  Thành phần                          Quyết định
  ----------------------------------- -----------------------------------
  Web cho Admin/HR/Manager            **ĐÃ XÁC NHẬN:** Next.js

  Mobile cho nhân viên                **ĐÃ XÁC NHẬN:** React Native,
                                      iOS/Android

  Backend                             **ĐÃ XÁC NHẬN:** Node.js + Express

  Database                            **ĐÃ XÁC NHẬN:** MongoDB

  Data access/ORM                     **GIẢ ĐỊNH TẠM THỜI:** ưu tiên đánh
                                      giá Prisma; chưa chốt phiên
                                      bản/cách dùng

  Giao tiếp                           **GIẢ ĐỊNH TẠM THỜI:** REST API,
                                      JSON

  API prefix                          **GIẢ ĐỊNH TẠM THỜI:** `/api/v1`
  -----------------------------------------------------------------------

**Cảnh báo:** Trước khi viết schema hoặc migration, xác minh phiên bản
Prisma hiện hành hỗ trợ MongoDB, giới hạn transaction và cách triển khai
production. Không tạo migration/schema giả định rằng mọi tính năng
Prisma đều hoạt động giống với SQL.

## 5. Vai trò người dùng

Các vai trò nghiệp vụ dự kiến:

-   **Admin:** quản trị hệ thống và tài khoản; ranh giới chính xác với
    HR đang là câu hỏi mở.
-   **HR:** hồ sơ nhân viên, phân ca, thiết lập hạn mức nghỉ phép, nhập
    chấm công, duyệt nghỉ phép bước HR, báo cáo và xử lý các nghiệp vụ
    nhân sự.
-   **Manager:** xem thông tin nhân viên thuộc phạm vi được giao và
    duyệt bước đầu của yêu cầu nghỉ phép.
-   **Employee:** xem hồ sơ phù hợp, lịch ca, dữ liệu cá nhân/chấm công
    và gửi yêu cầu nghỉ phép.

Không được cho phép người dùng truy cập dữ liệu chỉ bằng cách ẩn nút
trên giao diện. API phải kiểm tra quyền ở phía server.

## 6. Nghiệp vụ đã xác nhận

### 6.1 Chấm công

-   HR nhập dữ liệu chấm công từ file `.xlsx` xuất từ thiết bị.
-   Hệ thống cần có khả năng lưu thông tin đợt nhập và kết quả xử lý để
    truy vết.
-   **Câu hỏi mở:** mẫu cột, múi giờ, mã nhân viên, kiểu sự kiện, quy
    tắc trùng lặp, xử lý dòng lỗi và quyền sửa dữ liệu.

### 6.2 Ca làm

-   HR phân ca cho nhân viên.
-   Nhân viên xem lịch ca trên ứng dụng React Native.
-   Có thông báo trong ứng dụng liên quan đến ca làm.
-   **Câu hỏi mở:** ca qua đêm, đổi ca, ca lặp lại, giờ nghỉ giữa ca và
    quy tắc xử lý trùng lịch.

### 6.3 Nghỉ phép

-   HR thiết lập hạn mức phép năm cho từng nhân viên.
-   Nhân viên gửi yêu cầu nghỉ phép.
-   Quy trình duyệt tuần tự: **Manager trước, HR sau**.
-   Có thông báo trong ứng dụng về các sự kiện nghỉ phép.
-   **Câu hỏi mở:** phép chuyển năm, nghỉ nửa ngày, nghỉ không lương,
    thời điểm trừ phép, hủy yêu cầu và trường hợp không có Manager.

### 6.4 Báo cáo và tự động hóa

-   Có báo cáo tuần/tháng.
-   Thông báo chỉ trong ứng dụng; chưa yêu cầu push notification.
-   **Câu hỏi mở:** giờ chạy, múi giờ, người nhận, nội dung báo cáo và
    quy tắc gửi nhắc.

### 6.5 Kiểm toán

-   Lịch sử kiểm toán là yêu cầu quan trọng.
-   **GIẢ ĐỊNH TẠM THỜI:** ghi actor, thời điểm, hành động, đối tượng,
    kết quả và thay đổi trước/sau khi phù hợp; không ghi mật khẩu, token
    hoặc secret.
-   Cần xác định thời hạn lưu trữ và ai được xem audit log.

## 7. Tiêu chí nghiệm thu cấp MVP

1.  Người dùng không thể gọi API vượt quyền của vai trò.
2.  Nhân viên có thể xem lịch ca đã được phân.
3.  HR có thể nhập `.xlsx`, xem kết quả thành công/lỗi và truy vết đợt
    nhập.
4.  Hệ thống không âm thầm nhập trùng các bản ghi khi người dùng tải lại
    cùng file; chiến lược nhận diện trùng phải được chốt và kiểm thử.
5.  Yêu cầu nghỉ phép phải qua Manager trước HR; trạng thái và lịch sử
    duyệt phải rõ ràng.
6.  Hạn mức phép không bị trừ lặp do gửi lại request hoặc thao tác duyệt
    lặp.
7.  Có báo cáo tuần/tháng theo phạm vi đã chốt.
8.  Có thông báo trong ứng dụng cho các sự kiện đã chốt.
9.  Các thao tác quan trọng tạo audit log và audit log không chứa
    secret.
10. Các kiểm thử được ghi nhận trong `TEST_PLAN.md` chỉ sau khi thực sự
    chạy.

## 8. Câu hỏi mở cần quyết định

  -----------------------------------------------------------------------
  ID                      Câu hỏi                 Vì sao cần quyết định
  ----------------------- ----------------------- -----------------------
  Q-01                    Admin hay HR được tạo,  Tránh quyền chồng chéo
                          khóa/mở tài khoản và    
                          gán vai trò?            

  Q-02                    Nhân viên có mã định    Ghép dữ liệu Excel với
                          danh duy nhất nào?      hồ sơ

  Q-03                    File Excel có các cột,  Thiết kế parser và kiểm
                          định dạng ngày giờ và   tra lỗi
                          loại sự kiện nào?       

  Q-04                    Nhận diện bản ghi chấm  Tránh nhập lặp
                          công trùng bằng khóa    
                          nào?                    

  Q-05                    Ai được sửa dữ liệu     Tính chính xác và audit
                          chấm công sau import?   
                          Có cần duyệt không?     

  Q-06                    Phép chuyển năm, nghỉ   Tính số dư phép chính
                          nửa ngày, nghỉ không    xác
                          lương và thời điểm trừ  
                          phép xử lý thế nào?     

  Q-07                    Nhân viên không có      Không làm kẹt workflow
                          Manager trực tiếp thì   
                          duyệt thế nào?          

  Q-08                    Ca qua đêm/đổi ca/trùng Xác định logic lịch ca
                          lịch được xử lý thế     
                          nào?                    

  Q-09                    Lịch nhắc và báo cáo    Lập lịch automation
                          chạy vào ngày/giờ nào,  
                          theo múi giờ nào?       

  Q-10                    Token/session hết hạn   Bảo mật đăng nhập
                          và lưu trữ token trên   
                          web/mobile thế nào?     

  Q-11                    Ai được xem audit log   Quản trị và tuân thủ
                          và giữ bao lâu?         

  Q-12                    Prisma phiên bản        Tránh chọn giải pháp
                          nào/cách truy cập       không hỗ trợ tính năng
                          MongoDB nào được xác    cần thiết
                          minh tương thích?       
  -----------------------------------------------------------------------

## 9. Quy tắc thay đổi

Mọi thay đổi ảnh hưởng đến phạm vi, vai trò, schema, API hoặc luồng
nghiệp vụ phải: 1. Nêu lý do và tác động. 2. Được người dùng xác nhận.
3. Cập nhật tài liệu liên quan. 4. Cập nhật hoặc bổ sung kiểm thử. 5.
Không phá vỡ tương thích một cách âm thầm.
