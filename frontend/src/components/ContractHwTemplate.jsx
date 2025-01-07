import React from 'react';
import { Printer } from 'lucide-react';

const ContractHwTemplate = ({ clientData, selectedPlan }) => {
  const generateContract = () => {
    const contractTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Contratto di Manutenzione e Assistenza Tecnica</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 40px;
              padding: 20px;
              font-size: 12px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .header img {
              max-width: 200px;
              margin-bottom: 20px;
            }
            .title {
              text-align: center;
              font-weight: bold;
              font-size: 16px;
              margin: 20px 0;
            }
            .parties {
              margin: 20px 0;
            }
            .contract-section {
              margin: 15px 0;
            }
            .section-title {
              font-weight: bold;
            }
            .subsection {
              margin-left: 20px;
            }
            .signature-area {
              margin-top: 50px;
              display: flex;
              justify-content: space-between;
              page-break-inside: avoid;
            }
            .signature-line {
              width: 200px;
              border-top: 1px solid black;
              margin-top: 20px;
              text-align: center;
              padding-top: 5px;
            }
            .checkbox-area {
              margin: 10px 0;
            }
            .checkbox {
              display: inline-block;
              width: 12px;
              height: 12px;
              border: 1px solid black;
              margin-right: 5px;
            }
            .checked {
              background-color: black;
            }
            @media print {
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="/logo-smart.png" alt="Smart SRL Logo" />
            <div class="title">CONDIZIONI GENERALI<br/>CONTRATTO DI MANUTENZIONE E ASSISTENZA TECNICA</div>
          </div>

          <div class="parties">
            <p><strong>TRA</strong></p>
            <p>SMART SRL, con sede in MASCALUCIA VIA OMBRA 44/B, partita IVA 05384540877, di seguito denominata Fornitore</p>
            <p><strong>E</strong></p>
            <p>${clientData.name} con sede in ${clientData.address}, di seguito denominata Cliente</p>
          </div>

          <p>si conviene e si stipula quanto segue:</p>

          <div class="contract-section">
            <p class="section-title">1. OGGETTO DEL CONTRATTO</p>
            <div class="subsection">
              <p>1.1 Il servizio Contratto di Manutenzione ed Assistenza Tecnica, al fine di garantire l'ottimale funzionamento del sistema informatico 
              del cliente, offre un'assistenza remota, on-site e/o telefonica di alta qualità per prodotti hardware e software di svariati brand.</p>
              <p>Le presenti condizioni generali di contratto regolano i rapporti tra le parti.</p>
              <p>Con l'accettazione delle clausole espresse nel presente contratto il Fornitore fornirà al Cliente il servizio secondo le modalità e le 
              condizioni stabilite nello stesso.</p>
            </div>
          </div>

          <div class="contract-section">
            <p class="section-title">2. PRESTAZIONI</p>
            <div class="subsection">
              <p>2.1 Per tutta la durata del contratto il Fornitore si impegna a fornire:</p>
              <p>a) Assistenza hardware: è compresa nel seguente contratto la manodopera necessaria per la sostituzione di tutti i componenti 
              hardware difettosi che compromettono il corretto funzionamento delle apparecchiature informatiche. Si esclude dal presente 
              contratto la fornitura dei componenti hardware da sostituire risultati guasti ed i consumabili (toner, cartucce, carta, guarnizioni, 
              etc.)</p>
              <p>b) Assistenza software: è compreso nel seguente contratto il ripristino del sistema operativo dovuto a guasto accidentale, virus e/o 
              errore da parte dell'operatore. Si intende che l'assistenza software avrà luogo seguendo le normative del presente contratto ove non 
              venga riscontrato dolo, danneggiamento o incuria. Il guasto causato da virus rientrerà nel contratto di assistenza tecnica 
              esclusivamente con la presenza di un adeguato antivirus installato ed aggiornato.</p>
              <p>c) Assistenza – aggiornamento sistema operativo – installazione nuovi programmi: è compreso nel presente contratto l'aggiornamento 
              e l'assistenza del sistema operativo, viene altresì compresa l'installazione di nuovi programmi e/o drivers che potranno essere 
              acquistati dal cliente al fine di migliorare le prestazioni del pc.</p>
              <p>d) Verifica periodica hardware e software: Rientra nel presente contratto la verifica periodica dei pc e dei software da parte del 
              Fornitore.</p>
            </div>
          </div>

          <div class="contract-section">
            <p class="section-title">3. ESCLUSIONI</p>
            <div class="subsection">
              <p>3.1 Dal presente contratto sono da intendersi espressamente esclusi:</p>
              <p>a) riparazioni, sostituzioni di componenti e di materiale di consumo; tali prestazioni verranno fatturate al Cliente sulla base del 
              listino prezzi del Fornitore.</p>
            </div>
          </div>

          <div class="contract-section">
            <p class="section-title">8. CORRISPETTIVO</p>
            <div class="subsection">
              <p>8.3 Formule di contratto: </p>
              <div class="checkbox-area">
                <span class="checkbox ${selectedPlan === 'MINI' ? 'checked' : ''}"></span>
                Contratto MINI € 290,00 + iva 12 mesi<br/>
                <span class="checkbox ${selectedPlan === 'Standard' ? 'checked' : ''}"></span>
                Contratto STANDARD € 490,00 + iva 12 mesi<br/>
                <span class="checkbox ${selectedPlan === 'Plus' ? 'checked' : ''}"></span>
                Contratto PLUS € 890,00 + iva 12 mesi<br/>
                <span class="checkbox ${selectedPlan === 'Silver' ? 'checked' : ''}"></span>
                Contratto SILVER € 1.390,00 + iva 12 mesi<br/>
                <span class="checkbox ${selectedPlan === 'Gold' ? 'checked' : ''}"></span>
                Contratto GOLD a partire da € 2.990,00 + iva 12 mesi
              </div>
            </div>
          </div>

          <div class="contract-section">
            <p class="section-title">14. TRATTAMENTO DEI DATI PERSONALI</p>
            <div class="checkbox-area">
              <p>a) per adempimenti di legge connessi a norme civilistiche e fiscali, per adempimenti di obblighi contrattuali, per il supporto tecnico 
              (obbligatorio ai fini della stipula del contratto stesso);</p>
              <div>
                <span class="checkbox"></span> acconsento
                <span class="checkbox"></span> non acconsento
              </div>
            </div>

            <div class="checkbox-area">
              <p>b) per l'informazione tecnica in merito a prodotti e servizi, per la verifica della soddisfazione del Cliente, per ricerche ed analisi di 
              mercato e statistiche, per fini commerciali e per la proposizione di prodotti e/o servizi sia da parte nostra che da parte di nostri partner 
              commerciali, anche mediante l'uso della posta elettronica (facoltativo, barrare la casella corrispondente).</p>
              <div>
                <span class="checkbox"></span> acconsento
                <span class="checkbox"></span> non acconsento
              </div>
            </div>
          </div>

          <div class="signature-area">
            <div>
              <div class="signature-line">Il Fornitore</div>
            </div>
            <div>
              <div class="signature-line">Il Cliente</div>
            </div>
          </div>
          
          <p style="text-align: center; margin-top: 30px;">
            Luogo e data: Mascalucia, ${new Date().toLocaleDateString('it-IT')}
          </p>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(contractTemplate);
    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.print();
      printWindow.onafterprint = () => {
        printWindow.close();
      };
    };
  };

  return (
    <button
      onClick={generateContract}
      className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center gap-1"
      title="Stampa contratto"
    >
      <Printer size={16} />
    </button>
  );
};

export default ContractHwTemplate;