// importar nodemailer para el envío de correos
const nodemailer = require('nodemailer');

// Función para generar un código de 6 cifras aleatorias
function generarCodigo() {
  return Math.floor(100000 + Math.random() * 900000); // Genera un número aleatorio de 6 cifras
}

// Función para validar correo y enviar el código
async function validarCorreo(correoDestino) {
  // Generar un código aleatorio de 6 cifras
  const codigo = generarCodigo();
  
  // Configurar el transportador de correo
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Usar Gmail u otro servicio de correo
    auth: {
      user: 'topyrenata21@gmail.com',       // Tu correo electrónico
      pass: 'zsjx cdch usbd lwfz'  // Tu contraseña o contraseña de aplicación
    }
  });

  // Configurar los detalles del correo
  const mailOptions = {
    from: 'topyrenata21@gmail.com',
    to: correoDestino,
    subject: 'Código de verificación',
    text: `Tu código de verificación es: ${codigo}`,
    html: `<p>Tu código de verificación es: <strong>${codigo}</strong></p>`
  };

  try {
    // Enviar el correo
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado correctamente a:', correoDestino);
    
    // Retornar el código generado para su validación posterior
    return codigo;
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw new Error('No se pudo enviar el correo');
  }
}

// Llamada de prueba
// (Puedes comentar esto o cambiarlo según cómo desees probar la función)

validarCorreo('briverosopazo@gmail.com')
  .then(codigo => {
    console.log('Código de verificación enviado:', codigo);
  })
  .catch(error => {
    console.error(error);
  });

module.exports = { validarCorreo };
