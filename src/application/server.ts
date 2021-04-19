import 'module-alias/register'
import {MongoHelper} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/mongo-helper";
import {MONGODB_URI, PORT} from "@/application/config/environment";

MongoHelper.connect(MONGODB_URI)
    .then(async () => {
        console.log('Connected DB')
        const app = (await import('./config/app')).default
        app.listen(PORT, () => console.log(`Server an running on port: ${PORT}`))
    }).catch(error => console.log(error))