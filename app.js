import express from "express";
import fileFilter from "./fileFilter.js";
import supabaseService from "./supabaseService.js";

const app = express();//создаем express сервер

const PUBLIC_DIR = "public";
app.use(express.static(PUBLIC_DIR));


app.post("/create", fileFilter, async (req, res) => {
  if (!req.body?.name) {
    let error = {
      status: "400",
      message: "Не хватает данных",
    };
    res.statusCode = 400;
    res.send(error);
    return;
  }

  let name = {
    name: req.body.name
  };

  let data = await supabaseService.addModel(name);

  if (!data) {
    let error = {
      status: "400",
      message: "Ошибка при добавлении в базу данных",
    };
    res.statusCode = 400;
    res.send(error);
    return;
  }

  let answer = {
    status: "200",
    data
  };

  res.statusCode = 200;
  res.send(answer);
});



const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Server started at port http://localhost:5500/`));
