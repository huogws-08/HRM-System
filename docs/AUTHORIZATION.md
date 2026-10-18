# Authentication, Authorization and Audit --- HRM

## 1. Trạng thái

-   **ĐÃ XÁC NHẬN:** hệ thống có các nhóm Admin, HR, Manager, Employee;
    quy trình nghỉ phép theo thứ tự Manager rồi HR; audit history quan
    trọng.
-   **CÂU HỎI MỞ:** quyền quản lý tài khoản chính xác; token/session;
    phạm vi xem của Manager; quyền chỉnh sửa chấm công; quyền đọc audit
    log.

## 2. Nguyên tắc bảo mật

1.  Xác thực danh tính trước khi xử lý API riêng tư.
2.  Kiểm tra quyền ở backend cho từng endpoint và từng tài nguyên.
3.  Áp dụng nguyên tắc quyền tối thiểu.
4.  Không tin role, employee ID hoặc manager scope do client tự gửi.
5.  Không trả `passwordHash`, secret, access token hoặc refresh token
    qua API.
6.  Không ghi mật khẩu, token hoặc secret vào log/audit.
7.  Bảo vệ đăng nhập bằng rate limit và phản hồi lỗi không tiết lộ quá
    nhiều thông tin.
8.  Các thao tác nhạy cảm phải có audit trail.

## 3. Ma trận quyền dự kiến

  --------------------------------------------------------------------------
  Nghiệp vụ      Admin          HR             Manager        Employee
  -------------- -------------- -------------- -------------- --------------
  Quản trị cấu   Có, theo phạm  Không mặc định Không          Không
  hình hệ thống  vi được duyệt                                

  Tạo/khóa tài   **Cần chốt**   **Cần chốt**   Không          Không
  khoản, gán                                                  
  role                                                        

  Xem/sửa hồ sơ  Theo quyền     Có theo nghiệp Xem nhân viên  Xem phần hồ sơ
  nhân viên      được duyệt     vụ HR          thuộc phạm vi  được phép của
                                                              mình

  Định nghĩa và  Không mặc định Có             Xem phạm vi    Xem lịch của
  phân ca                                      được giao      mình

  Import chấm    Không mặc định Có             Không mặc định Không
  công                                                        

  Xem/sửa dữ     Theo quyền     Xem; sửa đang  Xem phạm vi    Xem dữ liệu
  liệu chấm công được duyệt     chờ quyết định nếu được duyệt của mình nếu
                                                              được duyệt

  Thiết lập hạn  Không mặc định Có             Không          Không
  mức phép                                                    

  Gửi yêu cầu    Không          Không mặc định Có thể như     Có
  nghỉ phép                                    nhân viên nếu  
                                               có hồ sơ nhân  
                                               viên           

  Duyệt bước     Không mặc định Không thay thế Có, với yêu    Không
  Manager                       Manager        cầu thuộc phạm 
                                               vi             

  Duyệt bước HR  Không mặc định Có             Không          Không

  Xem báo cáo    Theo quyền     Có             Phạm vi được   Báo cáo cá
                 được duyệt                    giao           nhân nếu được
                                                              duyệt

  Xem audit log  Cần chốt       Cần chốt       Không mặc định Không
  --------------------------------------------------------------------------

Ma trận này là đề xuất thiết kế, không thay thế các quyết định còn mở.
Không tự cấp Admin toàn quyền nghiệp vụ nếu chưa được duyệt.

## 4. Luồng nghỉ phép và kiểm tra quyền

1.  Employee tạo yêu cầu cho chính mình.
2.  Backend xác định Manager phù hợp từ dữ liệu server, không lấy người
    duyệt tùy ý từ client.
3.  Manager chỉ quyết định yêu cầu thuộc phạm vi được giao.
4.  Nếu Manager từ chối, yêu cầu kết thúc theo trạng thái từ chối; không
    chuyển HR duyệt.
5.  Nếu Manager duyệt, yêu cầu chuyển sang chờ HR.
6.  HR thực hiện bước cuối.
7.  Hệ thống kiểm tra trạng thái hiện tại trước khi nhận quyết định để
    chống duyệt lặp hoặc thao tác đồng thời.
8.  Mọi quyết định lưu người thực hiện, thời điểm, kết quả và bình luận
    nếu có.
9.  Thời điểm giữ/trừ/hoàn phép phải theo quy tắc được duyệt trong
    `PROJECT_SPEC.md`.

## 5. Session và token

Chiến lược cụ thể chưa chốt. Trước khi triển khai phải quyết định: - Web
dùng cookie an toàn hay token; nếu cookie thì cấu hình `HttpOnly`,
`Secure`, `SameSite` và bảo vệ CSRF phù hợp. - Mobile lưu thông tin xác
thực trong secure storage của nền tảng, không lưu token nhạy cảm dạng
plain text. - Thời hạn access/session, refresh, đăng xuất và thu hồi
phiên. - Xử lý đổi mật khẩu, khóa tài khoản và phiên đang tồn tại. -
CORS, HTTPS và rate limit theo môi trường.

Không lưu secret trong GitHub. `.env` thật phải nằm trong `.gitignore`;
chỉ commit file mẫu không chứa giá trị thật.

## 6. Audit log

Các sự kiện dự kiến cần ghi: - Tạo/cập nhật/khóa tài khoản và thay đổi
role. - Tạo/cập nhật hồ sơ nhân viên có ý nghĩa nghiệp vụ. - Phân ca
hoặc sửa phân ca. - Import chấm công và điều chỉnh bản ghi. - Gửi,
duyệt, từ chối hoặc hủy yêu cầu nghỉ phép. - Thay đổi hạn mức phép. -
Thay đổi cấu hình hệ thống.

Mỗi log nên lưu actor, action, entity, thời điểm và dữ liệu before/after
đã lọc. Không lưu password, token, secret hoặc file Excel nguyên bản
trong audit log. Quyền xem, thời hạn lưu và khả năng export audit log
cần được chốt.

## 7. Checklist trước khi phát hành

-   [ ] API kiểm tra role và phạm vi đối tượng.
-   [ ] Tài khoản bị khóa không thể tiếp tục dùng phiên theo chính sách
    đã chốt.
-   [ ] Lỗi đăng nhập không tiết lộ tài khoản có tồn tại hay không nếu
    chính sách yêu cầu.
-   [ ] File import chỉ dành cho vai trò được phép.
-   [ ] Người dùng không thể tự duyệt yêu cầu của mình bằng cách giả mạo
    ID.
-   [ ] Các bước duyệt sai thứ tự bị từ chối.
-   [ ] Audit log không chứa dữ liệu xác thực nhạy cảm.
-   [ ] CORS, HTTPS, cookie/token và rate limit được cấu hình phù hợp
    môi trường.
