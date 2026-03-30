import { useState } from 'react'

export default function ReceitaForm({ receita, onSave, onBack }) {
  const [nome, setNome] = useState(receita?.nome ?? '')
  const [descricao, setDescricao] = useState(receita?.descricao ?? '')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!nome.trim()) return
    onSave({ nome: nome.trim(), descricao: descricao.trim() })
  }

  const isEditing = !!receita

  return (
    <div className="page">
      <header className="header">
        <button className="btn-icon" onClick={onBack} aria-label="Voltar">‹</button>
        <span className="header-title">{isEditing ? 'Editar Receita' : 'Nova Receita'}</span>
        <span />
      </header>

      <main className="content">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="nome">Nome *</label>
            <input
              id="nome"
              className="form-input"
              type="text"
              placeholder="Ex: Salário, Freelance, Aluguel..."
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              className="form-input form-textarea"
              placeholder="Descrição opcional..."
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              rows={3}
            />
          </div>

          <button className="btn btn-primary btn-full" type="submit">
            {isEditing ? 'Salvar alterações' : 'Criar receita'}
          </button>
        </form>
      </main>
    </div>
  )
}
