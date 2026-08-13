import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

function IncidentForm({ location, onClose, onCreated }) {
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function carregarCategorias() {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      if (error) {
        console.error('Erro ao carregar categorias:', error)
        return
      }

      setCategories(data)
    }

    carregarCategorias()
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()

    if (!categoryId || !title.trim()) {
      alert('Preencha a categoria e o título.')
      return
    }

    setLoading(true)

    const { data, error } = await supabase
      .from('incidents')
      .insert({
        category_id: Number(categoryId),
        title: title.trim(),
        description: description.trim(),
        latitude: location.latitude,
        longitude: location.longitude,
        status: 'active',
      })
      .select()
      .single()

    setLoading(false)

    if (error) {
      console.error('Erro ao criar ocorrência:', error)
      alert('Não foi possível registrar a ocorrência.')
      return
    }

    console.log('Ocorrência criada:', data)

    onCreated()
    onClose()
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        width: 350,
        background: 'white',
        padding: 20,
        borderRadius: 10,
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        zIndex: 1000,
      }}
    >
      <h2>Relatar problema</h2>

      <p>
        Localização:
        <br />
        {location.latitude.toFixed(6)},
        {' '}
        {location.longitude.toFixed(6)}
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Categoria</label>

          <select
            value={categoryId}
            onChange={(event) =>
              setCategoryId(event.target.value)
            }
          >
            <option value="">
              Selecione uma categoria
            </option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.icon} {category.name}
              </option>
            ))}
          </select>
        </div>

        <br />

        <div>
          <label>Título</label>

          <input
            type="text"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="Ex: Buraco na pista"
          />
        </div>

        <br />

        <div>
          <label>Descrição</label>

          <textarea
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            placeholder="Descreva o problema..."
          />
        </div>

        <br />

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar ocorrência'}
        </button>

        <button
          type="button"
          onClick={onClose}
          style={{ marginLeft: 10 }}
        >
          Cancelar
        </button>
      </form>
    </div>
  )
}

export default IncidentForm