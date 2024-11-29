const oracledb = require('oracledb');

// Configuración de la conexión a la base de datos Oracle
const config = {
  user: 'usuario',
  password: 'contraseña',
  connectString: 'host:puerto/SID' // Ejemplo: 'localhost:1521/XE'
};

// Función para establecer la conexión
async function connectToOracle() {
  let connection;
  try {
    // Intentar conectarse a la base de datos Oracle
    connection = await oracledb.getConnection(config);
    console.log("Conexión a Oracle establecida con éxito!");
    return connection; // Retorna la conexión para ser utilizada en consultas posteriores
  } catch (err) {
    console.error("Error al conectar con Oracle: ", err);
    throw err;
  }
}

// Función para cerrar la conexión
async function closeConnection(connection) {
  try {
    if (connection) {
      await connection.close();
      console.log("Conexión cerrada correctamente");
    }
  } catch (err) {
    console.error("Error al cerrar la conexión: ", err);
    throw err;
  }
}

// Exportamos las funciones
module.exports = {
  connectToOracle,
  closeConnection
};
