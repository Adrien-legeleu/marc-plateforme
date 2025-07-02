'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useFileUpload } from '@/hooks/use-file-upload';
import UploadSection from '@/app/components/Upload/UploadSection';
import NationalitySelector from '@/app/components/Form/Nationalite';
import PreferredPositionSelector from '@/app/components/Form/FavoritePost';
import StrongFootSelector from '@/app/components/Form/FavoriteFoot';
import EducationLevelSelector from '@/app/components/Form/EducationLevel';
import MobilitySelector from '@/app/components/Form/MobilitySelector';
import NiveauActuelSelector from '@/app/components/Form/ActualLevel';
import { Label } from '@/components/ui/label';

export default function Page() {
  const [formData, setFormData] = useState({
    name: '',
    firstName: '',
    email: '',
    bornDate: '',
    position: '',
    strongFoot: '',
    height: '',
    weight: '',
    nationalities: [] as string[],
    lastClub: '',
    currentLevel: '',
    educationLevel: '',
    mobility: '',
    telephone: '',
    premium: false,
    cvUrls: [] as string[],
    photoUrls: [] as string[],
    videoUrls: [] as string[],
  });

  const maxSizeMB = 50;
  const maxSize = maxSizeMB * 1024 * 1024;
  const maxFiles = 6;

  const handleFormData = (key: string, value: string | string[]) => {
    console.log(value);

    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const [cvUpload, cvActions] = useFileUpload({
    accept:
      '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    maxSize,
    multiple: true,
    maxFiles,
  });

  const [photoUpload, photoActions] = useFileUpload({
    accept: 'image/png,image/jpeg,image/jpg,.png,.jpg,.jpeg',
    maxSize,
    multiple: true,
    maxFiles,
  });

  const [videoUpload, videoActions] = useFileUpload({
    accept: 'video/mp4,video/webm,video/quicktime,.mp4,.mov,.webm',
    maxSize,
    multiple: true,
    maxFiles,
  });

  const handleFileSubmit = async (uploadState: any) => {
    const urls: string[] = [];
    for (const fileItem of uploadState.files) {
      const formDataBlob = new FormData();
      formDataBlob.append('file', fileItem.file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataBlob,
      });
      if (!res.ok) {
        throw new Error('Upload failed');
      }
      const data = await res.json();
      if (data?.url) urls.push(data.url);
    }
    return urls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const [cvUrls, photoUrls, videoUrls] = await Promise.all([
        handleFileSubmit(cvUpload),
        handleFileSubmit(photoUpload),
        handleFileSubmit(videoUpload),
      ]);

      const payload = {
        ...formData,
        cvUrls,
        photoUrls,
        videoUrls,

        height: formData.height ? parseInt(formData.height) : null,
        weight: formData.weight ? parseInt(formData.weight) : null,
        premium: false,

        position: formData.position ? [formData.position] : [],
        nationalities: formData.nationalities ? formData.nationalities : [],
      };

      const response = await fetch('/api/player', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Échec de la requête');

      toast('✅ Joueur créé avec succès.');
      // Reset form to initial state
      setFormData({
        name: '',
        firstName: '',
        email: '',
        bornDate: '',
        position: '',
        strongFoot: '',
        height: '',
        weight: '',
        nationalities: [],
        lastClub: '',
        currentLevel: '',
        educationLevel: '',
        mobility: '',
        telephone: '',
        premium: false,
        cvUrls: [],
        photoUrls: [],
        videoUrls: [],
      });
      // Clear uploaded files from state
      cvActions.clearFiles();
      photoActions.clearFiles();
      videoActions.clearFiles();
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire', error);
      toast.error('❌ Une erreur est survenue lors de la création du joueur.');
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-marcblue/40 rounded-[3rem] gap-16 pt-40 pb-20 w-full flex flex-col items-center justify-center">
      <div>
        <h1 className="text-6xl max-w-2xl text-center font-bold mb-10">
          Inscription joueur
        </h1>
        <p className="text-center text-lg text-gray-600">
          Complétez ce formulaire pour rejoindre notre réseau et valoriser votre
          profil.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full space-y-20 max-w-5xl px-8"
      >
        <div className="grid sm:grid-cols-2 border border-[#0000000a] gap-6 grid-cols-1 p-5 relative ">
          <div className="w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-marcblue absolute top-0 left-0" />
          <div className="w-2 h-2  translate-x-1/2 -translate-y-1/2 rounded-full bg-marcblue absolute top-0 right-0" />
          <div className="w-2 h-2  -translate-x-1/2 translate-y-1/2 rounded-full bg-marcblue absolute bottom-0 left-0" />
          <div className="w-2 h-2 translate-x-1/2 translate-y-1/2 rounded-full bg-marcblue absolute bottom-0 right-0" />
          {/* Nom et prénom */}
          <Input
            placeholder="Nom"
            value={formData.name}
            onChange={(e) => handleFormData('name', e.target.value)}
            required
          />
          <Input
            placeholder="Prénom"
            value={formData.firstName}
            onChange={(e) => handleFormData('firstName', e.target.value)}
            required
          />
          {/* Email */}
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleFormData('email', e.target.value)}
            required
          />
          {/* Date de naissance */}
          <Input
            type="date"
            placeholder="Date de naissance"
            value={formData.bornDate}
            onChange={(e) => handleFormData('bornDate', e.target.value)}
            required
          />
          {/* Téléphone */}
          <Input
            placeholder="Téléphone"
            value={formData.telephone}
            onChange={(e) => handleFormData('telephone', e.target.value)}
          />
          {/* Taille et poids */}
          <Input
            type="number"
            placeholder="Taille (cm)"
            value={formData.height}
            onChange={(e) => handleFormData('height', e.target.value)}
          />
          <Input
            type="number"
            placeholder="Poids (kg)"
            value={formData.weight}
            onChange={(e) => handleFormData('weight', e.target.value)}
          />
        </div>
        {/* Poste préféré */}
        <div className="border border-[#0000000a]  p-5 relative ">
          <div className="w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-marcblue absolute top-0 left-0" />
          <div className="w-2 h-2  translate-x-1/2 -translate-y-1/2 rounded-full bg-marcblue absolute top-0 right-0" />
          <div className="w-2 h-2  -translate-x-1/2 translate-y-1/2 rounded-full bg-marcblue absolute bottom-0 left-0" />
          <div className="w-2 h-2 translate-x-1/2 translate-y-1/2 rounded-full bg-marcblue absolute bottom-0 right-0" />
          <div className="space-y-8">
            <PreferredPositionSelector
              value={formData.position}
              onChange={(value) => handleFormData('position', value)}
            />

            {/* Pied fort (gauche/droit/ambidextre) */}
            <StrongFootSelector
              value={formData.strongFoot}
              onChange={(value) => handleFormData('strongFoot', value)}
            />

            {/* Nationalité */}
            <NationalitySelector
              value={formData.nationalities}
              onChange={(value) => handleFormData('nationalities', value)}
            />

            {/* Dernier club et niveau actuel */}
            <div>
              <Label>Votre dernier club</Label>
              <Input
                placeholder="Dernier club"
                value={formData.lastClub}
                onChange={(e) => handleFormData('lastClub', e.target.value)}
              />
            </div>
            <NiveauActuelSelector
              value={formData.currentLevel}
              onChange={(value) => handleFormData('currentLevel', value)}
            />

            {/* Niveau d'étude */}
            <EducationLevelSelector
              value={formData.educationLevel}
              onChange={(value) => handleFormData('educationLevel', value)}
            />

            {/* Mobilité / Disponibilité */}
            <MobilitySelector
              value={formData.mobility}
              onChange={(value) => handleFormData('mobility', value)}
            />
          </div>
        </div>
        <div className="border border-[#0000000a]  p-5 relative ">
          <div className="w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-marcblue absolute top-0 left-0" />
          <div className="w-2 h-2  translate-x-1/2 -translate-y-1/2 rounded-full bg-marcblue absolute top-0 right-0" />
          <div className="w-2 h-2  -translate-x-1/2 translate-y-1/2 rounded-full bg-marcblue absolute bottom-0 left-0" />
          <div className="w-2 h-2 translate-x-1/2 translate-y-1/2 rounded-full bg-marcblue absolute bottom-0 right-0" />

          <div className="space-y-8">
            <UploadSection
              title="Téléverser votre CV"
              uploadState={cvUpload}
              actions={cvActions}
              maxSizeMB={maxSizeMB}
            />
            <UploadSection
              title="Téléverser vos photos (portrait, action)"
              uploadState={photoUpload}
              actions={photoActions}
              maxSizeMB={maxSizeMB}
            />
            <UploadSection
              title="Téléverser vos vidéos (YouTube, Vimeo ou fichier)"
              uploadState={videoUpload}
              actions={videoActions}
              maxSizeMB={maxSizeMB}
            />
          </div>
        </div>

        {/* Bouton Envoyer */}
        <div className="w-full flex  gap-10 items-center justify-center">
          <Button
            type="submit"
            className=" px-16 py-6 mt-4 text-black bg-white rounded-3xl shadow-xl"
          >
            Envoyer
          </Button>
          <Button
            type="button"
            className="px-16 py-6 mt-4 text-white bg-marcblue rounded-3xl shadow-xl"
          >
            Être mis en avant
          </Button>
        </div>
      </form>
    </div>
  );
}
