export function summarizeText(text: string | undefined): string {
    if (!text) return "";
  
    // Split text into paragraphs based on new lines
    let paragraphs = text.split("\n").map((p) => p.trim()).filter((p) => p.length > 0);
  
    // Return only the first paragraph
    return paragraphs[0] || "";
  }
  