import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PdfDocument from './Invoice';
import InvoiceData from './InvoiceData';

function CreatePDF() {
  const fileName = "Invoice.pdf";

  return (
    <div className="w-full">
      <PDFViewer width={800} height={500} showToolbar={false}>
        <PdfDocument invoicedata={InvoiceData} />
      </PDFViewer>

      <div className='download-link'>
        <PDFDownloadLink
          document={<PdfDocument invoicedata={InvoiceData} />}
          fileName={fileName}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading..." : "Download Invoice"
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
}

export default CreatePDF;