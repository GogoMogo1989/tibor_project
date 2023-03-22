import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose, { Schema, model, Document } from 'mongoose';
import { serialize } from 'cookie';
import { verify } from 'jsonwebtoken';

const app = express();
const secretKey = 'mysecretkey';

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }));
app.use(bodyParser.json({ limit: '500mb' }));

// MongoDB kapcsolódás
const url = 'mongodb+srv://GogoMogo1989:12345@cluster0.v457sky.mongodb.net/Base64?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
console.log('A MongoDB adatbázishoz sikeresen kapcsolódva!');
})
.catch((err) => {
console.log('Hiba a MongoDB adatbázis kapcsolat során:', err);
});

// Adat sémája
interface IData extends Document {
user: Schema.Types.ObjectId;
file: string;
}

const dataSchema: Schema = new mongoose.Schema({
user: {
type: mongoose.Schema.Types.ObjectId,
ref: 'User',
required: true
},
file: {
type: String,
required: true,
validate: {
validator: function(v: string) {
return `/^data:[a-z]+\/[a-z]+;base64,/`.test(v);
},
message: 'A fájl nem base64 kódolt.'
}
}
});

// Adat modellje
const DataModel = model<IData>('Data', dataSchema);

//Authentikáció
function authenticateToken(req: Request, res: Response, next: NextFunction) {
try {
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];
if (!token) throw new Error('Nem található token!');
const decodedToken = verify(token, secretKey);
req.user = decodedToken.user;
next();
} catch (err) {
console.error(err);
return res.status(401).json({ message: 'Nem vagy bejelentkezve!' });
}
}

// API végpontok

app.post('/api/data', authenticateToken, (req: Request, res: Response) => {
    if (!req.body.file || !req.body.user._id) {
    res.status(400).send('Nincs fájl vagy felhasználó azonosító az adatokban!');
    return;
    }
    
    const data = new DataModel({
    user: req.body.user._id,
    file: req.body.file,
    });
    
    data.save().then(() => {
    console.log('Az adatok mentése sikeres volt!');
    res.send('Adatok sikeresen fogadva és mentve a szerveren.');
    }).catch((err) => {
    console.log('Hiba az adatok mentésekor:', err);
    res.status(500).send('Hiba az adatok mentésekor!');
    });
    });
    
    interface IUser extends Document {
    email: string;
    password: string;
    }
    
    const userSchema: Schema = new mongoose.Schema({
    email: String,
    password: String,
    });
    
    const User = model<IUser>('User', userSchema);
    
    app.post('/signup', (req: Request, res: Response) => {
    
    
    
    
