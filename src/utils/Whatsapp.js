const WHATSAPP_NUMBER = "5491123797075"; // sin "+" ni espacios
const DEFAULT_MESSAGE = "Hola, quiero comprar un producto de Rumbox!!";

export function abrirWhatsApp() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;
  window.open(url, "_blank");
}