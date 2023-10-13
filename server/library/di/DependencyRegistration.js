class DependencyRegistration {
    constructor(key, factory, lifetime) {
      this.key = key;
      this.factory = factory;
      this.lifetime = lifetime;
    }
  }

export default DependencyRegistration;
  