const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
    chartType: { type: String, required: true },
    description: { type: String, required: true },
    data: {
      labels: { type: [String], required: true },
      datasets: [{
        label: { type: String, required: true },
        data: { type: [Number], required: true },
        colors: { type: [String], required: true }
      }]
    }
});

  
const Summary = mongoose.model('Summary', summarySchema);

module.exports = Summary;