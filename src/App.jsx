import { useEffect } from 'react'
import { supabase } from "./lib/supabase"

function App() {
  useEffect(() => {
    async function testeSupabase() {
      const {} = await supabase
      .from('categories')
      .select('*')

      console.log('Categorias: ', data)
      console.log('Erro:', error)
    }

    testeSupabase()
  },[])
  return (
    <div>
      <h1>Manaus Data</h1>
      <p>Teste de conexão com Supabase</p>
    </div>
  )
}

export default App
