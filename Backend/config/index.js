// get configs from environment
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 4040;
const MONGO_HOST = process.env.MG_DB_CON || 'mongodb://localhost:27017/master_db_chat';
const SECRET = process.env.SECRET || 'supersecretalltheway';
const ROOT = process.env.ROOT || '';
const CHAT_PATH = process.env.CHAT_PATH || '/chat-path';


const apiPath = `${ROOT !== '/' ? ROOT : ''}/api`;

//config OBJECT containing the app settings

const config = {

    env: NODE_ENV,
    root: ROOT,
    apiPath,
    server: {
        port: PORT
    },
    mongo: {
        host: MONGO_HOST,
        options: {
            useNewUrlParser:true,
            reconnectTries:Number.MAX_VALUE,
        },
    },
    secret: SECRET,
    chatPath: CHAT_PATH
}

module.exports = config;