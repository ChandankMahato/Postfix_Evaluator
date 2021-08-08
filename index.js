const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

const PORT = process.env.PORT || 3000;

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/public/postfix.html'));
  });

app.use(express.static('public'));
app.use('/static', express.static('public'))
app.use('/',router)

app.listen(PORT, () => {
    console.log('Server connected at:', PORT);
});