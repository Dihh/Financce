import { formatCurrency, formatMonth, totalReceita } from '../utils'

export default function ReceitaDetail({ receita, onBack, onEdit, onDelete, onAddValor, onDeleteValor }) {
  const total = totalReceita(receita)
  const sorted = [...receita.valores].sort((a, b) => b.mes.localeCompare(a.mes))

  const handleDelete = () => {
    if (confirm(`Excluir a receita "${receita.nome}" e todos os seus registros?`)) {
      onDelete(receita.id)
    }
  }

  const handleDeleteValor = (v) => {
    if (confirm(`Excluir o registro de ${formatMonth(v.mes)}?`)) {
      onDeleteValor(receita.id, v.id)
    }
  }

  return (
    <div className="page">
      <header className="header">
        <button className="btn-icon" onClick={onBack} aria-label="Voltar">‹</button>
        <span className="header-title">{receita.nome}</span>
        <div className="header-actions">
          <button className="btn-icon" onClick={onEdit} aria-label="Editar">✏️</button>
          <button className="btn-icon" onClick={handleDelete} aria-label="Excluir">🗑️</button>
        </div>
      </header>

      <main className="content">
        {receita.descricao && (
          <p className="detail-desc">{receita.descricao}</p>
        )}

        <div className="summary-card">
          <div className="summary-item">
            <span className="summary-label">Total recebido</span>
            <span className="summary-value">{formatCurrency(total)}</span>
          </div>
          <div className="summary-divider" />
          <div className="summary-item">
            <span className="summary-label">Registros</span>
            <span className="summary-value">{receita.valores.length}</span>
          </div>
        </div>

        <p className="section-label">Valores por mês</p>

        {sorted.length === 0 ? (
          <div className="empty-state empty-state-sm">
            <div className="empty-icon">📅</div>
            <p>Nenhum valor registrado ainda.<br />Toque em + para adicionar.</p>
          </div>
        ) : (
          <div className="card-list">
            {sorted.map(v => (
              <div key={v.id} className="card valor-card">
                <div className="card-body">
                  <div className="card-info">
                    <span className="card-title">{formatMonth(v.mes)}</span>
                    {v.observacao && <span className="card-desc">{v.observacao}</span>}
                  </div>
                  <div className="card-right">
                    <span className="card-value">{formatCurrency(v.valor)}</span>
                    <button
                      className="btn-icon btn-danger-ghost"
                      onClick={() => handleDeleteValor(v)}
                      aria-label="Excluir valor"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <button className="fab" onClick={onAddValor} aria-label="Adicionar valor">+</button>
    </div>
  )
}
