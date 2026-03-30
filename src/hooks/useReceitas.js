import { useState } from 'react'

const KEY = 'financce_receitas'
const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2)

export function useReceitas() {
  const [receitas, setReceitas] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) ?? []
    } catch {
      return []
    }
  })

  const persist = (next) => {
    setReceitas(next)
    localStorage.setItem(KEY, JSON.stringify(next))
  }

  return {
    receitas,
    addReceita: (data) =>
      persist([...receitas, { id: genId(), ...data, valores: [] }]),
    updateReceita: (id, data) =>
      persist(receitas.map(r => r.id === id ? { ...r, ...data } : r)),
    deleteReceita: (id) =>
      persist(receitas.filter(r => r.id !== id)),
    addValor: (receitaId, data) =>
      persist(receitas.map(r =>
        r.id === receitaId
          ? { ...r, valores: [...r.valores, { id: genId(), ...data, valor: Number(data.valor) }] }
          : r
      )),
    deleteValor: (receitaId, valorId) =>
      persist(receitas.map(r =>
        r.id === receitaId
          ? { ...r, valores: r.valores.filter(v => v.id !== valorId) }
          : r
      )),
  }
}
