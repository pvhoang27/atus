# ATUS Clothing

Website tĩnh giới thiệu thêu vi tính theo yêu cầu tại Hà Nội và 18 mẫu áo từ gian hàng ATUS trên Shopee. HTML, CSS, JavaScript thuần; không cần cài package hay build.

## Xem trên máy

Chạy `python3 -m http.server 4173 --bind 127.0.0.1` trong thư mục dự án rồi mở http://127.0.0.1:4173.

## Cập nhật website

Netlify: liên kết repository `pvhoang27/atus`, nhánh `main`, bỏ trống build command, publish directory `.`. Khi liên kết đã bật, push lên `main` sẽ kích hoạt deploy tự động; không cần thêm GitHub Actions hoặc token deploy.

Website hiện cấu hình URL chuẩn là https://gorgeous-dasik-37c46c.netlify.app/. Nếu đổi domain, thay URL ở `index.html` (canonical, Open Graph, JSON-LD), `robots.txt` và `sitemap.xml`.

## Quản lý nội dung

- Sửa catalog trong `index.html`: mỗi `.product-card` chứa tên, giá, link Shopee, ảnh và `data-category` cho bộ lọc. Mặc định hiển thị 8 mẫu; `script.js` tự tính số mẫu còn lại.
- 280.000đ là giá hiển thị do chủ shop cung cấp cho mẫu áo có sẵn, không phải bảng giá dịch vụ thêu. Thông tin sản phẩm là bản danh sách tĩnh, không tự đồng bộ tồn kho/giá Shopee. Kiểm tra lại khi shop thay đổi mẫu hoặc giá.
- Tư vấn và báo giá riêng qua Zalo 0944001592; không thu thập dữ liệu bằng form trên website.
- Địa chỉ: Số 4 ngõ Tạm Thương, Hoàn Kiếm, Hà Nội.
- Ảnh gốc giữ ở `assets/products/`. Website sử dụng WebP 480px và 960px trong `assets/products/web/`. Khi thay ảnh, giữ bản gốc và tạo cả hai kích cỡ tương ứng.
- Font tự lưu trong `assets/fonts/` kèm giấy phép OFL. Không gọi dịch vụ font ngoài.
- JavaScript chỉ bổ sung menu mobile, bộ lọc, thu gọn và xem nhanh. Khi tắt JavaScript, toàn bộ mẫu áo và liên kết mua hàng vẫn đọc được.
- Metadata SEO gồm mô tả, canonical, social preview, dữ liệu cấu trúc cửa hàng/dịch vụ, robots và sitemap. Không đảm bảo thứ hạng tìm kiếm.

## Kiểm tra trước khi push

Chạy `node --check script.js` và `git diff --check`. Xem lại ở mobile/desktop: menu, bộ lọc, mở/đóng xem nhanh, liên kết Zalo/Shopee, 18 giá và địa chỉ. Không deploy thư mục ảnh chụp kiểm thử `output/` nếu tự thêm vào máy.
