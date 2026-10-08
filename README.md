# Làng Chèo – Chiếu Chèo Đêm Trăng

Website tương tác giới thiệu nghệ thuật chèo truyền thống Việt Nam thông qua boardgame và thư viện kiến thức.

## Chạy local

Yêu cầu Node.js 20+.

```bash
npm install
npm run dev
```

Mở địa chỉ Vite hiển thị trong terminal.

## Build production

```bash
npm run build
npm run preview
```

## Deploy Vercel

Project sử dụng Vite + React + TypeScript. Vercel có thể tự nhận diện Vite:

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

Không commit API key, `.env.local` hoặc các secret khác vào Git.
