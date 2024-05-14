import xlsx from 'xlsx';

// Функция для обработки загруженного XLSX файла
const processReport = (req, res) => {
    const filePath = req.file.path;
    
    // Чтение файла XLSX
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    
    // Преобразование данных в JSON
    const data = xlsx.utils.sheet_to_json(sheet);
    
    // Вычисление возраста
    const birthDate = new Date(data[0]['Дата Рождения']);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();

    // Вычисление МПК и ЧСС
    let vo2Sum = 0;
    let pulseSum = 0;
    const recordsCount = Math.min(data.length, 6); // Усреднение последних 6 записей
    for (let i = data.length - 1; i >= data.length - recordsCount; i--) {
        vo2Sum += parseFloat(data[i]['V\'O2']);
        pulseSum += parseFloat(data[i]['ЧСС']);
    }
    const vo2Average = vo2Sum / recordsCount;
    const pulseAverage = pulseSum / recordsCount;

    // Максимальное значение МПК
    const maxVo2 = Math.max(...data.map(record => parseFloat(record['V\'O2'])));

    // Отправка обработанных данных клиенту
    res.json({ age, vo2Average, pulseAverage, maxVo2 });
};

export { processReport };
