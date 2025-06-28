'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { toast } from 'sonner';

export default function page() {
  const [formData, setFormData] = useState({
    name: '',
    firstName: '',
    email: '',
    telephone: '',
  });

  const handleFormData = (
    element: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [element]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch('/api/entraineur', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
        }),
      });
      if (!response.ok) {
        throw new Error('Échec de la requête');
      }
      const data = await response.json();
      console.log('entraineur créé:', data);
      toast('✅ Entraineur créé avec succès.');
      setFormData({
        name: '',
        firstName: '',
        email: '',
        telephone: '',
      });
    } catch (error) {
      console.error('Erreur', error);
    }
  };

  return (
    <div className=" bg-gradient-to-b from-white to-marcblue/50 rounded-[3rem] gap-5 pt-40 pb-20 w-full flex flex-col items-center justify-center ">
      <h1 className="text-6xl max-w-2xl text-center font-bold mb-4">
        Vous inscrire en tant que Club
      </h1>
      <p className="text-muted-foreground mb-6 max-w-xl text-center text-xl">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic
        accusantium rerum ad maxime earum quasi temporibus, autem vitae ut
        necessitatibus.
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
      >
        <Input
          name="name"
          placeholder="Nom"
          required
          value={formData.name}
          onChange={(e) => handleFormData('name', e)}
        />

        <Input
          name="firstName"
          required
          placeholder="Prénom"
          value={formData.firstName}
          onChange={(e) => handleFormData('firstName', e)}
        />
        <Input
          name="email"
          required
          placeholder="email"
          value={formData.email}
          onChange={(e) => handleFormData('email', e)}
        />
        <Input
          name="telephone"
          required
          placeholder="telephone"
          value={formData.telephone}
          onChange={(e) => handleFormData('telephone', e)}
        />

        <Button
          type="submit"
          className="bg-gradient-to-b z-10 col-span-2 mt-2 from-marcblue to-marcblue/80 capitalize shadow-xl backdrop-blur-sm hover:bg-marcblue/60 cursor-pointer transition-colors text-lg text-white p-6 rounded-[3rem]"
        >
          Envoyer
        </Button>
      </form>
    </div>
  );
}
