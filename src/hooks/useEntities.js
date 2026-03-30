import { useState } from 'react'

const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2)

export function useEntities(storageKey) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) ?? []
    } catch {
      return []
    }
  })

  const persist = (next) => {
    setItems(next)
    localStorage.setItem(storageKey, JSON.stringify(next))
  }

  return {
    items,
    addItem: (data) =>
      persist([...items, { id: genId(), ...data, valores: [] }]),
    updateItem: (id, data) =>
      persist(items.map(i => i.id === id ? { ...i, ...data } : i)),
    deleteItem: (id) =>
      persist(items.filter(i => i.id !== id)),
    addValor: (itemId, data) =>
      persist(items.map(i =>
        i.id === itemId
          ? { ...i, valores: [...i.valores, { id: genId(), ...data, valor: Number(data.valor) }] }
          : i
      )),
    deleteValor: (itemId, valorId) =>
      persist(items.map(i =>
        i.id === itemId
          ? { ...i, valores: i.valores.filter(v => v.id !== valorId) }
          : i
      )),
  }
}
