export function parseItemStack(itemString: string): { raw: string, item: string, count: number } {
    let raw = "unknown_item";
    let item = "Unknown Item";
    let count = 0;
    
    // Match pattern: ItemStack{ITEM_NAME x NUMBER}
    const regex = /ItemStack\{([A-Z_]+) x (\d+)(?:,.*?)?\}/;
    const match = itemString.match(regex);
    
    if (match && match.length >= 3) {
      const toSplit = match[1].split('_');
      
      raw = toSplit.join('_').toLowerCase();
      
      item = toSplit
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      
      count = parseInt(match[2], 10);
    }
    
    return { raw, item, count };
}