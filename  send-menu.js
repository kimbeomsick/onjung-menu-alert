async function getMenuImageUrl() {
  const listRes = await fetch("https://pf.kakao.com/rocket-web/web/profiles/_BdwNn/posts/recent?size=1");
  const list = await listRes.json();
  const id = list[0].id;

  const postRes = await fetch(`https://pf.kakao.com/rocket-web/web/profiles/_BdwNn/posts/${id}`);
  const post = await postRes.json();
  return post.media[0].url;
}

async function sendToSlack(imageUrl) {
  const res = await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      blocks: [
        {
          type: "image",
          image_url: imageUrl,
          alt_text: "오늘의 메뉴",
        },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`Slack webhook failed: ${res.status} ${await res.text()}`);
  }
}

(async () => {
  try {
    const imageUrl = await getMenuImageUrl();
    console.log("imageUrl:", imageUrl);
    await sendToSlack(imageUrl);
    console.log("전송 완료");
  } catch (err) {
    console.error("실패:", err);
    process.exit(1);
  }
})();
