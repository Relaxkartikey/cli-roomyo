import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import CodeBlock from '@tiptap/extension-code-block';
import Placeholder from '@tiptap/extension-placeholder';
import { 
  Bold, Italic, Heading, List, ListOrdered, Code, Link as LinkIcon, 
  Image as ImageIcon, Quote, Undo, Redo, FileText, ChevronDown
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface BlogEditorProps {
  content: string;
  onChange: (content: string) => void;
}

// Predefined templates
const contentTemplates = [
  {
    name: "Introduction Block",
    content: `<h2>Introduction</h2>
<p>This is an introduction paragraph that sets the context for your blog post. Explain what readers will learn and why it matters to them.</p>`
  },
  {
    name: "How-To Section",
    content: `<h2>How To Get Started</h2>
<p>Follow these steps to achieve your goal:</p>
<ol>
  <li>First step with <strong>key points</strong> highlighted</li>
  <li>Second step with details and instructions</li>
  <li>Third step with additional information</li>
  <li>Final step with expected outcome</li>
</ol>`
  },
  {
    name: "Pros & Cons",
    content: `<h2>Pros and Cons</h2>
<h3>Pros:</h3>
<ul>
  <li><strong>Benefit 1</strong> - Explanation of the first benefit</li>
  <li><strong>Benefit 2</strong> - Explanation of the second benefit</li>
  <li><strong>Benefit 3</strong> - Explanation of the third benefit</li>
</ul>
<h3>Cons:</h3>
<ul>
  <li><strong>Drawback 1</strong> - Explanation of the first drawback</li>
  <li><strong>Drawback 2</strong> - Explanation of the second drawback</li>
  <li><strong>Drawback 3</strong> - Explanation of the third drawback</li>
</ul>`
  },
  {
    name: "FAQ Section",
    content: `<h2>Frequently Asked Questions</h2>
<h3>Question 1?</h3>
<p>Detailed answer to the first question that provides value to the reader and addresses common concerns.</p>
<h3>Question 2?</h3>
<p>Detailed answer to the second question with examples and explanations.</p>
<h3>Question 3?</h3>
<p>Detailed answer to the third question that offers solutions and best practices.</p>`
  },
  {
    name: "Call to Action",
    content: `<h2>Next Steps</h2>
<p>Now that you understand the topic, here's what you can do next:</p>
<ol>
  <li>Take the first action step</li>
  <li>Consider these options</li>
  <li>Implement the solution</li>
</ol>
<p><strong>Contact us today</strong> to learn more about how we can help with your specific needs.</p>`
  },
  {
    name: "Comparison Table",
    content: `<h2>Comparison of Options</h2>
<table style="width:100%; border-collapse: collapse; margin: 15px 0;">
  <thead>
    <tr style="background-color: #f3f4f6; border-bottom: 2px solid #e5e7eb;">
      <th style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;">Feature</th>
      <th style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;">Option A</th>
      <th style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;">Option B</th>
      <th style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;">Option C</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;"><strong>Price</strong></td>
      <td style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;">$$$</td>
      <td style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;">$$</td>
      <td style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;">$</td>
    </tr>
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;"><strong>Quality</strong></td>
      <td style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;">High</td>
      <td style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;">Medium</td>
      <td style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;">Low</td>
    </tr>
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;"><strong>Features</strong></td>
      <td style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;">All</td>
      <td style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;">Most</td>
      <td style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;">Basic</td>
    </tr>
  </tbody>
</table>`
  },
  {
    name: "Key Takeaways",
    content: `<h2>Key Takeaways</h2>
<div style="background-color: #f8f9fa; border-left: 4px solid #4f46e5; padding: 16px; margin: 20px 0; border-radius: 4px;">
  <ul>
    <li><strong>First key point</strong> - Summary of the first important takeaway</li>
    <li><strong>Second key point</strong> - Summary of the second important takeaway</li>
    <li><strong>Third key point</strong> - Summary of the third important takeaway</li>
    <li><strong>Fourth key point</strong> - Summary of the fourth important takeaway</li>
  </ul>
</div>`
  },
  {
    name: "Conclusion",
    content: `<h2>Conclusion</h2>
<p>In conclusion, we've covered the main points about this topic including [key point 1], [key point 2], and [key point 3]. Remember that [important reminder].</p>
<p>If you found this information helpful, please share it with others who might benefit. And don't forget to explore our other resources on related topics.</p>`
  },
];

const MenuButton = ({ 
  onClick, 
  isActive = false, 
  disabled = false,
  title,
  children 
}: { 
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`p-2 rounded hover:bg-gray-200 transition-colors ${
      isActive ? 'bg-gray-200 text-primary' : 'text-gray-700'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    title={title}
    disabled={disabled}
  >
    {children}
  </button>
);

const BlogEditor = ({ content, onChange }: BlogEditorProps) => {
  const [showTemplates, setShowTemplates] = useState(false);
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        }
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline'
        }
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-4'
        }
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'bg-gray-100 rounded-md p-4 font-mono text-sm my-4'
        }
      }),
      Placeholder.configure({
        placeholder: 'Start writing your blog content here...',
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none'
      }
    }
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return <div className="animate-pulse h-64 bg-gray-100 rounded-lg"></div>;
  }

  const addImage = () => {
    const url = window.prompt('Enter the image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt('Enter the URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };
  
  const insertTemplate = (templateContent: string) => {
    try {
      // Get current cursor position
      const currentPos = editor.view.state.selection.head;
      
      // Insert template content at cursor position
      editor.chain().focus().insertContentAt(currentPos, templateContent).run();
      
      // Close the template dropdown
      setShowTemplates(false);
    } catch (error) {
      console.error("Error inserting template:", error);
      // Fallback method if the first approach fails
      editor.commands.setContent(editor.getHTML() + templateContent);
      setShowTemplates(false);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Main Toolbar */}
      <div className="border-b border-gray-300 bg-gray-50 p-2 flex flex-wrap gap-1">
        <div className="flex items-center gap-1 pr-2 border-r border-gray-300">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-gray-300">
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive('heading', { level: 1 })}
            title="Heading 1"
          >
            <span className="text-sm font-bold">H1</span>
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
            title="Heading 2"
          >
            <span className="text-sm font-bold">H2</span>
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive('heading', { level: 3 })}
            title="Heading 3"
          >
            <span className="text-sm font-bold">H3</span>
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-gray-300">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-gray-300">
          <MenuButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive('codeBlock')}
            title="Code Block"
          >
            <Code className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-gray-300">
          <MenuButton
            onClick={addLink}
            isActive={editor.isActive('link')}
            title="Add Link"
          >
            <LinkIcon className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={addImage}
            title="Add Image"
          >
            <ImageIcon className="w-4 h-4" />
          </MenuButton>
        </div>

        {/* Templates Dropdown */}
        <div className="flex items-center gap-1 px-2 border-r border-gray-300 relative">
          <div className="relative">
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="flex items-center gap-1 p-2 rounded hover:bg-gray-200 transition-colors"
              title="Insert Template"
            >
              <FileText className="w-4 h-4" />
              <span className="text-sm">Templates</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            
            {showTemplates && (
              <div className="absolute top-full left-0 mt-1 z-10 bg-white rounded-md shadow-lg border border-gray-200 py-1 w-64">
                {contentTemplates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => insertTemplate(template.content)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {template.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <MenuButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </MenuButton>
        </div>
      </div>

      {/* Editor Content */}
      <div className="p-4 min-h-[400px] max-h-[600px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default BlogEditor; 