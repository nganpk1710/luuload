# Lưu Load: Quy ước nội dung

> Trách nhiệm của file này: cách viết, đặt tên ảnh, alt, link và trạng thái nội dung. **Không chứa nội dung.** Chữ thật nằm trong `js/content/*.js`.

## 1. Có cần file này không

Có, nhưng mỏng. Nếu chép chữ vào cả `.md` lẫn `.js`, hai bản sẽ lệch nhau ở lần sửa đầu tiên. File này chỉ giữ quy ước để người viết và Claude làm đúng khi thêm hoặc sửa chữ.

## 2. Nơi chứa nội dung

| Loại | Nơi lưu | Ví dụ |
|---|---|---|
| Chữ theo trang | `js/content/home.js`, `gallery.js`… | Eyebrow, H1, tagline |
| Chữ dùng chung | `js/content/nav.js`, `brand.js` | Nav, nhóm văn hóa |
| Dữ liệu lặp | `data/*.csv`, chuyển sang `js/content/*.js` | Danh sách artist |
| Ảnh | `images/` | `hero/mosaic-01.webp` |
| Trạng thái và quyết định | `docs/specs/*.md` | Câu hỏi mở, tiến độ |

## 3. Trạng thái

| Trạng thái | Nghĩa | Build production |
|---|---|---|
| `final` | Đã chốt | Cho phép |
| `proposed` | Đề xuất, có thể đổi | Cho phép, cảnh báo |
| `pending` | Chờ quyết định hoặc nội dung | **Chặn** |

## 4. Quy tắc viết

**Ngôn ngữ**
- Nội dung giao diện ưu tiên tiếng Việt.
- Tiếng Anh chỉ cho: Vision, nhãn thương hiệu cố định, thuật ngữ đã có trong mục 7.
- Chữ tiếng Việt luôn có đủ dấu.

**Viết hoa**
- Lưu câu thường trong code. Viết hoa bằng CSS.
- Không gõ chữ in hoa trong `js/content/*.js`.

**Tên thương hiệu**
- Trong văn bản: **Lưu Load**. Chỉ dùng **LƯULOAD** cho logo.

**Giọng:** theo `BRAND.md` mục 5. Câu ngắn, không giảng giải, không dùng số liệu chưa có nguồn.

**Dấu câu**
- Liệt kê dùng dấu phẩy. Không trộn dấu phẩy và chữ "và" trong cùng một câu liệt kê.
- Ngày: `24/10/2026`. Năm đứng riêng: `2019`.

## 5. Ảnh

**Đặt tên:** kebab-case, không dấu, WebP hoặc AVIF. Mỗi ảnh một tên duy nhất: `nguyen-an-profile.webp`, không dùng `image1.jpg`.

**Alt text**

| Loại | Quy tắc | Ví dụ |
|---|---|---|
| Trang trí | `alt=""`, `aria-hidden="true"` | Mosaic hero |
| Chân dung | Tên và mô tả ngắn | "Nguyễn An, nhìn thẳng vào ống kính" |
| Ảnh project | Mô tả nội dung hiển thị | "Tấm gốm men lam, chụp cận cảnh" |
| Logo | Tên thương hiệu | "Lưu Load" |

Không mở đầu alt bằng "ảnh của" hoặc "hình ảnh về".

**Credits:** ảnh project bắt buộc có tác giả và nguồn tham khảo, hiển thị ở cỡ `caption`.

## 6. Link

- Nội bộ: đường dẫn tương đối, không tên miền.
- Ngoài: `target="_blank"` kèm `rel="noopener noreferrer"`, nhãn nói rõ mở tab mới.
- Route trong `nav.js` và `home.js` phải tồn tại trước release. Route chưa có: `pending`.

## 7. Thuật ngữ

| Thuật ngữ | Dùng khi | Không dùng khi |
|---|---|---|
| Cộng đồng | Nói về Community và người tham gia | Khi D-01 chưa chốt và đang nói về công ty |
| Creatives | Người làm nghề sáng tạo, 0–5 năm kinh nghiệm | Thay cho "nghệ sĩ" trong ngữ cảnh doanh nghiệp |
| Dự án | Sản phẩm sáng tạo đã duyệt | Thay cho "bài đăng" |
| Nhóm văn hóa | Bốn nhóm trong `brand.js` | Thay bằng "chủ đề" |
| Kết nối | Hành động tìm và liên hệ | Thay cho "mua" hoặc "thuê" |
| Doanh nghiệp | Brand, studio, agency, local brand | Thay cho "khách hàng" trong giao diện công khai |
| Thành viên | Người có tài khoản | Thay cho "user" |

## 8. Số liệu

- Mọi số liệu hiển thị phải có nguồn trong `BRAND.md` hoặc spec.
- Không hiển thị "74/489" đến khi có bảng gốc.
- Số liệu thay đổi theo thời gian: ghi ngày thu thập.

## 9. Quy trình thay nội dung

1. Sửa giá trị trong `js/content/*.js`, không sửa trong HTML.
2. Đặt `status` đúng.
3. Nếu thay đổi làm đổi quyết định, cập nhật mục 5 của `INSTRUCTION.md`.
4. Chạy `scripts/check-content.mjs`.
5. Ghi một dòng vào changelog.
