import { jsPDF } from 'jspdf'

export function exportToPDF(content, fileName = 'chat-export.pdf') {
  const doc = new jsPDF()

  // Split content into lines
  const lines = doc.splitTextToSize(content, 180)

  doc.text(lines, 10, 10)
  doc.save(fileName)
}