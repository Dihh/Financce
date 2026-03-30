export const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value ?? 0)

export const formatMonth = (mesStr) => {
  const [year, month] = mesStr.split('-')
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
}

export const currentMonth = () => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export const totalReceita = (receita) =>
  receita.valores.reduce((sum, v) => sum + v.valor, 0)

export const addMonths = (mesStr, n) => {
  const [y, m] = mesStr.split('-').map(Number)
  const date = new Date(y, m - 1 + n)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}
