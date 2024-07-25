import express from "express"; // Importa il pacchetto Express
import Member from "../models/Member.js";

const router = express.Router(); // Crea un router Express

router.get("/profile", async (req, res) => {
    try {
      const members = await Member.find({}); // Trova tutti gli utenti nel database
      res.json(members); // Risponde con i dati degli utenti in formato JSON
    } catch (err) {
      res.status(500).json({ message: err.message }); // Gestisce errori e risponde con un messaggio di errore
    }
  });

  // Rotta per ottenere un singolo utente
  router.get("/me", async (req, res) => {
    try {
      const member = await Member.findById(req.params.id); // Trova un utente per ID
      if (!member) {
        return res.status(404).json({ message: "Utente non trovato" }); // Se l'utente non esiste, risponde con un errore 404
      }
      res.json(member); // Risponde con i dati dell'utente in formato JSON
    } catch (err) {
      res.status(500).json({ message: err.message }); // Gestisce errori e risponde con un messaggio di errore
    }
  });

  // Rotta per creare un nuovo utente
  router.post("/profile", async (req, res) => {
    console.log("Headers:", req.headers);
  console.log("Received body:", req.body);
  console.log("Content-Type:", req.get('Content-Type'));
    const member = new Member(req.body); // Crea un nuovo utente con i dati dal corpo della richiesta
    try {
      const newMember = await member.save(); // Salva il nuovo utente nel database
      res.status(201).json(newMember); // Risponde con i dati del nuovo utente e uno status 201 (Created)
    } catch (err) {
      res.status(400).json({ message: err.message }); // Gestisce errori di validazione e risponde con un messaggio di errore
    }
  });
// Rotta per aggiornare un utente
  router.put("/:id", async (req, res) => {
    try {
      const updatedMember = await Member.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Restituisce il documento aggiornato anziché quello vecchio
      });
      res.json(updatedMember); // Risponde con i dati dell'utente aggiornato in formato JSON
    } catch (err) {
      res.status(400).json({ message: err.message }); // Gestisce errori di validazione e risponde con un messaggio di errore
    }
  });
  router.patch("/:id/image", async (req, res) => {
    try {
      const updatedMember = await Member.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Restituisce il documento aggiornato anziché quello vecchio
      });
      res.json(updatedMember); // Risponde con i dati dell'utente aggiornato in formato JSON
    } catch (err) {
      res.status(400).json({ message: err.message }); // Gestisce errori di validazione e risponde con un messaggio di errore
    }
  });

  export default router; // Esporta il router per l'utilizzo in altri file