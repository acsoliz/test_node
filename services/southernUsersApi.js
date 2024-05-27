const insertUser = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

// Simula una comprobación de si el correo electrónico existe en el sistema de terceros para el hemisferio sur
const checkSouthernHemisphereEmail = (email) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(false);
    }, 1000);
  });
};
module.exports = {
  insertUser,
  checkSouthernHemisphereEmail
};
