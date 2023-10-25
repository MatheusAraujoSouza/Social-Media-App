import fs from 'fs';
import path from 'path';
import JSON5 from 'json5';

class AppSettingsLoader {
  constructor(configPath, options = {}) {
    this.defaultOptions = {
      debugEnvironmentName: 'debug',
      configPropertyEnvironmentVariablePrefix: 'APP_',
      showOverrides: false,
      ignoreDebugEnvironment: false,
    };

    this.configPath = configPath;
    this.options = { ...this.defaultOptions, ...options };
    this.appSettings = this.getAppSettingsFromConfigurationFile();
    if (
      process.env.NODE_ENV === this.options.debugEnvironmentName &&
      !this.options.ignoreDebugEnvironment
    ) {
      return;
    }
    this.overrideSettings(this.appSettings);
  }

  getAppSettingsFromConfigurationFile() {
    const configFilePath = path.join(__dirname, this.configPath);

    try {
      const configString = fs.readFileSync(configFilePath, 'utf8');
      return JSON5.parse(configString);
    } catch (e) {
      console.error(
        `Unable to read configuration file: ${configFilePath}, returning null. Error: ${e}`
      );
      throw new Error(`Unable to read configuration file: ${configFilePath}`);
    }
  }

  overrideSettings(settings) {
    if (!settings || typeof settings !== 'object') return;

    for (const key in settings) {
      if (settings.hasOwnProperty(key)) {
        this.handleOverride(settings, key);
      }
    }
  }

  handleOverride(settings, key) {
    const value = settings[key];
    const keyPrefix = `${this.options.configPropertyEnvironmentVariablePrefix}${key}`
      .toUpperCase()
      .replace(/[-./]/g, '_');
    const keyValue = process.env[keyPrefix];

    if (keyValue !== undefined) {
      if (keyValue === 'OVERRIDE_REMOVE_DATA') {
        delete settings[key];
        if (this.options.showOverrides) {
          console.info(`Removed key: ${keyPrefix}`);
        }
      } else {
        settings[key] = JSON5.parse(keyValue);
        if (this.options.showOverrides) {
          console.info(`Overridden key: ${keyPrefix}`);
        }
      }
    }

    if (typeof value === 'object') {
      this.overrideSettings(value);
    }
  }
}

export default AppSettingsLoader;