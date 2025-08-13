import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState('')
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const validateForm = () => {
    const newErrors = {}

    // Validación de nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres'
    }

    // Validación de email
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido'
    }

    // Validación de contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }

    // Validación de confirmación de contraseña
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
    // Limpiar error de API
    if (apiError) {
      setApiError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Iniciando handleSubmit...')
    
    if (validateForm()) {
      setIsSubmitting(true)
      setApiError('')

      try {
        // Enviar solo los datos necesarios para el registro
        const { name, email, password } = formData
        console.log('Datos a enviar:', { name, email, password: '***' })
        
        const requestBody = JSON.stringify({ name, email, password })
        console.log('Request body:', requestBody)
        
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: requestBody
        })

        console.log('Response status:', response.status)
        console.log('Response headers:', response.headers)

        const data = await response.json()
        console.log('Response data:', data)

        if (response.ok) {
          console.log('Registro exitoso:', data)
          // Si el registro incluye datos del usuario, hacer login automático
          if (data.data) {
            login(data.data)
            alert('Cuenta creada exitosamente! Has iniciado sesión automáticamente.')
            navigate('/')
          } else {
            alert('Cuenta creada exitosamente!')
            navigate('/login')
          }
        } else {
          console.log('Error en respuesta:', data)
          setApiError(data.message || 'Error al crear la cuenta')
        }
      } catch (error) {
        console.error('Error completo en registro:', error)
        console.error('Error name:', error.name)
        console.error('Error message:', error.message)
        console.error('Error stack:', error.stack)
        
        if (error.name === 'TypeError') {
          setApiError('Error de conexión. Verifica que el servidor esté corriendo.')
        } else {
          setApiError('Error de conexión. Verifica tu conexión a internet.')
        }
      } finally {
        setIsSubmitting(false)
      }
    } else {
      console.log('Validación fallida, no se envía la petición')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crea tu cuenta
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4"> {/* Added space-y-4 for input spacing */}
            <div>
              <label htmlFor="name" className="sr-only">
                Nombre completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-2 focus:ring-white focus:z-10 sm:text-sm ${
                  errors.name ? 'border-red-500 focus:border-red-500' : 'border-white focus:border-white'
                }`}
                placeholder="Nombre completo"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-2 focus:ring-white focus:z-10 sm:text-sm ${
                  errors.email ? 'border-red-500 focus:border-red-500' : 'border-white focus:border-white'
                }`}
                placeholder="Correo electrónico"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-2 focus:ring-white focus:z-10 sm:text-sm ${
                  errors.password ? 'border-red-500 focus:border-red-500' : 'border-white focus:border-white'
                }`}
                placeholder="Contraseña"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirmar contraseña
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-2 focus:ring-white focus:z-10 sm:text-sm ${
                  errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-white focus:border-white'
                }`}
                placeholder="Confirmar contraseña"
              />
            </div>
          </div>

          {/* Mensajes de error */}
          {errors.name && (
            <div className="text-red-500 text-sm mt-1">{errors.name}</div>
          )}
          {errors.email && (
            <div className="text-red-500 text-sm mt-1">{errors.email}</div>
          )}
          {errors.password && (
            <div className="text-red-500 text-sm mt-1">{errors.password}</div>
          )}
          {errors.confirmPassword && (
            <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>
          )}
          {apiError && (
            <div className="text-red-500 text-sm mt-1 text-center">{apiError}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 ${
                isSubmitting ? 'bg-cyan-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-cyan-400 hover:text-cyan-500 font-medium">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
