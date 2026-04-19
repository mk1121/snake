import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');
const GRID_SIZE = 20;
const CELL_SIZE = Math.floor((width * 0.9) / GRID_SIZE);
const BOARD_SIZE = CELL_SIZE * GRID_SIZE;

const INITIAL_SNAKE = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };

export default function App() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  const getRandomCoordinate = useCallback(() => ({
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  }), []);

  const resetGame = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(getRandomCoordinate());
    setScore(0);
    setIsGameOver(false);
  };

  useEffect(() => {
    if (isGameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + direction.x,
          y: head.y + direction.y,
        };

        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE ||
          prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
        ) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          setIsGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        if (newHead.x === food.x && newHead.y === food.y) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setScore((s) => s + 1);
          setFood(getRandomCoordinate());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const intervalId = setInterval(moveSnake, Math.max(50, 200 - level * 20));
    return () => clearInterval(intervalId);
  }, [direction, food, isGameOver, getRandomCoordinate, level]);

  const handlePress = (newDirection) => {
    if ((newDirection.x !== 0 && direction.x === 0) || (newDirection.y !== 0 && direction.y === 0)) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setDirection(newDirection);
    }
  };

  const changeLevel = (delta) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLevel(prev => Math.min(10, Math.max(1, prev + delta)));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerText}>SCORE: {score}</Text>
        <View style={styles.levelContainer}>
          <TouchableOpacity 
            onPress={() => changeLevel(-1)}
            style={styles.levelButton}
          >
            <Text style={styles.levelButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>LVL: {level}</Text>
          <TouchableOpacity 
            onPress={() => changeLevel(1)}
            style={styles.levelButton}
          >
            <Text style={styles.levelButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.board}>
        {snake.map((segment, index) => (
          <View
            key={index}
            style={[
              styles.snakeSegment,
              {
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
              },
            ]}
          />
        ))}
        <View
          style={[
            styles.food,
            {
              left: food.x * CELL_SIZE,
              top: food.y * CELL_SIZE,
            },
          ]}
        />
        {isGameOver && (
          <View style={styles.gameOverOverlay}>
            <Text style={styles.gameOverText}>GAME OVER</Text>
            <TouchableOpacity style={styles.button} onPress={resetGame}>
              <Text style={styles.buttonText}>RESTART</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.controls}>
        <View style={styles.controlRow}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => handlePress({ x: 0, y: -1 })}
          >
            <Text style={styles.controlIcon}>▲</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.controlRow}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => handlePress({ x: -1, y: 0 })}
          >
            <Text style={styles.controlIcon}>◀</Text>
          </TouchableOpacity>
          <View style={styles.controlSpacer} />
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => handlePress({ x: 1, y: 0 })}
          >
            <Text style={styles.controlIcon}>▶</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.controlRow}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => handlePress({ x: 0, y: 1 })}
          >
            <Text style={styles.controlIcon}>▼</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8bab3e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'monospace',
    marginHorizontal: 10,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  levelButton: {
    backgroundColor: '#000',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  levelButtonText: {
    color: '#8bab3e',
    fontSize: 20,
    fontWeight: 'bold',
  },
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    backgroundColor: '#98b64e',
    borderWidth: 2,
    borderColor: '#000',
    position: 'relative',
  },
  snakeSegment: {
    position: 'absolute',
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: '#000',
  },
  food: {
    position: 'absolute',
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: '#000',
    borderRadius: CELL_SIZE / 2,
  },
  gameOverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(152, 182, 78, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  gameOverText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    fontFamily: 'monospace',
  },
  button: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#8bab3e',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  controls: {
    marginTop: 40,
    alignItems: 'center',
  },
  controlRow: {
    flexDirection: 'row',
  },
  controlButton: {
    width: 60,
    height: 60,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 30,
  },
  controlIcon: {
    color: '#8bab3e',
    fontSize: 30,
  },
  controlSpacer: {
    width: 70,
  },
});
