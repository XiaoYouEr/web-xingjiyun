export function delay(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

/**
 * 延时执行某方法{times}次
 * @param func callback, 通过native的返回值判定
 * @param cron 间隔时间
 * @param times 最长循环次数
 * return boolean
 */
export async function delayCurl(func: () => any, delay = 200, times = 50): Promise<boolean> {
  if (times > 0) {
    const value = func();
    if (value) {
      return true;
    } else {
      times--;
      await new Promise((resolve) => {
        setTimeout(resolve, delay);
      });
      await delayCurl(func, delay, times);
      return false;
    }
  } else {
    return false;
  }
}

export function envIsLocal() {
  if (process.env.NAME === "local") {
    return true;
  }
  return false;
}
