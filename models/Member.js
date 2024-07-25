// Importa il modulo Mongoose per la gestione del database MongoDB
import { Schema, model } from "mongoose";

// Definizione dello schema dell'utente utilizzando il costruttore Schema di Mongoose
const memberSchema = new Schema(
  {
    // Campo 'name' di tipo String obbligatorio (required)
    name: {
      type: String,
     required: true,
    },
    surname: {
      type: String,
     required: true,
    },
    title: {
      type: String,
     required: true,
    },
    area: {
      type: String,
     required: true,
    },
    image: {
      type: String,
     required: true,
    },
    // Campo 'email' di tipo String obbligatorio e unico (unique)
    email: {
      type: String,
      required: true,
      unique: true,
    }
  },
  {
    // Opzioni dello schema:
    collection: "member", // Specifica il nome della collezione nel database MongoDB
    timestamps: true,
  }
);

// Esporta il modello 'Member' utilizzando il metodo model di Mongoose
// Il modello 'Member' sarà basato sullo schema 'memberSchema' definito sopra
const Member = model("Member", memberSchema);

export default Member;