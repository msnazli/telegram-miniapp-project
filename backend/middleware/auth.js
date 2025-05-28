const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'توکن لازم است' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'توکن نامعتبر است' });
  }
}

function authorizeAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'دسترسی فقط برای مدیران مجاز است' });
  }
  next();
}

module.exports.ensureAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'دسترسی غیرمجاز' });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(403).json({ error: 'توکن نامعتبر' });
  }
};

module.exports.ensureAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'نیاز به سطح دسترسی مدیر' });
  next();
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'مجاز نیست' });
  next();
};

// استفاده:
app.get('/api/protected-data', authMiddleware, adminOnly, (req, res) => {
  res.json({ message: 'فقط ادمین‌ها می‌بینند' });
});

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'توکن لازم است' });

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: 'دسترسی ندارید' });
      }
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ error: 'توکن نامعتبر است' });
    }
  };
};

module.exports = { authenticate, authorizeAdmin };
