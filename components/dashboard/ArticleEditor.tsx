'use client';
import React, { useState, useRef } from 'react';

type BlockType = 'h1' | 'h2' | 'paragraph' | 'list';

interface ListItem {
  id: string;
  text: string;
}
interface BlockBase {
  id: string;
  type: BlockType;
}
interface HeadingBlock extends BlockBase {
  type: 'h1' | 'h2';
  content: string;
}
interface ParagraphBlock extends BlockBase {
  type: 'paragraph';
  content: string;
}
interface ListBlock extends BlockBase {
  type: 'list';
  items: ListItem[];
}
// Union type for internal block state
type BlockInternal = HeadingBlock | ParagraphBlock | ListBlock;

interface ArticleEditorProps {
  initialBlocks?: Array<{
    type: BlockType;
    content?: string;
    items?: string[];
  }>;
  initialTitle?: string;
  initialPageParent?: string;
  onSave?: (data: {
    title: string;
    pageParent: string;
    content: Array<{ type: BlockType; content?: string; items?: string[] }>;
  }) => void;
}

const ArticleEditor: React.FC<ArticleEditorProps> = ({
  initialBlocks,
  initialTitle = '',
  initialPageParent = 'joueurs',
  onSave,
}) => {
  // Refs to generate unique IDs for blocks and list items
  const nextBlockId = useRef(0);
  const nextItemId = useRef(0);
  const generateBlockId = () => {
    nextBlockId.current += 1;
    return `block-${nextBlockId.current}-${Date.now()}`;
  };
  const generateItemId = () => {
    nextItemId.current += 1;
    return `item-${nextItemId.current}-${Date.now()}`;
  };

  // Initialize state with initialBlocks if provided, otherwise start with one empty H1 block
  const initialState: BlockInternal[] = initialBlocks
    ? initialBlocks.map((block) => {
        if (block.type === 'list') {
          // Convert initial string items to ListItem objects with unique ids
          const itemsObj: ListItem[] = (block.items || []).map((text) => ({
            id: generateItemId(),
            text: text,
          }));
          return { id: generateBlockId(), type: 'list', items: itemsObj };
        } else {
          return {
            id: generateBlockId(),
            type: block.type,
            content: block.content || '',
          };
        }
      })
    : [{ id: generateBlockId(), type: 'h1', content: '' }];

  const [blocks, setBlocks] = useState<BlockInternal[]>(initialState);
  const [newBlockType, setNewBlockType] = useState<BlockType>('paragraph'); // type for the next added block

  // Add a new block of the specified type
  const handleAddBlock = (type: BlockType) => {
    const newBlock: BlockInternal =
      type === 'list'
        ? {
            id: generateBlockId(),
            type: 'list',
            items: [{ id: generateItemId(), text: '' }],
          }
        : { id: generateBlockId(), type: type, content: '' };
    setBlocks((prev) => [...prev, newBlock]);
  };

  // Remove a block by id
  const handleRemoveBlock = (id: string) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
  };

  // Move block up in the list
  const handleMoveUp = (id: string) => {
    setBlocks((prev) => {
      const index = prev.findIndex((b) => b.id === id);
      if (index > 0) {
        const newBlocks = [...prev];
        const [moved] = newBlocks.splice(index, 1);
        newBlocks.splice(index - 1, 0, moved);
        return newBlocks;
      }
      return prev;
    });
  };

  // Move block down in the list
  const handleMoveDown = (id: string) => {
    setBlocks((prev) => {
      const index = prev.findIndex((b) => b.id === id);
      if (index >= 0 && index < prev.length - 1) {
        const newBlocks = [...prev];
        const [moved] = newBlocks.splice(index, 1);
        newBlocks.splice(index + 1, 0, moved);
        return newBlocks;
      }
      return prev;
    });
  };

  // Change the type of an existing block (e.g., paragraph -> list)
  const handleTypeChange = (id: string, newType: BlockType) => {
    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id !== id) return block;
        if (block.type === newType) return block; // no change
        // If changing to a list, convert text content to first list item
        if (newType === 'list') {
          const initialItems: ListItem[] = [];
          if (block.type !== 'list') {
            const textContent = (block as HeadingBlock | ParagraphBlock)
              .content;
            initialItems.push({ id: generateItemId(), text: textContent });
          }
          return { id: block.id, type: 'list', items: initialItems };
        }
        // Changing from list to a text block (h1, h2 ou paragraph)
        let textContent = '';
        if (block.type === 'list') {
          textContent = block.items.map((item) => item.text).join('\\n');
        } else {
          textContent = (block as HeadingBlock | ParagraphBlock).content;
        }
        return { id: block.id, type: newType, content: textContent };
      })
    );
  };

  // Update text content for a heading/paragraph block
  const handleTextChange = (id: string, newText: string) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === id && block.type !== 'list'
          ? { ...block, content: newText }
          : block
      )
    );
  };

  // Update one item in a list block
  const handleListItemChange = (
    blockId: string,
    itemIndex: number,
    newText: string
  ) => {
    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id !== blockId || block.type !== 'list') return block;
        const updatedItems = block.items.map((item, idx) =>
          idx === itemIndex ? { ...item, text: newText } : item
        );
        return { ...block, items: updatedItems };
      })
    );
  };

  // Add a new empty item to a list block
  const handleAddListItem = (blockId: string) => {
    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id !== blockId || block.type !== 'list') return block;
        return {
          ...block,
          items: [...block.items, { id: generateItemId(), text: '' }],
        };
      })
    );
  };

  // Remove an item from a list block
  const handleRemoveListItem = (blockId: string, itemIndex: number) => {
    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id !== blockId || block.type !== 'list') return block;
        const updatedItems = block.items.filter((_, idx) => idx !== itemIndex);
        return { ...block, items: updatedItems };
      })
    );
  };

  // Handle save: output JSON array of blocks (with only content or items strings)
  const handleSave = () => {
    const output: { type: BlockType; content?: string; items?: string[] }[] =
      blocks.map((block) => {
        if (block.type === 'list') {
          return {
            type: 'list',
            items: block.items.map((item) => item.text),
          } as const;
        } else {
          return {
            type: block.type,
            content: (block as HeadingBlock | ParagraphBlock).content,
          } as const;
        }
      });

    const finalData = {
      title,
      pageParent,
      content: output,
    };

    onSave
      ? onSave(finalData)
      : console.log('Article final à enregistrer :', finalData);

    // Par exemple, output peut ressembler à :
    // [ { type: 'h1', content: 'Titre...' }, { type: 'paragraph', content: 'Texte...' }, { type: 'list', items: ['élément1','élément2'] } ]
  };

  const [title, setTitle] = useState(initialTitle);
  const [pageParent, setPageParent] = useState(initialPageParent);

  return (
    <div className="p-4">
      {/* Titre de l'article */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Titre de l'article
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Titre (ne s'affiche pas dans le contenu)"
        />
      </div>

      {/* Sélecteur de la page parent */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Page associée</label>
        <select
          value={pageParent}
          onChange={(e) => setPageParent(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="joueurs">Joueurs</option>
          <option value="clubs">Clubs</option>
          <option value="entraineurs">Entraîneurs</option>
          <option value="preparateurs">Préparateurs</option>
          {/* Tu peux ajouter d'autres options ici */}
        </select>
      </div>

      {blocks.map((block, index) => (
        <div key={block.id} className="mb-4 p-4 border rounded bg-gray-50">
          {/* Sélecteur de type et boutons de contrôle du bloc */}
          <div className="flex items-center justify-between mb-2">
            <select
              value={block.type}
              onChange={(e) =>
                handleTypeChange(block.id, e.target.value as BlockType)
              }
              className="border px-2 py-1 rounded"
            >
              <option value="h1">Titre principal (H1)</option>
              <option value="h2">Sous-titre (H2)</option>
              <option value="paragraph">Paragraphe</option>
              <option value="list">Liste à puces</option>
            </select>
            <div className="space-x-2">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleMoveUp(block.id)}
                  className="px-2 py-1 text-sm bg-gray-200 rounded"
                >
                  ↑
                </button>
              )}
              {index < blocks.length - 1 && (
                <button
                  type="button"
                  onClick={() => handleMoveDown(block.id)}
                  className="px-2 py-1 text-sm bg-gray-200 rounded"
                >
                  ↓
                </button>
              )}
              <button
                type="button"
                onClick={() => handleRemoveBlock(block.id)}
                className="px-2 py-1 text-sm bg-red-200 rounded"
              >
                Supprimer
              </button>
            </div>
          </div>

          {/* Zone de saisie du contenu du bloc */}
          {block.type === 'list' ? (
            <div className="ml-6">
              {block.items.map((item, idx) => (
                <div key={item.id} className="flex items-center mb-2">
                  <span className="mr-2">•</span>
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) =>
                      handleListItemChange(block.id, idx, e.target.value)
                    }
                    className="flex-1 border-b border-gray-400 focus:outline-none"
                    placeholder={`Élément ${idx + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveListItem(block.id, idx)}
                    className="ml-2 text-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddListItem(block.id)}
                className="text-sm text-blue-600"
              >
                + Ajouter un élément
              </button>
            </div>
          ) : (
            <>
              {block.type === 'paragraph' ? (
                <textarea
                  value={block.content}
                  onChange={(e) => handleTextChange(block.id, e.target.value)}
                  className="w-full border px-2 py-1"
                  rows={3}
                  placeholder="Paragraphe..."
                />
              ) : (
                <input
                  type="text"
                  value={block.content}
                  onChange={(e) => handleTextChange(block.id, e.target.value)}
                  className="w-full border px-2 py-1 text-xl font-semibold"
                  placeholder={
                    block.type === 'h1' ? 'Titre principal...' : 'Sous-titre...'
                  }
                />
              )}
            </>
          )}
        </div>
      ))}

      {/* Contrôles pour ajouter un nouveau bloc */}
      <div className="mt-2">
        <select
          value={newBlockType}
          onChange={(e) => setNewBlockType(e.target.value as BlockType)}
          className="border px-2 py-1 rounded"
        >
          <option value="paragraph">Paragraphe</option>
          <option value="h1">Titre principal (H1)</option>
          <option value="h2">Sous-titre (H2)</option>
          <option value="list">Liste à puces</option>
        </select>
        <button
          type="button"
          onClick={() => handleAddBlock(newBlockType)}
          className="ml-2 px-3 py-1 bg-blue-600 text-white rounded"
        >
          Ajouter un bloc
        </button>
      </div>

      {/* Bouton Enregistrer */}
      <button
        type="button"
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Enregistrer
      </button>
    </div>
  );
};

export default ArticleEditor;
