<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# ChatGPT Integration API

Ứng dụng NestJS tích hợp ChatGPT API để nhận request từ client, thêm system prompt và trả về kết quả từ ChatGPT.

## Tính năng

- ✅ Nhận request chứa prompt từ client
- ✅ Tự động thêm system prompt tiếng Việt
- ✅ Tích hợp OpenAI ChatGPT API
- ✅ Validation đầu vào
- ✅ CORS support
- ✅ Giao diện demo đơn giản
- ✅ Error handling

## Cài đặt

1. Clone repository và cài đặt dependencies:
```bash
pnpm install
```

2. Tạo file `.env` và thêm OpenAI API key:
```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

3. Khởi động ứng dụng:
```bash
# Development mode
pnpm run start:dev

# Production mode
pnpm run start:prod
```

## API Endpoints

### 1. Chat với ChatGPT
```
POST /api/chat
Content-Type: application/json

{
  "message": "Xin chào, bạn có thể giúp tôi không?",
  "conversationId": "optional-conversation-id"
}
```

**Response:**
```json
{
  "response": "Xin chào! Tôi là trợ lý AI và rất sẵn lòng giúp đỡ bạn...",
  "conversationId": "conv_1234567890_abc123def",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. Health Check
```
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "ChatGPT Integration API"
}
```

### 3. Demo UI
Truy cập giao diện demo tại: `http://localhost:3000/demo`

## Cấu trúc Project

```
src/
├── controllers/
│   └── chat.controller.ts      # Controller xử lý chat requests
├── services/
│   └── openai.service.ts       # Service tích hợp OpenAI API
├── dto/
│   └── chat.dto.ts            # Data Transfer Objects
├── app.controller.ts          # Main controller
├── app.module.ts             # Root module
├── app.service.ts            # App service
└── main.ts                   # Entry point

public/
└── index.html                # Demo UI
```

## Cách sử dụng

### 1. Với giao diện demo
1. Mở trình duyệt và truy cập `http://localhost:3000/demo`
2. Nhập câu hỏi và nhấn "Gửi"
3. Xem phản hồi từ ChatGPT

### 2. Với API trực tiếp
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hãy giải thích về Node.js"
  }'
```

### 3. Với JavaScript
```javascript
const response = await fetch('http://localhost:3000/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'Xin chào ChatGPT!',
    conversationId: 'optional-id'
  })
});

const data = await response.json();
console.log(data.response);
```

## System Prompt

Ứng dụng tự động thêm system prompt sau đây vào mọi request:

```
Bạn là một trợ lý AI thông minh và hữu ích. 
Hãy trả lời câu hỏi của người dùng một cách chi tiết, chính xác và thân thiện. 
Nếu bạn không chắc chắn về thông tin nào đó, hãy nói rõ điều đó.
Luôn trả lời bằng tiếng Việt trừ khi người dùng yêu cầu ngôn ngữ khác.
```

## Scripts

```bash
# Development
pnpm run start:dev

# Production build
pnpm run build
pnpm run start:prod

# Testing
pnpm run test
pnpm run test:e2e

# Linting
pnpm run lint
```

## Môi trường

- Node.js >= 18
- pnpm
- OpenAI API Key

## Lưu ý

1. Cần có OpenAI API key hợp lệ
2. Kiểm tra quota và billing của OpenAI account
3. Trong production, nên giới hạn CORS origins
4. Rate limiting được khuyến nghị cho production

## License

UNLICENSED
