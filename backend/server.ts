import express from 'express'
import cors from 'cors'
import multer from 'multer'
import csvToJson from 'convert-csv-to-json'

const app = express();
const port = process.env.PORT ?? 3000;

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage
});

let userData: Array<Record<string, string>> = [];

app.use(cors());

app.post('/api/files', upload.single('file'), async (req, res) => {
    // Extraer el archivo del request
    const { file } = req;

    // Validar que tenemos el archivo
    if (!file) {
        return res.status(500).json({
            message: 'File is required!'
        });
    }

    // Validar que el mimetype sea CSV
    if (file.mimetype !== 'text/csv') {
        return res.status(500).json({
            message: 'File must be CSV'
        });
    }

    let json: Array<Record<string, string>> = [];

    try {
        // Transformar el archivo (Buffer) a String
        const rawCsv = Buffer.from(file.buffer).toString('utf-8');

        console.log(rawCsv);

        // Transformar el String en JSON
        json = csvToJson.fieldDelimiter(',').csvStringToJson(rawCsv);
    } catch (error) {
        return res.status(500).json({
            message: 'Error parsing the file'
        });
    }

    // Guardar el JSON en memoria
    userData = json;

    // Devolver estado 200 con el mensaje y el JSON
    return res.status(200).json({
        data: json,
        message: 'El archivo se cargó correctamente'
    });
});

app.get('/api/users', async (req, res) => {
    // Extraer el parametro q
    const { q } = req.query;

    // Validar que tenemos el parametro
    if (!q) {
        return res.status(500).json({
            message: 'Query param `q` is required'
        });
    }

    if (Array.isArray(q)) {
        return res.status(500).json({
            message: 'El parametro debe de ser un string'
        });
    }

    // Filtra los datos de la memoria con el parametro
    const search = q.toString().toLowerCase();
    const filteredData = userData.filter(row => {
        return Object.values(row).some(value => value.toLowerCase().includes(search));
    });

    // Devolver el estado 200 con los datos filtrados
    return res.status(200).json({
        data: filteredData
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});