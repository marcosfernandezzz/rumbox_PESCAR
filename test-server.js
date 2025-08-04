// Script para probar si el servidor está funcionando
const testServer = async () => {
  try {
    console.log('🧪 Probando servidor en http://localhost:3000...')
    
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@test.com',
        password: '123456'
      })
    })
    
    console.log('✅ Servidor responde!')
    console.log('Status:', response.status)
    
    const data = await response.json()
    console.log('Respuesta:', data)
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    console.log('💡 Asegúrate de que:')
    console.log('1. El servidor esté corriendo (npm start)')
    console.log('2. MongoDB esté instalado y corriendo')
    console.log('3. El archivo .env esté configurado')
  }
}

// Ejecutar la prueba
testServer() 