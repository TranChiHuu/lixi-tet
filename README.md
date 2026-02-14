# Lì Xì Tết - Vòng Quay May Mắn

Ứng dụng web vòng quay may mắn để lì xì ngày Tết, được xây dựng với React, TailwindCSS và Firebase.

## Cài đặt và Chạy Development

1.  Cài đặt dependencies:
    ```bash
    npm install
    ```

2.  Chạy server development:
    ```bash
    npm run dev
    ```

3.  Mở trình duyệt tại `http://localhost:5173`.

## Build và Deploy lên Firebase

1.  Đăng nhập Firebase (nếu chưa):
    ```bash
    firebase login
    ```

2.  Khởi tạo dự án (hoặc sử dụng cấu hình có sẵn):
    Nếu bạn chưa tạo project trên Firebase Console, hãy tạo trước.
    Sau đó chạy lệnh:
    ```bash
    firebase use --add
    ```
    Chọn project bạn muốn deploy.

3.  Build ứng dụng:
    ```bash
    npm run build
    ```

4.  Deploy:
    ```bash
    firebase deploy
    ```

## Tính năng

-   **Nhập khoảng tiền**: Tùy chỉnh mức lì xì từ thấp nhất đến cao nhất.
-   **Tự động lọc**: Chỉ hiển thị các mệnh giá tiền Việt Nam hợp lệ trong khoảng đã chọn.
-   **Vòng quay**: Hiệu ứng quay mượt mà, kết quả ngẫu nhiên.
-   **Hiệu ứng**: Pháo hoa giấy (Confetti) khi trúng thưởng.
-   **Giao diện**: Thiết kế Tết đỏ/vàng sang trọng, Responsive.

## Công nghệ

-   Vite + React + TypeScript
-   TailwindCSS v3
-   Framer Motion (Animations)
-   Canvas Confetti
-   Firebase Hosting
