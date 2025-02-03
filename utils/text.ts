export const capitalizeWords = (text: string) => {
    if(!text) return ""; 
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  export const getInitials = (name?: string | null) => {
    if (!name) return "UN";
  
    const initials = name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  
    return initials.slice(0, 2) || "UN";
  };
  export function isOnlyEmoji(text: string): boolean {
    const chars = [...text.trim()];
      const emojiRegex = /\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{Emoji_Modifier_Base}|\p{Emoji_Component}/u;
    return chars.length === 1 && emojiRegex.test(chars[0]);
  }