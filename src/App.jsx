import { useState, useEffect } from 'react'
import { useEntities } from './hooks/useEntities'
import Home from './components/Home'
import TabBar from './components/TabBar'
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
  },
  gastos: {
    label: 'Gasto',
    labelPlural: 'Gastos',
    emptyEmoji: '🛒',
    placeholder: 'Ex: Supermercado, Farmácia, Lazer...',
    cor: '#ea580c',
    corHover: '#c2410c',
    corLight: '#ffedd5',
    corShadow: 'rgba(234, 88, 12, 0.4)',
  },
}

const INITIAL_NAV = { tab: 'inicio', view: 'list', selectedId: null }

export default function App() {
  const receitas = useEntities('financce_receitas')
  const despesas = useEntities('financce_despesas')
  const gastos   = useEntities('financce_gastos')

  const [nav, setNav] = useState(INITIAL_NAV)

  // Inicializa a entrada do histórico
  useEffect(() => {
    history.replaceState(INITIAL_NAV, '')
  }, [])

  // Botão voltar do browser
  useEffect(() => {
    const onPop = (e) => {
      if (e.state) setNav(e.state)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const go = (view, tab = nav.tab, selectedId = null) => {
    const next = { view, tab, selectedId }
    setNav(next)
    history.pushState(next, '')
  }

  const { tab, view, selectedId } = nav
  const stores = { receitas, despesas, gastos }
  const config = CONFIGS[tab]
  const store  = stores[tab]
  const currentItem = store?.items.find(i => i.id === selectedId) ?? null

  if (view === 'entity-form') {
    return (
      <EntityForm
        item={currentItem}
        config={config}
        onBack={() => selectedId ? go('detail', tab, selectedId) : go('list', tab)}
        onSave={(data) => {
          if (selectedId) {
            store.updateItem(selectedId, data)
            go('detail', tab, selectedId)
          } else {
            store.addItem(data)
            go('list', tab)
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
        onBack={() => go('list', tab)}
        onEdit={() => go('entity-form', tab, selectedId)}
        onDelete={(id) => { store.deleteItem(id); go('list', tab) }}
        onAddValor={() => go('valor-form', tab, selectedId)}
        onDeleteValor={store.deleteValor}
      />
    )
  }

  if (view === 'valor-form' && currentItem) {
    return (
      <ValorForm
        item={currentItem}
        config={config}
        onBack={() => go('detail', tab, selectedId)}
        onSave={(itemId, valores) => {
          store.addValores(itemId, valores)
          go('detail', tab, selectedId)
        }}
      />
    )
  }

  return (
    <>
      {tab === 'inicio' ? (
        <Home
          receitas={receitas.items}
          despesas={despesas.items}
          gastos={gastos.items}
        />
      ) : (
        <EntityList
          items={store.items}
          config={config}
          onSelect={(item) => go('detail', tab, item.id)}
          onAdd={() => go('entity-form', tab)}
          onDelete={store.deleteItem}
        />
      )}
      <TabBar tab={tab} onTabChange={(newTab) => go('list', newTab)} />
    </>
  )
}
