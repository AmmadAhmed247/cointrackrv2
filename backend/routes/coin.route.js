import { fetchTop100Coins, getTop5GainersCoinPaprika,getTop5LosersCoinPaprika, getTrendingCoin,getDefiTopGainers, getDexCoins, getTopBarData, getFearGreedIndex, getSinglePageData, getChartData } from "../controllers/coin.controller.js";
import express from "express"
const router=express.Router()


router.get("/",fetchTop100Coins)
router.get("/trending",getTrendingCoin)
router.get("/topgainers",getTop5GainersCoinPaprika)
router.get("/toplooser",getTop5LosersCoinPaprika)
router.get("/topdeficoins",getDefiTopGainers)
router.get("/dexcoins",getDexCoins)
router.get("/topbar",getTopBarData)
router.get("/feargreedvalue",getFearGreedIndex)
router.get("/:coinId",getSinglePageData)
router.get("/chart/:coinId",getChartData)

export default router