// src/components/FormSection.jsx
import React, { useState } from 'react';
import { submitForm } from '../api';
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation();

const lang = navigator.language.startsWith('fa') || navigator.language.startsWith('ar') ? 'rtl' : 'ltr';
const [language, setLanguage] = useState('fa'); // یا 'en'

const FormSection = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    keywords: '',
    features: [],
    styles: [],
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const featureOptions = ['نویسنده حرفه‌ای', 'ترجمه ماشینی', 'SEO پیشرفته'];
  const styleOptions = ['رسمی', 'صمیمی', 'خلاقانه'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (name, type) => {
    setFormData((prev) => {
      const current = new Set(prev[type]);
      if (current.has(name)) current.delete(name);
      else current.add(name);
      return { ...prev, [type]: Array.from(current) };
    });
  };

const [copySuccess, setCopySuccess] = useState(false);
const handleCopy = () => {
  navigator.clipboard.writeText(generatedText).then(() => {
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000); // پیام پس از ۲ ثانیه حذف شود
  });
};


const [preview, setPreview] = useState(null);
const [generatedText, setGeneratedText] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setMessage('');
      setGeneratedText('');

      const payload = {
        ...formData,
        keywords: formData.keywords.split(',').map((k) => k.trim()),
      };
      const result = await submitForm(payload);

       if (result.success) {
      setMessage('متن با موفقیت تولید شد!');
      setGeneratedText(result.generatedText);
    } else {
      setError('پاسخی از مدل دریافت نشد.');
    }
  } catch (err) {
    setError('خطا در ارسال فرم');
  }
};

  return (
    <div className="container mt-5" dir={lang}>
      <div className="row justify-content-center">
        <div className="col-md-8">
      <h2 className="mb-4 text-center">{t('title')}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">عنوان</label>
          <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">توضیحات</label>
          <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">کلمات کلیدی (با , جدا کنید)</label>
          <input type="text" className="form-control" name="keywords" value={formData.keywords} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">ویژگی‌ها</label>
          {featureOptions.map((feature) => (
            <div key={feature} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={formData.features.includes(feature)}
                onChange={() => handleCheckboxChange(feature, 'features')}
              />
              <label className="form-check-label">{feature}</label>
            </div>
          ))}
        </div>

        <div className="mb-3">
          <label className="form-label">سبک‌ها</label>
          {styleOptions.map((style) => (
            <div key={style} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={formData.styles.includes(style)}
                onChange={() => handleCheckboxChange(style, 'styles')}
              />
              <label className="form-check-label">{style}</label>
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary">{t('submit')}</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => setFormData ({title: '',description: '',keywords: '',features: [],styles: [],})}>{t('reset')}</button>
      </form>

      {message && <div className="alert alert-success mt-3">{t('message')}</div>}
      {error && <div className="alert alert-danger mt-3">{t('error')}</div>}
      {generatedText && (
  <div className="alert alert-secondary mt-4">
    <h5>پیش‌نمایش متن تولیدی:</h5>
    <button className="btn btn-outline-secondary btn-sm" onClick={handleCopy}>کپی</button>
    <p style={{ whiteSpace: 'pre-line' }}>{generatedText}</p>
  </div>
)}

        </div>
      </div>
    </div>
  );
};

{copySuccess && (
  <div style={{
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#d1e7dd',
    color: '#0f5132',
    padding: '10px 20px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
    zIndex: 1000,
    direction: language === 'fa' ? 'rtl' : 'ltr',
  }}>
    {language === 'fa' ? '✅ متن کپی شد' : '✅ Text copied'}
  </div>
)}


export default FormSection;
