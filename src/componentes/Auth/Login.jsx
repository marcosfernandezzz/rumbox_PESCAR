import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState('')
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const validateForm = () => {
    const newErrors = {}

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

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpiar errores cuando el usuario empiece a escribir
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
    if (validateForm()) {
      setIsSubmitting(true)
      setApiError('')

      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })

        const data = await response.json()

        if (response.ok) {
          console.log('Login exitoso:', data)
          // Usar la función login del contexto para guardar el usuario y el token
          login({ ...data.data, token: data.token }) // Pasar el token junto con los datos del usuario
          /* alert('Inicio de sesión exitoso!') */
          // Redirigir según el rol
          if (data.data.role === 'admin') {
            navigate('/admin')
          } else {
            navigate('/')
          }
        } else {
          setApiError(data.message || 'Error al iniciar sesión')
        }
      } catch (error) {
        console.error('Error en login:', error)
        setApiError('Error de conexión. Verifica tu conexión a internet.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Inicia sesión en tu cuenta
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
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
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm ${
                  errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'
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
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm ${
                  errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'
                }`}
                placeholder="Contraseña"
              />
            </div>
          </div>

          {/* Mensajes de error */}
          {errors.email && (
            <div className="text-red-500 text-sm mt-1">{errors.email}</div>
          )}
          {errors.password && (
            <div className="text-red-500 text-sm mt-1">{errors.password}</div>
          )}
          {apiError && (
            <div className="text-red-500 text-sm mt-1 text-center">{apiError}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-gray-600">
            ¿No tienes cuenta?{' '}
            <Link to="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
