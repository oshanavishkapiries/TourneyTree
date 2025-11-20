"use client";
import type { FC } from "react";
import { useState } from "react";
import { Rect, Group, Text, Line } from "react-konva";
import type { KonvaColors } from "../hooks/useKonvaColors";

interface KonvaCardProps {
  x: number;
  y: number;
  colors: KonvaColors;
  seed: string;
  player1: string;
  player2?: string;
  winner?: string;
  isBye?: boolean;
  matchNumber: number;
  cardIndex?: number;
  isHighlighted?: boolean;
  onMouseEnter?: (cardIndex: number) => void;
  onMouseLeave?: () => void;
  onViewClick?: (matchData: {
    seed: string;
    player1: string;
    player2: string;
  }) => void;
}

export const KonvaCard: FC<KonvaCardProps> = ({
  x,
  y,
  colors,
  seed,
  player1,
  player2,
  winner,
  isBye,
  matchNumber,
  cardIndex = 0,
  isHighlighted = false,
  onMouseEnter,
  onMouseLeave,
  onViewClick,
}) => {
  // State for hover effects
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  // Card dimensions and layout
  const cardWidth = 300;
  const cardHeight = isBye ? 70 : 100; // Reduced height for Bye cards
  const cornerRadius = 12;
  const padding = 10;
  const textPaddingX = 12;

  // Derived layout properties
  const headerHeight = 30;
  const separatorPoints = [0, headerHeight, cardWidth, headerHeight];

  const seedTextY = padding;
  const seedFontSize = 12;

  const playerContentY = headerHeight;
  const playerText1Y = playerContentY + 10; // 40
  const playerText2Y = playerContentY + 35; // 65
  const playerFontSize = 15;

  const buttonHeight = 45;
  const buttonWidth = (cardWidth - padding * 2) / 4;
  const buttonX = cardWidth - buttonWidth - padding;
  const buttonY = playerText1Y;
  const buttonCornerRadius = buttonHeight / 5;

  // Dynamic properties based on hover state
  const cardStrokeWidth = isCardHovered || isHighlighted ? 3 : 3;
  const cardStroke = isHighlighted
    ? colors.primary
    : isCardHovered
      ? colors.primary
      : colors.border;
  const cardShadowBlur = isHighlighted ? 0 : 0;
  const buttonOpacity = isButtonHovered ? 0.9 : 1;

  const handleCardMouseEnter = () => {
    setIsCardHovered(true);
    const container = document.querySelector("canvas")?.parentElement;
    if (container) {
      container.style.cursor = "pointer";
    }

    // Call parent's onMouseEnter with cardIndex
    if (onMouseEnter && cardIndex !== undefined) {
      onMouseEnter(cardIndex);
    }
  };

  const handleCardMouseLeave = () => {
    setIsCardHovered(false);
    const container = document.querySelector("canvas")?.parentElement;
    if (container) {
      container.style.cursor = "default";
    }

    // Call parent's onMouseLeave
    if (onMouseLeave) {
      onMouseLeave();
    }
  };

  const handleButtonMouseEnter = () => {
    setIsButtonHovered(true);
  };

  const handleButtonMouseLeave = () => {
    setIsButtonHovered(false);
  };

  return (
    <Group
      x={x}
      y={y}
      onMouseEnter={handleCardMouseEnter}
      onMouseLeave={handleCardMouseLeave}
    // draggable
    >
      {/* Card Background */}
      <Rect
        width={cardWidth}
        height={cardHeight}
        fill={colors.card}
        stroke={cardStroke}
        strokeWidth={cardStrokeWidth}
        cornerRadius={cornerRadius}
        shadowBlur={cardShadowBlur}
        shadowColor={isHighlighted ? colors.primary : "transparent"}
      />

      {/* Seed Text */}
      <Text
        x={textPaddingX}
        y={seedTextY}
        text={`Seed: ${seed}`}
        fontSize={seedFontSize}
        fontFamily="Arial, sans-serif"
        fill={colors.mutedForeground}
        width={cardWidth}
        align="left"
      />

      {/* Match Number */}
      <Text
        x={cardWidth - 60}
        y={seedTextY}
        text={`#${matchNumber}`}
        fontSize={seedFontSize}
        fontFamily="Arial, sans-serif"
        fill={colors.mutedForeground}
        width={50}
        align="right"
      />

      {/* Separator Line */}
      <Line points={separatorPoints} stroke={colors.border} strokeWidth={1} />

      {/* Player 1 Name */}
      <Text
        x={textPaddingX}
        y={playerText1Y}
        text={player1}
        fontSize={playerFontSize}
        fontFamily="Arial, sans-serif"
        fontStyle=""
        fill={colors.cardForeground}
        width={cardWidth}
        align="left"
      />
      {winner === player1 && !isBye && (
        <Text
          x={textPaddingX + 150}
          y={playerText1Y}
          text="WIN"
          fontSize={14}
          fontFamily="Arial, sans-serif"
        />
      )}

      {/* Player 2 Name */}
      {!isBye && player2 && (
        <>
          <Text
            x={textPaddingX}
            y={playerText2Y}
            text={player2}
            fontSize={playerFontSize}
            fontFamily="Arial, sans-serif"
            fill={colors.cardForeground}
            width={cardWidth}
            align="left"
          />
          {winner === player2 && (
            <Text
              x={textPaddingX + 150}
              y={playerText2Y}
              text="WIN"
              fontSize={14}
              fontFamily="Arial, sans-serif"
            />
          )}
        </>
      )
      }

      {/* View ScoreBoard Button - Hide for Bye matches */}
      {
        !isBye && (
          <Group
            x={buttonX}
            y={buttonY}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
            onClick={(e: any) => {
              e.cancelBubble = true;
              onViewClick?.({
                seed,
                player1,
                player2: player2 || "",
              });
            }}
            onTap={(e: any) => {
              e.cancelBubble = true;
              onViewClick?.({
                seed,
                player1,
                player2: player2 || "",
              });
            }}
            opacity={buttonOpacity}
          >
            <Rect
              width={buttonWidth}
              height={buttonHeight}
              fill={colors.primary}
              cornerRadius={buttonCornerRadius}
            />
            <Text
              text="View"
              fontSize={12}
              fontFamily="Arial, sans-serif"
              fill={colors.primaryForeground}
              width={buttonWidth}
              height={buttonHeight}
              align="center"
              verticalAlign="middle"
            />
          </Group>
        )
      }
    </Group >
  );
};
