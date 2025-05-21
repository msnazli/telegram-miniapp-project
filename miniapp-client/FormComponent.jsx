import React, { useState } from 'react';
import { Form, Button, Badge } from 'react-bootstrap';

function FormComponent() {
  const [keywords, setKeywords] = useState('');
  const [features, setFeatures] = useState([]);
  const [styles, setStyles] = useState([]);

  const availableFeatures = ['هیجانی', 'طبیعت', 'احساسی', 'فنی'];
  const availableStyles = ['مدرن', 'غیر انگلیسی', 'ترکیبی'];

  const handleSubmit = (e) => {
    e.preventDefault();
    // ارسال داده‌ها به backend
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>موضوع</Form.Label>
        <Form.Control type="text" placeholder="موضوع خود را وارد کنید" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>توضیحات</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="توضیحات شغل مورد نظر..." />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>کلمات کلیدی</Form.Label>
        <Form.Control
          type="text"
          placeholder="کلمات را با Enter یا کاما جدا کنید"
          onChange={(e) => setKeywords(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>ویژگی‌ها</Form.Label>
        {availableFeatures.map((feat) => (
          <Form.Check
            key={feat}
            type="checkbox"
            label={feat}
            onChange={(e) =>
              setFeatures((prev) =>
                e.target.checked ? [...prev, feat] : prev.filter((f) => f !== feat)
              )
            }
          />
        ))}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>سبک‌ها</Form.Label>
        {availableStyles.map((style) => (
          <Form.Check
            key={style}
            type="checkbox"
            label={style}
            onChange={(e) =>
              setStyles((prev) =>
                e.target.checked ? [...prev, style] : prev.filter((s) => s !== style)
              )
            }
          />
        ))}
      </Form.Group>

      <Button variant="primary" type="submit">ادامه به پرداخت</Button>
    </Form>
  );
}

export default FormComponent;


const handleSubmit = async (e) => {
  e.preventDefault();
  const payload = {
    topic,
    description,
    keywords: keywords.split(/[,|\n|\r]/).map(k => k.trim()),
    features,
    styles,
    userId: "telegram_user_id", // در آینده از تلگرام واقعی می‌گیریم
  };

  try {
    const res = await fetch("http://localhost:5000/api/form/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (data.success) {
      alert("با موفقیت ذخیره شد.");
    } else {
      alert("خطا در ذخیره‌سازی");
    }
  } catch (err) {
    alert("خطا در ارتباط با سرور");
  }
};
