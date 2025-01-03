import express from "express"
import Contract from "../model/ContractHw.js"

const router = express.Router();

// Rotta per avere tutti i contratti (con paginazione)
router.get("/", async(req, res) => {
    try {
        const page = parseInt(req.query.page); // selezionare la pagina
        const limit = parseInt(req.query.limit) || 16; // elementi a video
        const sort = req.query.sort || "number"; // ordina per
        const sortDirection = req.query.sortDirection || "desc"; // ordine decrescente
        const skip = (page - 1) * limit; // andare avanti di pagina
        let query = {};
        if (req.query.number) {
            query.title = { $regex: req.query.title, $options: "i" };
        }
        const contracts = await Contract.find(query)
            .sort({
                [sort]: sortDirection
            })
            .skip(skip)
            .limit(limit);
        const total = await Contract.countDocuments();
        res.json({
            contracts,
            currentPage: page,
            totalePages: Math.ceil(total / limit),
            totalContracts: total,
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Rotta per ottenere un contratto 
router.get("/:id", async(req, res) => {
    try {
        const contract = await Contract.findById(req.params.id);
        if (!contract) {
            return res.status(404).json({ message: "Contratto non trovato" })
        }
        res.json(contract);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Rotta per aggiungere un contratto
router.post("/", async(req, res) => {
    const contract = new Contract(req.body)
    try {
        const newContract = await contract.save()
        res.status(201).json(newContract);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Rotta per modificare un contratto
router.patch("/:id", async(req, res) => {
    try {
        const updateContract = await Contract.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateContract) {
            return res.status(404).json({ message: "Contratto non trovato" })
        }
        res.json(updateContract);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Rotta per cancellare un contratto 
router.delete("/:id", async(req, res) => {
    try {
        await Contract.findByIdAndDelete(req.params.id);
        res.json({ message: "Contratto cancellato con successo" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// ROTTE PER GLI INTERVENTI RIFERITI AL SINGOLO CONTRATTO

// Rotta per avere tutti gli interventi
router.get("/:id/interventions", async(req, res) => {
    try {
        const contract = await Contract.findById(req.params.id);
        if (!contract) {
            return res.status(404).json({ message: "Contratto non trovato" });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 16;
        const sort = req.query.sort || "number";
        const sortDirection = req.query.sortDirection || "desc";
        const skip = (page - 1) * limit;

        let query = {};
        if (req.query.number) {
            query.title = { $regex: req.query.title, $options: "i" };
        }

        const sortedInterventions = contract.interventions.sort((a, b) => {
            if (sortDirection === 'asc') {
                return a[sort] - b[sort];
            } else {
                return b[sort] - a[sort];
            }
        });

        const paginatedInterventions = sortedInterventions.slice(skip, skip + limit);

        res.json({
            interventions: paginatedInterventions,
            currentPage: page,
            totalPages: Math.ceil(contract.interventions.length / limit),
            totalInterventions: contract.interventions.length
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rotta per aprire un singolo intervento 
router.get("/:id/interventions/:interventionId", async(req, res) => {
    try {
        // Prendo il contratto
        const contract = await Contract.findById(req.params.id);
        if (!contract) {
            return res.status(404).json({ message: "Contratto non trovato" })
        }
        // Cerco l'intervento 
        const intervention = contract.interventions.id(req.params.interventionId);
        if (!intervention) {
            return res.status(404).json({ message: "Intervento non trovato" })
        }
        res.json(intervention);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Rotta per aggiungere un intervento 
router.post("/:id/interventions", async(req, res) => {
    try {
        const contract = await Contract.findById(req.params.id);
        if (!contract) {
            return res.status(404).json({ message: "Contratto non trovato" });
        }
        const newIntervention = {
            number: req.body.number,
            letter: req.body.letter,
            carriedBy: req.body.carriedBy,
            problemEncountered: req.body.problemEncountered,
            interventionCarriedOut: req.body.interventionCarriedOut,
            notes: req.body.notes,
            itemsUsed: req.body.itemsUsed,
            interventionDate: req.body.interventionDate,
            interventionType: req.body.interventionType,
            duration: req.body.duration,
        };
        contract.interventions.push(newIntervention);
        await contract.save();
        res.status(201).json(newIntervention);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Rotta per modificare un intervento
router.patch("/:id/interventions/:interventionId", async(req, res) => {
    try {
        const contract = await Contract.findById(req.params.id);
        if (!contract) {
            return res.status(404).json({ message: "Contratto non trovato" });
        }

        const intervention = contract.interventions.id(req.params.interventionId);
        if (!intervention) {
            return res.status(404).json({ message: "Intervento non trovato" });
        }

        // Itera sulle proprietà di req.body e aggiorna solo quelle esistenti nell'oggetto
        Object.keys(req.body).forEach(key => {
            if (key in intervention) {
                intervention[key] = req.body[key];
            }
        });

        await contract.save();
        res.json(intervention);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Rotta per cancellare un intervento
router.delete("/:id/interventions/:interventionId", async(req, res) => {
    try {
        const contract = await Contract.findById(req.params.id);
        if (!contract) {
            return res.status(404).json({ message: "Contratto non trovato" })
        }
        const intervention = contract.interventions.id(req.params.interventionId);
        if (!intervention) {
            return res.status(404).json({ message: "Intervento non trovato " })
        }
        contract.interventions.pull({ _id: req.params.interventionId })
        await contract.save();
        res.json({ message: "Intervento eliminato con successo" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

export default router;