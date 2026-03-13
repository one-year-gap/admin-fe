<div align="center">

<img src="https://github.com/user-attachments/assets/logo.png" width="400"/>

### U+NIVERSE Admin Dashboard

고객 데이터 분석 기반 요금제 추천 서비스 관리자 페이지

[<img src="https://img.shields.io/badge/-Admin Dashboard-important?style=flat&logo=google-chrome&logoColor=white" />]()
[<img src="https://img.shields.io/badge/-GitHub-blue?style=flat&logo=github&logoColor=white" />]()
[<img src="https://img.shields.io/badge/release-v1.0.0-success?style=flat&logoColor=white" />]  
<br/>
[<img src="https://img.shields.io/badge/프로젝트 기간-2026.02~2026.03-fab2ac?style=flat&logo=&logoColor=white" />]

</div>

---

# 📝 소개

**U+NIVERSE Admin Dashboard**는  
고객 데이터를 기반으로 서비스 이용 현황을 분석하고 관리할 수 있는  
관리자 전용 웹 대시보드입니다.

관리자는 고객 정보 조회, 지역별 통계 분석,  
고객 페르소나 분석, 서비스 이탈률 분석 등을 통해  
서비스 운영 현황을 한눈에 확인할 수 있습니다.

주요 기능

- 고객 관리 및 고객 상세 정보 조회
- 지역 기반 사용자 데이터 분석
- 고객 페르소나 분석 및 트렌드 시각화
- 서비스 이탈률 분석

---

# 📺 화면 구성

## 👥 고객 관리

| 고객 목록 | 고객 상세 |
|:---:|:---:|
| <img src="./docs/admin-customer-list.png" width="450"/> | <img src="./docs/admin-customer-detail.png" width="450"/> |
| 고객 목록을 조회하고 검색 및 필터 기능을 통해 고객 정보를 관리할 수 있습니다. | 고객 상세 정보를 확인하고 고객 상태를 관리할 수 있습니다. |

---

## 🗺 지역 통계

| 지역 사용자 통계 | 지역 데이터 분석 |
|:---:|:---:|
| <img src="./docs/admin-region-map.png" width="450"/> | <img src="./docs/admin-region-chart.png" width="450"/> |
| 대한민국 지도 기반으로 지역별 사용자 분포를 시각화합니다. | 지역별 데이터 사용량 및 서비스 이용 패턴을 차트로 분석합니다. |

---

## 🧑‍🚀 페르소나 분석

| 페르소나 통계 | 페르소나 트렌드 |
|:---:|:---:|
| <img src="./docs/admin-persona-chart.png" width="450"/> | <img src="./docs/admin-persona-trend.png" width="450"/> |
| 고객 데이터를 기반으로 페르소나 유형 비율을 분석합니다. | 월별 페르소나 변화 추이를 통해 사용자 유형 변화를 분석합니다. |

---

## 📉 이탈률 분석

| 이탈률 분석 |
|:---:|
| <img src="./docs/admin-churn-chart.png" width="450"/> |
| 서비스 이용 중 이탈한 고객 데이터를 분석하여 서비스 개선 인사이트를 제공합니다. |

---

# ⚙ 기술 스택

## Front-end

<div>

<img src="https://skillicons.dev/icons?i=nextjs" width="60">
<img src="https://skillicons.dev/icons?i=react" width="60">
<img src="https://skillicons.dev/icons?i=ts" width="60">
<img src="https://skillicons.dev/icons?i=tailwind" width="60">

</div>

- **Next.js (App Router)** — 관리자 페이지 라우팅 및 구조 설계
- **React** — 컴포넌트 기반 UI 개발
- **TypeScript** — 타입 기반 안정적인 코드 작성
- **TailwindCSS** — 유틸리티 기반 스타일링

---

## Data / State

<div>

<img src="https://skillicons.dev/icons?i=react" width="60">

</div>

- **TanStack Query** — 서버 상태 관리 및 API 캐싱
- **Zustand** — 클라이언트 전역 상태 관리
- **Recharts** — 관리자 데이터 시각화 차트

---

## Tools

<div>

<img src="https://skillicons.dev/icons?i=github" width="60">
<img src="https://skillicons.dev/icons?i=vscode" width="60">

</div>

- **GitHub** — 협업 및 버전 관리
- **ESLint / Prettier** — 코드 스타일 관리
- **Husky** — Git Hook 기반 커밋 관리

---

# 📂 폴더 구조

```bash
src
 ┣ app              # Next.js App Router 페이지
 ┣ assets           # 이미지 및 정적 리소스
 ┣ components       # 공통 UI 컴포넌트
 ┃ ┗ domain         # 도메인별 컴포넌트 (charts, customers 등)
 ┣ constants        # 상수 관리
 ┣ hooks            # 커스텀 React Hooks
 ┣ lib              # 공통 라이브러리 (axios, tanstack query)
 ┣ models           # API 응답 모델 타입 정의
 ┣ services         # API 요청 함수
 ┣ stores           # Zustand 상태 관리
 ┣ types            # 공통 타입 정의
 ┗ utils            # 유틸 함수
