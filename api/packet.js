export default async function handler(req, res) {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send('Missing token');
  }

  try {
    const response = await fetch(
      `https://links.tngdigital.com.my/moneypacket/${token}`,
      { redirect: 'follow' }
    );

    const finalUrl = new URL(response.url);
    const hash = finalUrl.hash;
    const params = new URLSearchParams(hash.split('?')[1]);

    const p = params.get('p');
    const v = params.get('v') || '2';

    if (!p) {
      return res.send('Invalid packet');
    }

    const deepLink = `tngdwallet://client/dl/transfer/moneyPacket/claim?p=${p}&v=${v}`;
    const fallback = `https://links.tngdigital.com.my/moneypacket/${token}`;

    res.setHeader('Content-Type', 'text/html');
    res.send(`
      <!DOCTYPE html>
      <html>
      <body>
        <h3>Opening TNG...</h3>
        <button onclick="openApp()">Open TNG</button>

        <script>
          function openApp() {
            window.location.href = "${deepLink}";
            setTimeout(() => {
              window.location.href = "${fallback}";
            }, 1500);
          }

          // auto try
          openApp();
        </script>
      </body>
      </html>
    `);

  } catch (e) {
    res.status(500).send('Error');
  }
}
