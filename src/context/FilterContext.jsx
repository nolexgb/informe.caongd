import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const defaultFilters = {
  year: '2023',
  territory: 'andalucia',
  province: '',
  country: '',
  ods: '',
  funder: '',
  organization: ''
}

const FilterContext = createContext(null)

export function FilterProvider({ children }) {
  const [params, setParams] = useSearchParams()
  const [filters, setFilters] = useState(defaultFilters)

  useEffect(() => {
    const next = { ...defaultFilters }
    Object.keys(defaultFilters).forEach((key) => {
      const value = params.get(key)
      if (value !== null) next[key] = value
    })
    setFilters(next)
  }, [params])

  const setFilter = (key, value) => {
    const next = new URLSearchParams(params)
    if (!value) next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const resetFilters = () => setParams({}, { replace: true })

  const value = useMemo(() => ({ filters, setFilter, resetFilters }), [filters])
  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

export const useFilters = () => useContext(FilterContext)
