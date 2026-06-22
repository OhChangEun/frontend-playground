"use client";

import {
  useQueryStates,
  parseAsString,
  parseAsInteger,
} from "nuqs";

/**
 * After: nuqs 로 필터 상태를 URL search params 와 동기화한다.
 *
 * 얻는 것
 *  - URL 이 곧 상태(single source of truth) → 공유/북마크/새로고침 보존.
 *  - 뒤로가기/앞으로가기로 필터 변화를 되돌릴 수 있다.
 *  - parseAsInteger 등 파서로 문자열 ↔ 타입 변환이 타입 안전하게 처리된다.
 *  - API 가 useState 와 거의 동일하다.
 *
 * 사전 준비 (App Router)
 *  app/layout.tsx 를 NuqsAdapter 로 감싼다.
 *    import { NuqsAdapter } from "nuqs/adapters/next/app";
 *    <NuqsAdapter>{children}</NuqsAdapter>
 */

const CATEGORIES = ["all", "shoes", "tops", "bags"] as const;
const SORTS = ["latest", "price", "popular"] as const;

export default function ProductFilter() {
  const [filters, setFilters] = useQueryStates(
    {
      category: parseAsString.withDefault("all"),
      sort: parseAsString.withDefault("latest"),
      query: parseAsString.withDefault(""),
      page: parseAsInteger.withDefault(1),
    },
    {
      // 검색어처럼 자주 바뀌는 값은 history 를 새로 쌓지 않도록 replace 사용.
      history: "replace",
    }
  );

  const { category, sort, query, page } = filters;

  // 카테고리를 바꾸면 첫 페이지로. 여러 값을 한 번에 갱신할 수 있다.
  const handleCategory = (value: string) => {
    setFilters({ category: value, page: 1 });
  };

  return (
    <section>
      <div>
        <label>
          카테고리{" "}
          <select
            value={category}
            onChange={(e) => handleCategory(e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label>
          정렬{" "}
          <select
            value={sort}
            onChange={(e) => setFilters({ sort: e.target.value })}
          >
            {SORTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label>
          검색{" "}
          <input
            value={query}
            onChange={(e) => setFilters({ query: e.target.value, page: 1 })}
            placeholder="상품명"
          />
        </label>
      </div>

      <div>
        <button onClick={() => setFilters({ page: Math.max(1, page - 1) })}>
          이전
        </button>
        <span> {page} 페이지 </span>
        <button onClick={() => setFilters({ page: page + 1 })}>다음</button>
      </div>

      {/* URL: ?category=shoes&sort=price&query=...&page=2 와 자동 동기화 */}
      <pre>{JSON.stringify({ category, sort, query, page }, null, 2)}</pre>
    </section>
  );
}
