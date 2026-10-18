# Test Plan --- HRM

## 1. Mục đích và trạng thái

Tài liệu này là kế hoạch kiểm thử, không phải báo cáo kết quả đã chạy.
Chỉ đánh dấu **PASS** khi test thực sự chạy và có kết quả ghi nhận.
Trạng thái ban đầu của các test là **NOT RUN**.

## 2. Cấp kiểm thử

-   **Unit test:** quy tắc tính toán và xử lý dữ liệu thuần.
-   **Integration test:** API kết hợp database, phân quyền, import,
    luồng duyệt.
-   **End-to-end test:** luồng người dùng trên Web/Mobile nếu công cụ
    phù hợp.
-   **Security test:** truy cập vượt quyền, dữ liệu nhạy cảm, upload
    file.
-   **Regression test:** chạy lại các luồng đã có sau mỗi thay đổi quan
    trọng.

## 3. Ma trận kiểm thử

  --------------------------------------------------------------------------------
  ID             Nhóm            Kịch bản       Kết quả mong đợi    Trạng thái
  -------------- --------------- -------------- ------------------- --------------
  T-001          Auth            Đăng nhập bằng Xác thực thành      NOT RUN
                                 thông tin hợp  công, không trả     
                                 lệ             password hash       

  T-002          Auth            Đăng nhập sai  Bị từ chối, không   NOT RUN
                                 thông tin      lộ dữ liệu nhạy cảm 

  T-003          Authorization   Employee gọi   API từ chối         NOT RUN
                                 API chỉ dành                       
                                 cho HR                             

  T-004          Authorization   Manager truy   API từ chối         NOT RUN
                                 cập nhân viên                      
                                 ngoài phạm vi                      

  T-005          Employee        Tạo/cập nhật   Validation trả lỗi  NOT RUN
                                 hồ sơ với dữ   phù hợp             
                                 liệu không hợp                     
                                 lệ                                 

  T-006          Shift           HR phân ca cho Lịch phân ca được   NOT RUN
                                 nhân viên      lưu và truy vấn     
                                                được                

  T-007          Shift           Employee xem   Chỉ trả dữ liệu     NOT RUN
                                 lịch ca của    thuộc phạm vi       
                                 mình                               

  T-008          Attendance      Upload file    Tạo import record   NOT RUN
                                 `.xlsx` hợp lệ và báo cáo số dòng  

  T-009          Attendance      Upload file    Từ chối an toàn,    NOT RUN
                                 sai định dạng  trả lỗi rõ ràng     
                                 hoặc hỏng                          

  T-010          Attendance      File có một số Dòng hợp lệ/lỗi     NOT RUN
                                 dòng lỗi       được phân loại theo 
                                                quy tắc             

  T-011          Attendance      Upload lại dữ  Không tạo bản ghi   NOT RUN
                                 liệu trùng     trùng theo chiến    
                                                lược đã duyệt       

  T-012          Attendance      Người không    API từ chối         NOT RUN
                                 phải HR import                     
                                 file                               

  T-013          Leave           Employee tạo   Yêu cầu ở trạng     NOT RUN
                                 yêu cầu hợp lệ thái chờ Manager    

  T-014          Leave           HR cố duyệt    API từ chối theo    NOT RUN
                                 trước Manager  luồng tuần tự       

  T-015          Leave           Manager từ     Yêu cầu kết thúc    NOT RUN
                                 chối           theo trạng thái từ  
                                                chối; có lịch sử    

  T-016          Leave           Manager duyệt  Yêu cầu chuyển sang NOT RUN
                                                chờ HR              

  T-017          Leave           HR duyệt sau   Yêu cầu hoàn tất và NOT RUN
                                 Manager        số dư được cập nhật 
                                                đúng quy tắc đã     
                                                duyệt               

  T-018          Leave           Gửi lặp quyết  Không cập nhật số   NOT RUN
                                 định duyệt     dư hai lần          

  T-019          Leave           Hai thao tác   Không mất cập       NOT RUN
                                 đồng thời tác  nhật/chi sai số dư  
                                 động số dư     theo chiến lược đã  
                                                chọn                

  T-020          Notification    Tạo sự kiện    Thông báo được lưu  NOT RUN
                                 cần thông báo  cho đúng người nhận 

  T-021          Notification    Người dùng xem API từ chối hoặc    NOT RUN
                                 thông báo của  không tiết lộ dữ    
                                 người khác     liệu                

  T-022          Reporting       Truy vấn báo   Số liệu khớp với dữ NOT RUN
                                 cáo tuần/tháng liệu kiểm thử và bộ 
                                                lọc                 

  T-023          Audit           Thao tác       Có audit log phù    NOT RUN
                                 nghiệp vụ quan hợp                 
                                 trọng                              

  T-024          Audit           Kiểm tra audit Không chứa mật      NOT RUN
                                 log            khẩu/token/secret   

  T-025          Security        Upload file    Bị từ chối theo     NOT RUN
                                 quá dung lượng giới hạn cấu hình   

  T-026          API             Gửi payload    Trả lỗi chuẩn hóa,  NOT RUN
                                 thiếu/sai kiểu không làm server    
                                                crash               
  --------------------------------------------------------------------------------

## 4. Dữ liệu kiểm thử

-   Dùng tài khoản và dữ liệu giả lập, không dùng dữ liệu nhân sự thật
    nếu không cần.
-   Không dùng password/secret production.
-   File Excel kiểm thử phải có thể tái tạo, gồm file hợp lệ, file sai
    định dạng, dòng thiếu mã nhân viên, ngày giờ không hợp lệ và bản ghi
    trùng sau khi mẫu cột được chốt.
-   Xây dựng trường hợp ranh giới cho ca qua đêm, phép nửa ngày, chuyển
    năm và múi giờ sau khi quy tắc nghiệp vụ được duyệt.

## 5. Điều kiện nghiệm thu

-   Test quan trọng về phân quyền, luồng duyệt, chống trùng và số dư
    phép phải đạt trước khi demo.
-   Không có test được đánh dấu PASS nếu chưa chạy.
-   Ghi lệnh test, môi trường, ngày chạy, kết quả và lỗi còn lại khi cập
    nhật báo cáo thực tế.
-   Nếu chưa có test tự động, ghi rõ là kiểm tra thủ công; không mô tả
    như automated test.

## 6. Nhật ký chạy test

Chưa có kết quả chạy test trong bộ tài liệu này.

  ----------------------------------------------------------------------------
  Ngày           Commit/version   Lệnh hoặc cách Kết quả        Người thực
                                  kiểm thử                      hiện
  -------------- ---------------- -------------- -------------- --------------
  Chưa chạy      ---              ---            NOT RUN        ---

  ----------------------------------------------------------------------------
