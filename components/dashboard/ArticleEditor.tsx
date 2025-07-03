'use client';
import React, { useState, useRef, useEffect } from 'react';

type BlockType = 'h1' | 'h2' | 'h3' | 'paragraph' | 'list' | 'table';

interface ListItem {
  id: string;
  text: string;
}
interface BlockBase {
  id: string;
  type: BlockType;
}
interface HeadingBlock extends BlockBase {
  type: 'h1' | 'h2' | 'h3';
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
interface TableCell {
  id: string;
  content: string;
}
interface TableRow {
  id: string;
  cells: TableCell[];
}
interface TableBlock extends BlockBase {
  type: 'table';
  headers: TableCell[];
  rows: TableRow[];
}
// Union type for internal block state
type BlockInternal = HeadingBlock | ParagraphBlock | ListBlock | TableBlock;

interface ArticleEditorProps {
  initialBlocks?: Array<{
    type: BlockType;
    content?: string;
    items?: string[];
    headers?: string[];
    rows?: string[][];
  }>;
  initialTitle?: string;
  initialSubCategory?: string;
  initialPageParent?: string;
  onSave?: (data: {
    title: string;
    initialSubCategory?: string;
    pageParent: string;
    content: Array<{
      type: BlockType;
      content?: string;
      items?: string[];
      headers?: string[];
      rows?: string[][];
    }>;
  }) => void;
}

const ArticleEditor: React.FC<ArticleEditorProps> = ({
  initialBlocks,
  initialSubCategory,
  initialTitle = '',
  initialPageParent = 'agent',
  onSave,
}) => {
  const nextBlockId = useRef(0);
  const nextItemId = useRef(0);
  const generateBlockId = () => `block-${++nextBlockId.current}-${Date.now()}`;
  const generateItemId = () => `item-${++nextItemId.current}-${Date.now()}`;

  const createEmptyTable = (): TableBlock => {
    const id = generateBlockId();
    const header: TableCell = { id: generateItemId(), content: '' };
    const row: TableRow = {
      id: generateBlockId(),
      cells: [{ id: generateItemId(), content: '' }],
    };
    return { id, type: 'table', headers: [header], rows: [row] };
  };

  const initialState: BlockInternal[] = initialBlocks
    ? initialBlocks.map((block) => {
        if (block.type === 'table') {
          const headers = (block.headers || ['']).map((text) => ({
            id: generateItemId(),
            content: text,
          }));
          const rows = (block.rows || [['']]).map((r) => ({
            id: generateBlockId(),
            cells: r.map((text) => ({ id: generateItemId(), content: text })),
          }));
          return { id: generateBlockId(), type: 'table', headers, rows };
        }
        if (block.type === 'list') {
          const items = (block.items || []).map((text) => ({
            id: generateItemId(),
            text,
          }));
          return { id: generateBlockId(), type: 'list', items };
        }
        return {
          id: generateBlockId(),
          type: block.type as 'h1' | 'h2' | 'h3' | 'paragraph',
          content: block.content || '',
        } as HeadingBlock | ParagraphBlock;
      })
    : [{ id: generateBlockId(), type: 'h1', content: '' } as HeadingBlock];

  const [blocks, setBlocks] = useState<BlockInternal[]>(initialState);
  const [newBlockType, setNewBlockType] = useState<BlockType>('paragraph');

  // Ajout de bloc
  const handleAddBlock = (type: BlockType) => {
    const newBlock: BlockInternal =
      type === 'table'
        ? createEmptyTable()
        : type === 'list'
        ? {
            id: generateBlockId(),
            type: 'list',
            items: [{ id: generateItemId(), text: '' }],
          }
        : ({ id: generateBlockId(), type, content: '' } as any);
    setBlocks((prev) => [...prev, newBlock]);
  };

  // Supprimer bloc
  const handleRemoveBlock = (id: string) =>
    setBlocks((prev) => prev.filter((b) => b.id !== id));

  // Déplacer bloc
  const handleMoveUp = (id: string) => {
    setBlocks((prev) => {
      const idx = prev.findIndex((b) => b.id === id);
      if (idx > 0) {
        const arr = [...prev];
        const [m] = arr.splice(idx, 1);
        arr.splice(idx - 1, 0, m);
        return arr;
      }
      return prev;
    });
  };
  const handleMoveDown = (id: string) => {
    setBlocks((prev) => {
      const idx = prev.findIndex((b) => b.id === id);
      if (idx >= 0 && idx < prev.length - 1) {
        const arr = [...prev];
        const [m] = arr.splice(idx, 1);
        arr.splice(idx + 1, 0, m);
        return arr;
      }
      return prev;
    });
  };

  // Changer type bloc
  const handleTypeChange = (id: string, newType: BlockType) => {
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        if (newType === 'table') return createEmptyTable();
        if (newType === 'list')
          return {
            id,
            type: 'list',
            items: [{ id: generateItemId(), text: '' }],
          };
        const content = (b as HeadingBlock | ParagraphBlock).content || '';
        return { id, type: newType, content } as HeadingBlock | ParagraphBlock;
      })
    );
  };

  // Texte pour H1/H2/H3/paragraph
  const handleTextChange = (id: string, text: string) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === id && 'content' in b ? { ...b, content: text } : b
      )
    );
  };

  // Liste
  const handleListItemChange = (bid: string, idx: number, text: string) =>
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === bid && b.type === 'list'
          ? {
              ...b,
              items: b.items.map((it, i) => (i === idx ? { ...it, text } : it)),
            }
          : b
      )
    );
  const handleAddListItem = (bid: string) =>
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === bid && b.type === 'list'
          ? { ...b, items: [...b.items, { id: generateItemId(), text: '' }] }
          : b
      )
    );
  const handleRemoveListItem = (bid: string, idx: number) =>
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === bid && b.type === 'list'
          ? { ...b, items: b.items.filter((_, i) => i !== idx) }
          : b
      )
    );

  // Tableau
  const handleTableHeaderChange = (bid: string, col: number, text: string) =>
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id !== bid || b.type !== 'table') return b;
        const headers = [...b.headers];
        headers[col].content = text;
        return { ...b, headers };
      })
    );
  const handleAddTableColumn = (bid: string) =>
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === bid && b.type === 'table'
          ? {
              ...b,
              headers: [...b.headers, { id: generateItemId(), content: '' }],
              rows: b.rows.map((r) => ({
                ...r,
                cells: [...r.cells, { id: generateItemId(), content: '' }],
              })),
            }
          : b
      )
    );
  const handleRemoveTableColumn = (bid: string, col: number) =>
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === bid && b.type === 'table'
          ? {
              ...b,
              headers: b.headers.filter((_, i) => i !== col),
              rows: b.rows.map((r) => ({
                ...r,
                cells: r.cells.filter((_, i) => i !== col),
              })),
            }
          : b
      )
    );
  const handleTableCellChange = (
    bid: string,
    ridx: number,
    cidx: number,
    text: string
  ) =>
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id !== bid || b.type !== 'table') return b;
        const rows = [...b.rows];
        rows[ridx].cells[cidx].content = text;
        return { ...b, rows };
      })
    );
  const handleAddTableRow = (bid: string) =>
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === bid && b.type === 'table'
          ? {
              ...b,
              rows: [
                ...b.rows,
                {
                  id: generateBlockId(),
                  cells: b.headers.map(() => ({
                    id: generateItemId(),
                    content: '',
                  })),
                },
              ],
            }
          : b
      )
    );
  const handleRemoveTableRow = (bid: string, idx: number) =>
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === bid && b.type === 'table'
          ? { ...b, rows: b.rows.filter((_, i) => i !== idx) }
          : b
      )
    );

  // Sauvegarde
  const handleSave = () => {
    const content = blocks.map((b) => {
      if (b.type === 'table')
        return {
          type: 'table' as const,
          headers: b.headers.map((h) => h.content),
          rows: b.rows.map((r) => r.cells.map((c) => c.content)),
        };
      if (b.type === 'list')
        return { type: 'list' as const, items: b.items.map((i) => i.text) };
      return {
        type: b.type as 'h1' | 'h2' | 'h3' | 'paragraph',
        content: (b as any).content,
      };
    });
    const data = {
      title: title,
      subCategoryName: newSubCategory || subCategory,
      pageParent: pageParent,
      content,
    };
    onSave ? onSave(data) : console.log('Saved', data);
  };

  const [title, setTitle] = useState(initialTitle);
  const [pageParent, setPageParent] = useState(initialPageParent);
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState('');
  const [newSubCategory, setNewSubCategory] = useState('');
  useEffect(() => {
    if (!pageParent) return;
    fetch(`/api/subcategories?parent=${pageParent}`)
      .then((res) => res.json())
      .then((data) => setSubCategories(data.map((s: any) => s.name)));
  }, [pageParent]);
  useEffect(() => {
    console.log(subCategories, initialSubCategory);

    if (
      initialSubCategory &&
      subCategories.includes(initialSubCategory.trim())
    ) {
      setSubCategory(initialSubCategory.trim());
    } else {
      setSubCategory('');
    }
  }, [initialSubCategory, subCategories]);

  return (
    <div className="px-5">
      <div className="border shadow-xl max-w-7xl bg-white p-10 mx-auto rounded-[3rem]">
        {/* Titre */}
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-4  shadow-sm text-lg py-3 rounded-3xl"
            placeholder="Titre (ne s'affiche pas)"
          />
        </div>

        {/* Page parent */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Page associée
          </label>
          <select
            value={pageParent}
            onChange={(e) => setPageParent(e.target.value)}
            className="w-full border px-4 shadow-sm py-3 rounded-3xl"
          >
            <option value="agent">Agent sportifs</option>
            <option value="amateur">Foot Amateur</option>
            <option value="pro">Foot Pro</option>
            <option value="management">Management</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-md font-medium mb-1">
            Sous-rubrique :
          </label>
          <select
            value={subCategories}
            onChange={(e) => setSubCategory(e.target.value)}
            className="shadow-sm border px-4 py-3 rounded-3xl"
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
            className=" text-md border px-4 py-3 rounded-3xl shadow-sm"
            onChange={(e) => setNewSubCategory(e.target.value)}
          />
        </div>

        {/* Blocs */}
        {blocks.map((block, idx) => (
          <div key={block.id} className="mb-4 p-4 border rounded-3xl bg-white">
            <div className="flex justify-between items-center mb-2">
              <select
                value={block.type}
                onChange={(e) =>
                  handleTypeChange(block.id, e.target.value as BlockType)
                }
                className="border px-3 py-2 rounded-3xl"
              >
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
                <option value="paragraph">Paragraphe</option>
                <option value="list">Liste</option>
                <option value="table">Tableau</option>
              </select>
              <div className="space-x-2">
                {idx > 0 && (
                  <button
                    onClick={() => handleMoveUp(block.id)}
                    className="px-3 py-2 bg-gray-200 rounded-3xl"
                  >
                    ↑
                  </button>
                )}
                {idx < blocks.length - 1 && (
                  <button
                    onClick={() => handleMoveDown(block.id)}
                    className="px-3 py-2 bg-gray-200 rounded-3xl"
                  >
                    ↓
                  </button>
                )}
                <button
                  onClick={() => handleRemoveBlock(block.id)}
                  className="px-3 py-2 bg-red-200 rounded-3xl"
                >
                  ✕
                </button>
              </div>
            </div>

            {block.type === 'list' ? (
              <div className="ml-6">
                {block.items.map((it, i) => (
                  <div key={it.id} className="flex items-center mb-2">
                    <span className="mr-2">•</span>
                    <input
                      type="text"
                      value={it.text}
                      onChange={(e) =>
                        handleListItemChange(block.id, i, e.target.value)
                      }
                      className="flex-1  border-b border-gray-400 focus:outline-none"
                      placeholder={`Élément ${i + 1}`}
                    />
                    <button
                      onClick={() => handleRemoveListItem(block.id, i)}
                      className="ml-2 text-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddListItem(block.id)}
                  className="text-sm text-blue-600"
                >
                  + Ajouter un élément
                </button>
              </div>
            ) : block.type === 'table' ? (
              <div className="overflow-auto rounded-3xl border border-gray-300">
                <table className="w-full border-separate border-spacing-0">
                  <thead>
                    <tr>
                      {block.headers.map((h, c) => (
                        <th key={h.id} className="border  p-2">
                          <input
                            type="text"
                            value={h.content}
                            onChange={(e) =>
                              handleTableHeaderChange(
                                block.id,
                                c,
                                e.target.value
                              )
                            }
                            className="w-full px-2"
                            placeholder={`Entête ${c + 1}`}
                          />
                          <button
                            onClick={() => handleRemoveTableColumn(block.id, c)}
                            className="text-red-600 ml-1"
                          >
                            ✕
                          </button>
                        </th>
                      ))}
                      <th className="p-2">
                        <button
                          onClick={() => handleAddTableColumn(block.id)}
                          className="text-blue-600"
                        >
                          + Colonne
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((r, ridx) => (
                      <tr key={r.id}>
                        {r.cells.map((c, cidx) => (
                          <td key={c.id} className="border p-2">
                            <input
                              type="text"
                              value={c.content}
                              onChange={(e) =>
                                handleTableCellChange(
                                  block.id,
                                  ridx,
                                  cidx,
                                  e.target.value
                                )
                              }
                              className="w-full"
                            />
                          </td>
                        ))}
                        <td className="p-2">
                          <button
                            onClick={() => handleRemoveTableRow(block.id, ridx)}
                            className="text-red-600"
                          >
                            Supprimer ligne
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={block.headers.length + 1} className="p-2">
                        <button
                          onClick={() => handleAddTableRow(block.id)}
                          className="text-blue-600"
                        >
                          + Ajouter une ligne
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <>
                {block.type === 'paragraph' ? (
                  <textarea
                    value={(block as ParagraphBlock).content}
                    onChange={(e) => handleTextChange(block.id, e.target.value)}
                    className="w-full border rounded-3xl px-3 py-2"
                    rows={3}
                    placeholder="Paragraphe..."
                  />
                ) : (
                  <input
                    type="text"
                    value={(block as HeadingBlock).content}
                    onChange={(e) => handleTextChange(block.id, e.target.value)}
                    className="w-full border rounded-3xl px-3 py-2 text-xl font-semibold"
                    placeholder={
                      block.type === 'h1'
                        ? 'Titre principal...'
                        : block.type === 'h2'
                        ? 'Sous-titre...'
                        : 'Sous-sous-titre...'
                    }
                  />
                )}
              </>
            )}
          </div>
        ))}

        {/* Ajouter un bloc */}
        <div className="mt-2">
          <select
            value={newBlockType}
            onChange={(e) => setNewBlockType(e.target.value as BlockType)}
            className="border px-3 py-2 rounded-3xl"
          >
            <option value="paragraph">Paragraphe</option>
            <option value="h1">Titre principal (H1)</option>
            <option value="h2">Sous-titre (H2)</option>
            <option value="h3">Sous-sous-titre (H3)</option>
            <option value="list">Liste à puces</option>
            <option value="table">Tableau</option>
          </select>
          <button
            onClick={() => handleAddBlock(newBlockType)}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-3xl"
          >
            Ajouter un bloc
          </button>
        </div>

        {/* Bouton Enregistrer */}
        <button
          onClick={handleSave}
          className="mt-4 px-5 py-3 bg-green-600 text-white rounded-3xl"
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
};

export default ArticleEditor;
