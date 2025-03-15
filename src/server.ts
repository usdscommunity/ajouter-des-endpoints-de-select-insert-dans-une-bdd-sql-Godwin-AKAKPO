import express, {Request, Response} from 'express';
import { sql_db_pool_promise } from './mysql';

interface Users {
    nom: string;
    prenom: string;
}

const appExpress = express()
appExpress.use(express.json());
//Implémentation de la fonctionnalité de lecture depuis la base de données usds_tp2_bd'
appExpress.get('/api/users', async(req : Request, res: Response) => {
    try{
        const sqlRequest : string = "SELECT * FROM `users`";
        const users  = await sql_db_pool_promise.execute(sqlRequest);
        res.status(200).json(users);
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Error retrieving users", error: err});
    }
})

//Implémentation de la fonctionnalité d'écriture dans la base de données usds_tp2_bd'
appExpress.post('/api/users', async(req : Request, res: Response) =>{
    try {
        const user : Users = req.body as Users
        if (!user.nom || !user.prenom) {
            res.status(400).json({message:"Le nom et le prenom sont requis"});
            return;
        }
        const sqlRequest = "INSERT INTO `users` (nom,prenom) values (?,?)";
        const [result] = await sql_db_pool_promise.execute(sqlRequest, [user.nom, user.prenom]);

        res.status(200).json({message: "User creating", user: user, result:result});
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error creating user',
        });
    }
});

appExpress.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});