'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const UnityComingBlog = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [activePost, setActivePost] = useState<{
    id: number;
    title: string;
    excerpt: string;
    date: string;
    gradient: string;
    icon: string;
  } | null>(null);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
  }>>([]);
  const heroRef = useRef(null);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e:any) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Particle generation
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => [...prev.slice(-50), {
        id: Date.now(),
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 20,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 1
      }]);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "Week 1: 游戏概念设计",
      excerpt: "确定游戏类型、核心玩法和美术风格，搭建基础项目框架",
      date: "2025.02.01",
      gradient: "from-purple-600 to-pink-600",
      icon: "🎮"
    },
    {
      id: 2,
      title: "Week 2: 核心机制开发",
      excerpt: "实现角色控制、物理系统和基础交互功能",
      date: "2025.02.08",
      gradient: "from-blue-600 to-cyan-600",
      icon: "⚙️"
    },
    {
      id: 3,
      title: "Week 3: 关卡设计与UI",
      excerpt: "创建第一个可玩关卡，设计用户界面和游戏菜单",
      date: "2025.02.15",
      gradient: "from-green-600 to-teal-600",
      icon: "🎨"
    },
    {
      id: 4,
      title: "Week 4: 打磨与优化",
      excerpt: "添加音效、粒子特效，进行性能优化和Bug修复",
      date: "2025.02.22",
      gradient: "from-orange-600 to-red-600",
      icon: "✨"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`
          }}
        />
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-purple-500 opacity-30"
            style={{
              width: particle.size,
              height: particle.size,
              x: particle.x,
            }}
            initial={{ y: particle.y }}
            animate={{ y: -20 }}
            transition={{ duration: 10 / particle.speed, ease: "linear" }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-8xl md:text-9xl font-bold mb-4 relative">
              <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-50"></span>
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-pulse">
                UNITY
              </span>
            </h1>
            <motion.h2 
              className="text-4xl md:text-6xl font-light tracking-widest"
              style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            >
              COMING
            </motion.h2>
          </motion.div>
          
          <motion.p 
            className="mt-8 text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            一个开发者的游戏开发之旅即将开始
          </motion.p>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50">
              开始我的Unity之旅
            </button>
          </motion.div>
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-purple-500 rounded-full"
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-24 h-24 border-2 border-pink-500"
            animate={{ 
              rotate: -360,
              scale: [1, 0.8, 1],
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="relative z-10 py-20 px-4">
        <motion.h2 
          className="text-5xl md:text-6xl font-bold text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            开发日志
          </span>
        </motion.h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActivePost(post)}
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                   style={{ backgroundImage: `linear-gradient(to right, ${post.gradient.split(' ')[1]}, ${post.gradient.split(' ')[3]})` }}
              />
              
              <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 cursor-pointer transform transition-all duration-300 group-hover:border-purple-500/50">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl">{post.icon}</span>
                  <time className="text-sm text-gray-500">{post.date}</time>
                </div>
                
                <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${post.gradient} bg-clip-text text-transparent`}>
                  {post.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="mt-6 flex items-center text-sm">
                  <span className="text-purple-400 group-hover:text-purple-300 transition-colors">
                    查看详情 →
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Interactive Feature Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-3xl opacity-50"></div>
            <h2 className="relative text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              加入我的游戏开发之旅
            </h2>
          </motion.div>
          
          <p className="text-xl text-gray-400 mb-12">
            见证一个独立游戏从零到一的诞生
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {['关注更新', '获取源码', '一起交流'].map((action, i) => (
              <motion.button
                key={action}
                className="px-6 py-3 border border-purple-500 rounded-full text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 5 : -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {action}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Post Modal */}
      <AnimatePresence>
        {activePost && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePost(null)}
          >
            <motion.div
              className="bg-gray-900 border border-purple-500 rounded-2xl p-8 max-w-2xl w-full"
              initial={{ scale: 0.8, rotateY: -90 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.8, rotateY: 90 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className={`text-3xl font-bold mb-4 bg-gradient-to-r ${activePost.gradient} bg-clip-text text-transparent`}>
                {activePost.title}
              </h2>
              <p className="text-gray-400 mb-6">{activePost.excerpt}</p>
              <p className="text-gray-300 leading-relaxed">
                在这一周，我将深入探索Unity引擎的各个方面，记录开发过程中的挑战与突破。
                从最初的概念到最终的实现，每一步都将是学习和成长的机会。
                跟随我一起见证一个游戏从想法变为现实的奇妙过程...
              </p>
              <button
                className="mt-6 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                onClick={() => setActivePost(null)}
              >
                关闭
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-gray-500">
        <p>© 2025 Unity Coming | Transcending Boundaries</p>
      </footer>
    </div>
  );
};

export default UnityComingBlog;