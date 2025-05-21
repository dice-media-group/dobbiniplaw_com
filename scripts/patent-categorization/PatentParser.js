// PatentParser.js
// Parser for patent data from TrophyWall text

export class PatentParser {
  /**
   * Parse patent list from the extracted text
   * @param {string} text - Extracted text from PDF
   * @returns {Array} Array of patent objects
   */
  parsePatentsList(text) {
    const patents = [];
    const lines = text.split('\n');
    let currentPatent = null;
    
    // Regular expression to match patent entries
    // Format: <index> <doc-id> <date> <title> <image-pages>
    const patentRegex = /^(\d+)\s+(US-[\d]+-[A-Z]\d+)\s+(\d{4}-\d{2}-\d{2})\s+(.+?)\s+(\d+)$/;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip empty lines or page markers
      if (!line || line.match(/^\d+\/\d+\/\d+ \d+:\d+:\d+ [AP]M$/)) {
        continue;
      }
      
      // Check if line matches patent entry pattern
      const patentMatch = line.match(patentRegex);
      
      if (patentMatch) {
        // We found a new patent entry
        const [_, index, docId, date, title, imagePages] = patentMatch;
        
        currentPatent = {
          index: parseInt(index),
          id: docId,
          publicationDate: date,
          title: title.trim(),
          imagePages: parseInt(imagePages)
        };
        
        patents.push(currentPatent);
      } else if (currentPatent) {
        // This might be a continuation of the title from the previous line
        // We'll append it to the current patent's title if it doesn't look like a page number or timestamp
        if (!line.match(/^\d+\/\d+\/\d+ \d+:\d+:\d+ [AP]M$/)) {
          currentPatent.title += ' ' + line;
        }
      }
    }
    
    return patents;
  }

  /**
   * Generate a sample of patents.txt for testing
   * @param {string} outputDir - Directory to save the sample
   * @returns {Promise<string>} Path to the sample file
   */
  async generateTrophyWallTextSample(outputDir) {
    // Create a sample based on what we've seen in the TrophyWall.pdf
    const sampleContent = `List of Selected Search Result Documents
# Doc ID 
Date
Published 
Title 
Image
Pages
1 US-12270996-B2 2025-04-08 Electronic loupe 15
2 US-12260863-B1 2025-03-25
Method and system for providing
assistance for cognitively
impaired users by utilizing
artifical intelligence
18
3 US-12243306-B1 2025-03-04
System, method, and device to
proactively detect in real time
one or more threats in crowded
areas
22
4 US-12108227-B2 2024-10-01
System and method for
adjusting audio parameters for a
user
12
5 US-12090381-B2 2024-09-17 
Head target for martial arts
practice 
11
5/2/2025 03:02:55 PM`;

    const fs = await import('fs');
    const path = await import('path');
    
    const sampleDir = path.join(outputDir, '../source examples');
    if (!fs.existsSync(sampleDir)) {
      fs.mkdirSync(sampleDir, { recursive: true });
    }
    
    const samplePath = path.join(sampleDir, 'TrophyWall.txt');
    fs.writeFileSync(samplePath, sampleContent);
    
    console.log('Created TrophyWall.txt sample for testing');
    return samplePath;
  }
}
