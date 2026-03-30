import { formatCurrency, totalReceita } from '../utils'

export default function EntityList({ items, config, tab, onTabChange, onSelect, onAdd, onDelete }) {
  const colorVars = {
    '--primary': config.cor,
    '--primary-hover': config.corHover,
    '--primary-light': config.corLight,
    '--primary-shadow': config.corShadow,
  }

  const handleDelete = (e, item) => {
    e.stopPropagation()
    if (confirm(`Excluir "${item.nome}"?`)) onDelete(item.id)
  }

  return (
    <div className="page" style={colorVars}>
      <header className="header">
        <span className="header-title">💰 Financce</span>
      </header>

      <main className="content content-with-tabs">
        {items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">{config.emptyEmoji}</div>
            <h2>Nenhuma {config.label.toLowerCase()} cadastrada</h2>
            <p>Toque em + para adicionar sua primeira {config.label.toLowerCase()}.</p>
          </div>
        ) : (
          <div className="card-list">
            <p className="section-label">{config.labelPlural}</p>
            {items.map(item => (
              <div key={item.id} className="card card-clickable" onClick={() => onSelect(item)}>
                <div className="card-body">
                  <div className="card-info">
                    <span className="card-title">{item.nome}</span>
                    {item.descricao && <span className="card-desc">{item.descricao}</span>}
                    <span className="card-meta">{item.valores.length} registro{item.valores.length !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="card-right">
                    <span className="card-value">{formatCurrency(totalReceita(item))}</span>
                    <span className="card-arrow">›</span>
                  </div>
                </div>
                <button
                  className="btn-icon btn-danger-ghost"
                  onClick={(e) => handleDelete(e, item)}
                  aria-label="Excluir"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <button className="fab fab-with-tabs" onClick={onAdd} aria-label={`Adicionar ${config.label}`}>+</button>

      <nav className="tab-bar">
        <button
          className={`tab-btn ${tab === 'receitas' ? 'tab-btn-active' : ''}`}
          style={tab === 'receitas' ? { color: '#16a34a' } : {}}
          onClick={() => onTabChange('receitas')}
        >
          <span className="tab-icon">💰</span>
          <span>Receitas</span>
        </button>
        <button
          className={`tab-btn ${tab === 'despesas' ? 'tab-btn-active' : ''}`}
          style={tab === 'despesas' ? { color: '#dc2626' } : {}}
          onClick={() => onTabChange('despesas')}
        >
          <span className="tab-icon">💸</span>
          <span>Despesas</span>
        </button>
      </nav>
    </div>
  )
}
