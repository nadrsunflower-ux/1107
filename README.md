# 회사는 ‘돈 버는 방식’을 어떻게 계속 바꿔 나갈까?

Cruz-Sánchez et al. (2026) 논문 발표용 16:9 슬라이드 웹사이트.
고려대학교 일반대학원 첨단기술비즈니스학과 「글로벌 과학 기술 혁신과 사업화」.

Next.js · Tailwind CSS · shadcn/ui · framer-motion · Pretendard(폰트 파일 내장, 오프라인 동작)

## 실행

```bash
cd ~/Desktop/bmi-dc-lecture
npm run build && npm start   # http://localhost:3300
```

수정 중에는 `npm run dev`(같은 포트)를 쓰면 저장할 때마다 바로 반영된다.
`npm start`로 띄운 경우에는 고친 뒤 다시 빌드하고 서버를 재시작해야 한다.

## 발표 조작

| 키 | 동작 |
|---|---|
| → · Space · PageDown · 클릭 | 다음 단계 또는 다음 장 |
| ← · PageUp · 화면 왼쪽 끝 클릭 | 이전 |
| F | 전체 화면 |
| N | 이 장의 대본(현재 클릭 강조), 예상 시간, 타이머. 이 컴퓨터에서 띄운 덱에서만 |
| O | 전체 슬라이드 목록에서 바로 이동 |
| Home · End | 처음 · 끝 |

주소 `#/14/3`은 14장의 3단계를 뜻하며, 새로고침해도 그 자리를 유지한다.

## 발표 대본

- 주소: http://localhost:3300/script (슬라이드와 분리된 페이지. 슬라이드에서 N을 누르면 같은 대본이 현재 클릭 위치에 맞춰 보인다.)
- 각 장의 **수정**을 누르고 고치면 자동으로 저장된다. 서버를 재시작하거나 다시 빌드해도 유지된다.
- `---`만 있는 줄이 클릭 지점이다. 첫 `---` 앞은 첫 화면, 그 뒤 블록은 클릭할 때마다 나오는 화면에서 말한다.
  이 장의 클릭 수보다 많은 `---`는 그냥 구분선으로 보인다.
- 오른쪽 미리보기는 읽는 위치나 커서 위치에 해당하는 실제 슬라이드 화면을 보여 준다.
- 예상 시간은 대본 글자 수로 계산한다(공백 제외 분당 320자, 부록 제외).

| 파일 | 내용 |
|---|---|
| `src/content/script.ts` | 처음 작성한 원본. 되돌리기의 기준이라 편집기가 건드리지 않는다. |
| `content/script-overrides.json` | **브라우저에서 수정한 내용.** 이 파일이 수정본의 전부이므로 지우지 않는다. |

수정 저장은 이 컴퓨터에서 서버를 띄웠을 때만 동작한다. 서버는 이 컴퓨터에서만 접속되도록(`-H localhost`) 띄운다.
덱의 노트(N)도 대본을 코드에 담지 않고 이 서버의 `/api/script`에서 받아 온다.

## 배포 (발표 화면만)

- 주소: https://bmi-dc-lecture.vercel.app (Vercel 프로젝트 `bmi-dc-lecture`)
- 다시 배포: 이 폴더에서 `vercel deploy --prod`. GitHub `nadrsunflower-ux/1107`의 `main`에 푸시해도 자동 배포된다.
- **배포본에는 대본이 없다.** `.vercelignore`가 대본 페이지(`/script`), 대본 API, 원본(`src/content/script.ts`),
  수정본(`content/`)을 업로드에서 뺀다. 그래서 배포본에서는 노트(N), 대본 버튼, 예상 시간이 나타나지 않는다.
- 덱 코드에서 `@/content/script`를 다시 import하면 배포 빌드가 파일을 찾지 못해 실패한다.
  대본이 실수로 공개되는 대신 배포가 멈춘다. 덱에 필요한 계산 함수는 `src/content/script-format.ts`에 있다.

## 어디를 고치나

- 슬라이드 내용: `src/components/slides/` (파트별 파일. 파일 안의 번호 주석과 `S08PhotoVideo` 같은 이름은 처음 44장 구성의 번호라서 화면 번호와 다르다)
- 순서, 제목, 단계 수: `src/content/registry.tsx` (화면 번호는 이 파일의 순서)
- 표지 그림: `src/assets/cover-shop-loop.jpg`. 시안 보드와 프롬프트는 `cover-concepts/`. 금화 경로(`intro.tsx`의 `COVER_ROAD`)는 이 그림의 도로 좌표라서 그림을 바꾸면 같이 맞춘다.
- 색과 글자 크기 체계: `src/lib/design.ts`, `src/app/globals.css`
- 공통 부품(Slide, Panel, Build, Ex): `src/components/deck/primitives.tsx`
- 큰 그림, 미니맵, 막대그래프: `src/components/viz/`

## 덱에서 뺀 슬라이드

2026-11-05에 사용자 요청으로 뺐다: 떡볶이 가게의 문제(`S02Hook`), 비즈니스 모델·BMI·운영 vs 동적 역량·미시적 기반(`words.tsx`의 `S04`~`S07`).
git이 없어 되돌릴 수 없으므로 코드와 대본 원본은 남겨 두었다. 되살리려면 `registry.tsx`에 다시 넣고, `S04`~`S07`이면 `sections.ts`의 `words` 항목도 함께 넣는다.

## 규칙

- 모든 슬라이드는 1600×900 고정 무대에서 px 단위로 만들고, 화면에 맞게 통째로 확대·축소한다.
- 슬라이드 안에 `<Build at={n}>`을 추가하면 `registry.tsx`의 `steps`와 대본의 `---` 수도 함께 맞춘다.
- 색은 의미를 따른다. A 선행요인 주황, D 결정 파랑, O 결과 초록, TCM 보라, 떡볶이 예시 노랑.
- 떡볶이 가게, 정수기, 온도조절기는 이해를 돕는 예시이며 논문 사례가 아니다. 화면에 그렇게 표시한다.
- 수치는 논문 표를 기준으로 한다. 원 요약본(`Cruz-Sanchez_2026_BMI-DC_쉬운정리.html`)의 표 4 차트는
  스페인과 스웨덴을 빠뜨렸다. 이 덱은 원문대로 ‘각 1편’ 11개 국가·지역을 쓴다.
