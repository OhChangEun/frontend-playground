## URL 상태 관리

> 한 줄 요약: 필터/검색 같은 UI 상태를 `useState`로 들고 있을 때 vs `nuqs`로 URL과 동기화할 때를 비교한다.

- 비교: `useState` vs `nuqs`
- 상태: 완료
- 태그: `#state` `#url` `#search-params`

실행 방법 (Next.js App Router 기준)

```bash
# 실제 프로젝트에 붙여 확인할 때
npm i nuqs
# before/after 의 컴포넌트를 각각 페이지에 올려 동작 비교
```

---

### 1. 문제 상황

상품 목록 페이지에 "카테고리 / 정렬 / 검색어 / 페이지" 필터가 있다.
사용자가 필터를 바꾼 뒤 그 화면을 친구에게 공유하거나, 새로고침하거나, 뒤로가기를 눌렀을 때
필터 상태가 그대로 유지되길 기대한다.

### 2. 기존 방식

필터 값을 컴포넌트 내부 `useState`로 관리했다. (`before/ProductFilter.tsx`)

### 3. 기존 방식의 한계

- 새로고침하면 필터가 전부 초기화된다.
- URL에 상태가 없어서 공유/북마크가 불가능하다. ("이 검색 결과 링크 줘"가 안 됨)
- 뒤로가기/앞으로가기로 필터 변화를 되돌릴 수 없다.
- 상태가 컴포넌트에 갇혀 있어, 다른 컴포넌트(예: 결과 개수 표시)와 공유하려면 끌어올리기(lifting)가 필요하다.
- 직접 `searchParams`를 다루면 문자열 ↔ 타입 변환, 직렬화/파싱 보일러플레이트가 반복된다.

### 4. 선택한 기술

- 라이브러리: [nuqs](https://nuqs.dev) — URL search params를 `useState`처럼 다루는 타입 안전 훅
- 버전: `^2.x`
- 고른 이유: URL이 곧 상태(single source of truth)가 되고, 타입 안전한 파서를 제공하며,
  App Router/Pages Router 모두 지원한다. API가 `useState`와 거의 동일해 학습 비용이 낮다.

### 5. 실험 방법

동일한 ProductFilter 컴포넌트를 두 가지로 구현했다.

- `before/` : `useState` 로만 상태 관리
- `after/` : `nuqs` 의 `useQueryState` / `useQueryStates` 로 URL 동기화

다음을 비교했다: 새로고침 후 상태 유지, URL 공유 가능 여부, 뒤로가기 동작, 코드량/보일러플레이트.

### 6. Before 코드

```tsx
// before/ProductFilter.tsx (발췌)
const [category, setCategory] = useState("all");
const [sort, setSort] = useState("latest");
const [query, setQuery] = useState("");
const [page, setPage] = useState(1);
// 새로고침하면 전부 초기화, URL에 흔적이 없음
```

전체 코드: [`before/ProductFilter.tsx`](./before/ProductFilter.tsx)

### 7. After 코드

```tsx
// after/ProductFilter.tsx (발췌)
const [filters, setFilters] = useQueryStates({
  category: parseAsString.withDefault("all"),
  sort: parseAsString.withDefault("latest"),
  query: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
});
// URL ?category=shoes&sort=price&query=...&page=2 와 자동 동기화
```

전체 코드: [`after/ProductFilter.tsx`](./after/ProductFilter.tsx)

### 8. 결과

| 항목                  | Before (useState)        | After (nuqs)                  |
| --------------------- | ------------------------ | ----------------------------- |
| 새로고침 후 상태 유지 | 초기화됨                 | 유지됨                        |
| URL 공유/북마크       | 불가                     | 가능 (URL이 곧 상태)          |
| 뒤로가기로 필터 복원  | 불가                     | 가능                          |
| 타입 변환             | 수동 (`Number(...)` 등)  | 파서로 자동 (`parseAsInteger`)|
| 상태 선언부 코드량    | 4개의 useState           | 1개의 useQueryStates 블록     |

### 9. 장점

- URL이 단일 진실 공급원이 되어 공유·새로고침·뒤로가기가 자연스럽게 동작한다.
- `parseAsInteger` 등 파서로 문자열 ↔ 타입 변환이 타입 안전하게 처리된다.
- API가 `useState`와 거의 같아 마이그레이션이 쉽다.
- 여러 컴포넌트가 같은 URL 상태를 구독할 수 있어 prop drilling이 준다.

### 10. 단점

- 민감하거나 휘발성인 상태(비밀번호 입력값, 모달 임시 상태 등)에는 부적합하다 — URL에 노출된다.
- URL 길이 제한이 있어 큰 상태(대용량 객체/배열)에는 맞지 않는다.
- 상태 변경이 곧 URL 변경(history)이라, 너무 잦은 변경은 `throttleMs`/`history: 'replace'` 같은 튜닝이 필요하다.
- 외부 의존성이 추가된다.

### 11. 언제 사용해야 하는가

- 필터, 정렬, 검색어, 페이지네이션, 탭 등 공유·북마크 가치가 있는 UI 상태.
- 새로고침 후에도 보존돼야 하는 상태.
- 여러 컴포넌트가 함께 봐야 하는 화면 상태.

### 12. 언제 사용하면 안 되는가

- 민감 정보나 노출되면 안 되는 값.
- 매우 빈번하게 바뀌는 값(예: 드래그 좌표) — 별도 스로틀 없이는 history가 오염된다.
- URL에 담기엔 큰 구조의 상태.
- 서버에서 받아오는 데이터 캐시 — 그건 TanStack Query 같은 서버 상태 도구의 영역(→ 002 실험 예정).

### 13. 참고 자료

- [nuqs 공식 문서](https://nuqs.dev)
- [Next.js — useSearchParams](https://nextjs.org/docs/app/api-reference/functions/use-search-params)

### 14. 기술 블로그 링크

- 작성한 글: _작성 예정_
