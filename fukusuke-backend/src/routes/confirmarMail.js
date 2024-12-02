const sendGridMail = require('@sendgrid/mail');
require('dotenv').config();
// Configura tu clave de API de SendGrid
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);  // Sustituye con tu clave API
// Función para generar un código aleatorio de 6 dígitos
function generarCodigo() {
  return Math.floor(100000 + Math.random() * 900000); // Genera un número de 6 dígitos
}

// Función para enviar el correo con el código de verificación
async function enviarCorreo(correoDestino) {
  const codigo = generarCodigo();  // Generamos el código aleatorio
  console.log(correoDestino)
  const msg = {
    to: correoDestino,
    from: 'topyrenata21@gmail.com',  // Tu correo de envío, verificado en SendGrid
    subject: 'Código de verificación',
    text: `Tu código de verificación es: ${codigo}`,
    html: `<p>Tu código de verificación es: <strong>${codigo}</strong></p>`,
  };

  try {
    await sendGridMail.send(msg);
    console.log('Correo enviado correctamente');
    return {codigo}; // Retornamos el código
  } catch (error) {
    console.error('Error al enviar el correo:', error.response.body);
    throw new Error('No se pudo enviar el correo');
  }
}

// Exportamos la función para usarla en otros archivos
module.exports = { enviarCorreo };

