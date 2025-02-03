import React from 'react';
import Image from 'next/image';

interface AvatarStackProps {
  users?: number;
  size?: number;
}

const AvatarStackWithProps: React.FC<AvatarStackProps> = ({
  users = 4,
  size = 32,
}) => {
  // Usando Unsplash para fotos reales de personas
  const getRandomAvatar = (index: number) => 
    `https://images.unsplash.com/photo-${[
      '1438761681033-6461ffad8d80', // mujer sonriendo
      '1494790108377-be9c29b29330', // mujer profesional
      '1507003211169-0a1dd7228f2d', // hombre sonriendo
      '1500648767791-00dcc994a43e', // hombre joven
      '1534528741775-53994a69daeb', // mujer elegante
      '1539571696357-5a69c17a67c6'  // hombre con gafas
    ][index % 6]}?auto=format&fit=crop&w=${size}&h=${size}`;

  return (
    <div className="flex -space-x-2">
      {Array.from({ length: users }, (_, i) => i + 1).map((i) => (
        <div
          key={i}
          className="relative rounded-full overflow-hidden border-2 border-background hover:z-10 transition-transform hover:scale-110"
          style={{ width: size, height: size }}
        >
          <Image
            src={getRandomAvatar(i)}
            alt={`User ${i}`}
            width={size}
            height={size}
            className="object-cover"
            priority={i === 1}
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarStackWithProps;