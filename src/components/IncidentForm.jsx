import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

function IncidentForm({ location, onClose, onCreated }) {
  const [categories, setCategories] = useState([])

  const [categoryId, setCategoryId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    async function carregarCategorias() {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      if (error) {
        console.error(
          'Erro ao carregar categorias:',
          error
        )

        return
      }

      setCategories(data)
    }

    carregarCategorias()
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()

    setMessage(null)

    if (!categoryId || !title.trim()) {
      setMessage({
        type: 'error',
        text: 'Preencha a categoria e o título.',
      })

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
      console.error(
        'Erro ao criar ocorrência:',
        error
      )

      setMessage({
        type: 'error',
        text: 'Não foi possível registrar a ocorrência.',
      })

      return
    }

    console.log(
      'Ocorrência criada:',
      data
    )

    setMessage({
      type: 'success',
      text: 'Ocorrência registrada com sucesso!',
    })

    await onCreated()

    setTimeout(() => {
      onClose()
    }, 1200)
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        width: 350,
        background: '#fff',
        padding: 20,
        borderRadius: 10,
        boxShadow:
          '0 4px 20px rgba(0,0,0,0.2)',
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
          <label>
            Categoria
          </label>

          <br />

          <select
            value={categoryId}
            onChange={(event) =>
              setCategoryId(
                event.target.value
              )
            }
            disabled={loading}
          >
            <option value="">
              Selecione uma categoria
            </option>

            {categories.map(
              (category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.icon}{' '}
                  {category.name}
                </option>
              )
            )}
          </select>
        </div>

        <br />

        <div>
          <label>
            Título
          </label>

          <br />

          <input
            type="text"
            value={title}
            onChange={(event) =>
              setTitle(
                event.target.value
              )
            }
            placeholder="Ex: Buraco na pista"
            disabled={loading}
          />
        </div>

        <br />

        <div>
          <label>
            Descrição
          </label>

          <br />

          <textarea
            value={description}
            onChange={(event) =>
              setDescription(
                event.target.value
              )
            }
            placeholder="Descreva o problema..."
            disabled={loading}
          />
        </div>

        <br />

        {message && (
          <div
            style={{
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '6px',
              background:
                message.type === 'success'
                  ? '#dcfce7'
                  : '#fee2e2',
              color:
                message.type === 'success'
                  ? '#166534'
                  : '#991b1b',
            }}
          >
            {message.type === 'success'
              ? '✓ '
              : '× '}

            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? 'Enviando...'
            : 'Enviar ocorrência'}
        </button>

        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          style={{
            marginLeft: 10,
          }}
        >
          Cancelar
        </button>
      </form>
    </div>
  )
}

export default IncidentForm