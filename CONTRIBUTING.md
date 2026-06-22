# 운영 규칙 (Contributing Guide)

이 저장소를 장기적으로 일관성 있게 관리하기 위한 규칙입니다.
혼자 쓰는 학습 저장소여도, 규칙을 정해두면 6개월 뒤의 나에게 큰 도움이 됩니다.

---

### 1. 브랜치 전략

가볍게 운영하되, 실험 단위로 분리합니다.

| 브랜치          | 용도                                              |
| --------------- | ------------------------------------------------- |
| `main`          | 항상 정리된 상태. 완료된 실험만 머지.             |
| `exp/{주제}`    | 실험 작업 브랜치. 예: `exp/url-state-management`   |
| `docs/{주제}`   | README/문서만 수정할 때. 예: `docs/update-readme` |
| `chore/{주제}`  | 설정·도구 등 부수 작업. 예: `chore/add-eslint`    |

흐름

```bash
git switch -c exp/tanstack-query   # 실험 시작
# ... 작업 & 커밋 ...
git push -u origin exp/tanstack-query
# GitHub에서 PR 생성 → 셀프 리뷰 → main 머지
```

> 작은 학습 저장소이므로 PR은 셀프 리뷰 + Squash merge를 권장합니다.
> 커밋이 잘게 쪼개져 있어도 main에는 깔끔하게 남습니다.

---

### 2. 커밋 컨벤션

[Conventional Commits](https://www.conventionalcommits.org/) 를 따릅니다.

```
<type>(<scope>): <subject>
```

type

| type       | 의미                                  |
| ---------- | ------------------------------------- |
| `feat`     | 새 실험 추가 / 새 코드 추가           |
| `docs`     | README·문서 작성/수정                 |
| `refactor` | 코드 구조 개선 (동작 변화 없음)       |
| `fix`      | 잘못된 예제·오타·버그 수정            |
| `chore`    | 설정, 의존성, 빌드 등 부수 작업       |
| `style`    | 포맷팅 (코드 의미 변화 없음)          |

scope 는 실험 주제(폴더명) 또는 영역을 씁니다.

예시

```
feat(url-state): nuqs로 URL 상태 관리 after 코드 추가
docs(url-state): URL 상태 관리 실험 결과 정리
docs(readme): 실험 목록 테이블에 tanstack-query 추가
chore: prettier 설정 추가
```

---

### 3. 폴더 네이밍 규칙

```
experiments/{kebab-case 주제}/
```

- 번호는 쓰지 않습니다. 주제명 자체가 식별자이고, 정렬은 알파벳순으로 충분합니다.
- 주제는 kebab-case (소문자 + 하이픈) : `url-state-management`
- 분류는 폴더가 아니라 각 실험 README의 태그로 합니다. (`#state`, `#nextjs` 등)

각 실험 폴더 내부 구조는 항상 동일하게 유지합니다.

```
experiments/url-state-management/
├── README.md      # 필수 — 실험 템플릿 기반
├── before/        # 기존 방식 코드
└── after/         # 새 방식 코드
```

> 코드가 한 파일이면 `before/` `after/`에 단일 파일만 둬도 됩니다.
> 실행 가능한 데모가 필요하면 `demo/` 폴더를 추가로 둘 수 있습니다.

---

### 4. README 작성 규칙

- 모든 실험 폴더에는 README.md가 필수입니다.
- 새 실험은 반드시 [`templates/EXPERIMENT_TEMPLATE.md`](./templates/EXPERIMENT_TEMPLATE.md) 를 복사해서 시작합니다.
- 작성 언어는 한국어 기본, 코드 주석은 한국어/영어 자유.
- 실험을 완료하면 루트 [`README.md`](./README.md)의 실험 목록 테이블을 함께 업데이트합니다. (상태, 블로그 링크)
- 결론(장점/단점/언제 쓰는가)은 빈칸으로 남기지 않습니다. "아직 모름"이라도 명시합니다.

상태 라벨

| 라벨     | 의미                          |
| -------- | ----------------------------- |
| 예정     | 폴더만 있고 아직 시작 안 함    |
| 진행 중  | 실험 작업 중                  |
| 완료     | 결론까지 기록 완료            |
| 보류     | 시작했지만 중단 (이유 기록)   |

---

### 5. 새 실험을 추가하는 체크리스트

```
□ exp/{주제} 브랜치 생성
□ experiments/{주제}/ 폴더 생성
□ EXPERIMENT_TEMPLATE.md 복사 → README.md (상단 태그 채우기)
□ before/ 코드 작성
□ after/ 코드 작성
□ 비교/측정 후 결과·장단점 작성
□ 루트 README 실험 목록 테이블 업데이트
□ PR 생성 → 셀프 리뷰 → main 머지
```
