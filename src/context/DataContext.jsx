import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [datasets, setDatasets] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/data/data-2023.json').then(r => r.json()),
      fetch('/data/data-2024.json').then(r => r.json())
    ]).then(([y2023, y2024]) => {
      setDatasets({ '2023': y2023, '2024': y2024 })
      setLoading(false)
    })
  }, [])

  const value = useMemo(() => ({ datasets, loading }), [datasets, loading])
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData(year = '2023') {
  const ctx = useContext(DataContext)
  return {
    loading: ctx.loading,
    data: ctx.datasets[year],
    datasets: ctx.datasets
  }
}
