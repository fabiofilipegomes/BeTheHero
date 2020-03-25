const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async Get(request, response) {
        const { id } = request.params;
        const ong = await connection('ongs')
            .where('id', id)
            .select('*')
            .first();
    
        return response.json(ong);
    },

    async GetAll(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async Create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
        const id = crypto.randomBytes(6).toString('HEX');
    
        await connection('ongs').insert({
            id,
            name, 
            email, 
            whatsapp,
            city,
            uf,
        });
    
        return response.json({ id });
    }
};