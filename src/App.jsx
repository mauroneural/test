import "./styles.css";
import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const App = () => {
  const [scannedCodes, setScannedCodes] = useState([]);

  function activateLasers() {
    var decodedText = "asdf";
    var decodedResult = "asdfasdfasdf";
    console.log(scannedCodes);

    setScannedCodes(scannedCodes.concat([{ decodedText, decodedResult }]));
  }

  useEffect(() => {
    function onScanSuccess(decodedText, decodedResult) {
      // handle the scanned code as you like, for example:
      console.log(`Code matched = ${decodedText}`, decodedResult);
      setScannedCodes(scannedCodes.concat([{ decodedText, decodedResult }]));
    }

    function onScanFailure(error) {
      // handle scan failure, usually better to ignore and keep scanning.
      // for example:
      console.warn(`Code scan error = ${error}`);
    }

    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  });

  return (
    <div>
      <h1>Where is Starman</h1>
      <p>description</p>
      <div id="reader" width="600px"></div>
      <ol>
        {scannedCodes.map((scannedCode, index) => (
          <li key={index}>{scannedCode.decodedText}</li>
        ))}
      </ol>
      <button onClick={activateLasers}>Activate Lasers</button>
    </div>
  );
};

export default App;
