import dotenv from 'dotenv'; //dotenv - библиотека для подрубки сторонних сервисов (супабэйз)
import { createClient } from '@supabase/supabase-js'; //чтобы обратиться по ссылке и ключу

dotenv.config(); //пустой конфиг создается

const supabaseUrl = process.env.SUPABASE_URL; //передаем ссылку
const supabaseKey = process.env.SUPABASE_KEY; //передаем ключ
const supabase = createClient(supabaseUrl, supabaseKey); //из двух переменных склеиваем одну

export default supabase; //экспорт для использования в других файлах