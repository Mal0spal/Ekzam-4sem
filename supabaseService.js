import supabase from "./dbConfig.js";  //импортируем dbConfig.js для работы с супабэйз

const getModel = async id => { //id записи таблицы передаем в переменную, асинхронная переменная, подключается несколько компов, еслди делают запрос одновременно, для каждого клиента сервер работает отдельно
    //=> - анонимная функция, не имеет названи и выполняется сразу
    try { //устойчива к ошибкам, попробуй сделать что внутри, если ошибка catch (e) 
        const {data, error} = await supabase //data - данные получить, error - ошибка
        //await supabase - ждём ответ от базы
        //для работы с бд начинаем с .
            .from('models') //из какой таблицы в супабэйз
            .select() //что делаем, выбираем все данные из таблицы
            .match({id}); //выбираем одну единственную запись
            
        if (error) throw error
        return data //возвращаем запись, если не было ошибки
    } catch (e) { //(e) - переменная для записи ошибки
        throw e //выписываем ошибку
    }
}

const addModel = async model => {
    try {
        const {data, error} = await supabase
            .from('models')//куда будем вставлять
            .insert(model)//model - объект, собирается в app Post create

        if (error) throw error
        return data
    } catch (e) {
        console.warn(e);//вывод в консоль

        return null;
    }
}

const editModel = async model => {
    try {
        const {data, error} = await supabase
            .from('models')
            .update(model)
            .match({id: model.id}); //сверяется id, поменяй конкретную запись

        if (error) throw error
        return data
    } catch (e) {
        throw e
    }
}

const deleteModel = async id => {
    try {
        const {data, error} = await supabase
            .from('models')
            .delete()
            .match({id});//какую запись удалить

        if (error) throw error
        return data
    } catch (e) {
        throw e
    }
}

export default {
    getModel,
    addModel,
    editModel,
    deleteModel
}