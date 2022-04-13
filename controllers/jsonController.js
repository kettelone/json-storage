const File = require('../models/request')
const baseUrl = '/json-storage/'

const addFile = async (req) => {
  try {
    let { url, body } = req
    url = url.substring(baseUrl.length)
    //проверить есть ли файл с таким url
    let exist = await File.find({ url })
    if (exist.length === 0) {
      const file = new File({ url, body })
      await file.save()
      return file.body
    } else {
      await File.deleteOne({ url })
      const file = new File({ url, body })
      await file.save()
      return file.body
    }
  } catch (e) {
    console.log(e)
  }
}

const getFile = async (req) => {
  try {
    let { url } = req
    url = url.substring(baseUrl.length)

    //проверить есть ли файл с таким url
    let file = await File.find({ url })
    if (file.length === 0) {
      return 'There is no such url in json storage'
    }
    return file[0].body
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  addFile,
  getFile,
}
