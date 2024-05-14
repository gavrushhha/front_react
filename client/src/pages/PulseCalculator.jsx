import React, { useState } from "react";
import XLSX from "xlsx";

export default function PulseCalculator({ filePath }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const calculatePulse = () => {
    const file = filePath; // Путь к вашему файлу Excel
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet);

      let sum = 0;
      let count = 0;
      for (let i = 0; i < rows.length - 6; i++) {
        for (let j = i; j < i + 6; j++) {
          sum += parseInt(rows[j].ЧСС);
          count++;
        }
        const averagePulse = sum / count;
        console.log(`Average pulse for rows ${i + 1} to ${i + 6}: ${averagePulse}`);
        sum = 0;
        count = 0;
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <div>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button onClick={calculatePulse}>Calculate Pulse</button>
    </div>
  );
}
