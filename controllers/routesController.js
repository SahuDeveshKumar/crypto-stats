const cryptoDB = require('../models/cryptoSchema')

const getStats = async (req, res) => {
   const { coin } = req.query;
   try {
      const data = await cryptoDB.findOne({ coinId: coin })
         .sort({ fetchedAt: -1 });

      if (!data) {
         return res.status(404).json({
            error: `No data found for coin: ${coin}`
         });
      }

      const response = {
         price: data.price,
         marketCap: data.marketCap,
         "24hChange": data.change
      };

      return res.json(response);
   } catch (error) {
      console.error('Error fetching stats:', error.message);
      return res.status(500).json({
         error: 'Internal server error'
      });
   }
};


const getDeviation = async (req, res) => {
   const { coin } = req.query;

   try {

      const records = await cryptoDB.find({ coinId: coin })
         .sort({ fetchedAt: -1 })
         .limit(100);

      if (records.length === 0) {
         return res.status(404).json({
            error: `No data found for coin: ${coin}`
         });
      }

      const prices = records.map(record => record.price);
      const mean = prices.reduce((acc, val) => acc + val, 0) / prices.length;

      const standardDeviation = Math.sqrt(
         prices.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / prices.length
      );

      const deviation = parseFloat(standardDeviation.toFixed(2));

      return res.json({ deviation });
   } catch (error) {
      console.error('Error calculating standard deviation:', error.message);
      return res.status(500).json({
         error: 'Internal server error'
      });
   }
};


module.exports = { getStats, getDeviation };