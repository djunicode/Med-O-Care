import { useEffect } from "react";
import PdfViewerComponent from "../Components/pdfViewerComponent" 
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./pdf.css"

export default function ViewAPage() {
  const navigate = useNavigate();
  let { fileName } = useParams();
  fileName = decodeURIComponent(fileName);

  const location = useLocation();
  const fileData = location?.state?.fileData;

  useEffect(() => {
    if (!fileName || !fileData || !location.state.fromHistoryPage || fileData.name !== fileName ) {
      navigate(-1); 
      return null; 
    }
    console.log(fileData.fileSecure_url)  
  }, [])
  

  return (
    <div className="containerForPdfViewerComponent">
      {/* <PdfViewerComponent2 document={fileData.fileSecure_url} /> */}
      <PdfViewerComponent fileSecure_url={fileData.fileSecure_url} />
    </div>
  )
}
