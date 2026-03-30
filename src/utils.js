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
