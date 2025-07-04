'use client';

import React, { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';

export default function TipTapEditor({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (val: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'min-h-[200px] w-full border rounded-2xl p-4 bg-white focus:outline-none prose prose-sm max-w-none',
      },
    },
  });

  // Si tu veux mettre à jour le contenu quand la prop value change
  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div>
      <EditorContent editor={editor} />
      {/* Optionnel : mini barre d’outils custom, possible d’en ajouter une plus complète */}
      {/* <MenuBar editor={editor} /> */}
    </div>
  );
}
