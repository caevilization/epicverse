// 创建一个滚动位置管理器
class ScrollManager {
  private static scrollPositions: { [key: string]: number } = {};

  // 保存当前页面的滚动位置
  static saveScrollPosition(path: string) {
    this.scrollPositions[path] = window.scrollY;
  }

  // 获取保存的滚动位置
  static getScrollPosition(path: string): number {
    return this.scrollPositions[path] || 0;
  }

  // 清除保存的滚动位置
  static clearScrollPosition(path: string) {
    delete this.scrollPositions[path];
  }
}

export default ScrollManager;
