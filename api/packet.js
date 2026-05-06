export default function handler(req, res) {
  const { token } = req.query;

  const link = `https://links.tngdigital.com.my/moneypacket/${token}`;

  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <html>
      <body>
        <h3>Opening TNG...</h3>
        <script>
          window.location.href = "${link}";
        </script>
        <a href="${link}">Click here</a>
      </body>
    </html>
  `);
}
