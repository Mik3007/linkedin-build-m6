import express from 'express';
import endpoints from 'express-list-endpoints';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import memberRoutes from './routes/memberRoutes.js'
import experiencesRoutes from './routes/experiencesRoutes.js'


dotenv.config();

// Importiamo il modulo express
const app = express();
// Creiamo un'applicazione Express
const server = express();

app.use(express.json());

// Connessione a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connesso'))
  .catch((err) => console.error('MongoDB: errore di connessione.', err));

// Definizione della porta su cui il server ascolterà
const PORT = process.env.PORT || 4001;

// Usa le rotte per gli utenti
app.use('/api/member', memberRoutes);
app.use('/api/experiences', experiencesRoutes)


app.listen(PORT, () => {
    console.log(`Server acceso sulla porta ${PORT}`);
    console.log("Sono disponibili i seguenti endpoints:");
    console.table(endpoints(app));
  });

