import { useEffect } from "react";

let lockCount = 0;
let storedScrollY = 0;
let storedOverflow = "";
let storedPaddingRight = "";

const getScrollbarCompensation = () => {
  if (typeof window === "undefined") return 0;
  return window.innerWidth - document.documentElement.clientWidth;
};

const preventScroll = () => {
  window.scrollTo(0, storedScrollY);
};

const lockBody = (initialScroll?: number) => {
  if (typeof window === "undefined") return;

  if (lockCount === 0) {
    // 保存当前滚动位置
    storedScrollY = typeof initialScroll === "number" ? initialScroll : window.scrollY || 0;

    // 保存原始样式
    storedOverflow = document.body.style.overflow;
    storedPaddingRight = document.body.style.paddingRight;

    // 计算滚动条宽度补偿
    const scrollbarWidth = getScrollbarCompensation();

    // 使用 overflow hidden 锁定滚动（不会破坏 fixed 定位）
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // 添加滚动监听作为双保险
    window.addEventListener("scroll", preventScroll, { passive: false });
  }

  lockCount += 1;
};

const unlockBody = () => {
  if (typeof window === "undefined") return;

  lockCount = Math.max(0, lockCount - 1);

  if (lockCount === 0) {
    // 恢复原始样式
    document.body.style.overflow = storedOverflow;
    document.body.style.paddingRight = storedPaddingRight;

    // 移除滚动监听
    window.removeEventListener("scroll", preventScroll);

    // 恢复滚动位置
    window.scrollTo(0, storedScrollY);

    // 清理
    storedOverflow = "";
    storedPaddingRight = "";
  }
};

interface ScrollLockOptions {
  initialScroll?: number;
}

export function useScrollLock(
  locked: boolean,
  options?: ScrollLockOptions
): void {
  useEffect(() => {
    if (!locked) {
      return;
    }

    lockBody(options?.initialScroll);

    return () => {
      unlockBody();
    };
  }, [locked, options?.initialScroll]);
}
