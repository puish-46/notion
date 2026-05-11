import { useState } from 'react'
import { Search as SearchIcon, Loader2 } from 'lucide-react'
import axios from 'axios'
import {
  inputClass,
  cardClass,
  headingClass,
  bodyText,
  mutedText,
  emptyStateClass,
  errorClass,
} from '../styles/common'

function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setError('')
    setResults(null)
    try {
      const res = await axios.get(`/search?q=${encodeURIComponent(query.trim())}`, {
        withCredentials: true,
      })
      setResults(res.data.payload ?? res.data)
    } catch (err) {
      setError(err?.response?.data?.message || 'Search failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <h1 className={`${headingClass} mb-6`}>Search</h1>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex items-center gap-3 mb-8">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#80868b]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, boards, tasks…"
            className={`${inputClass} pl-9`}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="bg-[#1a73e8] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#1558b0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
        </button>
      </form>

      {/* Error */}
      {error && <div className={`${errorClass} mb-6`}>{error}</div>}

      {/* Results */}
      {results !== null && (
        Array.isArray(results) && results.length === 0 ? (
          <p className={emptyStateClass}>No results found for "{query}"</p>
        ) : (
          <div className="flex flex-col gap-3">
            {(Array.isArray(results) ? results : []).map((item, i) => (
              <div key={item._id ?? i} className={`${cardClass} text-left`}>
                <p className="text-xs text-[#1a73e8] font-semibold uppercase tracking-widest mb-1">
                  {item.type ?? 'Result'}
                </p>
                <h3 className="text-sm font-medium text-[#202124]">{item.title ?? item.name}</h3>
                {item.description && (
                  <p className={`${bodyText} mt-1 line-clamp-2`}>{item.description}</p>
                )}
              </div>
            ))}
          </div>
        )
      )}

      {/* Idle state */}
      {results === null && !loading && !error && (
        <p className={emptyStateClass}>Type something and hit Search</p>
      )}
    </div>
  )
}

export default Search