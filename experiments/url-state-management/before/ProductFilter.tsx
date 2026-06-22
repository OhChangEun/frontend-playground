"use client";

import { useState } from "react";

/**
 * Before: useState 로만 필터 상태를 관리한다.
 *
 * 동작은 하지만 다음 한계가 있다.
 *  - 새로고침하면 모든 필터가 초기화된다.
 *  - URL에 상태가 없어 공유/북마크가 불가능하다.
 *  - 뒤로가기/앞으로가기로 필터 변화를 되돌릴 수 없다.
 *  - 문자열 ↔ 숫자 변환을 직접 처리해야 한다.
 */

const CATEGORIES = ["all", "shoes", "tops", "bags"] as const;
const SORTS = ["latest", "price", "popular"] as const;

export default function ProductFilter() {
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<string>("latest");
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  // 필터가 바뀌면 보통 첫 페이지로 되돌린다.
  const handleCategory = (value: string) => {
    setCategory(value);
    setPage(1);
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
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
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
            onChange={(e) => setQuery(e.target.value)}
            placeholder="상품명"
          />
        </label>
      </div>

      <div>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))}>이전</button>
        <span> {page} 페이지 </span>
        <button onClick={() => setPage((p) => p + 1)}>다음</button>
      </div>

      {/* 실제로는 이 값으로 데이터를 패칭한다. */}
      <pre>{JSON.stringify({ category, sort, query, page }, null, 2)}</pre>
    </section>
  );
}
