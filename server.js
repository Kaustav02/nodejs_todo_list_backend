import {app} from './app.js'
import { connection } from "./data/database.js";


const port = 3000;
app.listen(port, () => {
    console.log(`server is working on`,port);
  });