import { useState } from 'react'
import { currentMonth, addMonths } from '../utils'

export default function ValorForm({ item, config, onSave, onBack }) {
  const [mes, setMes] = useState(currentMonth())
  const [valor, setValor] = useState('')
  const [observacao, setObservacao] = useState('')
  const [repetir, setRepetir] = useState(false)
  const [numMeses, setNumMeses] = useState('2')

  const colorVars = {
    '--primary': config.cor,
    '--primary-hover': config.corHover,
    '--primary-light': config.corLight,
    '--primary-shadow': config.corShadow,
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!mes || !valor || Number(valor) <= 0) return
    const base = { valor, observacao: observacao.trim() }
    const n = Math.min(60, Math.max(2, Number(numMeses) || 2))
    const valores = repetir
      ? Array.from({ length: n }, (_, i) => ({ ...base, mes: addMonths(mes, i) }))
      : [{ ...base, mes }]
    onSave(item.id, valores)
  }

  const total = repetir ? Math.min(60, Math.max(2, Number(numMeses) || 2)) : 1

  return (
    <div className="page" style={colorVars}>
      <header className="header">
        <button className="btn-icon" onClick={onBack} aria-label="Voltar">‹</button>
        <span className="header-title">Adicionar Valor</span>
        <span />
      </header>

      <main className="content">
        <div className="entity-badge">
          <span>{config.label}:</span>
          <strong>{item.nome}</strong>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="mes">Mês inicial *</label>
            <input
              id="mes"
              className="form-input"
              type="month"
              value={mes}
              onChange={e => setMes(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="valor">Valor (R$) *</label>
            <input
              id="valor"
              className="form-input"
              type="number"
              placeholder="0,00"
              value={valor}
              onChange={e => setValor(e.target.value)}
              min="0.01"
              step="0.01"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="observacao">Observação</label>
            <input
              id="observacao"
              className="form-input"
              type="text"
              placeholder="Opcional..."
              value={observacao}
              onChange={e => setObservacao(e.target.value)}
            />
          </div>

          <label className="toggle-row">
            <div className="toggle-text">
              <span className="toggle-label">Repetir nos próximos meses</span>
              <span className="toggle-desc">Cria o mesmo valor em meses consecutivos</span>
            </div>
            <div
              className={`toggle-switch ${repetir ? 'toggle-on' : ''}`}
              onClick={() => setRepetir(r => !r)}
              role="switch"
              aria-checked={repetir}
            />
          </label>

          {repetir && (
            <div className="form-group">
              <label className="form-label" htmlFor="numMeses">Repetir por quantos meses?</label>
              <input
                id="numMeses"
                className="form-input"
                type="number"
                value={numMeses}
                onChange={e => setNumMeses(e.target.value)}
                min="2"
                max="60"
              />
            </div>
          )}

          <button className="btn btn-primary btn-full" type="submit">
            {total > 1 ? `Salvar ${total} valores` : 'Salvar valor'}
          </button>
        </form>
      </main>
    </div>
  )
}
