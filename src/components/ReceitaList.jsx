import { formatCurrency, totalReceita } from '../utils'

export default function ReceitaList({ receitas, onSelect, onAdd, onDelete }) {
  const handleDelete = (e, receita) => {
    e.stopPropagation()
    if (confirm(`Excluir a receita "${receita.nome}"?`)) onDelete(receita.id)
  }

  return (
    <div className="page">
      <header className="header">
        <span className="header-title">💰 Financce</span>
      </header>

      <main className="content">
        {receitas.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h2>Nenhuma receita cadastrada</h2>
            <p>Toque no botão + para adicionar sua primeira fonte de receita.</p>
          </div>
        ) : (
          <div className="card-list">
            <p className="section-label">Fontes de receita</p>
            {receitas.map(r => (
              <div key={r.id} className="card card-clickable" onClick={() => onSelect(r)}>
                <div className="card-body">
                  <div className="card-info">
                    <span className="card-title">{r.nome}</span>
                    {r.descricao && <span className="card-desc">{r.descricao}</span>}
                    <span className="card-meta">{r.valores.length} registro{r.valores.length !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="card-right">
                    <span className="card-value">{formatCurrency(totalReceita(r))}</span>
                    <span className="card-arrow">›</span>
                  </div>
                </div>
                <button
                  className="btn-icon btn-danger-ghost"
                  onClick={(e) => handleDelete(e, r)}
                  aria-label="Excluir"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <button className="fab" onClick={onAdd} aria-label="Adicionar receita">+</button>
    </div>
  )
}
