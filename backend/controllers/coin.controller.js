import axios from "axios"



export const fetchTop100Coins = async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: true,
        price_change_percentage: '1h,24h,7d'
      }
    });

    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json({ error: "Error while fetching data of top 100 coins", message: error.message });
  }
}




export const getTrendingCoin = async (req, res) => {
  try {

    const coinsResponse = await axios.get('https://api.coinpaprika.com/v1/coins');
    const tickersResponse = await axios.get('https://api.coinpaprika.com/v1/tickers?limit=100');
    const trendingCoins = tickersResponse.data
      .filter(coin => coin.quotes.USD && coin.quotes.USD.percent_change_24h !== null)
      .sort((a, b) => b.quotes.USD.percent_change_24h - a.quotes.USD.percent_change_24h)
      .slice(0, 5);

    const formattedCoins = trendingCoins.map(coin => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol.toLowerCase(),
      image: `https://static.coinpaprika.com/coin/${coin.id}/logo.png`,
      current_price: coin.quotes.USD.price,
      price_change_percentage_24h: coin.quotes.USD.percent_change_24h,
      market_cap_rank: coin.rank,
      volume_24h: coin.quotes.USD.volume_24h,

    }));

    res.status(200).json({ coins: formattedCoins });
  } catch (error) {

    res.status(500).json({
      error: "Error while fetching trending coins from CoinPaprika",
      message: error.message,
    });
  }
};



export const getTop5LosersCoinPaprika = async (req, res) => {
  try {
    const response = await axios.get('https://api.coinpaprika.com/v1/tickers');

    const topLosers = response.data
      .filter(coin => coin.quotes?.USD?.percent_change_24h < 0)
      .sort((a, b) => a.quotes.USD.percent_change_24h - b.quotes.USD.percent_change_24h)
      .slice(0, 5); 

    const formattedCoins = topLosers.map((coin, index) => ({
      rank: index + 1,
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: `https://static.coinpaprika.com/coin/${coin.id}/logo.png`,
      current_price: coin.quotes.USD.price,
      price_change_percentage_24h: coin.quotes.USD.percent_change_24h,
      price_change_24h: coin.quotes.USD.price * (coin.quotes.USD.percent_change_24h / 100),
      market_cap: coin.quotes.USD.market_cap,
      volume_24h: coin.quotes.USD.volume_24h
    }));

    res.status(200).json({
      success: true,
      coins: formattedCoins,
      timestamp: new Date().toISOString(),
      source: 'CoinPaprika'
    });
  } catch (error) {
    console.error('CoinPaprika Losers Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Error fetching top losers from CoinPaprika',
      message: error.message
    });
  }
};







export const getTop5GainersCoinPaprika = async (req, res) => {
  try {
    const response = await axios.get('https://api.coinpaprika.com/v1/tickers');

    const topGainers = response.data
      .filter(coin => coin.quotes?.USD?.percent_change_24h > 0)
      .sort((a, b) => b.quotes.USD.percent_change_24h - a.quotes.USD.percent_change_24h)
      .slice(0, 5);

    const formattedCoins = topGainers.map((coin, index) => ({
      rank: index + 1,
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: `https://static.coinpaprika.com/coin/${coin.id}/logo.png`,
      current_price: coin.quotes.USD.price,
      price_change_percentage_24h: coin.quotes.USD.percent_change_24h,
      price_change_24h: coin.quotes.USD.price * (coin.quotes.USD.percent_change_24h / 100),
      market_cap: coin.quotes.USD.market_cap,
      volume_24h: coin.quotes.USD.volume_24h
    }));

    res.status(200).json({
      success: true,
      coins: formattedCoins,
      timestamp: new Date().toISOString(),
      source: 'CoinPaprika'
    });
  } catch (error) {
    console.error('CoinPaprika Gainers API Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Error fetching from CoinPaprika',
      message: error.message
    });
  }
};



export const getDefiTopGainers = async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'percent_change_24h_desc',
        category: "decentralized-finance-defi",
        per_page: 5,
        page: 1,
        sparkline: true,
        price_change_percentage: '24h'
      }
    });

    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json({ error: "Error while fetching data of top 100 coins", message: error.message });
  }
}


export const getDexCoins = async (req, res) => {
  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
      params: {
        vs_currency: 'usd',
        category: 'decentralized-exchange',
        order: 'volume_desc',
        per_page: 5,
        page: 1,
        price_change_percentage: "24h",
      },
    })
    const formatedData = response.data.map((coin, index) => ({
      rank: index + 1,
      name: coin.name,
      symbol: coin.symbol.toLowerCase(),
      price_change: coin.price_change_percentage_24h_in_currency,
      price: coin.current_price,
      logo: coin.image
    }))
    res.status(200).json({ coins: formatedData })
  } catch (error) {
    res.status(500).json({ message: "Error while fetcing dex pairs", error: error.message })
  }
}

