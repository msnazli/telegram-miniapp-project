import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';

const TranslationAdminPanel = () => {
  const [translations, setTranslations] = useState([]);
  const [newKey, setNewKey] = useState('');
  const [newValues, setNewValues] = useState({ en: '', fa: '' });

  // Mock fetch from backend
  useEffect(() => {
    setTranslations([
      { key: 'submit', values: { en: 'Submit', fa: 'ارسال' } },
      { key: 'reset', values: { en: 'Reset', fa: 'بازنشانی' } },
    ]);
  }, []);

  const handleAdd = () => {
    if (!newKey.trim()) return;
    setTranslations([...translations, { key: newKey, values: { ...newValues } }]);
    setNewKey('');
    setNewValues({ en: '', fa: '' });
  };

  const handleUpdate = (index, lang, value) => {
    const updated = [...translations];
    updated[index].values[lang] = value;
    setTranslations(updated);
  };

  const handleDelete = (index) => {
    const updated = [...translations];
    updated.splice(index, 1);
    setTranslations(updated);
  };

  return (
    <div className="grid gap-6 max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-semibold text-center">Translation Management</h2>

      <Card>
        <CardContent className="grid gap-2 p-4">
          <Input
            placeholder="Translation key"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
          />
          <Input
            placeholder="English value"
            value={newValues.en}
            onChange={(e) => setNewValues({ ...newValues, en: e.target.value })}
          />
          <Input
            placeholder="Farsi value"
            value={newValues.fa}
            onChange={(e) => setNewValues({ ...newValues, fa: e.target.value })}
          />
          <Button onClick={handleAdd} className="w-full" variant="default">
            <Plus className="w-4 h-4 mr-2" /> Add
          </Button>
        </CardContent>
      </Card>

      {translations.map((item, idx) => (
        <Card key={item.key}>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 items-center gap-2 p-4">
            <div className="font-medium">{item.key}</div>
            <Input
              value={item.values.en}
              onChange={(e) => handleUpdate(idx, 'en', e.target.value)}
              placeholder="English"
            />
            <Input
              value={item.values.fa}
              onChange={(e) => handleUpdate(idx, 'fa', e.target.value)}
              placeholder="Farsi"
            />
            <Button variant="destructive" size="icon" onClick={() => handleDelete(idx)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TranslationAdminPanel;
