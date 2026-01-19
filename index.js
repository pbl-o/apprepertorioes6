import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import { readFile, writeFile } from "node:fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

//middleware
app.use(express.json());
app.use(cors());

//RUTAS

// Landing Page
app.get("/", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "index.html"));
});

// Sobre Documentación
app.get("/docs", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "about-server.html"));
});

//Desplegar Canciones
app.get("/canciones", async (req, res) => {
  try {
    const data = await readFile("repertorio.json", "utf-8");
    const canciones = JSON.parse(data);
    res.status(200).json(canciones);
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor" });
  }
});

//Agregar Canciones
app.post("/canciones", async (req, res) => {
  try {
    // canción a incorporar.
    const cancion = req.body;
    const data = await readFile("repertorio.json", "utf-8");
    const canciones = JSON.parse(data);

    //Filtro para determinar existencia y veracidad de todos los datos
    if (
      !cancion ||
      !cancion.titulo.trim() ||
      !cancion.artista.trim() ||
      !cancion.tono.trim()
    ) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    //Filtro para estilo de inserción de Tono
    const acorde = cancion.tono.trim(); //Corpus del tono
    const acordesValidos = /^[a-gA-G](m)?$/; //Sentencia regex para filtrar letras entre A y G

    //Test de validez
    if (!acordesValidos.test(acorde)) {
      console.log(`Error de acorde ${acorde}`);
      return res
        .status(400)
        .json({ error: "Acorde no existente o escrito de forma incorrecta" });
    }

    //En caso de ser verdadero, se aplica el formato de Acorde deseado fundamental (mayúscula) especie (minúscula)
    cancion.tono = `${acorde.charAt(0).toUpperCase()}${acorde.slice(1).toLowerCase()}`;

    //Se ingresa la canción en la lista de canciones
    canciones.push(cancion);
    //Se reescribe el archivo json
    await writeFile("repertorio.json", JSON.stringify(canciones, null, 2));
    return res.status(201).json({ message: "Canción añadida con éxito" });
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor" });
  }
});
app.put("/canciones/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cancion = req.body;
    const data = await readFile("repertorio.json", "utf-8");
    const canciones = JSON.parse(data);
    const index = canciones.findIndex((item) => item.id == id);

    if (
      !cancion ||
      !cancion.titulo.trim() ||
      !cancion.artista.trim() ||
      !cancion.tono.trim() ||
      !id
    ) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    if (index === -1) {
      return res
        .status(404)
        .json({ error: "Tu canción no existe o no ha sido encontrada" });
    }

    const acorde = cancion.tono.trim();
    const acordesValidos = /^[a-gA-G](m)?$/;

    if (!acordesValidos.test(acorde)) {
      console.log("Error de acorde");
      return res
        .status(400)
        .json({ error: "Acorde no existente o escrito de forma incorrecta" });
    }

    cancion.tono = `${acorde.charAt(0).toUpperCase()}${acorde.slice(1).toLowerCase()}`;

    canciones[index] = cancion;
    await writeFile("repertorio.json", JSON.stringify(canciones, null, 2));
    return res.status(200).json({ message: "Canción modificada con éxito" });
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor" });
  }
});
app.delete("/canciones/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await readFile("repertorio.json", "utf-8");
    const canciones = JSON.parse(data);
    const index = canciones.findIndex((item) => item.id == id);

    if (index === -1) {
      return res
        .status(404)
        .json({ error: "Tu canción no existe o no ha sido encontrada" });
    }

    canciones.splice(index, 1);
    await writeFile("repertorio.json", JSON.stringify(canciones, null, 2));
    return res.status(200).json({ message: "Canción borrada con éxito" });
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor" });
  }
});

app.listen(port, () => {
  console.log(`Servidor activo en http://localhost:${port}`);
});
