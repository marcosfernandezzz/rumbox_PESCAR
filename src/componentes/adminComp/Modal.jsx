const Modal = ({ open, onClose, children, size = "default" }) => {
  if (!open) return null

  const getSizeClasses = () => {
    switch (size) {
      case "large":
        return "max-w-6xl w-full mx-4"
      case "xlarge":
        return "max-w-7xl w-full mx-4"
      case "fullscreen":
        return "max-w-[95vw] max-h-[95vh] w-full h-full mx-4"
      default:
        return "max-w-lg w-full mx-4"
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300" onClick={onClose} />

      {/* Modal Content */}
      <div className={`relative bg-white rounded-lg shadow-xl ${getSizeClasses()} max-h-[90vh] overflow-hidden`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 text-2xl font-bold"
        >
          ×
        </button>

        {/* Content */}
        <div className="overflow-y-auto max-h-[90vh]">{children}</div>
      </div>
    </div>
  )
}

export default Modal
