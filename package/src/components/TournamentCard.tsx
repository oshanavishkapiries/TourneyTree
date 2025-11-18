import React, { FC, useState } from 'react';
import { Rect, Group, Text, Line } from 'react-konva';
import { Match, ColorTheme } from '../types';

interface TournamentCardProps {
  x: number;
  y: number;
  match: Match;
  colors: ColorTheme;
  width?: number;
  height?: number;
  cardIndex?: number;
  isHighlighted?: boolean;
  onMouseEnter?: (cardIndex: number) => void;
  onMouseLeave?: () => void;
  onClick?: (match: Match, roundIndex: number, matchIndex: number) => void;
  roundIndex?: number;
  matchIndex?: number;
  showViewButton?: boolean;
}

export const TournamentCard: FC<TournamentCardProps> = ({
  x,
  y,
  match,
  colors,
  width = 300,
  height = 100,
  cardIndex = 0,
  isHighlighted = false,
  onMouseEnter,
  onMouseLeave,
  onClick,
  roundIndex = 0,
  matchIndex = 0,
  showViewButton = true,
}) => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  // Layout calculations
  const cornerRadius = 12;
  const padding = 10;
  const textPaddingX = 12;
  const headerHeight = 30;
  const seedFontSize = 12;
  const playerFontSize = 15;

  // Button layout
  const buttonHeight = 45;
  const buttonWidth = (width - padding * 2) / 4;
  const buttonX = width - buttonWidth - padding;
  const buttonY = headerHeight + 10;
  const buttonCornerRadius = buttonHeight / 5;

  // Dynamic styles
  const cardStrokeWidth = isCardHovered || isHighlighted ? 3 : 2;
  const cardStroke = isHighlighted ? colors.highlight : isCardHovered ? colors.highlight : colors.border;
  const buttonOpacity = isButtonHovered ? 0.9 : 1;

  const handleCardMouseEnter = () => {
    setIsCardHovered(true);
    if (onMouseEnter) {
      onMouseEnter(cardIndex);
    }
  };

  const handleCardMouseLeave = () => {
    setIsCardHovered(false);
    if (onMouseLeave) {
      onMouseLeave();
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(match, roundIndex, matchIndex);
    }
  };

  return (
    <Group
      x={x}
      y={y}
      onMouseEnter={handleCardMouseEnter}
      onMouseLeave={handleCardMouseLeave}
      onClick={handleCardClick}
    >
      {/* Card Background */}
      <Rect
        width={width}
        height={height}
        fill={colors.background}
        stroke={cardStroke}
        strokeWidth={cardStrokeWidth}
        cornerRadius={cornerRadius}
        shadowBlur={isHighlighted ? 5 : 0}
        shadowColor={colors.highlight}
      />

      {/* Seed Text */}
      <Text
        x={textPaddingX}
        y={padding}
        text={`Seed: ${match.seed}`}
        fontSize={seedFontSize}
        fontFamily="Arial, sans-serif"
        fill={colors.text}
        width={width - textPaddingX * 2}
        align="left"
      />

      {/* Separator Line */}
      <Line 
        points={[0, headerHeight, width, headerHeight]} 
        stroke={colors.border} 
        strokeWidth={1} 
      />

      {/* Player 1 Name */}
      <Text
        x={textPaddingX}
        y={headerHeight + 10}
        text={match.player1}
        fontSize={playerFontSize}
        fontFamily="Arial, sans-serif"
        fill={colors.text}
        width={showViewButton ? width - buttonWidth - textPaddingX * 2 - padding : width - textPaddingX * 2}
        align="left"
      />

      {/* Player 2 Name */}
      <Text
        x={textPaddingX}
        y={headerHeight + 35}
        text={match.player2}
        fontSize={playerFontSize}
        fontFamily="Arial, sans-serif"
        fill={colors.text}
        width={showViewButton ? width - buttonWidth - textPaddingX * 2 - padding : width - textPaddingX * 2}
        align="left"
      />

      {/* View Button */}
      {showViewButton && (
        <Group
          x={buttonX}
          y={buttonY}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          opacity={buttonOpacity}
        >
          <Rect
            width={buttonWidth}
            height={buttonHeight}
            fill={colors.highlight}
            cornerRadius={buttonCornerRadius}
          />
          <Text
            text="View"
            fontSize={12}
            fontFamily="Arial, sans-serif"
            fill={colors.background}
            width={buttonWidth}
            height={buttonHeight}
            align="center"
            verticalAlign="middle"
          />
        </Group>
      )}
    </Group>
  );
};