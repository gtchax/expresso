import { Shot, validateShot } from './shot.model'
import pick from 'lodash.pick'

export const shotController = {
  async createShot(req, res) {
    try {
      const { error } = validateShot(req.body)
      if (error) {
        return res.status(400).send(error.details[0].context.label)
      }
      let shot = new Shot(
        pick(req.body, ['title', 'description', 'draft', 'image', 'author'])
      )
      await shot.save()


      res.status(201).send(shot)
    } catch (err) {
      res.status(400).send(err)
    }
  },
  async getShots(req, res) {
    try {
      const result = await Shot.find({}).sort('createdAt')
      res.status(200).send(result)
    } catch (err) {
      res.status(400).send(err)
    }
  },
  async getShot(req, res) {
    const shot = await Shot.findById(req.params.id)
    if (!shot) {
      return res.status(400).send('Shot not found')
    }
    res.status(200).send(shot)
  },
  async updateShot(req, res) {
    const shot = await Shot.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.status(200).send(shot)
  },
  async deleteShot(req, res) {
    const shot = await Shot.deleteOne({ _id: req.params.id })
    res.status(200).send(shot)
  }
}


