const TABS = [
  { id: 'inicio',   label: 'Início',   icon: '🏠', cor: '#0284c7' },
  { id: 'receitas', label: 'Receitas', icon: '💰', cor: '#16a34a' },
  { id: 'despesas', label: 'Despesas', icon: '💸', cor: '#dc2626' },
  { id: 'gastos',   label: 'Gastos',   icon: '🛒', cor: '#ea580c' },
]

export default function TabBar({ tab, onTabChange }) {
  return (
    <nav className="tab-bar">
      {TABS.map(t => (
        <button
          key={t.id}
          className={`tab-btn ${tab === t.id ? 'tab-btn-active' : ''}`}
          style={tab === t.id ? { color: t.cor } : {}}
          onClick={() => onTabChange(t.id)}
        >
          <span className="tab-icon">{t.icon}</span>
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  )
}
