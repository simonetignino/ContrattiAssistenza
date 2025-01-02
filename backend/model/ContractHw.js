import mongoose from "mongoose"


// Schema per gli articoli 
const itemSchema = new mongoose.Schema({
    code: { type: String },
    description: { type: String },
    price: { type: Number },
    qta: { type: Number },
})

// Schema per gli interventi 
const interventionsSchema = new mongoose.Schema({
    number: { type: Number },
    letter: { type: String },
    problemEncountered: { type: String },
    interventionCarriedOut: { type: String },
    carriedBy: { type: String },
    insertBy: { type: String },
    notes: { type: String },
    itemsUsed: [itemSchema],
    interventionDate: { type: String },
    interventionType: { type: String, enum: ["Fisico", "Remoto"] },
    duration: { type: Number }
}, { collection: "interventions", timestamps: true })

// Schema per i contratti
const contractHwSchema = new mongoose.Schema({
    number: { type: Number },
    letter: { type: String },
    contractHours: { type: Number },
    remainingHours: { type: Number },
    signedContract: { type: String },
    holder: {
        name: { type: String },
        address: { type: String },
        city: { type: String },
        district: { type: String },
        cap: { type: String },
    },
    annualAmount: { type: String },
    contractDuration: { type: Number },
    remainingDuration: { type: Number },
    endingDuration: { type: String },
    insertBy: { type: String },
    lastModified: { type: String },
    interventions: [interventionsSchema],
    interventionsCount: { type: Number, deafult: 0 },
    contractType: { type: String, enum: ["Mini", "Standard", "Plus", "Silver", "Gold"] }
}, { collection: "ContractsHw", timestamps: true })

export default mongoose.model("ContractHw", contractHwSchema)


// {
//     "number": "1",
//     "letter": "C",
//     "contractHours": "40",
//     "remainingHours": "",
//     "signedContract": "",
//     "holder": {
//         "name": "Luigi",
//         "surname": "Tosto",
//         "company": "Gioielleria tosto",
//         "address": "Via prova 123",
//         "city": "Catania",
//         "district": "CT",
//     },
//     "annualAmount": "",
//     "contractDuration": "",
//     "remainingDuration": "",
//     "endingDuration": "01/01/2025",
//     "insertBy": "Prova",
//     "interventions": [],
//     "contractType": "Gold" }
// }