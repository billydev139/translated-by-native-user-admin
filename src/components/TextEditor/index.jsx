import { forwardRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';

const Block = Quill.import('blots/block');
class Blockquote extends Block {
  static create(value) {
    const node = super.create(value);
    node.setAttribute('class', 'blockquote');
    return node;
  }
}
Quill.register(Blockquote);

const TextEditor = (
  { height, onChange, label, placeholder, id, name, value, readOnly },
  ref
) => {
  const modules = {
    toolbar: [
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
        { align: [] },
      ],
      [
        {
          color: [
            '#000000',
            '#e60000',
            '#ff9900',
            '#ffff00',
            '#008a00',
            '#0066cc',
            '#9933ff',
            '#ffffff',
            '#facccc',
            '#ffebcc',
            '#ffffcc',
            '#cce8cc',
            '#cce0f5',
            '#ebd6ff',
            '#bbbbbb',
            '#f06666',
            '#ffc266',
            '#ffff66',
            '#66b966',
            '#66a3e0',
            '#c285ff',
            '#888888',
            '#a10000',
            '#b26b00',
            '#b2b200',
            '#006100',
            '#0047b2',
            '#6b24b2',
            '#444444',
            '#5c0000',
            '#663d00',
            '#666600',
            '#003700',
            '#002966',
            '#3d1466',
            'custom-color',
          ],
        },
      ],
    ],
  };

  const formats = [
    'header',
    'height',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'color',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'size',
  ];

  return (
    <div className='w-full mb-3' ref={ref}>
      <label htmlFor={id} className='mb-2.5 block text-black'>
        {label}
      </label>
      <ReactQuill
        id={id}
        theme='snow'
        name={name}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
        style={{ height: `${height || 150}px`, marginBottom: '55px' }}
      />
    </div>
  );
};

export default forwardRef(TextEditor);
