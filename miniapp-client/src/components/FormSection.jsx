// src/components/FormSection.jsx
import React, { useState } from 'react';
import { submitForm } from '../api';
import { useTranslation } from 'react-i18next';
import '../i18n';

const lang = navigator.language.startsWith('fa') || navigator.language.startsWith('ar') ? 'rtl' : 'ltr';
const [language, setLanguage] = useState('fa'); // یا 'en'

const FormSection = () => {
   const { t, i18n } = useTranslation();

 const [formData, setFormData] = useState({
  title: '',
  description: '',
  keywords: '',
  features: '',
  styles: '',
});

  const [generatedText, setGeneratedText] = useState('');
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const featureOptions = ['نویسنده حرفه‌ای', 'ترجمه ماشینی', 'SEO پیشرفته'];
  const styleOptions = ['رسمی', 'صمیمی', 'خلاقانه'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  

     const data = await response.json();
    if (data.success) {
      setGeneratedText(data.generatedText);
      setMessage(t('formSubmittedSuccessfully'));
    }
  };

  const switchLanguage = () => {
    const newLang = i18n.language === 'fa' ? 'en' : 'fa';
    i18n.changeLanguage(newLang);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/openai/generate',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        keywords: formData.keywords.split(','),
        features: formData.features.split(','),
        styles: formData.styles.split(','),
      }),
    });

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

 {generatedText && (
        <div className="preview">
          <h3>{t('previewTitle')}</h3>
          <p>{generatedText}</p>
          <button onClick={handleCopy}>{t('copyButton')}</button>
          {copied && <div className="copied-msg">{t('copied')}</div>}
        </div>
  )}


export default FormSection;
