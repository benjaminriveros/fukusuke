const { connectToOracle, closeConnection } = require('../../dataRepository/db/oracleConnection');

// Ejemplo de servicio que obtiene usuarios desde Oracle
async function getUsers() {
  let connection;
  try {
    // Conectarse a la base de datos
    connection = await connectToOracle();
    
    // Realizar una consulta SQL en Oracle
    const result = await connection.execute(
      `SELECT id, username, email FROM users`, // Reemplaza con tu consulta
      [], // Parámetros de la consulta, si es necesario
      { outFormat: oracledb.OUT_FORMAT_OBJECT } // Formato de salida (JSON)
    );

    return result.rows; // Devuelve los usuarios
  } catch (err) {
    console.error("Error al obtener usuarios: ", err);
    throw err;
  } finally {
    // Siempre cierra la conexión al finalizar
    if (connection) {
      await closeConnection(connection);
    }
  }
}

module.exports = { getUsers };
