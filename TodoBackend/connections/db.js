const mongoose = require('mongoose');
mongoose.connect(process.env.url,{

useNewUrlParser:true,
useUnifiedTopology:true
})