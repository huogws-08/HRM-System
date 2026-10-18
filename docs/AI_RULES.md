# AI Coding Rules --- HRM

## 1. Vai trò

Bạn là AI coding assistant hỗ trợ phát triển HRM. Bạn phải tuân theo yêu
cầu đã xác nhận và tài liệu dự án. Bạn không có quyền tự quyết định thay
người dùng về phạm vi, kiến trúc, nghiệp vụ hoặc bảo mật.

## 2. Bắt buộc trước khi code

1.  Đọc `README.md`.
2.  Đọc `docs/PROJECT_SPEC.md`.
3.  Đọc tài liệu trực tiếp liên quan đến nhiệm vụ:
    -   kiến trúc: `docs/ARCHITECTURE.md`
    -   dữ liệu: `docs/DATABASE.md`
    -   endpoint/DTO: `docs/API_SPEC.md`
    -   quyền: `docs/AUTHORIZATION.md`
    -   test: `docs/TEST_PLAN.md`
4.  Xác định nội dung nào là **ĐÃ XÁC NHẬN**, **GIẢ ĐỊNH TẠM THỜI**,
    **CÂU HỎI MỞ**.
5.  Nếu thiếu thông tin ảnh hưởng đến tính đúng đắn hoặc bảo mật, hãy
    hỏi người dùng hoặc nêu rõ giả định và chờ xác nhận khi cần.
6.  Kiểm tra cấu trúc và mã nguồn hiện có trước khi đề xuất tạo/sửa
    file; không giả định file hoặc thư viện đã tồn tại.

## 3. Không tự ý thay đổi

Không tự ý: - Mở rộng phạm vi MVP. - Đổi Next.js, React Native, Express
hoặc MongoDB. - Chuyển modular monolith thành microservices. - Đổi ORM,
phiên bản major, cách xác thực hoặc kiến trúc lưu trữ. - Đổi schema,
enum, endpoint, payload hoặc response contract. - Bỏ kiểm tra quyền,
audit log, validation hoặc test. - Coi giả định/câu hỏi mở là yêu cầu đã
duyệt. - Thêm tích hợp push/email/SMS, tính lương hoặc chức năng ngoài
MVP.

Nếu thay đổi cần thiết, hãy nêu lý do, lựa chọn, tác động, file bị ảnh
hưởng và chờ phê duyệt.

## 4. Quy tắc code

-   Ưu tiên thay đổi nhỏ, tập trung vào nhiệm vụ được giao.
-   Tuân theo quy ước và phong cách đã có trong repository.
-   Validate dữ liệu tại backend; không dựa vào UI để bảo vệ API.
-   Không để client tự quyết định role, approver, số dư phép hoặc kết
    quả import.
-   Thiết kế thao tác có thể gửi lại theo hướng idempotent khi cần.
-   Xử lý lỗi rõ ràng; không nuốt lỗi hoặc trả stack trace nhạy cảm.
-   Không log password, token, secret hoặc dữ liệu cá nhân không cần
    thiết.
-   Không thêm dependency mới nếu chưa giải thích lý do và lợi ích.
-   Với Prisma/MongoDB, xác minh phiên bản và tính năng thực tế trước
    khi viết schema/transaction.

## 5. Bảo vệ secret và dữ liệu

-   Không tạo, yêu cầu, in ra hoặc commit secret thật.
-   Dùng placeholder như `<MONGODB_URI>` và `<JWT_SECRET>` trong ví dụ.
-   Không commit `.env`; chỉ commit `.env.example` không có giá trị bí
    mật thật.
-   Không đưa dữ liệu nhân sự thật vào fixture, log hoặc test nếu không
    cần.
-   Không trả `passwordHash`, token hoặc trường nội bộ nhạy cảm trong
    response.

## 6. Quy trình mỗi nhiệm vụ

Trước khi sửa: 1. Tóm tắt yêu cầu và tiêu chí hoàn thành. 2. Liệt kê
file dự kiến tạo/sửa và mục đích. 3. Nêu rủi ro hoặc câu hỏi chưa rõ. 4.
Nếu nhiệm vụ có thể thay đổi kiến trúc, schema, API, quyền hoặc quy tắc
nghiệp vụ, phải xin xác nhận trước.

Trong khi sửa: 1. Đọc code hiện có và các file liên quan. 2. Thực hiện
thay đổi tối thiểu. 3. Cập nhật test phù hợp. 4. Cập nhật tài liệu nếu
contract/decision đã được duyệt thay đổi.

Sau khi sửa: 1. Liệt kê file đã thay đổi. 2. Báo lệnh test/lint/build đã
thực sự chạy. 3. Nêu kết quả chính xác và lỗi còn lại. 4. Nếu không chạy
test, ghi rõ **chưa chạy** và lý do. 5. Không tuyên bố hoàn thành hoặc
pass dựa trên suy đoán.

## 7. Quy tắc tài liệu

-   `PROJECT_SPEC.md` là nơi theo dõi phạm vi, quyết định, giả định và
    câu hỏi mở.
-   `ARCHITECTURE.md` mô tả kiến trúc và ranh giới module.
-   `DATABASE.md` mô tả mô hình dữ liệu logic/được chốt.
-   `API_SPEC.md` mô tả hợp đồng API.
-   `AUTHORIZATION.md` mô tả quyền và kiểm toán.
-   `TEST_PLAN.md` ghi kế hoạch và kết quả test thực tế.
-   Khi một quyết định được duyệt ảnh hưởng nhiều tài liệu, cập nhật tất
    cả file bị ảnh hưởng trong cùng nhiệm vụ.
-   Không tạo file trùng lặp chỉ vì muốn ghi lại cùng một nội dung.
-   Nếu phát hiện mâu thuẫn giữa tài liệu, dừng ở điểm mâu thuẫn, nêu rõ
    các file/đoạn liên quan và hỏi người dùng thay vì tự chọn.

## 8. Git và review

-   Không chạy lệnh phá hủy dữ liệu hoặc ghi đè hàng loạt nếu chưa có
    xác nhận.
-   Không tự commit/push nếu người dùng chưa yêu cầu rõ.
-   Trước khi đề xuất commit, kiểm tra danh sách file thay đổi và bảo
    đảm không có `.env`, credential hoặc file dữ liệu thật.
-   Chỉ ghi nhận những thay đổi có thể kiểm chứng từ repository và kết
    quả lệnh thực tế.
