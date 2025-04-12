// utils/installmentUtils.js
// function getInstallmentStatus(dueDate, paid) {
//     const now = new Date();
//     if (paid) return "✅ مسدد";
//     if (now.toDateString() === new Date(dueDate).toDateString()) return "🔔 مستحق اليوم";
//     if (now > new Date(dueDate)) return "❌ متأخر";
//     return "⌛ لم يحن بعد";
// }
function getInstallmentStatus(dueDate, paid) {
    const today = new Date();
    const due = new Date(dueDate);
  
    // إذا تم دفع القسط
    if (paid) {
      return '✅ مدفوع';
    }
  
    // إذا كان القسط مستحق اليوم
    if (today.toDateString() === due.toDateString()) {
      return '🔔 مستحق اليوم';
    }
  
    // إذا كان القسط متأخر
    if (today > due) {
      return '❌ متأخر';
    }
  
    // إذا لم يكن القسط مستحق بعد
    return '⏳ غير مستحق بعد';
  }
  
  module.exports = { getInstallmentStatus };
  
