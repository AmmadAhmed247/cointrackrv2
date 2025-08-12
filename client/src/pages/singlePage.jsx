import { FaShareAlt, FaInfoCircle, FaGlobe, FaAngleDown } from "react-icons/fa"
import { ResponsiveContainer, LineChart, CartesianGrid, YAxis, Line } from "recharts"
import { Link, useParams } from "react-router-dom"
import Comment from "../components/comment.jsx"
import CustomImage from "../components/customImage.jsx"
import { useState, useMemo } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

function formatNumber(num) {
  if (num === null || num === undefined) return "N/A";

  const parsed = typeof num === "string" ? parseFloat(num.replace(/,/g, '')) : num;
  if (isNaN(parsed)) return "N/A";
  if (num >= 1_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(2) + 'T';
  } else if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + 'B';
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + 'M';
  } else {
    return num.toLocaleString();
  }
}

export default function SingleCoinPage() {
  const [interval, setinterval] = useState("1d") // Fixed initial value
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");
  const queryClient = useQueryClient();
  const { slug } = useParams()
  const coinDataQueryKey = useMemo(() => ["singlepagedata", slug], [slug]);
  const chartDataQueryKey = useMemo(() => ["chartdata", slug, interval], [slug, interval]);
  const commentsQueryKey = useMemo(() => ["comments", slug], [slug]);
  const sentimentQueryKey = useMemo(() => ["sentiment", slug], [slug]);

  const { data, isLoading, isError } = useQuery({
    queryKey: coinDataQueryKey,
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/coins/${slug}`)
      return res.data
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: !!slug,
  })

  const { data: ChartData = [], isLoading: chartLoading, isError: chartError } = useQuery({
    queryKey: chartDataQueryKey,
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/coins/chart/${slug}`, {
        params: {
          interval,
        }
      })
      return response.data;
    },
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: !!slug,

    refetchOnMount: false,
    refetchInterval: false,
  })

  const { data: comment = [], isLoading: commentLoading } = useQuery({
    queryKey: commentsQueryKey,
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/comment/${slug}`);
      return res.data;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false, 
  });

  const { data: sentimentStats, isLoading: sentimentLoading, error: sentimentError } = useQuery({
    queryKey: sentimentQueryKey,
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/sentiment/${slug}`)
      return res.data
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false, 
    retry: 1, 
  })

  const commentMutation = useMutation({
    mutationFn: async (newComment) => {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND}/api/comment/${slug}`, newComment, { withCredentials: true })
      return res.data;
    },
    onSuccess: () => {
     
      queryClient.invalidateQueries({ queryKey: commentsQueryKey })
      setCommentText("")
      setShowCommentBox(false)
      toast.success("Comment posted successfully!")
    },
    onError: (error) => {
      toast.error("Failed to post comment: " + (error.response?.data?.message || error.message))
    }
  })

  const sentimentMutation = useMutation({
    mutationFn: async (sentiment) => {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND}/api/sentiment/${slug}`, { sentiment }, { withCredentials: true })
      return res.data
    },
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: sentimentQueryKey });
      toast.success("Vote recorded successfully!")
    },
    onError: (error) => {
      toast.error("Login Required " || error.message)
    }
  })

  const handleVote = (sentiment) => {
    if (sentimentMutation.isLoading) {
      toast.warn('Please wait, vote in progress...');
      return;
    }
    sentimentMutation.mutate(sentiment);
  };

  const handleIntervalChange = (newInterval) => {
    if (newInterval !== interval && !chartLoading) {
      setinterval(newInterval);
    }
  };

  const [activeTab, setActiveTab] = useState("Overview")
  const tabs = ["Overview", "Markets", "News"]

  if (isLoading) return <div className='text-black text-center'>Loading data...</div>;
  if (isError) return <div className='text-red-500 text-center'>Error fetching data</div>;

  return (
    <div className='flex flex-row items h-200 gap-2'>
      <div className="flex-1 p-3  relative ">
        <div className=" sticky z-40 top-0 bg-white">
          <div className="flex top-1 sticky z-40 flex-row justify-between items-center ">
            <div className="flex flex-row items-center gap-3">
              <CustomImage src={data.image} w={32} h={32} />
              <h5 className='text-zinc-800 flex gap-2 items-center'>
                {data.name}
                <span className='text-sm text-zinc-500'>{data.symbol}</span>
                <span className='text-xs rounded-2xl bg-zinc-300 px-1'>#{data.rank}</span>
              </h5>
            </div>
            <FaShareAlt className="text-gray-600 hover:text-zinc-500 cursor-pointer" />
          </div>
          <div className="flex mt-4">
            <h6 className="flex items-center gap-5 text-black text-4xl font-semibold">
              ${data.current_price?.toLocaleString?.() || " loading.."}
              <span className={`text-lg text-green-400 ${data.price_change_percentage_24h > 0 ? "text-green-200" : "text-red-500"} `}>({data.price_change_percentage_24h.toFixed(2)}%)</span>
            </h6>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center mt-4 border border-zinc-100 rounded-xl p-4">
          <h6 className="text-zinc-600 text-sm flex items-center gap-2">
            Market cap <FaInfoCircle />
          </h6>
          <h6 className="text-zinc-800 text-base flex items-center gap-1">
            {formatNumber(data.market_cap)}
            <span className="text-sm text-green-500">
              ({data.market_cap_change_percentage_24h}%)
            </span>
          </h6>
        </div>

        <div className="flex gap-2 mt-2 h-20">
          <div className="flex-1/2 border-1 border-zinc-100 rounded-md pt-4">
            <h6 className='text-zinc-600 text-sm flex items-center justify-center gap-2'>Volume (24h) <FaInfoCircle /></h6>
            <h6 className='text-zinc-700 text-center'>{formatNumber(data.total_volume)} <span className='text-sm font-semibold text-green-400'>(3.12%)</span></h6>
          </div>
          <div className="flex-1/2 border-1 border-zinc-100 rounded-md pt-4">
            <h6 className='text-zinc-600 text-sm flex items-center justify-center gap-2'>Vol/Mkt Cap <FaInfoCircle /></h6>
            <h6 className='text-zinc-700 text-center'>{formatNumber(data.total_volume / data.market_cap)}%</h6>
          </div>
        </div>

        <div className="flex gap-2 mt-2 h-20">
          <div className="flex-1/2 border-1 border-zinc-100 rounded-md pt-4">
            <h6 className='text-zinc-600 text-sm flex items-center justify-center gap-2'>Max supply <FaInfoCircle /></h6>
            <h6 className='text-zinc-700 text-center'>{formatNumber(data.max_supply)}</h6>
          </div>
          <div className="flex-1/2 border-1 border-zinc-100 rounded-md pt-4">
            <h6 className='text-zinc-600 text-sm flex items-center justify-center gap-2'>Circulating supply <FaInfoCircle /></h6>
            <h6 className='text-zinc-700 text-center'>{formatNumber(data.circulating_supply)} {data.symbol}</h6>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <h4 className='text-black text-sm'>Website</h4>
          <div className="flex gap-4">
            <Link className='bg-zinc-200 text-xs px-2 rounded-xl flex items-center gap-2'><FaGlobe /> Website</Link>
            <Link className='bg-zinc-200 text-xs px-2 rounded-xl flex items-center gap-2'>Whitepaper <FaAngleDown /></Link>
          </div>
        </div>

        <div className="mt-8 border-zinc-100 border-1 rounded-xl border-b-4 px-2 py-3 flex justify-between">
          <div>
            <h4 className='text-black text-sm'>All-time high</h4>
            <span className='text-xs text-black'>{data.ath_date}</span>
          </div>
          <div>
            <h4 className='text-black text-sm'>${data.ath?.toLocaleString?.() || "loading.."}</h4>
            <span className={` ${data.ath_change_percentage > 0 ? "text-green-500" : "text-red-500"}  text-sm `}>{data?.ath_change_percentage.toLocaleString?.() || "Loading.."}%</span>
          </div>
        </div>

        <div className="border-zinc-100 border-1 rounded-xl border-t-4 px-2 py-3 flex justify-between">
          <div>
            <h4 className='text-black text-sm'>All-time low</h4>
            <span className='text-xs text-right text-black'>{data.atl_date}</span>
          </div>
          <div>
            <h4 className='text-black text-right text-sm'>${data?.atl?.toLocaleString?.() || "loading..."}</h4>
            <span className='text-green-500  text-xs'>{data.atl_change_percentage}%</span>
          </div>
        </div>
      </div>

      <div className="flex-3 relative">
        <div className="sticky top-0 z-40 bg-white border border-zinc-100 rounded-md flex justify-between items-center px-2 py-3">
          <div className="flex gap-8">
            {tabs.map((tab, i) => (
              <button key={i} onClick={() => setActiveTab(tab)} className={`pb-2 border-b-2 text-sm ${activeTab === tab ? "border-blue-500 text-blue-600" : "border-transparent text-zinc-500"}`}>
                {tab}
              </button>
            ))}
          </div>
          <button className='bg-blue-600 text-white active:scale-105 transition-all text-sm px-3 py-1 rounded-2xl'>Buy BTC</button>
        </div>

        <div className="flex justify-between mt-2">
          <div className="flex gap-4 bg-zinc-100 rounded-2xl px-2 h-10 items-center">
            <button className='text-black text-sm'>Price</button>
            <span className='text-black font-bold'>|</span>
            <button className='text-black text-sm'>Market cap</button>
          </div>
          <div className="flex gap-2 mt-2">
            {[
              { label: "1m", value: "1m" },
              { label: "5m", value: "5m" },
              { label: "15m", value: "15m" },
              { label: "30m", value: "30m" },
              { label: "1h", value: "1h" },
              { label: "1d", value: "1d" },
            ].map(({ label, value }, idx) => (
              <button
                key={idx}
                onClick={() => handleIntervalChange(value)}
                disabled={chartLoading}
                className={`bg-zinc-100 active:scale-105 transition-all text-black text-sm rounded-2xl px-3 h-8 ${
                  interval === value ? 'bg-blue-100 border border-blue-300' : ''
                } ${chartLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-120 mt-10">
          {chartLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-500">Loading chart data...</div>
            </div>
          ) : chartError ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-red-500">Error loading chart data</div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ChartData} key={`${slug}-${interval}`}>
                <CartesianGrid stroke="#e5e7eb" strokeDasharray="2" vertical={false} />
                <YAxis tick={{ fill: 'black', fontSize: 12 }} domain={['dataMin - 10', 'dataMax + 10']} orientation="right" />
                <Line type="monotone" dataKey="y" stroke="#4ade80" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="flex-1 hidden xl:block">
        <div className="border border-zinc-100 rounded-xl px-2 py-3">
          <h1 className='text-black flex gap-2 items-center'>Community sentiment <span className='text-zinc-600 text-xs'>{sentimentStats?.total || 0}</span></h1>
          <div className="flex justify-between mt-2">
            <div className="group flex items-center gap-2">
              <div className="h-2 w-24 bg-green-500 rounded-full" />
              <span className="text-green-600 text-sm font-medium">{sentimentLoading ? "..." : `${sentimentStats?.bullish || 0} Bullish`}</span>
            </div>
            <div className="group flex items-center gap-2">
              <div className="h-2 w-24 bg-red-500 rounded-full" />
              <span className="text-red-600 text-sm font-medium">{sentimentLoading ? "..." : `${sentimentStats?.bearish || 0} Bearish`}</span>
            </div>
          </div>
          <div className="flex gap-4 mt-2">
            <button onClick={() => handleVote("bullish")} disabled={sentimentMutation.isLoading} className='text-green-500 px-2 py-1 border active:scale-105 transition-all border-green-500 rounded-xl flex-1 disabled:opacity-50'>{sentimentMutation.isLoading ? 'Voting...' : 'Bullish'}</button>
            <button onClick={() => handleVote("bearish")} disabled={sentimentMutation.isLoading} className='text-red-500 px-2 py-1 border active:scale-105 transition-all border-red-500 rounded-xl flex-1 disabled:opacity-50'>{sentimentMutation.isLoading ? 'Voting...' : 'Bearish'}</button>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {comment.map(comments => (
            <Comment key={comments._id} username={comments.user.username} avatar="/bitcoin.png" createdAt={comments.createdAt} text={comments.description} />
          ))}
        </div>

        <div className="relative">
          <button
            className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg"
            onClick={() => setShowCommentBox(prev => !prev)}
          >
            Comment
          </button>

          {showCommentBox && (
            <div className="fixed bottom-20 right-4 z-50 flex flex-col bg-white border border-zinc-200 rounded-xl w-96 shadow-lg p-4 h-fit">
              <h4 className="text-black font-medium text-sm mb-2">Post a comment</h4>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!commentText.trim()) return;
                  commentMutation.mutate({ description: commentText });
                }}
                className="flex flex-col gap-2"
              >
                <textarea
                  placeholder="Write your comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="border border-zinc-300 rounded-lg px-2 py-1 text-sm resize-none text-black"
                  rows={4}
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white text-xs px-4 py-1 rounded-lg self-end disabled:opacity-50"
                  disabled={commentMutation.isLoading}
                >
                  {commentMutation.isLoading ? "Posting..." : "Post"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}