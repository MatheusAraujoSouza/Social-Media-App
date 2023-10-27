import DependencyLifetime from './DependencyLifetime.js';
import DependencyRegistration from './DependencyRegistration.js';

class DependencyContainer {
  constructor() {
    this.singletons = new Map();
    this.registrations = [];
    this.scope = new Map();
  }

  register(key, factory, lifetime) {
    this.registrations.push(new DependencyRegistration(key, factory, lifetime));
  }

  beginScope() {
    this.scope = new Map();
  }

  endScope() {
    this.scope.clear();
  }

  resolve(key) {
    const existingScopeInstance = this.scope.get(key);
    if (existingScopeInstance) {
      return existingScopeInstance;
    }

    const existingSingleton = this.singletons.get(key);
    if (existingSingleton) {
      return existingSingleton;
    }

    const registration = this.registrations.find((reg) => reg.key === key);
    if (!registration) {
      throw new Error(`Dependency ${key} not found`);
    }

    if (registration.lifetime === DependencyLifetime.Singleton) {
      const singletonInstance = registration.factory();
      this.singletons.set(key, singletonInstance);
      return singletonInstance;
    } else if (registration.lifetime === DependencyLifetime.Scoped) {
      const scopedInstance = registration.factory();
      this.scope.set(key, scopedInstance);
      return scopedInstance;
    }

    return registration.factory();
  }
}

const instance = new DependencyContainer();

export default instance;
