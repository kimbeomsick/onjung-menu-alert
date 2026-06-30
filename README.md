# onjung-menu-alert

온정한식뷔페 카카오톡 채널에 올라온 **오늘의 메뉴 이미지**를 매일 아침 자동으로 Slack에 전송하는 봇입니다.

## 동작 방식

1. 카카오톡 채널의 최신 게시물을 조회해 메뉴 이미지 URL을 가져옵니다.
2. 해당 이미지를 Slack 웹훅으로 전송합니다.
3. GitHub Actions가 **매일 한국시간 오전 10시(UTC 01:00)** 에 자동 실행합니다.

## 구성

| 파일 | 설명 |
|------|------|
| `send-menu.js` | 메뉴 이미지를 가져와 Slack으로 보내는 스크립트 |
| `.github/workflows/daily-menu.yml` | 매일 정해진 시간에 스크립트를 실행하는 워크플로우 |

## 설정

이 봇을 사용하려면 Slack Incoming Webhook URL을 GitHub Secret으로 등록해야 합니다.

1. Slack에서 [Incoming Webhook](https://api.slack.com/messaging/webhooks)을 생성합니다.
2. 저장소 **Settings → Secrets and variables → Actions** 에서 시크릿을 추가합니다.
   - Name: `SLACK_WEBHOOK_URL`
   - Value: 발급받은 웹훅 URL

## 실행

### 자동 실행
별도 작업 없이 매일 한국시간 오전 10시에 자동으로 실행됩니다.

### 수동 실행
저장소의 **Actions → daily-menu → Run workflow** 버튼으로 즉시 실행할 수 있습니다.

### 로컬 실행
```bash
SLACK_WEBHOOK_URL="https://hooks.slack.com/services/XXX/YYY/ZZZ" node send-menu.js
```

> Node.js 18 이상이 필요합니다 (내장 `fetch` 사용).

## 실행 시간 변경

`.github/workflows/daily-menu.yml`의 cron 값을 수정합니다. 시간은 **UTC 기준**이므로 한국시간에서 9시간을 빼야 합니다.

```yaml
schedule:
  - cron: "0 1 * * *"   # 매일 KST 10:00 (UTC 01:00)
```
