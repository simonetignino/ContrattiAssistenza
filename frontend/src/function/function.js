// import ContractHw from "../../../backend/model/ContractHw";

// export default async function getNextContractNumber() {
//     try {
//         const contracts = await ContractHw.find();
//         console.log(contracts);

//         let maxNumber = 0;
//         contracts.forEach((contract) => {
//             if (contract.number >= maxNumber) {
//                 maxNumber = contract.number;
//             }
//         })
//         if (maxNumber > 0) {
//             return maxNumber
//         } else {
//             return 0;
//         }
//     } catch (error) {
//         console.error("Nessun contratto trovato")
//     }
// }