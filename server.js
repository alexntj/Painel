const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let keys = []; // banco simples em memória

function genKey(){
  return Math.random().toString(36).slice(2,6).toUpperCase() + '-' +
         Math.random().toString(36).slice(2,6).toUpperCase();
}

// gerar key
app.post('/keys', (req,res)=>{
  const key = genKey();
  keys.push({ key, used:false });
  res.json({ key });
});

// validar key
app.post('/validate', (req,res)=>{
  const { key } = req.body;
  const found = keys.find(k => k.key === key && !k.used);
  if(!found) return res.json({ ok:false });
  found.used = true; // uso único
  res.json({ ok:true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log('Servidor Seven_C7 online'));
