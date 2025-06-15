const express = require('express');
require('dotenv').config();
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const checkBookRoutes = require('./routes/checkBookroutes');
const connectdb = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const googleRoutes = require('./routes/googleRoutes');
const debtRoutes = require('./routes/debtRoutes');
const repaymentRoutes = require('./routes/repaymentRoutes');
const emiRoutes = require('./routes/emiRoutes');
const reportRoutes = require('./routes/reportRoutes');
const profileRoutes = require('./routes/profileRoutes');

require('./config/passport')(passport);


connectdb();

const app = express();


app.use(cors());
app.use(express.json());

app.use(session({
  secret: 'debt-ease-session',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/api/auth', authRoutes);
app.use('/api/auth', googleRoutes);
app.use('/api/debts', debtRoutes);
app.use('/api/repayments', repaymentRoutes);
app.use('/api/checksbooks', checkBookRoutes);
app.use('/api', emiRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/profile',profileRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: "DebtEase API is running ✅" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));