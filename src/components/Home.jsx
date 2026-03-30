import { useState } from 'react'
import { formatCurrency, currentMonth, formatMonth } from '../utils'

function sumMonth(items, mes) {
  return items.reduce((total, item) =>
    total + item.valores.filter(v => v.mes === mes).reduce((s, v) => s + v.valor, 0), 0
  )
}

function navigateMonth(mes, direction) {
  const [y, m] = mes.split('-').map(Number)
  const date = new Date(y, m - 1 + direction)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export default function Home({ receitas, despesas, gastos }) {
  const [mes, setMes] = useState(currentMonth())

  const totalReceitas = sumMonth(receitas, mes)
  const totalDespesas = sumMonth(despesas, mes)
  const totalGastos   = sumMonth(gastos, mes)
  const saldo = totalReceitas - totalDespesas - totalGastos
  const positivo = saldo >= 0

  return (
    <div className="page">
      <header className="header">
        <span className="header-title">💰 Financce</span>
      </header>

      <main className="content content-with-tabs">
        <div className="month-nav">
          <button className="month-nav-btn" onClick={() => setMes(m => navigateMonth(m, -1))}>‹</button>
          <span className="month-nav-label">{formatMonth(mes)}</span>
          <button className="month-nav-btn" onClick={() => setMes(m => navigateMonth(m, +1))}>›</button>
        </div>

        <div className={`saldo-card ${positivo ? 'saldo-positivo' : 'saldo-negativo'}`}>
          <span className="saldo-title">Saldo do mês</span>
          <span className="saldo-amount">{formatCurrency(saldo)}</span>
          <span className="saldo-badge">{positivo ? '↑ Positivo' : '↓ Negativo'}</span>
        </div>

        <p className="section-label">Detalhamento</p>

        <div className="card-list">
          <div className="card report-card">
            <div className="report-card-icon" style={{ background: '#dcfce7', color: '#16a34a' }}>💰</div>
            <div className="report-card-info">
              <span className="report-card-label">Receitas</span>
              <span className="report-card-count">{receitas.reduce((n, r) => n + r.valores.filter(v => v.mes === mes).length, 0)} registro(s)</span>
            </div>
            <span className="report-card-value" style={{ color: '#16a34a' }}>{formatCurrency(totalReceitas)}</span>
          </div>

          <div className="card report-card">
            <div className="report-card-icon" style={{ background: '#fee2e2', color: '#dc2626' }}>💸</div>
            <div className="report-card-info">
              <span className="report-card-label">Despesas</span>
              <span className="report-card-count">{despesas.reduce((n, r) => n + r.valores.filter(v => v.mes === mes).length, 0)} registro(s)</span>
            </div>
            <span className="report-card-value" style={{ color: '#dc2626' }}>{formatCurrency(totalDespesas)}</span>
          </div>

          <div className="card report-card">
            <div className="report-card-icon" style={{ background: '#ffedd5', color: '#ea580c' }}>🛒</div>
            <div className="report-card-info">
              <span className="report-card-label">Gastos</span>
              <span className="report-card-count">{gastos.reduce((n, r) => n + r.valores.filter(v => v.mes === mes).length, 0)} registro(s)</span>
            </div>
            <span className="report-card-value" style={{ color: '#ea580c' }}>{formatCurrency(totalGastos)}</span>
          </div>
        </div>
      </main>
    </div>
  )
}
