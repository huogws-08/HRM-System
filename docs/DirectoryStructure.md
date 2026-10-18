
hrm-system/
│
├── apps/
│   │
│   ├── web/                              # Next.js - Web HRM
│   │   ├── public/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── logo.svg
│   │   │
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── (auth)/
│   │   │   │   │   ├── login/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── forgot-password/
│   │   │   │   │       └── page.tsx
│   │   │   │   │
│   │   │   │   ├── (dashboard)/
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   ├── dashboard/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── employees/
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   ├── new/
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   └── [employeeId]/
│   │   │   │   │   │       └── page.tsx
│   │   │   │   │   ├── attendance/
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   ├── import/
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   └── history/
│   │   │   │   │   │       └── page.tsx
│   │   │   │   │   ├── shifts/
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   ├── schedules/
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   └── assignments/
│   │   │   │   │   │       └── page.tsx
│   │   │   │   │   ├── leave/
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   ├── requests/
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   └── approvals/
│   │   │   │   │   │       └── page.tsx
│   │   │   │   │   ├── reports/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── notifications/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── audit-logs/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── settings/
│   │   │   │   │       └── page.tsx
│   │   │   │   │
│   │   │   │   ├── api/                  # Chỉ dùng khi Web cần BFF
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── globals.css
│   │   │   │   ├── error.tsx
│   │   │   │   ├── not-found.tsx
│   │   │   │   └── loading.tsx
│   │   │   │
│   │   │   ├── components/
│   │   │   │   ├── ui/
│   │   │   │   ├── layout/
│   │   │   │   ├── forms/
│   │   │   │   ├── tables/
│   │   │   │   └── feedback/
│   │   │   │
│   │   │   ├── features/
│   │   │   │   ├── auth/
│   │   │   │   ├── employees/
│   │   │   │   ├── attendance/
│   │   │   │   ├── shifts/
│   │   │   │   ├── leave/
│   │   │   │   ├── reports/
│   │   │   │   ├── notifications/
│   │   │   │   ├── audit-logs/
│   │   │   │   └── system-admin/
│   │   │   │
│   │   │   ├── hooks/
│   │   │   ├── lib/
│   │   │   │   ├── api-client.ts
│   │   │   │   ├── auth.ts
│   │   │   │   ├── constants.ts
│   │   │   │   └── utils.ts
│   │   │   ├── providers/
│   │   │   ├── stores/
│   │   │   └── types/
│   │   │
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── e2e/
│   │   ├── .env.example
│   │   ├── next.config.ts
│   │   ├── tsconfig.json
│   │   ├── postcss.config.mjs
│   │   ├── eslint.config.mjs
│   │   └── package.json
│   │
│   └── mobile/                            # React Native - Employee App
│       ├── assets/
│       │   ├── images/
│       │   ├── icons/
│       │   ├── fonts/
│       │   └── splash/
│       │
│       ├── src/
│       │   ├── app/                       # Expo Router nếu chọn Expo
│       │   │   ├── (auth)/
│       │   │   │   └── login.tsx
│       │   │   ├── (tabs)/
│       │   │   │   ├── index.tsx
│       │   │   │   ├── schedule.tsx
│       │   │   │   ├── attendance.tsx
│       │   │   │   ├── leave.tsx
│       │   │   │   └── profile.tsx
│       │   │   └── _layout.tsx
│       │   │
│       │   ├── components/
│       │   │   ├── ui/
│       │   │   ├── forms/
│       │   │   ├── cards/
│       │   │   └── feedback/
│       │   │
│       │   ├── features/
│       │   │   ├── auth/
│       │   │   ├── my-profile/
│       │   │   ├── my-shifts/
│       │   │   ├── my-attendance/
│       │   │   ├── my-leave/
│       │   │   └── notifications/
│       │   │
│       │   ├── services/
│       │   │   ├── api-client.ts
│       │   │   └── auth-service.ts
│       │   ├── hooks/
│       │   ├── stores/
│       │   ├── lib/
│       │   ├── types/
│       │   └── constants/
│       │
│       ├── tests/
│       ├── app.json
│       ├── tsconfig.json
│       ├── .env.example
│       └── package.json
│
├── services/
│   └── api/                               # Node.js + Express
│       ├── src/
│       │   ├── config/
│       │   │   ├── env.ts
│       │   │   ├── database.ts
│       │   │   └── app-config.ts
│       │   │
│       │   ├── middlewares/
│       │   │   ├── authenticate.ts
│       │   │   ├── authorize.ts
│       │   │   ├── validate-request.ts
│       │   │   ├── error-handler.ts
│       │   │   └── not-found.ts
│       │   │
│       │   ├── modules/
│       │   │   ├── auth/
│       │   │   │   ├── auth.routes.ts
│       │   │   │   ├── auth.controller.ts
│       │   │   │   ├── auth.service.ts
│       │   │   │   ├── auth.repository.ts
│       │   │   │   ├── auth.validation.ts
│       │   │   │   └── auth.types.ts
│       │   │   │
│       │   │   ├── employees/
│       │   │   │   ├── employee.routes.ts
│       │   │   │   ├── employee.controller.ts
│       │   │   │   ├── employee.service.ts
│       │   │   │   ├── employee.repository.ts
│       │   │   │   ├── employee.validation.ts
│       │   │   │   └── employee.types.ts
│       │   │   │
│       │   │   ├── attendance/
│       │   │   │   ├── attendance.routes.ts
│       │   │   │   ├── attendance.controller.ts
│       │   │   │   ├── attendance.service.ts
│       │   │   │   ├── attendance.repository.ts
│       │   │   │   ├── attendance-import.service.ts
│       │   │   │   ├── attendance-import.validation.ts
│       │   │   │   └── attendance.types.ts
│       │   │   │
│       │   │   ├── shifts/
│       │   │   │   ├── shift.routes.ts
│       │   │   │   ├── shift.controller.ts
│       │   │   │   ├── shift.service.ts
│       │   │   │   ├── shift.repository.ts
│       │   │   │   ├── shift.validation.ts
│       │   │   │   └── shift.types.ts
│       │   │   │
│       │   │   ├── leave/
│       │   │   │   ├── leave.routes.ts
│       │   │   │   ├── leave.controller.ts
│       │   │   │   ├── leave.service.ts
│       │   │   │   ├── leave.repository.ts
│       │   │   │   ├── leave-approval.service.ts
│       │   │   │   ├── leave-balance.service.ts
│       │   │   │   ├── leave.validation.ts
│       │   │   │   └── leave.types.ts
│       │   │   │
│       │   │   ├── reporting/
│       │   │   │   ├── reporting.routes.ts
│       │   │   │   ├── reporting.controller.ts
│       │   │   │   ├── reporting.service.ts
│       │   │   │   └── reporting.types.ts
│       │   │   │
│       │   │   ├── notifications/
│       │   │   │   ├── notification.routes.ts
│       │   │   │   ├── notification.controller.ts
│       │   │   │   ├── notification.service.ts
│       │   │   │   └── notification.repository.ts
│       │   │   │
│       │   │   ├── automation/
│       │   │   │   ├── automation.service.ts
│       │   │   │   ├── reminder.job.ts
│       │   │   │   └── report.job.ts
│       │   │   │
│       │   │   ├── audit-logs/
│       │   │   │   ├── audit.routes.ts
│       │   │   │   ├── audit.service.ts
│       │   │   │   └── audit.repository.ts
│       │   │   │
│       │   │   └── system-admin/
│       │   │       ├── admin.routes.ts
│       │   │       ├── admin.controller.ts
│       │   │       ├── admin.service.ts
│       │   │       └── admin.validation.ts
│       │   │
│       │   ├── routes/
│       │   │   └── index.ts
│       │   ├── lib/
│       │   │   ├── logger.ts
│       │   │   └── api-response.ts
│       │   ├── app.ts
│       │   └── server.ts
│       │
│       ├── prisma/
│       │   └── schema.prisma
│       ├── tests/
│       │   ├── unit/
│       │   ├── integration/
│       │   └── fixtures/
│       ├── .env.example
│       ├── .env.test.example
│       ├── tsconfig.json
│       ├── eslint.config.mjs
│       └── package.json
│
├── docs/
│   ├── PROJECT_SPEC.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   ├── API_SPEC.md
│   ├── AUTHORIZATION.md
│   ├── TEST_PLAN.md
│   └── AI_RULES.md
│
├── scripts/
│   ├── check-environment.js
│   └── validate-docs.js
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── .gitignore
├── .env.example
├── .npmrc
├── package.json
├── package-lock.json
└── README.md
