'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

interface Player extends GameObject {
  health: number;
}

interface Enemy extends GameObject {
  type: 'basic' | 'fast' | 'heavy';
}

interface Bullet extends GameObject {
  owner: 'player' | 'enemy';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

const RetroSpaceGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  const keysRef = useRef<Set<string>>(new Set());
  
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameOver'>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('retro-space-high-score') || '0');
    } catch {
      return 0;
    }
  });
  const [level, setLevel] = useState(1);
  
  const [player, setPlayer] = useState<Player>({
    x: 400,
    y: 500,
    width: 40,
    height: 30,
    speed: 5,
    health: 3
  });
  
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [lastShot, setLastShot] = useState(0);
  const [enemySpawnTimer, setEnemySpawnTimer] = useState(0);

  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;
  const SHOT_COOLDOWN = 150;

  // 初始化游戏
  const initGame = useCallback(() => {
    setPlayer({
      x: 400,
      y: 500,
      width: 40,
      height: 30,
      speed: 5,
      health: 3
    });
    setEnemies([]);
    setBullets([]);
    setParticles([]);
    setScore(0);
    setLevel(1);
    setLastShot(0);
    setEnemySpawnTimer(0);
  }, []);

  // 键盘事件处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.code);
      if (e.code === 'Space') {
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.code);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // 创建粒子效果
  const createParticles = useCallback((x: number, y: number, count: number = 8) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        life: 30,
        maxLife: 30
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  // 碰撞检测
  const checkCollision = useCallback((obj1: GameObject, obj2: GameObject): boolean => {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
  }, []);

  // 生成敌人
  const spawnEnemy = useCallback(() => {
    const enemyTypes: Enemy['type'][] = ['basic', 'fast', 'heavy'];
    const type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    
    let enemy: Enemy;
    switch (type) {
      case 'fast':
        enemy = {
          x: Math.random() * (CANVAS_WIDTH - 30),
          y: -30,
          width: 25,
          height: 20,
          speed: 3 + Math.random() * 2,
          type: 'fast'
        };
        break;
      case 'heavy':
        enemy = {
          x: Math.random() * (CANVAS_WIDTH - 50),
          y: -50,
          width: 50,
          height: 40,
          speed: 1 + Math.random(),
          type: 'heavy'
        };
        break;
      default:
        enemy = {
          x: Math.random() * (CANVAS_WIDTH - 35),
          y: -35,
          width: 35,
          height: 25,
          speed: 2 + Math.random(),
          type: 'basic'
        };
    }
    
    setEnemies(prev => [...prev, enemy]);
  }, []);

  // 射击
  const shoot = useCallback(() => {
    const now = Date.now();
    if (now - lastShot > SHOT_COOLDOWN) {
      setBullets(prev => [...prev, {
        x: player.x + player.width / 2 - 2,
        y: player.y,
        width: 4,
        height: 10,
        speed: 8,
        owner: 'player'
      }]);
      setLastShot(now);
    }
  }, [player, lastShot]);

  // 游戏主循环
  const gameLoop = useCallback(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 清空画布
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 绘制复古网格背景
    ctx.strokeStyle = '#2a4a2a';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;
    for (let i = 0; i < CANVAS_WIDTH; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, CANVAS_HEIGHT);
      ctx.stroke();
    }
    for (let i = 0; i < CANVAS_HEIGHT; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(CANVAS_WIDTH, i);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // 处理玩家输入
    if (keysRef.current.has('ArrowLeft') || keysRef.current.has('KeyA')) {
      setPlayer(prev => ({
        ...prev,
        x: Math.max(0, prev.x - prev.speed)
      }));
    }
    if (keysRef.current.has('ArrowRight') || keysRef.current.has('KeyD')) {
      setPlayer(prev => ({
        ...prev,
        x: Math.min(CANVAS_WIDTH - prev.width, prev.x + prev.speed)
      }));
    }
    if (keysRef.current.has('ArrowUp') || keysRef.current.has('KeyW')) {
      setPlayer(prev => ({
        ...prev,
        y: Math.max(0, prev.y - prev.speed)
      }));
    }
    if (keysRef.current.has('ArrowDown') || keysRef.current.has('KeyS')) {
      setPlayer(prev => ({
        ...prev,
        y: Math.min(CANVAS_HEIGHT - prev.height, prev.y + prev.speed)
      }));
    }
    if (keysRef.current.has('Space')) {
      shoot();
    }

    // 生成敌人
    setEnemySpawnTimer(prev => {
      const newTimer = prev + 1;
      if (newTimer > Math.max(60 - level * 5, 20)) {
        spawnEnemy();
        return 0;
      }
      return newTimer;
    });

    // 更新子弹
    setBullets(prev => {
      return prev
        .map(bullet => ({
          ...bullet,
          y: bullet.owner === 'player' ? bullet.y - bullet.speed : bullet.y + bullet.speed
        }))
        .filter(bullet => bullet.y > -bullet.height && bullet.y < CANVAS_HEIGHT + bullet.height);
    });

    // 更新敌人
    setEnemies(prev => {
      return prev
        .map(enemy => ({ ...enemy, y: enemy.y + enemy.speed }))
        .filter(enemy => enemy.y < CANVAS_HEIGHT + enemy.height);
    });

    // 更新粒子
    setParticles(prev => {
      return prev
        .map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vx: particle.vx * 0.98,
          vy: particle.vy * 0.98,
          life: particle.life - 1
        }))
        .filter(particle => particle.life > 0);
    });

    // 碰撞检测
    setBullets(prevBullets => {
      let newBullets = [...prevBullets];
      
      setEnemies(prevEnemies => {
        let newEnemies = [...prevEnemies];
        
        for (let i = newBullets.length - 1; i >= 0; i--) {
          const bullet = newBullets[i];
          if (bullet.owner !== 'player') continue;
          
          for (let j = newEnemies.length - 1; j >= 0; j--) {
            const enemy = newEnemies[j];
            
            if (checkCollision(bullet, enemy)) {
              // 创建爆炸粒子
              createParticles(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
              
              // 移除子弹和敌人
              newBullets.splice(i, 1);
              newEnemies.splice(j, 1);
              
              // 增加分数
              let points = 10;
              if (enemy.type === 'fast') points = 20;
              if (enemy.type === 'heavy') points = 30;
              
              setScore(prevScore => {
                const newScore = prevScore + points;
                if (newScore > highScore) {
                  setHighScore(newScore);
                  try {
                    localStorage.setItem('retro-space-high-score', newScore.toString());
                  } catch (e) {
                    // localStorage不可用时忽略错误
                  }
                }
                return newScore;
              });
              
              break;
            }
          }
        }
        
        return newEnemies;
      });
      
      return newBullets;
    });

    // 检查玩家与敌人碰撞
    setEnemies(prevEnemies => {
      const newEnemies = [...prevEnemies];
      
      for (let i = newEnemies.length - 1; i >= 0; i--) {
        const enemy = newEnemies[i];
        
        if (checkCollision(player, enemy)) {
          createParticles(player.x + player.width / 2, player.y + player.height / 2, 12);
          newEnemies.splice(i, 1);
          
          setPlayer(prev => {
            const newHealth = prev.health - 1;
            if (newHealth <= 0) {
              setGameState('gameOver');
            }
            return { ...prev, health: newHealth };
          });
        }
      }
      
      return newEnemies;
    });

    // 绘制玩家
    ctx.fillStyle = '#4a9a4a';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // 绘制玩家装饰
    ctx.fillStyle = '#6aba6a';
    ctx.fillRect(player.x + 5, player.y + 5, player.width - 10, player.height - 10);
    ctx.fillStyle = '#2a7a2a';
    ctx.fillRect(player.x + player.width / 2 - 2, player.y - 5, 4, 8);

    // 绘制敌人
    enemies.forEach(enemy => {
      let color = '#aa4a4a';
      if (enemy.type === 'fast') color = '#aa6a4a';
      if (enemy.type === 'heavy') color = '#8a2a2a';
      
      ctx.fillStyle = color;
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
      
      // 敌人装饰
      ctx.fillStyle = color === '#aa4a4a' ? '#ca6a6a' : color === '#aa6a4a' ? '#ca8a6a' : '#aa4a4a';
      ctx.fillRect(enemy.x + 3, enemy.y + 3, enemy.width - 6, enemy.height - 6);
    });

    // 绘制子弹
    bullets.forEach(bullet => {
      ctx.fillStyle = bullet.owner === 'player' ? '#8aba8a' : '#ba8a8a';
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    // 绘制粒子
    particles.forEach(particle => {
      const alpha = particle.life / particle.maxLife;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = `hsl(${Math.random() * 60 + 10}, 70%, ${50 + Math.random() * 30}%)`;
      ctx.fillRect(particle.x - 1, particle.y - 1, 3, 3);
    });
    ctx.globalAlpha = 1;

    // 更新等级
    if (score > 0 && score % 200 === 0) {
      setLevel(prev => prev + 1);
    }

  }, [gameState, player, enemies, bullets, particles, level, score, highScore, shoot, spawnEnemy, createParticles, checkCollision]);

  // 游戏循环
  useEffect(() => {
    if (gameState === 'playing') {
      const loop = () => {
        gameLoop();
        gameLoopRef.current = requestAnimationFrame(loop);
      };
      gameLoopRef.current = requestAnimationFrame(loop);
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, gameLoop]);

  const startGame = () => {
    initGame();
    setGameState('playing');
  };

  const backToMenu = () => {
    setGameState('menu');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-amber-50 to-yellow-100 p-4" 
         style={{ 
           backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(139, 69, 19, 0.15) 1px, transparent 0)',
           backgroundSize: '20px 20px',
           fontFamily: '"Courier New", monospace'
         }}>
      
      {gameState === 'menu' && (
        <div className="text-center space-y-6 p-8 bg-amber-100 border-4 border-amber-800 rounded-lg shadow-2xl"
             style={{ 
               boxShadow: 'inset 0 0 20px rgba(139, 69, 19, 0.3), 8px 8px 0 rgba(139, 69, 19, 0.4)',
               background: 'linear-gradient(145deg, #fef3c7, #f3e8b7)'
             }}>
          <h1 className="text-6xl font-bold text-amber-900 mb-2"
              style={{ 
                textShadow: '3px 3px 0 rgba(139, 69, 19, 0.3)',
                filter: 'sepia(0.3)'
              }}>
            RETRO SPACE
          </h1>
          <h2 className="text-3xl text-amber-800 mb-6"
              style={{ textShadow: '2px 2px 0 rgba(139, 69, 19, 0.2)' }}>
            DEFENDER
          </h2>
          
          <div className="text-amber-700 space-y-2 mb-6 text-lg">
            <p>最高分: <span className="font-bold text-amber-900">{highScore.toLocaleString()}</span></p>
            <div className="border-t-2 border-amber-600 pt-4 mt-4">
              <p className="font-bold mb-2">操作说明:</p>
              <p>方向键/WASD - 移动飞船</p>
              <p>空格键 - 射击</p>
            </div>
          </div>
          
          <button 
            onClick={startGame}
            className="px-8 py-4 text-2xl font-bold text-amber-100 bg-amber-800 hover:bg-amber-900 
                       border-4 border-amber-900 rounded-lg transform hover:scale-105 transition-all duration-200"
            style={{
              boxShadow: '4px 4px 0 rgba(139, 69, 19, 0.6)',
              textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)'
            }}>
            开始游戏
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-amber-900 font-bold text-xl px-4">
            <div>分数: {score.toLocaleString()}</div>
            <div>等级: {level}</div>
            <div>生命: {'❤️'.repeat(player.health)}</div>
            <div>最高分: {highScore.toLocaleString()}</div>
          </div>
          
          <canvas 
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="border-4 border-amber-800 rounded-lg bg-black"
            style={{ 
              boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.8), 8px 8px 0 rgba(139, 69, 19, 0.4)',
              filter: 'sepia(0.1) contrast(1.1)'
            }}
          />
          
          <div className="text-center text-amber-700">
            <p>按 ESC 键暂停游戏</p>
          </div>
        </div>
      )}

      {gameState === 'gameOver' && (
        <div className="text-center space-y-6 p-8 bg-red-100 border-4 border-red-800 rounded-lg shadow-2xl"
             style={{ 
               boxShadow: 'inset 0 0 20px rgba(139, 69, 19, 0.3), 8px 8px 0 rgba(139, 69, 19, 0.4)',
               background: 'linear-gradient(145deg, #fee2e2, #fecaca)'
             }}>
          <h2 className="text-5xl font-bold text-red-900 mb-4"
              style={{ 
                textShadow: '3px 3px 0 rgba(139, 69, 19, 0.3)',
                filter: 'sepia(0.3)'
              }}>
            游戏结束
          </h2>
          
          <div className="text-red-800 space-y-2 text-xl">
            <p>最终分数: <span className="font-bold text-red-900">{score.toLocaleString()}</span></p>
            <p>达到等级: <span className="font-bold text-red-900">{level}</span></p>
            <p>最高记录: <span className="font-bold text-red-900">{highScore.toLocaleString()}</span></p>
            {score === highScore && score > 0 && (
              <p className="text-yellow-600 font-bold text-lg animate-pulse">🎉 新纪录! 🎉</p>
            )}
          </div>
          
          <div className="flex gap-4 justify-center">
            <button 
              onClick={startGame}
              className="px-6 py-3 text-xl font-bold text-amber-100 bg-amber-800 hover:bg-amber-900 
                         border-4 border-amber-900 rounded-lg transform hover:scale-105 transition-all duration-200"
              style={{
                boxShadow: '4px 4px 0 rgba(139, 69, 19, 0.6)',
                textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)'
              }}>
              再来一局
            </button>
            
            <button 
              onClick={backToMenu}
              className="px-6 py-3 text-xl font-bold text-red-100 bg-red-800 hover:bg-red-900 
                         border-4 border-red-900 rounded-lg transform hover:scale-105 transition-all duration-200"
              style={{
                boxShadow: '4px 4px 0 rgba(127, 29, 29, 0.6)',
                textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)'
              }}>
              返回菜单
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RetroSpaceGame;