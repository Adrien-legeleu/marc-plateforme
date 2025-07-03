'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import UploadSection from '@/app/components/Upload/UploadSection';
import { useFileUpload } from '@/hooks/use-file-upload';
import PreviousClubsInput from '@/app/components/Form/PreviousClubs';
import Diplomas from '@/app/components/Form/Diplomas';
import TargetAudienceSelector from '@/app/components/Form/TargetAudience';
import TypeCoach from '@/app/components/Form/TypeCoach';
import ProjectTypeSelector from '@/app/components/Form/ProjectType';
import SocialsLinks from '@/app/components/Form/SocialLinks';

export default function Page() {
  const [formData, setFormData] = useState({
    name: '',
    firstName: '',
    email: '',
    telephone: '',
    diplomas: [],
    experience: '',
    pastClubs: [],
    targetAudience: [],
    type: '',
    projectType: [],
    cvUrls: [] as string[],
    photoUrls: [] as string[],
    socialLinks: [],
  });

  const maxSizeMB = 50;
  const maxSize = maxSizeMB * 1024 * 1024;
  const maxFiles = 6;

  type FormDataKey = keyof typeof formData;

  const handleFormData = <K extends FormDataKey>(
    key: string,
    value: (typeof formData)[K]
  ) => {
    console.log(formData);

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
    multiple: false,
    maxFiles: 1,
  });
  interface FileItem {
    file: File;
  }

  interface UploadState {
    files: FileItem[];
  }

  const handleFileSubmit = async (uploadState: UploadState) => {
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
    console.log(formData);

    try {
      const [cvUrls, photoUrls] = await Promise.all([
        handleFileSubmit(cvUpload),
        handleFileSubmit(photoUpload),
      ]);

      const payload = {
        ...formData,
        cvUrls,
        photoUrls,
      };

      const response = await fetch('/api/entraineur', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Échec de la requête');

      toast('✅ Profil créé avec succès.');
      setFormData({
        name: '',
        firstName: '',
        email: '',
        telephone: '',
        diplomas: [],
        experience: '',
        pastClubs: [],
        targetAudience: [],
        type: '',
        projectType: [],
        cvUrls: [],
        photoUrls: [],
        socialLinks: [],
      });
      cvActions.clearFiles();
      photoActions.clearFiles();
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire', error);
      toast.error('❌ Une erreur est survenue lors de la création du profil.');
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-marcblue/40 rounded-[3rem] gap-16 pt-40 pb-20 w-full flex flex-col items-center justify-center">
      <div>
        <h1 className="text-6xl max-w-2xl text-center font-bold mb-10">
          Inscription Entraineur / préparateur physique
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
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleFormData('email', e.target.value)}
            required
          />
          <Input
            placeholder="Téléphone"
            value={formData.telephone}
            onChange={(e) => handleFormData('telephone', e.target.value)}
          />
        </div>
        <div className="border border-[#0000000a]  p-5 relative ">
          <div className="w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-marcblue absolute top-0 left-0" />
          <div className="w-2 h-2  translate-x-1/2 -translate-y-1/2 rounded-full bg-marcblue absolute top-0 right-0" />
          <div className="w-2 h-2  -translate-x-1/2 translate-y-1/2 rounded-full bg-marcblue absolute bottom-0 left-0" />
          <div className="w-2 h-2 translate-x-1/2 translate-y-1/2 rounded-full bg-marcblue absolute bottom-0 right-0" />
          <div className="space-y-8">
            <PreviousClubsInput
              value={formData.pastClubs}
              onChange={(value) => handleFormData('pastClubs', value)}
            />
            <Diplomas
              value={formData.diplomas}
              onChange={(value) => handleFormData('diplomas', value)}
            />

            <TargetAudienceSelector
              value={formData.targetAudience}
              onChange={(value) => handleFormData('targetAudience', value)}
            />
            <ProjectTypeSelector
              value={formData.projectType}
              onChange={(value) => handleFormData('projectType', value)}
            />
            <TypeCoach
              value={formData.type}
              onChange={(value) => handleFormData('type', value)}
            />
            <SocialsLinks
              value={formData.socialLinks}
              onChange={(value) => handleFormData('socialLinks', value)}
            />
            <Textarea
              placeholder="Décrivez ici vos expériences (clubs, années, missions, résultats, etc.)"
              value={formData.experience}
              onChange={(e) => handleFormData('experience', e.target.value)}
              className="col-span-2"
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
              title="Téléverser une photo professionnelle"
              uploadState={photoUpload}
              actions={photoActions}
              maxSizeMB={maxSizeMB}
            />
          </div>
        </div>

        <div className="w-full items-center justify-center flex">
          <Button
            type="submit"
            className="col-span-2 mx-auto px-16 py-6 mt-4 text-white bg-marcblue rounded-3xl shadow-xl"
          >
            Envoyer
          </Button>
        </div>
      </form>
    </div>
  );
}
