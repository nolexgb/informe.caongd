import { Navigate, Route, Routes } from 'react-router-dom'
import { DataProvider } from './context/DataContext'
import { FilterProvider } from './context/FilterContext'
import PageShell from './layout/PageShell'
import HomePage from './pages/HomePage'
import AndaluciaPage from './pages/AndaluciaPage'
import OtrosPaisesPage from './pages/OtrosPaisesPage'
import BaseSocialPage from './pages/BaseSocialPage'
import ONGDPage from './pages/ONGDPage'
import ComparePage from './pages/ComparePage'

export default function App() {
  return (
    <DataProvider>
      <FilterProvider>
        <PageShell>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/andalucia" element={<AndaluciaPage />} />
            <Route path="/otros-paises" element={<OtrosPaisesPage />} />
            <Route path="/base-social" element={<BaseSocialPage />} />
            <Route path="/ongd" element={<ONGDPage />} />
            <Route path="/comparador" element={<ComparePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PageShell>
      </FilterProvider>
    </DataProvider>
  )
}
