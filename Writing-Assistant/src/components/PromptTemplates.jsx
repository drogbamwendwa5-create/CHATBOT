import { Brain, FileText, Globe, PenLine, Sparkles } from 'lucide-react'

const templates = [
  { icon: Brain, label: "Explain like I'm 5" },
  { icon: FileText, label: 'Summarize this' },
  { icon: Globe, label: 'Translate to Spanish' },
  { icon: PenLine, label: 'Write a poem about' }
]

function PromptTemplates({ onSelect }) {
  const handleSelect = (template) => {
    onSelect && onSelect(template.label)
  }

  return (
    <div className="prompt-templates">
      <div className="prompt-header">
        <div>
          <div className="prompt-title">
            <Sparkles size={20} />
            <span> Quick Prompts</span>
          </div>
          <div className="prompt-subtitle">Start with a template</div>
        </div>
      </div>
      <div className="templates-grid">
        {templates.map((template, index) => {
          const Icon = template.icon
          return (
            <button
              key={index}
              className="template-button"
              onClick={() => handleSelect(template)}
            >
              <Icon size={24} />
              <span>{template.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default PromptTemplates