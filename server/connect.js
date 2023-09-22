import mysql, {createConnection} from "mysql";


export const db =createConnection({
    host:"localhost",
    user:"root",
    password:"tAS2221L!",
    database:"famconnect"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});