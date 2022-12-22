const express = require("express");
const router = express.Router();
const sequelize = require("../db/connection");
const jwt = require('jsonwebtoken')

router.get("/", (req, res) => {
  try {
    sequelize.models.User.findAll()
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } catch (error) {
    res.status(400).json(error);
    console.error("Unable to connect to the database:", error);
  }
});

router.post("/", (req, res) => {
  try {
    userToSave = req.body;
    user = sequelize.models.User.build({
      username: userToSave.username,
      fullname: userToSave.fullname,
      email: userToSave.email,
      phone: userToSave.phone,
      address: userToSave.address,
      password: userToSave.password,
    });

    user
      .save()
      .then((userCreated) => {
        res.status(200).json(userCreated);
      })
      .catch((error) => {
        res.status(400).json(error);
        console.error("Unable to connect to the database:", error);
      });
  } catch (error) {
    res.status(400).json(error);
    console.error("Unable to connect to the database:", error);
  }
});

router.patch("/:id", (req, res) => {
  try {
    let userId = req.params.id;
    let newDataUser = req.body;

    sequelize.models.User.findByPk(userId)
      .then((user) => {
        user.username = newDataUser.username;
        user.fullname = newDataUser.fullname;
        user.email = newDataUser.email;
        user.phone = newDataUser.phone;
        user.address = newDataUser.address;
        user.password = newDataUser.password;

        // actualizar el user modificado
        user
          .save()
          .then((updatedUser) => {
            res.status(200).json(updatedUser);
          })
          .catch((error) => {
            res.status(400).json(error);
            console.error("Unable to connect to the database:", error);
          });
      })
      .catch((error) => {
        res.status(400).json(error);
        console.error("Unable to connect to the database:", error);
      });
  } catch (error) {
    res.status(400).json(error);
    console.error("Unable to connect to the database:", error);
  }
});

router.delete("/:id", (req, res) => {
  try {
    let userToDeleteId = req.params.id;

    sequelize.models.User.findByPk(userToDeleteId)
      .then((userToDelete) => {
        userToDelete.destroy()
        .then((deleted)=>{
          res.status(200).json(deleted);
        })
        .catch((error)=>{
          res.status(400).json(error);
          console.error("Unable to connect to the database:", error);
        })
        
      })
      .catch((error) => {
        res.status(400).json(error);
        console.error("Unable to connect to the database:", error);
      });
  } catch (error) {}
});


router.post("/login", (req, res) => {
  try {
    let userToAuthenticate = req.body;
    sequelize.models.User.findOne({ where: { username: userToAuthenticate.username } }).then((user) => {
      // Verificar contra
      if (user.password == userToAuthenticate.password ){
        // Generar token de autenticacion
        let authentication = {
          username: user.username,
          id: user.id,          
          
        };
        const token = jwt.sign(authentication, 'secret', {
            expiresIn: '2h'
        });
        res.status(200).header('Authorization', token).json({
          data: `Welcome ${user.fullname}`,
          token
        });
      } else {
        res.status(401).json({ error: 'Verify credetials'});
      }
    }).catch((error)=>{
      console.log(error);
      res.status(401).json({ error: 'Verify credetials'});
    });
    
  } catch (error) {
    res.status(400).json(error);
    console.error('Unable to connect to the database:', error);
  }
}
)
 

    
  
;

module.exports = router;
