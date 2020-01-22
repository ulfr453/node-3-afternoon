module.exports = {


    getAll: (req, res, next) => {
        const db = req.app.get('db');

        console.log(true)
        db.read_products()
            .then(products => {
                console.log(products)
                res.status(200).send(products)})
        .catch( err => {
            res.status(500).send({errorMessage: "bummer dood"});
            console.log(err)
        } );

    },
    
    getOne: (req, res, next) => {
        const db = req.app.get('db');
        const {id} = req.params;

        db.read_product(id)
        .then( products => res.status(200).send(products))
        .catch( err => {
            res.status(500).send(err);
            console.log(err)
        });

    },
    

    create: (req, res, next) => {
        const db = req.app.get('db');
        const {name, description, price, image_url} = req.body;

        db.create_product(name, description, price, image_url)
        .then(() => res.sendStatus(200))
        .catch( err => {
            res.status(500).send({errorMessage: 'pelotas!!'});
            console.log(err)
        })
    },

    update: (req, res, next) => {
        const { params, query} = req

        const db = req.app.get('db');

        db.update_product(params.id, query.desc)
        .then(() => res.sendStatus(200) )
        .catch(err => {
            res.status(500).send(err)
            console.log(err)
        })
    },

    delete: (req, res, next) => {
        const db = req.app.get('db');
        const {id} = req.params;

        db.delete_product(id)
        .then(() => res.sendStatus(200) )
        .catch( err => {
            res.status(500).send(err)
            console.log(err)
        })
    }


}