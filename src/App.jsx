import { useState } from 'react'
import { useEntities } from './hooks/useEntities'
import EntityList from './components/EntityList'
import EntityForm from './components/EntityForm'
import EntityDetail from './components/EntityDetail'
import ValorForm from './components/ValorForm'

const CONFIGS = {
  receitas: {
    label: 'Receita',
    labelPlural: 'Receitas',
    emptyEmoji: '📋',
    placeholder: 'Ex: Salário, Freelance, Aluguel...',
    cor: '#16a34a',
    corHover: '#15803d',
    corLight: '#dcfce7',
    corShadow: 'rgba(22, 163, 74, 0.4)',
    storageKey: 'financce_receitas',
  },
  despesas: {
    label: 'Despesa',
    labelPlural: 'Despesas',
    emptyEmoji: '🧾',
    placeholder: 'Ex: Aluguel, Internet, Academia...',
    cor: '#dc2626',
    corHover: '#b91c1c',
    corLight: '#fee2e2',
    corShadow: 'rgba(220, 38, 38, 0.4)',
    storageKey: 'financce_despesas',
  },
}

export default function App() {
  const receitas = useEntities('financce_receitas')
  const despesas = useEntities('financce_despesas')

  const [tab, setTab] = useState('receitas')
  const [view, setView] = useState('list')
  const [selected, setSelected] = useState(null)

  const config = CONFIGS[tab]
  const store = tab === 'receitas' ? receitas : despesas
  const currentItem = store.items.find(i => i.id === selected?.id) ?? selected

  const switchTab = (newTab) => {
    setTab(newTab)
    setSelected(null)
    setView('list')
  }

  if (view === 'entity-form') {
    return (
      <EntityForm
        item={selected}
        config={config}
        onBack={() => setView(selected ? 'detail' : 'list')}
        onSave={(data) => {
          if (selected) {
            store.updateItem(selected.id, data)
            setSelected({ ...selected, ...data })
            setView('detail')
          } else {
            store.addItem(data)
            setView('list')
          }
        }}
      />
    )
  }

  if (view === 'detail' && currentItem) {
    return (
      <EntityDetail
        item={currentItem}
        config={config}
        onBack={() => setView('list')}
        onEdit={() => setView('entity-form')}
        onDelete={(id) => {
          store.deleteItem(id)
          setView('list')
        }}
        onAddValor={() => setView('valor-form')}
        onDeleteValor={store.deleteValor}
      />
    )
  }

  if (view === 'valor-form' && currentItem) {
    return (
      <ValorForm
        item={currentItem}
        config={config}
        onBack={() => setView('detail')}
        onSave={(itemId, data) => {
          store.addValor(itemId, data)
          setView('detail')
        }}
      />
    )
  }

  return (
    <EntityList
      items={store.items}
      config={config}
      tab={tab}
      onTabChange={switchTab}
      onSelect={(item) => { setSelected(item); setView('detail') }}
      onAdd={() => { setSelected(null); setView('entity-form') }}
      onDelete={store.deleteItem}
    />
  )
}
