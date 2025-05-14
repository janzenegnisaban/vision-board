import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, ThumbsUp, Smile } from 'lucide-react';

interface ReactionButtonProps {
  type: 'like' | 'love' | 'laugh';
  count: number;
  isReacted: boolean;
  onReact: () => Promise<void>;
}

const reactionIcons = {
  like: ThumbsUp,
  love: Heart,
  laugh: Smile,
};

export function ReactionButton({
  type,
  count,
  isReacted,
  onReact,
}: ReactionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const Icon = reactionIcons[type];

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await onReact();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={isReacted ? 'default' : 'outline'}
      size="sm"
      onClick={handleClick}
      disabled={isLoading}
      className="gap-2"
    >
      <Icon className="h-4 w-4" />
      <span>{count}</span>
    </Button>
  );
} 