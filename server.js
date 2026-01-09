const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Banco simples em memória (pode virar banco depois)
let keys = [];

function genKey(){
  return Math.random().toString(36).slice(2,6).toUpperCase() + '-' +
         Math.random().toString(36).slice(2,6).toUpperCase();
}

// 🔑 GERAR KEY (ADMIN)
app.post('/keys', (req,res)=>{
  const key = genKey();
  keys.push({ key });
  res.json({ key });
});

// ✅ VALIDAR KEY (REUTILIZÁVEL / MULTI-DISPOSITIVO)
app.post('/validate', (req,res)=>{
  const { key } = req.body;
  const exists = keys.find(k => k.key === key);
  if(!exists){
    return res.json({ ok:false });
  }
  // NÃO consome, NÃO bloqueia
  res.json({ ok:true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log('Seven_C7 Server ONLINE'));
