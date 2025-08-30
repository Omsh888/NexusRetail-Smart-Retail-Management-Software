import Invoice from '../models/Invoice.js';
import Expense from '../models/Expense.js';

/**
 * @desc    Get sales report
 * @route   GET /api/reports/sales
 * @access  Private/Admin
 */
const getSalesReport = async (req, res) => {
  const { startDate, endDate } = req.query;

  // Basic date filtering
  const dateFilter = {};
  if (startDate) dateFilter.$gte = new Date(startDate);
  if (endDate) dateFilter.$lte = new Date(endDate);

  const sales = await Invoice.find({
    storeId: req.user.storeId,
    ...(Object.keys(dateFilter).length > 0 && { createdAt: dateFilter }),
  });

  const totalSales = sales.reduce((acc, sale) => acc + sale.totalAmount, 0);
  const numberOfTransactions = sales.length;

  res.json({
    totalSales,
    numberOfTransactions,
    salesData: sales,
  });
};

/**
 * @desc    Get profit and loss summary
 * @route   GET /api/reports/profit-loss
 * @access  Private/Admin
 */
const getProfitLossSummary = async (req, res) => {
    const { startDate, endDate } = req.query;
    const dateFilter = {};
    if (startDate) dateFilter.$gte = new Date(startDate);
    if (endDate) dateFilter.$lte = new Date(endDate);

    const salesPromise = Invoice.aggregate([
        { $match: { storeId: req.user.storeId, ...(Object.keys(dateFilter).length > 0 && { createdAt: dateFilter }) } },
        { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
    ]);

    const expensesPromise = Expense.aggregate([
        { $match: { storeId: req.user.storeId, ...(Object.keys(dateFilter).length > 0 && { date: dateFilter }) } },
        { $group: { _id: null, totalExpenses: { $sum: '$amount' } } }
    ]);

    const [salesResult, expensesResult] = await Promise.all([salesPromise, expensesPromise]);

    const totalRevenue = salesResult[0]?.totalRevenue || 0;
    const totalExpenses = expensesResult[0]?.totalExpenses || 0;
    const netProfit = totalRevenue - totalExpenses;

    res.json({ totalRevenue, totalExpenses, netProfit });
};

export { getSalesReport, getProfitLossSummary };