import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TranslationManager() {
  const [translations, setTranslations] = useState([]);
  const [form, setForm] = useState({ key: '', fa: '', en: '', ar: '' });
  const [editingKey, setEditingKey] = useState(null);

  useEffect(() => {
    fetchTranslations();
  }, []);

  const fetchTranslations = async () => {
    const res = await axios.get('/api/translations');
    if (res.data.success) setTranslations(res.data.translations);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { key, fa, en, ar } = form;
    if (!key) return alert('کلید الزامی است');
    await axios.post('/api/translations', {
      key,
      translations: { fa, en, ar },
    });
    setForm({ key: '', fa: '', en: '', ar: '' });
    setEditingKey(null);
    fetchTranslations();
  };

  const handleEdit = (t) => {
    setEditingKey(t.key);
    setForm({ key: t.key, ...t.translations });
  };

  const handleDelete = async (key) => {
    if (!window.confirm('آیا مطمئنید؟')) return;
    await axios.delete(`/api/translations/${key}`);
    fetchTranslations();
  };

  return (
    <div>
      <h2>پنل مدیریت ترجمه‌ها</h2>
      <form onSubmit={handleSubmit}>
        <input name="key" placeholder="کلید" value={form.key} onChange={handleChange} disabled={editingKey !== null} />
        <input name="fa" placeholder="فارسی" value={form.fa} onChange={handleChange} />
        <input name="en" placeholder="انگلیسی" value={form.en} onChange={handleChange} />
        <input name="ar" placeholder="عربی" value={form.ar} onChange={handleChange} />
        <button type="submit">{editingKey ? 'ویرایش' : 'افزودن'}</button>
        {editingKey && <button type="button" onClick={() => { setEditingKey(null); setForm({ key: '', fa: '', en: '', ar: '' }) }}>انصراف</button>}
      </form>

      <table>
        <thead>
          <tr><th>کلید</th><th>فارسی</th><th>انگلیسی</th><th>عربی</th><th>عملیات</th></tr>
        </thead>
        <tbody>
          {translations.map(t => (
            <tr key={t.key}>
              <td>{t.key}</td>
              <td>{t.translations.fa}</td>
              <td>{t.translations.en}</td>
              <td>{t.translations.ar}</td>
              <td>
                <button onClick={() => handleEdit(t)}>ویرایش</button>
                <button onClick={() => handleDelete(t.key)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
