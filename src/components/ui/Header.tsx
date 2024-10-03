'use client';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from './button';

const Header = () => {
    const lastScrollY = useRef(0);
    const [isVisible, setIsVisible] = useState(true);

    const controlHeader = () => {
        if (typeof window !== 'undefined') {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY.current) {
                // 向下滚动，隐藏 Header
                setIsVisible(false);
            } else {
                // 向上滚动，显示 Header
                setIsVisible(true);
            }

            // 更新 lastScrollY 为当前滚动位置
            lastScrollY.current = currentScrollY;
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // 使用 requestAnimationFrame 优化滚动事件
            let ticking = false;

            const handleScroll = () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        controlHeader();
                        ticking = false;
                    });

                    ticking = true;
                }
            };

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, []); // 空的依赖数组，确保只在组件挂载和卸载时运行

    return (
        <header
            className={`w-full h-20 p-7 flex bg-black text-white items-center shadow-2xl header-backdrop transition-transform duration-300 ${
                isVisible ? 'translate-y-0' : '-translate-y-full'
            } sticky top-0 left-0 z-50`}
        >
            <div className='absolute left-6 flex gap-5 items-center font-bold'>
                <Image src='/img/resume.png' width={30} height={30} alt='logo' />
                Xiaofeng Tang
            </div>

            <nav className='text-white absolute left-1/3 flex items-center gap-20'>
                <div className='font-bold'>HOME</div>
                <div className='font-bold'>PROJECT</div>
                <div className='font-bold'>ABOUT</div>
                <div className='font-bold'>CONTACT</div>
            </nav>

            <div className='absolute right-4'>
                <Button variant='secondary' className='p-6 rounded-md bg-white text-black font-bold'>
                    GET IN TOUCH
                </Button>
            </div>
        </header>
    );
};

export default Header;
