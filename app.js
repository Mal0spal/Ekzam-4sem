import express from "express";
import fileFilter from "./fileFilter.js";
import supabaseService from "./supabaseService.js";

const app = express();//создаем express сервер

const PUBLIC_DIR = "public";//создаем папку паблик + переменная к нему
app.use(express.static(PUBLIC_DIR));


app.get("/:id", (req, res) => { //получить по id
    let id = Number(req.params["id"]); //ключ
     //создает переменную с id, в которую записывается значение req
    
     //проверочка id
    if (!id) {
      let error = {
        status: "error",
        message: "Неверный ID",
      };
      res.statusCode = 400;
      res.send(error);
      return;
    }
  
    let answer = {
      status: "200",
      message: `Название '${id}'`//отправляет в консоль
    }
    
    //200 - ок, 400 - не ок
    res.statusCode = 400;
    res.send(answer);
  })


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

  let model = {
    name: req.body.name
  };

  let data = await supabaseService.addModel(model);

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
