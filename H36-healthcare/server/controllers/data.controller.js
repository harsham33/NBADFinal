const Summary = require('../models/summary.chart.model')
const Report = require('../models/reports.chart.model')

exports.summary_data = async (req, res) => {
    try {
        const data = await Summary.find()
        res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.reports_data = async (req, res) => {
    try {
        const data = await Report.find()
        res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
}