const {
  CLOUDFLARE_ACCOUNT_ID,
  CLOUDFLARE_D1_ID,
  CLOUDFLARE_TOKEN,
  SEND_NOTIFICATION_URL,
} = process.env

const res = await fetch(
  `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/d1/database/${CLOUDFLARE_D1_ID}/query`,
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_TOKEN}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sql: 'SELECT * FROM users WHERE name IS NOT NULL ORDER BY id',
    }),
  }
).then((r) => r.json())

const attendees = res.result[0].results

for (const attendee of attendees) {
  const res = await fetch(SEND_NOTIFICATION_URL!, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email: attendee.email,
      name: attendee.name,
    }),
  })
  if (!res.ok) {
    console.warn(
      `Failed for attendee ${attendee.name} (${
        attendee.email
      }): ${await res.text()}`
    )
  } else {
    console.log('Succeeded for ', attendee.name, attendee.email)
  }
}

export {}
