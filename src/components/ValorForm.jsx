import { useState } from 'react'
import { currentMonth } from '../utils'

export default function ValorForm({ item, config, onSave, onBack }) {
  const [mes, setMes] = useState(currentMonth())
  const [valor, setValor] = useState('')
  const [observacao, setObservacao] = useState('')

  const colorVars = {
    '--primary': config.cor,
    '--primary-hover': config.corHover,
    '--primary-light': config.corLight,
    '--primary-shadow': config.corShadow,
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!mes || !valor || Number(valor) <= 0) return
    onSave(item.id, { mes, valor, observacao: observacao.trim() })
  }

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
            <label className="form-label" htmlFor="mes">Mês *</label>
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

          <button className="btn btn-primary btn-full" type="submit">
            Salvar valor
          </button>
        </form>
      </main>
    </div>
  )
}
