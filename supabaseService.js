import supabase from "./dbConfig.js";  //импортируем dbConfig.js

const getModel = async id => { 
    try { 
        const {data, error} = await supabase 
       
            .from('models') 
            .select() 
            .match({id}); 
            
        if (error) throw error
        return data 
    } catch (e) { 
        throw e 
    }
}

const addModel = async model => {
    try {
        const {data, error} = await supabase
            .from('models')
            .insert(model)

        if (error) throw error
        return data
    } catch (e) {
        console.warn(e);//вывод в консоль

        return null;
    }
}


export default {
    getModel,
    addModel
}