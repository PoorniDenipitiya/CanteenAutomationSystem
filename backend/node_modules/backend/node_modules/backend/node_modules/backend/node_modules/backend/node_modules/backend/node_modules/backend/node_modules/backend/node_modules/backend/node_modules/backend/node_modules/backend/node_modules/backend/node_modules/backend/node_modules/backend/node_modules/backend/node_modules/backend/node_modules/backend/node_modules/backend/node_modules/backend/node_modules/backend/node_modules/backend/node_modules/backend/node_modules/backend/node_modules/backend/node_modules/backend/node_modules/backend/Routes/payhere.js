const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// Use your merchant secret here (never expose to frontend)
const merchant_secret = "MjkwNzExODQ2OTQyOTczNDMzOTI3MTg3MzQ1MDAxNjYzOTkzNjcw";

router.post('/hash', (req, res) => {
  const { merchant_id, order_id, amount, currency } = req.body;
  if (!merchant_id || !order_id || !amount || !currency) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const formattedAmount = Number(amount).toFixed(2);
  const hash = crypto.createHash('md5')
    .update(
      merchant_id +
      order_id +
      formattedAmount +
      currency +
      crypto.createHash('md5').update(merchant_secret).digest('hex').toUpperCase()
    )
    .digest('hex')
    .toUpperCase();
  res.json({ hash });
});

module.exports = router;