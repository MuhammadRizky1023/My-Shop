const db = require('../models')
const Image = db.image
const fs = require('fs')
const { uploadFile, __basedir } = require('../services/upload')

exports.upload = async (req, res) => {
  const id = req.params.id
  try {
    await uploadFile(req, res)

    if (req.files == undefined) {
      return res.status(400).json({
        message: 'please upload your file',
      })
    }

    let images = req.files.map((item) => {
      const image = {}
      image.product_id = id
      image.file = item.filename
      return image
    })
    Image.bulkCreate(images)
      .then((result) => {
        res.status(200).json({
          message: 'uploaded files successfully',
        })
      })
      .catch((err) => {
        console.error(err)
        res.status(500).send({
          message: 'Uploaded files failed',
        })
      })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: err,
    })
  }
}

exports.remove = (req, res) => {
  const id = req.params.id

  Image.findByPk(id).then((data) => {
      fs.unlink(__basedir + `/storage/upload/${data.file}`, function (err) {
        if (err) {
          throw res.status(500).json({
            message: 'delete image  failed',
          })
          }
          
        Image.destroy({
          where: {
            id: id,
          }
        }) .then((num) => {
            if (num == 1) {
              res.status(200).json({
                message: 'Image was delete successfully',
              })
            } else {
              res.status(200).json({
                message: `cannot delete Image without id ${id}`,
              })
            }
          })
          .catch((err) => {
            res.status(500).json({
              message: err.message,
            })
          })
      })
    })
      .catch((err) => {
          res.status(500).json({
              message: err.message,
         })
    })
}
