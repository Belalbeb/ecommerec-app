import express from 'express'
import { UserRoutes } from './src/modules/User.routes.js';
import { Db } from './db/dbConnection.js';
import { ProductRoutes } from './src/modules/Product.routes.js';
import cors from 'cors'
import router from './src/modules/Cart.routes.js';

const app = express()
app.use(express.json());
app.use(cors());
Db
app.use(UserRoutes)
app.use(ProductRoutes);
app.use(router)

app.listen(3000, () => {
  console.log(`server running`)
})
