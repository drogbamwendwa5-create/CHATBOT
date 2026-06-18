function PromptTemplates({ onSelect }) {
  const templates = [
    { icon: '🧠', label: "Explain like I'm 5" },
    { icon: '📄', label: 'Summarize this' },
    { icon: '🌍', label: 'Translate to Spanish' },
    { icon: '📝', label: 'Write a poem about' }
  ]

  const handleSelect = (template) => {
    if (onSelect) {
      onSelect(template.label)
    }
  }

  return (
    <div className="prompt-templates">
      <div className="prompt-header">
        <div>
          <div className="prompt-title">✨ Quick Prompts</div>
          <div className="prompt-subtitle">Start with a template</div>
        </div>
      </div>
      <div className="templates-grid">
        {templates.map((template, index) => (
          <button key={index} className="template-button" onClick={() => handleSelect(template)}>
            <i>{template.icon}</i>
            <span>{template.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default PromptTemplates
