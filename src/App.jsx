import { useState } from 'react'
import { useReceitas } from './hooks/useReceitas'
import ReceitaList from './components/ReceitaList'
import ReceitaForm from './components/ReceitaForm'
import ReceitaDetail from './components/ReceitaDetail'
import ValorForm from './components/ValorForm'

export default function App() {
  const { receitas, addReceita, updateReceita, deleteReceita, addValor, deleteValor } = useReceitas()
  const [view, setView] = useState('list')
  const [selected, setSelected] = useState(null)

  const currentReceita = receitas.find(r => r.id === selected?.id) ?? selected

  if (view === 'receita-form') {
    return (
      <ReceitaForm
        receita={selected}
        onBack={() => {
          setView(selected ? 'detail' : 'list')
        }}
        onSave={(data) => {
          if (selected) {
            updateReceita(selected.id, data)
            setSelected({ ...selected, ...data })
            setView('detail')
          } else {
            addReceita(data)
            setView('list')
          }
        }}
      />
    )
  }

  if (view === 'detail' && currentReceita) {
    return (
      <ReceitaDetail
        receita={currentReceita}
        onBack={() => setView('list')}
        onEdit={() => setView('receita-form')}
        onDelete={(id) => {
          deleteReceita(id)
          setView('list')
        }}
        onAddValor={() => setView('valor-form')}
        onDeleteValor={deleteValor}
      />
    )
  }

  if (view === 'valor-form' && currentReceita) {
    return (
      <ValorForm
        receita={currentReceita}
        onBack={() => setView('detail')}
        onSave={(receitaId, data) => {
          addValor(receitaId, data)
          setView('detail')
        }}
      />
    )
  }

  return (
    <ReceitaList
      receitas={receitas}
      onSelect={(r) => { setSelected(r); setView('detail') }}
      onAdd={() => { setSelected(null); setView('receita-form') }}
      onDelete={deleteReceita}
    />
  )
}