export const getTopBarData = async (req, res) => {
  try {
    const response = await axios.get("https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest", {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY,
      }
    })
    const data = response.data.data;
    const result = {
      totalCryptocurrencies: data.active_cryptocurrencies,
      totalExchanges: data.active_exchanges,
      marketCap: data.quote.USD.total_market_cap,
      btcDominance: data.btc_dominance,
      ethDominance: data.eth_dominance
    };
    res.status(200).json(result)

  } catch (error) {
    res.status(500).json({ message: "error while fetcing data of top bar", error: error.message })
  }
}



export const getFearGreedIndex = async (req, res) => {
  try {
    const response = await axios.get("https://api.alternative.me/fng/");
    const data = response.data.data[0];

    const result = {
      value: data.value,
      value_classification: data.value_classification,

    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error while fetching Fear & Greed Index",
      error: error.message,
    });
  }
};


export const getSinglePageData = async (req, res) => {
  const { coinId } = req.params;
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,

      }
    })
    const coin = response.data
    const result = {
      name: coin.name,
      rank: coin.market_cap_rank,
      image: coin.image.large,
      symbol: coin.symbol.toUpperCase(),
      current_price: coin.market_data.current_price.usd,
      price_change_percentage_24h: coin.market_data.price_change_percentage_24h,
      ath: coin.market_data.ath.usd,
      atl: coin.market_data.atl.usd,
      circulating_supply: coin.market_data.circulating_supply,
      max_supply: coin.market_data.max_supply,
      market_cap: coin.market_data.market_cap.usd,
      total_volume: coin.market_data.total_volume.usd,

      ath: coin.market_data.ath.usd,
      ath_change_percentage: coin.market_data.ath_change_percentage.usd,
      ath_date: coin.market_data.ath_date.usd.split("T")[0],
      atl: coin.market_data.atl.usd,
      atl_change_percentage: coin.market_data.atl_change_percentage.usd,
      atl_date: coin.market_data.atl_date.usd.split("T")[0],
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: error.message, message: "error while fetching single page data" })
    console.error(error.message);

  }
}

const coinMap = {
  bitcoin: "BTCUSDT",
  ethereum: "ETHUSDT",
  tether: "USDTUSDT", // Usually you don’t chart stablecoin→USDT pairs
  binancecoin: "BNBUSDT",
  solana: "SOLUSDT",
  xrp: "XRPUSDT",
  cardano: "ADAUSDT",
  dogecoin: "DOGEUSDT",
  tron: "TRXUSDT",
  polkadot: "DOTUSDT",
  polygon: "MATICUSDT",
  litecoin: "LTCUSDT",
  shiba_inu: "SHIBUSDT",
  avalanche: "AVAXUSDT",
  dai: "DAIUSDT", // stable, same as tether note
  uniswap: "UNIUSDT",
  chainlink: "LINKUSDT",
  cosmos: "ATOMUSDT",
  stellar: "XLMUSDT",
  monero: "XMRUSDT",
  okb: "OKBUSDT",
  ethereum_classic: "ETCUSDT",
  filecoin: "FILUSDT",
  aptos: "APTUSDT",
  internet_computer: "ICPUSDT",
  lido_dao: "LDOUSDT",
  toncoin: "TONUSDT",
  arbitrum: "ARBUSDT",
  vechain: "VETUSDT",
  maker: "MKRUSDT",
  near_protocol: "NEARUSDT",
  optimism: "OPUSDT",
};


export const getChartData = async (req, res) => {
  const coinId = req.params.coinId.toLowerCase();
  const symbol = coinMap[coinId] || coinId.toUpperCase() + "USDT";

  const intervalMap = {
    "1m": "1m",
    "5m": "5m", 
    "15m": "15m",
    "30m": "30m",
    "1h": "1h",
    "4h": "4h", 
    "1d": "1d",
  };

  const interval = intervalMap[req.query.interval] || "1d";

  try {
    const response = await axios.get("https://api.binance.com/api/v3/klines", {
      params: {
        symbol,
        interval,
        limit: 100,
      },
    });

    const formatData = response.data.map(candle => ({
      x: candle[0], // timestamp
      y: parseFloat(candle[4]), // close price
    }));

    res.json(formatData);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Error while fetching Chart Data from Binance",
      error: error.message,
    });
  }
};



export const addToWatchList = async (req, res) => {
  const { userId, coinSymbol } = req.body
  try {

  } catch (error) {

  }
}