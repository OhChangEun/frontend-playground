# 로드맵 (미래 확장 방안)

현재 저장소는 "Markdown + 코드"만으로 동작하도록 의도적으로 단순하게 설계했습니다.
아래 기능들은 지금 구조를 그대로 두고 점진적으로 얹을 수 있습니다.

---

### 1. 개인 기술 블로그 연동

현재 구조에서 각 실험 README의 14번 항목("기술 블로그 링크")과
루트 README의 블로그 테이블이 이미 연결 지점을 만들어 둔 상태입니다.

확장 방법

- 각 실험 README frontmatter(메타데이터)에 `blog_url` 필드를 추가한다.
- 블로그 글 ↔ 실험 폴더를 1:1로 매핑하고, 양쪽에 상호 링크를 단다.
- 블로그가 정적 사이트(예: Next.js, Astro)라면 이 저장소를 git submodule 또는
  콘텐츠 소스로 끌어와 글과 코드를 한 곳에서 노출할 수 있다.

---

### 2. 실험 결과 자동 배포

확장 방법

- `.github/workflows/` 에 GitHub Actions 워크플로를 추가한다.
- `main` 머지 시 각 실험 README를 파싱해 실험 목록 인덱스를 자동 생성/갱신한다.
- 정적 사이트 빌드 후 GitHub Pages 또는 Vercel로 자동 배포한다.

```
.github/
└── workflows/
    └── deploy.yml   # main push → build → Pages/Vercel 배포
```

---

### 3. Playground 사이트 구축

확장 방법

- 저장소 루트에 `site/` (Next.js 또는 Astro) 디렉토리를 추가한다.
- `experiments/*/README.md` 를 빌드 타임에 읽어 실험 카드 목록 페이지를 만든다.
- 실행 가능한 데모는 `experiments/*/demo/` 를 iframe 또는 라이브 데모로 임베드한다.

```
site/
├── app/
│   └── experiments/[slug]/page.tsx
└── lib/loadExperiments.ts   # experiments/ 폴더 스캔
```

> 핵심: experiments 폴더의 일관된 구조(README + before/after)가
> 그대로 사이트의 데이터 소스가 된다. 그래서 지금부터 규칙을 지키는 게 중요하다.

---

### 4. 검색 기능

확장 방법

- 빌드 시 모든 실험 README에서 제목·요약·태그를 추출해 `search-index.json` 생성.
- 사이트에서 [FlexSearch](https://github.com/nextapps-de/flexsearch) 또는
  [Pagefind](https://pagefind.app/) 같은 클라이언트 검색 엔진으로 색인을 소비.

---

### 5. 태그 시스템

현재 실험 템플릿 상단에 이미 `태그:` 필드를 넣어 두었습니다.

확장 방법

- 각 README의 태그를 수집해 `/tags/{tag}` 페이지를 생성한다.
- 같은 태그를 가진 실험끼리 연결(예: `#state` 로 묶인 실험 목록).
- 태그 표기 규칙: 소문자, 단수형, 공백 대신 하이픈 (`#data-fetching`).

---

### 확장 순서 제안

```
1) 운영 규칙·구조 안정화 (지금)
2) 블로그 글 ↔ 실험 상호 링크 (수동)
3) 실험 인덱스 자동 생성 (Actions)
4) Playground 사이트 (Next.js/Astro)
5) 검색 + 태그 페이지
```

작은 단위로, 실험 자체가 쌓이는 걸 우선합니다. 도구는 나중에 붙여도 늦지 않습니다.
