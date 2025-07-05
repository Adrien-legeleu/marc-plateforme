'use client';

import React, { useEffect, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { cn } from '@/lib/utils';

type ArticleEditorProps = {
  initialTitle?: string;
  initialPageParent?: string;
  initialSubCategory?: string;
  initialContent?: string; // HTML string
  onSave: (data: {
    title: string;
    pageParent: string;
    subCategoryName: string;
    content: string; // HTML string
  }) => void | Promise<void>;
};

export default function ArticleEditor({
  initialTitle = '',
  initialPageParent = 'agent',
  initialSubCategory = '',
  initialContent = '',
  onSave,
}: ArticleEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [pageParent, setPageParent] = useState(initialPageParent);
  const [subCategory, setSubCategory] = useState(initialSubCategory);
  const [newSubCategory, setNewSubCategory] = useState('');
  const [subCategories, setSubCategories] = useState<string[]>([]);

  useEffect(() => {
    if (!pageParent) return;
    fetch(`/api/subcategories?parent=${pageParent}`)
      .then((res) => res.json())
      .then((data) => setSubCategories(data.map((s: any) => s.name)));
  }, [pageParent]);
  useEffect(() => {
    setSubCategory(initialSubCategory || '');
  }, [initialSubCategory]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: initialContent || '<p></p>',
    editorProps: {
      attributes: {
        class:
          'prose prose-marc min-h-[220px] px-3 py-2 bg-white border rounded-3xl focus:outline-none',
      },
    },
  });

  // Ajout rapide d’un tableau 2x2
  const insertTable = () => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows: 2, cols: 2, withHeaderRow: true })
      .run();
  };

  const handleSave = async () => {
    if (!title || !pageParent) return;

    let subCategoryToUse = subCategory;

    if (newSubCategory.trim() !== '') {
      const res = await fetch('/api/subcategories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newSubCategory.trim(),
          parent: pageParent,
        }),
      });
      const json = await res.json();
      subCategoryToUse = json.name;
    }

    onSave({
      title,
      pageParent,
      subCategoryName: subCategoryToUse, // <-- LA BONNE CLE
      content: editor?.getHTML() || '',
    });
  };

  return (
    <div className="max-w-4xl mx-auto border bg-white rounded-[3rem] shadow-xl p-8 space-y-6">
      {/* Titre */}
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre de l'article.."
          className="w-full border px-4 py-3 rounded-3xl text-lg shadow-sm"
        />
      </div>
      {/* Sélection page parent + sous-rubrique */}
      <div className="flex flex-col gap-4 mb-4">
        <select
          value={pageParent}
          onChange={(e) => setPageParent(e.target.value)}
          className="border px-4 py-3 rounded-3xl text-lg"
        >
          <option value="agent">Agent sportifs</option>
          <option value="amateur">Foot Amateur</option>
          <option value="pro">Foot Pro</option>
          <option value="management">Management</option>
        </select>
        <div className="mb-6">
          <label className="block text-md font-medium mb-1">
            Sous-rubrique :
          </label>
          <select
            value={subCategory}
            onChange={(e) => {
              setSubCategory(e.target.value);
              setNewSubCategory('');
            }}
            className="shadow-sm border px-4 py-3 rounded-3xl text-lg max-sm:text-base"
          >
            <option value="">Aucune</option>
            {subCategories.map((scName) => (
              <option key={scName.trim()} value={scName.trim()}>
                {scName.trim()}
              </option>
            ))}
          </select>
          <p>ou</p>
          <input
            placeholder="Nouvelle sous-rubrique"
            value={newSubCategory}
            onChange={(e) => {
              setNewSubCategory(e.target.value);
              if (e.target.value) setSubCategory(''); // on désélectionne si on écrit
            }}
            className="text-md border px-4 py-3 rounded-3xl shadow-sm text-lg max-sm:text-base"
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 border-b pb-3 mb-4">
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={cn(
            'btn',
            editor?.isActive('bold') && 'bg-marcblue text-white'
          )}
        >
          Gras
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={cn(
            'btn',
            editor?.isActive('italic') && 'bg-marcblue text-white'
          )}
        >
          Italique
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={cn(
            'btn',
            editor?.isActive('underline') && 'bg-marcblue text-white'
          )}
        >
          Souligner
        </button>

        <button
          type="button"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={cn(
            'btn',
            editor?.isActive('heading', { level: 2 }) &&
              'bg-marcblue text-white'
          )}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={cn(
            'btn',
            editor?.isActive('heading', { level: 3 }) &&
              'bg-marcblue text-white'
          )}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={cn(
            'btn',
            editor?.isActive('heading', { level: 4 }) &&
              'bg-marcblue text-white'
          )}
        >
          H4
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={cn(
            'btn',
            editor?.isActive('bulletList') && 'bg-marcblue text-white'
          )}
        >
          Liste à puces
        </button>
        <button type="button" onClick={insertTable} className="btn">
          Tableau
        </button>
      </div>

      {/* Editeur */}
      <EditorContent editor={editor} />

      <div className="mt-4">
        <button
          type="button"
          onClick={handleSave}
          className="bg-green-600 text-white rounded-3xl px-8 py-3 text-lg"
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
}
