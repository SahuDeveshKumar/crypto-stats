const axios = require('axios');
const CryptoDB = require('../models/cryptoSchema');
const dotenv = require('dotenv');

dotenv.config();

const fetchData = async () => {
  try {
    const coinIds = ['bitcoin', 'matic-network', 'ethereum'];
    const url = `${process.env.GECKO_URL}/coins/markets`;
    const params = {
      vs_currency: 'usd',
      ids: coinIds.join(','),
      price_change_percentage: '24h'
    };

    const response = await axios.get(url, { params });

    if (response.status === 200) {
      const data = response.data;

      const cryptoDocuments = data.map((coin) => ({
        coinId: coin.id,
        price: coin.current_price,
        marketCap: coin.market_cap,
        change: coin.price_change_percentage_24h
      }));

      await CryptoDB.insertMany(cryptoDocuments);
      console.log(`Data Fetched at ${new Date().toISOString()}`);
    } else {
      console.error('Failed to fetch data from CoinGecko:', response.status);
    }
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error.message);
  }
};

module.exports = fetchData;
