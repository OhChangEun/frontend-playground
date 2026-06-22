## Frontend Playground

> 프론트엔드 기술을 직접 실험하고, 비교하고, 기록하는 학습용 저장소입니다.

새로운 라이브러리나 패턴을 만났을 때 "이게 정말 더 나은가?"를 막연히 느끼는 대신,
같은 문제를 Before / After 코드로 직접 구현해 비교하고 그 결과를 글로 남깁니다.

---

### 목표

1. 빠른 적용 — 새로운 기술을 작은 단위로 빠르게 써본다.
2. 비교 — 기존 방식과 새 방식을 같은 문제로 나란히 비교한다.
3. 기록 — 실험 결과를 정형화된 형식으로 남긴다.
4. 학습 로그 — GitHub 커밋/PR로 학습 과정을 누적한다.
5. 블로그 연결 — 각 실험을 기술 블로그 글과 연결한다.
6. 포트폴리오 — 시간이 지나면 학습 궤적 자체가 포트폴리오가 된다.

---

### 저장소 구조

```
frontend-playground/
├── README.md                  # 지금 이 파일 (실험 인덱스 포함)
├── CONTRIBUTING.md            # 운영 규칙 (브랜치/커밋/네이밍)
├── templates/
│   └── EXPERIMENT_TEMPLATE.md # 새 실험을 시작할 때 복사하는 템플릿
├── experiments/              # 모든 실험이 모이는 곳
│   └── url-state-management/
│       ├── README.md          # 문제 정의 · 비교 · 결과
│       ├── before/            # 기존 방식 코드
│       └── after/             # 새 방식 코드
└── docs/
    └── ROADMAP.md             # 미래 확장 방안
```

> 새 실험은 `experiments/{주제}/` 로 추가합니다. 분류는 각 실험 README의 태그로 합니다. 자세한 규칙은 [CONTRIBUTING.md](./CONTRIBUTING.md) 참고.

---

### 사용 방법

```bash
# 1. 클론
git clone https://github.com/<your-id>/frontend-playground.git
cd frontend-playground

# 2. 관심 있는 실험으로 이동
cd experiments/url-state-management

# 3. README를 먼저 읽고, before/ 와 after/ 코드를 비교
```

각 실험의 코드는 독립적으로 읽을 수 있도록 작성합니다.
실행이 필요한 실험은 해당 실험 폴더의 README 상단에 실행 방법을 명시합니다.

---

### 학습 방식

각 실험은 다음 흐름을 따릅니다.

```
문제 정의 → 기존 방식(Before) → 한계 발견 → 새 기술(After) → 비교/측정 → 결론 기록
```

- 결론을 먼저 정하지 않습니다. 실험 후 "안 쓰는 게 낫다"는 결론도 유효한 결과입니다.
- 모든 실험은 [실험 템플릿](./templates/EXPERIMENT_TEMPLATE.md)을 채워서 마무리합니다.

---

### 실험 목록

| 주제                | 비교                             | 태그                       | 상태 | 블로그 |
| ------------------- | -------------------------------- | -------------------------- | ---- | ------ |
| [URL 상태 관리](./experiments/url-state-management/) | `useState` vs `nuqs` | `#state` `#url` | 완료 | _TBD_  |
| 서버 상태 관리      | `useEffect` vs TanStack Query    | `#data-fetching`           | 예정 | -      |
| 전역 상태 관리      | Context vs Zustand               | `#state`                   | 예정 | -      |
| 폼 관리             | 제어 컴포넌트 vs React Hook Form | `#form`                    | 예정 | -      |
| 로딩 UI             | 조건부 렌더 vs Suspense          | `#ux` `#react`             | 예정 | -      |
| 무거운 업데이트     | 동기 setState vs `useTransition` | `#performance` `#react`    | 예정 | -      |
| 서버 컴포넌트       | CSR vs RSC                       | `#nextjs`                  | 예정 | -      |
| 스트리밍 렌더링     | 일괄 렌더 vs Streaming           | `#nextjs`                  | 예정 | -      |
| 메모이제이션 자동화 | 수동 memo vs React Compiler      | `#performance` `#react`    | 예정 | -      |

> 상태 표시: 완료 · 진행 중 · 예정 · 보류

---

### 블로그

실험을 정리한 글은 아래에 모읍니다. (작성되는 대로 링크 추가)

| 실험          | 글 제목     | 링크 |
| ------------- | ----------- | ---- |
| URL 상태 관리 | _작성 예정_ | -    |

> 블로그: _(준비 중)_

---

### 앞으로

블로그 연동 · 결과 자동 배포 · Playground 사이트 · 검색 · 태그 시스템 등
확장 계획은 [docs/ROADMAP.md](./docs/ROADMAP.md)에 정리되어 있습니다.

---

### License

MIT — 자유롭게 참고하고 가져다 쓰세요.
