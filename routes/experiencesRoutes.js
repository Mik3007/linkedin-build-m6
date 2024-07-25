import express from "express"; // Importa il pacchetto Express
import Experiences from "../models/Experiences.js"; // Importa il modello experiences
import Member from "../models/Member.js";

const router = express.Router(); // Crea un router Express

router.get("/:memberId/experiences", async (req, res) => {
    try {
      const experience = await Experiences.find({}); // Trova tutti gli utenti nel database
      res.json(experience); // Risponde con i dati degli utenti in formato JSON
    } catch (err) {
      res.status(500).json({ message: err.message }); // Gestisce errori e risponde con un messaggio di errore
    }
  });

  // Rotta per ottenere un singola esperienza
  router.get("/me/experiences", async (req, res) => {
    try {
      const experience = await Member.findById(req.params.id); // Trova un utente per ID
      if (!experience) {
        return res.status(404).json({ message: "Utente non trovato" }); // Se l'utente non esiste, risponde con un errore 404
      }
      res.json(experience); // Risponde con i dati dell'utente in formato JSON
    } catch (err) {
      res.status(500).json({ message: err.message }); // Gestisce errori e risponde con un messaggio di errore
    }
  });

  // Rotta per creare un nuovo utente
  router.post("/member/:id/experience", async (req, res) => {
    const experience = new Experiences(req.body); // Crea un nuovo utente con i dati dal corpo della richiesta
    try {
      const newExperiences = await experience.save(); // Salva il nuovo utente nel database
      res.status(201).json(newExperiences); // Risponde con i dati del nuovo utente e uno status 201 (Created)
    } catch (err) {
      res.status(400).json({ message: err.message }); // Gestisce errori di validazione e risponde con un messaggio di errore
    }
  });
// Rotta per aggiornare un utente
  router.patch("/:expId", async (req, res) => {
    try {
        const updatedExperiences = await Experiences.findByIdAndUpdate(req.params.expId, req.body, {
          new: true, // Restituisce il documento aggiornato anziché quello vecchio
        });
        res.json(updatedExperiences); // Risponde con i dati dell'utente aggiornato in formato JSON
        console.log("ID ricevuto:", req.params.expId);
        console.log("Corpo della richiesta:", req.body);  
      } catch (err) {
        res.status(400).json({ message: err.message }); // Gestisce errori di validazione e risponde con un messaggio di errore
      }
    });

  router.delete("/:expId", async (req, res) => {
    try {
      await Experiences.findByIdAndDelete(req.params.expId); // Elimina un utente per ID
      res.json({ message: "Utente Eliminato" }); // Risponde con un messaggio di conferma
    } catch (err) {
      res.status(500).json({ message: err.message }); // Gestisce errori e risponde con un messaggio di errore
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      let query = {};
      // Cerca i blog post nel database usando il filtro (se presente)
      const experiences = await Experiences.findById(req.params.id);
      // Invia la lista dei blog post come risposta JSON
      res.json(experiences);
    } catch (err) {
      // In caso di errore, invia una risposta di errore
      res.status(500).json({ message: err.message });
    }
  });

  export default router; // Esporta il router per l'utilizzo in altri file
