import { Smile } from 'lucide-react';
import { Emoji } from '@/types';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { MessageEmoji } from './message-emoji';

type EmojiDropdownProps = {
  onEmojiSelect: (emoji: Emoji) => void;
};

export const EmojiDropdown = ({ onEmojiSelect }: EmojiDropdownProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Smile size={24} className="text-gray-800 dark:text-muted-foreground" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" className="z-40 mb-6">
      <MessageEmoji onHandleEmoji={onEmojiSelect} />
    </DropdownMenuContent>
  </DropdownMenu>
);
