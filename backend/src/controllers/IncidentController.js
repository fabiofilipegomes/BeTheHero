const connection = require('../database/connection');

module.exports = {

    async Get(request, response) {
        const { id } = request.params;        

        const incident = await connection('incidents')
            .where('id', id)
            .select('*')
            .first();
    
        return response.json(incident);
    },

    async GetAll(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();
        
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
    
        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },

    async GetByOngId(request, response) {
        const { ong_id } = request.params;
        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');
    
        return response.json(incidents);
    },

    async Create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;
    
        const result = await connection('incidents').insert({
            ong_id,
            title,
            description,
            value
        });
    
        const id = result[0];

        return response.json({ id });
    },

    async Delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        if(incident.ong_id != ong_id){
            return response.status(401).json({ error: "Operation not permitted" });
        }
        
        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};