const Greenhouse = require('../models/Greenhouse')
const greenhouseValidation = require('../validation/greenhouseValidation')


const getAllGreenhouses = async (req, res) => {
    const greenhouses = await Greenhouse.find({})
    return res.json({
        greenhouses
    })
}


const getGreenhouse = async (req, res) => {
    const greenhouseName = req.params.name;

    let greenhouse
    
    try {
        greenhouse = await Greenhouse.findOne({ name: greenhouseName })
    } catch (e) {
        return res.status(400).json({
            message: e.message,
            status_code: 400
        })
    }

    if (!greenhouse) {
        return res.status(404).json({
            message: 'Not found',
            status_code: 404
        })
    }

    return res.json({ greenhouse })
}


const createGreenhouse = async (req, res) => {
    const isGreenhouseValid = greenhouseValidation(req.body);

    if (!isGreenhouseValid) {
        return res.status(400).json({
            message: 'Bad request',
            status_code: 400
        })
    }

    const { name, temperature } = req.body;

    if (!name) {
        return res.status(400).json({
            message: 'Name is mandatory',
            status_code: 400
        })
    }
    
    if (!temperature) {
        return res.status(400).json({
            message: 'Temperature is mandatory',
            status_code: 400
        })
    }

    const isNameUsed = await Greenhouse.findOne({ name })

    if (isNameUsed) {
        return res.status(400).json({
            message: 'Greenhouse already exists',
            status_code: 400
        })
    }

    const greenhouse = new Greenhouse({
        name,
        temperature,
        temperature_wish: temperature
    })

    let saved

    try {
        saved = await greenhouse.save()
    } catch (e) {
        return res.status(500).json({
            message: 'Greenhouse cannot be added',
            status_code: 500
        })
    }

    return res.status(201).json({ greenhouse: saved })
}


const updateGreenhouse = async (req, res) => {
    const name = req.params.name
    let greenhouse

    try {
        greenhouse = await Greenhouse.findOne({ name })
    } catch (e) {
        return res.status(404).json({
            message: 'Greenhouse not found',
            status_code: 404
        })
    }

    if (!greenhouse) {
       const isGreenhouseValid = greenhouseValidation(req.body);

        if (!isGreenhouseValid) {
            return res.status(400).json({
                message: 'Bad request',
                status_code: 400
            })
        }

        const { name, temperature } = req.body;

        if (!name) {
            return res.status(400).json({
                message: 'Name is mandatory',
                status_code: 400
            })
        }
        
        if (!temperature) {
            return res.status(400).json({
                message: 'Temperature is mandatory',
                status_code: 400
            })
        }

        const isNameUsed = await Greenhouse.findOne({ name })

        if (isNameUsed) {
            return res.status(400).json({
                message: 'Greenhouse already exists',
                status_code: 400
            })
        }

        const greenhouse = new Greenhouse({
            name,
            temperature,
            temperature_wish: temperature
        })

        let saved

        try {
            saved = await greenhouse.save()
        } catch (e) {
            return res.status(500).json({
                message: 'Greenhouse cannot be added',
                status_code: 500
            })
        }

        return res.status(201).json({ greenhouse: saved })
    }
    
    greenhouse.name = req.body.name || greenhouse.name
    greenhouse.temperature = req.body.temperature || greenhouse.temperature
    greenhouse.temperature_wish = req.body.temperature_wish || greenhouse.temperature_wish

    let updatedGreenhouse
    
    try {
		updatedGreenhouse = await greenhouse.save()
		
	} catch (err) {
		return res.status(500).json({
			message: 'Update greenhouse failed',
			status_code: 500
		})
	}
	
	return res.status(200).json({ greenhouse: updatedGreenhouse })
}

const deleteGreenhouse = async (req, res) => {
    const name = req.params.name
    let greenhouse

    try {
        greenhouse = await Greenhouse.findOne({ name })
    } catch (e) {
        return res.status(404).json({
            message: 'Greenhouse not found',
            status_code: 404
        })
    }

    if (!greenhouse) {
        return res.status(404).json({
            message: 'Greenhouse not found',
            status_code: 404
        })
    }

    let removed

    try {
        removed = await greenhouse.remove()
    } catch (e) {
        return res.status(500).json({
            message: 'Greenhouse delete failed',
            status_code: 500
        })
    }

    return res.status(200).json({ greenhouse: removed })
}


module.exports = {
    getAllGreenhouses,
    getGreenhouse,
    createGreenhouse,
    updateGreenhouse,
    deleteGreenhouse
}
