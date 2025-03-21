# 멋쟁이 사자처럼 2차 프로젝트입니다

**React 를 통해 연극, 콘서트, 전시 등의 문화 정보를 탐색하는 웹 서비스입니다.**

---

## Github Branch 작업 방법

각 팀별로 작업하는 내용을 분리하기 위해서 repository 에 branch 를 통해 개발 공간을 분리합니다.

이때 branch 를 생성하는 기준과 branch 의 이름을 명명하는 방법에 대해 규칙을 소개하겠습니다.

> 기본 branch

-   main : 최종 결과물로 완성할 branch 입니다
-   feat : 각 팀별로 개발한 코드를 통합하는 branch 입니다
-   feat-team1 : 1팀이 개발할 branch 입니다
-   feat-team2 : 2팀이 개발할 branch 입니다
-   feat-team3 : 3팀이 개발할 branch 입니다

기본 branch 들은 직접 코드를 push 할 수 없습니다.

해당 branch 에서 파생된 하위 branch 에서 pull request 를 통해 merge 하여 업데이트할 수 있습니다

> 기능 개발 branch

-   ex) feat-team3-lag-current-1 : lag-current-1 기능 개발을 위한 branch 입니다
-   ex) feat-team3-lag-current-2 : lag-current-1 를 완료한 feat-team3-lag-current-1 branch 를 기반으로 생성한 branch 입니다

기능 개발 branch 는 기본적으로 요건 정의서 및 세부 기능 구현 계획, WBS 에서 정리한 작업 코드를 기반으로 명명합니다.

기능 개발 branch 들은 직접 코드를 push 하여 작업을 진행하고, 기능 단위( ex) lag-current ) 작업을 완료하면 pull request(이하 pr) 을 통해 팀별 branch 에 merge 합니다.

예를 들어, feat-team3-lag-current-2 에서 모든 개발을 완료했다면,
Github 에서 feat-team3-lag-current-2 에서 feat-team3 로 merge 를 위한 pr 을 생성하면 됩니다.

---

## **Commit Message Convention**

| 제목   | 내용                                                                             |
| ------ | -------------------------------------------------------------------------------- |
| init   | 작업 세팅 커밋 (패키지 설치 등)                                                  |
| feat   | 새로운 기능을 추가할 경우                                                        |
| style  | 기능에 영향을 주지 않는 커밋, 코드 순서, css등의 포맷에 관한 커밋                |
| fix    | 버그를 고친 경우                                                                 |
| refact | 코드 리팩토링                                                                    |
| docs   | 문서를 수정한 경우, 파일 삭제, 파일명 수정 등 ex) README.md                      |
| chore  | 빌드 테스트 업데이트, 패키지 매니저를 설정하는 경우, 주석 추가, 자잘한 문서 수정 |

커밋을 할 때마다 커밋과 함께 커밋 메시지를 작성해야 합니다.

해당 커밋이 어떤 변경사항을 가지고 있는지 파악할 수 있는 메시지를 담는 것이 좋습니다.

커밋 메시지의 첫 마디에 키워드를 입력해주면 해당 커밋이 어떤 작업을 포함하는지 파악하기 좋습니다.

> ex) git commit -m “feat: openapi 를 통해 공연 정보를 요청”
> ex) git commit -m “chore: 불필요한 주석 제거”
> ex) git commit -m “docs: 폴더 이름 변경”
