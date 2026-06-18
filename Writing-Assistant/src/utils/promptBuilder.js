export function buildPrompt(template, variables) {
  // Replace placeholders in template with variables
  return template.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
    return variables[varName] || match
  })
}

export const defaultTemplates = {
  explain: "Explain {{topic}} in simple terms",
  summarize: "Summarize the following text: {{text}}",
  translate: "Translate this to {{language}}: {{text}}"
}