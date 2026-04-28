export default async function handler(req, res) {
  try {
    const { accessToken, type } = req.body;

    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbzrLBcj7VKEjF5yGHJT22C8SNtg_q3mJV1bH1adxomCswKpfu4aEeLxgaBedFANVVhl/exec',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken,
          type,
        }),
      },
    );

    const data = await response.json();

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
