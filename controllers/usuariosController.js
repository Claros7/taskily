// Importar el modelo
const Usuario = require("../models/Usuario");
const passwordValidator = require('password-validator');

// Crear passwordvalidte
var schema = new passwordValidator();

schema
.is().min(8)                                    
.is().max(100)                                 
.has().uppercase()                             
.has().lowercase()                              
.has().digits(2)                                
.has().not().spaces()                          
.is().not().oneOf(['Passw0rd', 'Password123']); 

exports.formularioCrearCuenta = (req, res, next) => {
  res.render("registrarse", { layout: "auth" });
};

exports.crearCuenta = async (req, res, next) => {
  // Obtener los datos de la nueva cuenta
  // Obtener por destructuring
  const { fullname, email, password, password2 } = req.body;
  if (password== password2 ){
    
    if(schema.validate(password)){
  // Intentar crear el usuario
  try {
    // Crear el usuario
    await Usuario.create({
      fullname,
      email,
      password,
    });
    

    // Redireccionar el usuario al formulario de inicio de sesión
    res.redirect("iniciar_sesion");
  } catch (error) {
    res.render("registrarse", { layout: "auth", error: error.message });
  }
}
  }else{
    res.send("claves incorrectas")
  }
};

exports.formularioIniciarSesion = (req, res, next) => {
  // Verificar si existe algún mensaje
  const messages = res.locals.messages;

  res.render("iniciar_sesion", { layout: "auth", messages });
};

exports.formularioRestablecerPassword = (req, res, next) => {
  res.render("restablecer_password", { layout: "auth" });
};
