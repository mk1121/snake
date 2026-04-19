import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, FlatList, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [lastProcessedDirection, setLastProcessedDirection] = useState(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [username, setUsername] = useState('Player');
  const [isHapticEnabled, setIsHapticEnabled] = useState(true);
  const [scores, setScores] = useState([]);
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedScores = await AsyncStorage.getItem('scores');
      const savedUser = await AsyncStorage.getItem('username');
      const savedHaptic = await AsyncStorage.getItem('haptic');
      if (savedScores) setScores(JSON.parse(savedScores));
      if (savedUser) setUsername(savedUser);
      if (savedHaptic !== null) setIsHapticEnabled(JSON.parse(savedHaptic));
    } catch (e) {}
  };

  const saveData = async (key, val) => {
    try {
      await AsyncStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val));
    } catch (e) {}
  };

  const triggerHaptic = (style) => {
    if (isHapticEnabled) {
      if (style === 'error') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      else Haptics.impactAsync(Haptics.ImpactFeedbackStyle[style] || Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const getRandomCoordinate = useCallback(() => ({
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  }), []);

  const resetGame = () => {
    triggerHaptic('Medium');
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setLastProcessedDirection(INITIAL_DIRECTION);
    setFood(getRandomCoordinate());
    setScore(0);
    setIsGameOver(false);
    setIsMenuVisible(false);
  };

  const saveScore = async () => {
    const newScore = { username, score };
    const updatedScores = [newScore, ...scores].sort((a, b) => b.score - a.score).slice(0, 5);
    setScores(updatedScores);
    saveData('scores', updatedScores);
  };

  useEffect(() => {
    if (isGameOver || isMenuVisible) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = { x: head.x + direction.x, y: head.y + direction.y };

        if (
          newHead.x < 0 || newHead.x >= GRID_SIZE ||
          newHead.y < 0 || newHead.y >= GRID_SIZE ||
          prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
        ) {
          triggerHaptic('error');
          setIsGameOver(true);
          saveScore();
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];
        if (newHead.x === food.x && newHead.y === food.y) {
          triggerHaptic('Light');
          setScore((s) => s + 1);
          setFood(getRandomCoordinate());
        } else {
          newSnake.pop();
        }
        setLastProcessedDirection(direction);
        return newSnake;
      });
    };

    const intervalId = setInterval(moveSnake, Math.max(50, 200 - level * 20));
    return () => clearInterval(intervalId);
  }, [direction, food, isGameOver, isMenuVisible, level]);

  const handlePress = (newDir) => {
    if ((newDir.x !== 0 && lastProcessedDirection.x === 0) || (newDir.y !== 0 && lastProcessedDirection.y === 0)) {
      triggerHaptic('Light');
      setDirection(newDir);
    }
  };

  const buttonHitSlop = { top: 20, bottom: 20, left: 20, right: 20 };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerText}>SCORE: {score}</Text>
        <TouchableOpacity onPress={() => setIsMenuVisible(true)} style={styles.menuIconButton} hitSlop={buttonHitSlop}>
          <Text style={styles.menuIconText}>⚙</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.board}>
        {snake.map((segment, index) => (
          <View key={index} style={[styles.snakeSegment, { left: segment.x * CELL_SIZE, top: segment.y * CELL_SIZE }]} />
        ))}
        <View style={[styles.food, { left: food.x * CELL_SIZE, top: food.y * CELL_SIZE }]} />
        {isGameOver && (
          <View style={styles.gameOverOverlay}>
            <Text style={styles.gameOverText}>GAME OVER</Text>
            <TouchableOpacity style={styles.button} onPress={resetGame} hitSlop={buttonHitSlop}>
              <Text style={styles.buttonText}>RESTART</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.controls}>
        <View style={styles.controlRow}>
          <TouchableOpacity style={styles.controlButton} onPress={() => handlePress({ x: 0, y: -1 })} hitSlop={buttonHitSlop}>
            <Text style={styles.controlIcon}>▲</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.controlRow}>
          <TouchableOpacity style={styles.controlButton} onPress={() => handlePress({ x: -1, y: 0 })} hitSlop={buttonHitSlop}>
            <Text style={styles.controlIcon}>◀</Text>
          </TouchableOpacity>
          <View style={styles.controlSpacer} />
          <TouchableOpacity style={styles.controlButton} onPress={() => handlePress({ x: 1, y: 0 })} hitSlop={buttonHitSlop}>
            <Text style={styles.controlIcon}>▶</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.controlRow}>
          <TouchableOpacity style={styles.controlButton} onPress={() => handlePress({ x: 0, y: 1 })} hitSlop={buttonHitSlop}>
            <Text style={styles.controlIcon}>▼</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={isMenuVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>SETTINGS</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={(t) => { setUsername(t); saveData('username', t); }}
              maxLength={10}
            />
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>HAPTIC:</Text>
              <TouchableOpacity onPress={() => { const n = !isHapticEnabled; setIsHapticEnabled(n); saveData('haptic', n); }} style={styles.toggleButton} hitSlop={buttonHitSlop}>
                <Text style={styles.toggleText}>{isHapticEnabled ? 'ON' : 'OFF'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.levelRow}>
              <TouchableOpacity onPress={() => setLevel(p => Math.max(1, p - 1))} style={styles.smallBtn} hitSlop={buttonHitSlop}><Text style={styles.smallBtnText}>-</Text></TouchableOpacity>
              <Text style={styles.settingLabel}>LVL: {level}</Text>
              <TouchableOpacity onPress={() => setLevel(p => Math.min(10, p + 1))} style={styles.smallBtn} hitSlop={buttonHitSlop}><Text style={styles.smallBtnText}>+</Text></TouchableOpacity>
            </View>
            <Text style={styles.scoreTitle}>TOP SCORES</Text>
            <FlatList
              data={scores}
              keyExtractor={(_, i) => i.toString()}
              renderItem={({ item }) => (
                <View style={styles.scoreItem}><Text style={styles.scoreItemText}>{item.username}: {item.score}</Text></View>
              )}
              style={styles.scoreList}
            />
            <TouchableOpacity style={styles.button} onPress={resetGame} hitSlop={buttonHitSlop}><Text style={styles.buttonText}>{isGameOver ? 'RESTART' : 'START'}</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#8bab3e', alignItems: 'center', justifyContent: 'center', paddingTop: 50 },
  header: { marginBottom: 20, flexDirection: 'row', alignItems: 'center', width: BOARD_SIZE, justifyContent: 'space-between' },
  headerText: { fontSize: 24, fontWeight: 'bold', color: '#000', fontFamily: 'monospace' },
  menuIconButton: { backgroundColor: '#000', padding: 5, borderRadius: 5 },
  menuIconText: { color: '#8bab3e', fontSize: 20 },
  board: { width: BOARD_SIZE, height: BOARD_SIZE, backgroundColor: '#98b64e', borderWidth: 2, borderColor: '#000', position: 'relative' },
  snakeSegment: { position: 'absolute', width: CELL_SIZE, height: CELL_SIZE, backgroundColor: '#000' },
  food: { position: 'absolute', width: CELL_SIZE, height: CELL_SIZE, backgroundColor: '#000', borderRadius: CELL_SIZE / 2 },
  gameOverOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(152, 182, 78, 0.8)', justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  gameOverText: { fontSize: 32, fontWeight: 'bold', color: '#000', marginBottom: 20, fontFamily: 'monospace' },
  button: { backgroundColor: '#000', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5, marginTop: 10 },
  buttonText: { color: '#8bab3e', fontSize: 18, fontWeight: 'bold', fontFamily: 'monospace' },
  controls: { marginTop: 40, alignItems: 'center' },
  controlRow: { flexDirection: 'row' },
  controlButton: { width: 70, height: 70, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', margin: 5, borderRadius: 35 },
  controlIcon: { color: '#8bab3e', fontSize: 35 },
  controlSpacer: { width: 70 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '85%', backgroundColor: '#8bab3e', padding: 20, borderRadius: 10, alignItems: 'center', borderWeight: 2, borderColor: '#000' },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, fontFamily: 'monospace' },
  input: { width: '100%', borderBottomWidth: 2, borderColor: '#000', marginBottom: 15, padding: 5, fontFamily: 'monospace', fontSize: 18 },
  settingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, width: '100%', justifyContent: 'space-between' },
  levelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  settingLabel: { fontSize: 18, fontWeight: 'bold', fontFamily: 'monospace', marginHorizontal: 10 },
  toggleButton: { backgroundColor: '#000', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 5 },
  toggleText: { color: '#8bab3e', fontWeight: 'bold' },
  smallBtn: { backgroundColor: '#000', width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 5 },
  smallBtnText: { color: '#8bab3e', fontSize: 20, fontWeight: 'bold' },
  scoreTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 10, marginBottom: 5, fontFamily: 'monospace' },
  scoreList: { width: '100%', maxHeight: 150 },
  scoreItem: { flexDirection: 'row', justifyContent: 'center', width: '100%', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#000' },
  scoreItemText: { fontFamily: 'monospace', fontSize: 16, fontWeight: 'bold' }
});
