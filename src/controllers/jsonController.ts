import {File} from '../models/request'
import {Request} from '../models/interfaces'


const addFile = async (req: Request): Promise< object | undefined > => {
  try {
    let { url, body } = req
    url = url.substring(1)

    if (!url) {
      return {message:'Please specify your desired route'}
    }
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

const getFile = async (req: Request): Promise< object | undefined> => {
  try {
    let { url } = req
    url = url.substring(1)

    //проверить есть ли файл с таким url
    let file = await File.find({ url })
    if (file.length === 0) {
      return { message: 'There is no such url in json storage' }
    }
    return file[0].body
  } catch (e) {
    console.log(e)
  }
}

export {
  addFile,
  getFile,
}
