const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    chartType: { type: String, required: true }, 
    description: { type: String, required: true },
    data: {
      labels: { type: [String], required: true },
      datasets: [{
        label: { type: String, required: true },
        data: { type: [Number], required: true },
        borderColor: { type: String, required: true },
        fill: { type: Boolean, required: true }
      }]
    }
});
  
const Report = mongoose.model('Report', reportSchema);

module.exports = Report;