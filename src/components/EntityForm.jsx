import { useState } from 'react'

export default function EntityForm({ item, config, onSave, onBack }) {
  const [nome, setNome] = useState(item?.nome ?? '')
  const [descricao, setDescricao] = useState(item?.descricao ?? '')

  const colorVars = {
    '--primary': config.cor,
    '--primary-hover': config.corHover,
    '--primary-light': config.corLight,
    '--primary-shadow': config.corShadow,
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!nome.trim()) return
    onSave({ nome: nome.trim(), descricao: descricao.trim() })
  }

  const isEditing = !!item

  return (
    <div className="page" style={colorVars}>
      <header className="header">
        <button className="btn-icon" onClick={onBack} aria-label="Voltar">‹</button>
        <span className="header-title">{isEditing ? `Editar ${config.label}` : `Nova ${config.label}`}</span>
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
              placeholder={config.placeholder}
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
            {isEditing ? 'Salvar alterações' : `Criar ${config.label.toLowerCase()}`}
          </button>
        </form>
      </main>
    </div>
  )
}
